"use client";

import { useEffect } from "react";

export default function IframeResizer() {
  useEffect(() => {
    function sendHeight() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "quizResize", height }, "*");
    }

    sendHeight();

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []);

  return null;
}
