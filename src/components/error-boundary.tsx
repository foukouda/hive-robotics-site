"use client";

import { Component, type ReactNode } from "react";

/**
 * Generic client error boundary. Renders `fallback` if a descendant throws,
 * so a failing widget (e.g. the WebGL 3D canvas) never blanks its whole section.
 */
export class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
