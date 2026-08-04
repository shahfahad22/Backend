@import "tailwindcss";

@theme {
  --color-base: #121014;
  --color-surface: #1B1820;
  --color-surface2: #242028;
  --color-line: #332E3A;
  --color-amber: #E8A33D;
  --color-amber-soft: #F2C879;
  --color-ink: #F4EFE6;
  --color-muted: #9C93A6;
  --color-danger: #E8637A;

  --font-display: "Fraunces", serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

@layer components {
  .input {
    @apply w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition focus:border-amber;
  }
  .btn-primary {
    @apply rounded-md bg-amber px-4 py-2.5 text-sm font-semibold text-base transition hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-50;
  }
  .btn-secondary {
    @apply rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-amber/50 disabled:cursor-not-allowed disabled:opacity-50;
  }
}

* { box-sizing: border-box; }
body { margin: 0; -webkit-font-smoothing: antialiased; }
::selection { background: #e8a33d; color: #121014; }

a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 2px solid #e8a33d;
  outline-offset: 2px;
}

.waveline {
  background-image: repeating-linear-gradient(90deg, #332e3a 0px, #332e3a 1px, transparent 1px, transparent 6px);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}