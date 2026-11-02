# Flipkart Machine Coding Round (Feb 20, 2013) — 13-Year Retrospective

> **Live GitHub Pages Time Capsule & Interactive 2013 Spreadsheet Demo**:
> **[https://nodesman.github.io/flipkart-codingtest-2013-retrospective/](https://nodesman.github.io/flipkart-codingtest-2013-retrospective/)**

---

## Overview

On **Wednesday, February 20, 2013 at 5:14 PM IST**—while working as a UI Consultant at ThoughtWorks in India—I received a 5-hour Machine Coding Round prompt from Flipkart:

- **Task**: Implement a basic Excel spreadsheet using HTML, CSS, and JavaScript (`m x n` cells, add/remove rows & columns, click-to-edit / click-away read-only, data sorting).
- **Rules**:
  1. Must work across **IE7, Firefox, and Chrome**.
  2. **Pure native JavaScript only** (zero libraries / no jQuery).
  3. **Solve time: 5 hours**.
  4. **Originality of code is very important**.

At **10:32 PM IST**, I sent back `sol.zip` (`3,502 bytes`) with this two-line note:

```text
Hey,

Attached is my solution. It's partial and doesn't do everything you asked.
But here is anyway FWIW.

Raj
```

**Outcome**: Despite running out of the 5-hour clock before wiring up column sorting and row insertion, **Flipkart invited me in for the onsite interview** after reviewing the 374 lines of closure-structured, zero-library vanilla ES5 in `spreadsheet.js`.

---

## Repository Structure

```text
flipkart-codingtest-2013-retrospective/
├── index.html                        # Full 2026 GitHub Pages retrospective, review & embedded demo
├── demo/                             # Browser-playable 2013 spreadsheet (with strict-mode var el patch)
│   ├── index.html
│   ├── spreadsheet.js
│   ├── style.css
│   └── new  3.txt
└── original-2013-archive/            # Untouched, byte-for-byte 2013 submission archive
    ├── sol.zip
    └── sol/
        ├── index.html
        ├── spreadsheet.js
        ├── style.css
        └── new  3.txt
```

---

## What Stands Out 13 Years Later

1. **Douglas Crockford-Style Closure OOP (`LayoutManager` IIFE + `"use strict"`)**: Zero global variables or inline HTML event handlers in an era dominated by jQuery spaghetti.
2. **ThoughtWorks Ruby/Smalltalk Fingerprints (`columnDo` & `rowDo`)**: Higher-order iterators using `callback.apply(el)` so `this` inside callbacks points directly to the DOM cell—rebuilding jQuery's `.each()` from scratch.
3. **Coordinate Tagging (`columnoffsetval` & `rowoffsetval`)**: Solving the "shifting index on delete" bug so deleting arbitrary columns or rows never causes off-by-one corruption on subsequent selections.
4. **Hand-Rolled Cross-Browser Shims (`bind`, `attachEvent` vs. `addEventListener`, `srcElement` vs. `target`, IE7 whitespace `childNodes` offsets)**.
5. **Desktop Windowing Mindset (`LayoutManager`, `#junction`, `contentEditable`, Custom Context Menus)**: Treating the browser viewport like a native desktop instrument—the same engineering DNA that later produced **[Markd](https://markd.aramudan.dev)** (C++20 / Qt 6) and *The Load-Bearing Pixel*.
