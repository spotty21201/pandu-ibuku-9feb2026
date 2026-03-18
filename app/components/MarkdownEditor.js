"use client";

import { useEffect, useRef, useState } from "react";

const TOOLBAR_ITEMS = [
  ["heading", "bold", "italic"],
  ["ul", "ol", "quote"],
];

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = "420px",
  minHeight = "320px",
}) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value || "");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    valueRef.current = value || "";
  }, [value]);

  useEffect(() => {
    let cancelled = false;

    const initEditor = async () => {
      const { default: Editor } = await import("@toast-ui/editor");

      if (cancelled || !containerRef.current || editorRef.current) {
        return;
      }

      const editor = new Editor({
        el: containerRef.current,
        height,
        minHeight,
        initialValue: valueRef.current,
        initialEditType: "wysiwyg",
        hideModeSwitch: true,
        placeholder,
        usageStatistics: false,
        toolbarItems: TOOLBAR_ITEMS,
      });

      editor.on("change", () => {
        onChangeRef.current?.(editor.getMarkdown());
      });

      editorRef.current = editor;
      setIsReady(true);
    };

    initEditor();

    return () => {
      cancelled = true;

      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [height, minHeight, placeholder]);

  useEffect(() => {
    const editor = editorRef.current;
    const nextValue = value || "";

    if (!editor || editor.getMarkdown() === nextValue) {
      return;
    }

    editor.setMarkdown(nextValue, false);
  }, [value]);

  return (
    <div className="toast-minimal-editor relative">
      {!isReady ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-start border border-border-subtle bg-white p-4 font-mono text-sm text-black/35"
          style={{ minHeight }}
        >
          {placeholder}
        </div>
      ) : null}
      <div ref={containerRef} />
    </div>
  );
}
