"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ARG_CANDIDATES, COMMAND_NAMES, runCommand } from "@/lib/shell-commands";
import { MatrixRain } from "@/app/components/MatrixRain";
import { TerminalWindow } from "@/app/components/TerminalWindow";

type LogEntry = { type: "input" | "output"; text: string };

export function InteractiveShell() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [matrixActive, setMatrixActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }, []);

  const focusInput = () => inputRef.current?.focus();

  const submit = () => {
    const value = input;
    if (!value.trim()) {
      setLog((prev) => [...prev, { type: "input", text: value }]);
      setInput("");
      return;
    }

    const result = runCommand(value, {
      router: { push: (href: string) => router.push(href) },
      toggleMatrix: () => setMatrixActive((prev) => !prev),
    });

    setHistory((prev) => [...prev, value]);
    setHistoryIndex(null);

    if (result.sideEffect === "clear") {
      setLog([]);
    } else {
      setLog((prev) => [
        ...prev,
        { type: "input", text: value },
        ...result.lines.map((text): LogEntry => ({ type: "output", text })),
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const endsWithSpace = /\s$/.test(input);
      const tokens = input.trim().split(/\s+/).filter(Boolean);
      if (tokens.length === 0) return;

      let candidates: string[];
      let baseTokens: string[];
      let prefix: string;

      if (tokens.length === 1 && !endsWithSpace) {
        candidates = COMMAND_NAMES;
        baseTokens = [];
        prefix = tokens[0].toLowerCase();
      } else {
        const command = tokens[0].toLowerCase();
        candidates = ARG_CANDIDATES[command] || [];
        baseTokens = endsWithSpace ? tokens : tokens.slice(0, -1);
        prefix = (endsWithSpace ? "" : tokens[tokens.length - 1]).toLowerCase();
      }

      // Hidden (dotfile) candidates only surface once the user has typed
      // the leading ".", matching real shell glob behavior.
      const visibleCandidates = prefix.startsWith(".")
        ? candidates
        : candidates.filter((c) => !c.startsWith("."));
      const matches = visibleCandidates.filter((c) =>
        c.toLowerCase().startsWith(prefix)
      );
      if (matches.length === 1) {
        setInput([...baseTokens, matches[0]].join(" ") + " ");
      } else if (matches.length > 1) {
        setLog((prev) => [
          ...prev,
          { type: "input", text: input },
          { type: "output", text: matches.join("  ") },
        ]);
      }
    }
  };

  return (
    <TerminalWindow title="~/fernando-trevino — zsh">
      <div
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
      >
        <span className="text-accent">➜</span>
        <span>~/fernando-trevino</span>
        <span>git:(</span>
        <span className="text-accent-2">main</span>
        <span>)</span>
      </div>

      <div
        ref={scrollRef}
        className="mt-3 h-32 cursor-text overflow-y-auto text-sm"
        onClick={focusInput}
        role="log"
        aria-live="polite"
      >
        {log.map((entry, i) =>
          entry.type === "input" ? (
            <p key={i}>
              <span className="text-accent">$</span> {entry.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-muted">
              {entry.text}
            </p>
          )
        )}

        <p className="flex flex-wrap items-center gap-x-2">
          <span className="text-accent">$</span>
          <span className="text-foreground">{input}</span>
          <span className="cursor-blink text-accent">▌</span>
        </p>
      </div>

      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="terminal input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className="fixed left-0 top-0 h-px w-px opacity-0"
        style={{ pointerEvents: "none" }}
      />

      <MatrixRain active={matrixActive} onClose={() => setMatrixActive(false)} />
    </TerminalWindow>
  );
}
