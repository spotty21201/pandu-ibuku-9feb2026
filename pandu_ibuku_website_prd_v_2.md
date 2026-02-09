# Pandu Ibuku Website — Product Requirements Document (PRD v2.0)

## 0. Context & Intent

This PRD defines **Pandu Ibuku Website v1.0 (post‑0.5 reset)**, combining:
- Lessons learned from the first released version (v0.5)
- The original PRD intent (archive‑first, non‑performative)
- The newly defined **Visual Doctrine & Design System**

This document is written to be:
- Executable by AI website‑builder agents
- Clear enough for human designers and developers
- Stable for long‑term maintenance

This is **not** a growth product PRD. It is a **durability PRD**.

---

## 1. Product Definition

**Pandu Ibuku** is a **text‑centric intellectual archive** that preserves and presents written thought across moral, civic, scientific, and speculative domains.

It is:
- Not a blog
- Not a media site
- Not a foundation landing page in the promotional sense

It behaves more like a **digital library / notebook / archive of reasoned thought**.

The product must reward **slow reading**, not frequent visits.

---

## 2. Core Problems Identified in v0.5

The first release (v0.5) revealed several issues that must be corrected:

1. **Over‑flat hierarchy**
   - Pages feel similar regardless of importance
   - Section intros do not assert enough authority

2. **Text fatigue**
   - Long text blocks without sufficient rhythm
   - Insufficient typographic pacing

3. **Weak sense of “archive gravity”**
   - Pages feel like posts, not permanent records

4. **Visual indecision**
   - Serif usage exists, but identity is not yet unmistakable

PRD v2.0 resolves these issues by tightening hierarchy, doctrine, and execution.

---

## 3. Product Goals (Explicit)

### Primary Goal
Create a **timeless, dignified, low‑tech archive** that can stand unchanged for decades.

### Secondary Goals
- Be readable by international audiences
- Be technically simple and robust
- Allow the author to write without pressure or performance

### Explicit Non‑Goals
- Engagement
- Virality
- SEO optimization as a primary driver
- Monetization

---

## 4. Information Architecture (LOCKED)

### 4.1 Top‑Level Navigation (Permanent)

Navigation must always show these six domains, in this order:

1. Beranda
2. Pandu Bangsaku
3. Akhlaq Mulia
4. Ilmu Baru Bilangan Prima
5. Khayalan‑kah
6. Miscellaneous

No tags. No categories. No filters beyond domain.

---

### 4.2 Domain Behavior

Each domain consists of:
- A **permanent introductory page** (non‑chronological)
- A list of entries beneath it

Intro pages are not posts. They are **section prefaces** and must feel archival.

---

## 5. Content Rules

### 5.1 Writing Model

- Long‑form, essay‑like
- Time‑neutral language preferred
- No references to “today”, “this week”, or trends unless essential

### 5.2 Editing Philosophy

- Entries may be revised over time
- URLs must remain stable
- Visible timestamps are optional but must not dominate

This is closer to **editing a manuscript** than publishing content.

---

## 6. Visual Doctrine (IMPLEMENTATION‑READY)

### 6.1 Design Posture

**Quiet Authority, Not Performance**

The website must feel:
- Calm
- Serious
- Measured
- Confident without display

If JavaScript is disabled, the site must still work and look correct.

---

### 6.2 Typography System (LOCKED)

#### Serif — Identity & Structure

**Libre Baskerville (Google Fonts)**

Used for:
- Logo / site title
- Primary navigation
- H1, H2, section titles

Weights:
- Regular (400)
- Bold (700) sparingly

#### Sans‑Serif — Body & Utility

**Inter (Google Fonts)**

Used for:
- Body text
- Metadata
- Dates
- Captions

The sans‑serif must visually disappear during reading.

---

### 6.3 Typographic Rules

- Never mix serif and sans in the same paragraph
- Max line length (desktop): ~70 characters
- Body size desktop: 17–18px
- Line height: 1.6–1.7

No kinetic typography. No variable tricks.

---

### 6.4 Color System (MAX 4 COLORS)

1. Background: `#FAFAF8`
2. Primary text: `#1F1F1F`
3. Secondary neutral: `#B5B5B5`
4. Accent (single): `#E4572E`

Rules:
- Accent used sparingly (links, hover, small markers)
- No gradients
- No dark mode
- No shadows

---

## 7. Layout & Composition

### 7.1 Layout Philosophy

- Single‑column reading layout preferred
- Two‑column allowed only for navigation + content
- Generous margins

Whitespace is **functional**, not decorative.

---

### 7.2 Page Types

1. **Beranda**
   - Acts as philosophical preface
   - Minimal links

2. **Domain Index Pages**
   - Intro text first
   - Entry list below

3. **Entry Pages**
   - Title
   - Optional date
   - Long‑form text

No sidebars. No related posts.

---

## 8. Technology Stack (STRICT)

- Framework: Next.js (App Router)
- Rendering: Static Site Generation (SSG)
- Styling: Tailwind CSS only
- Content: Markdown / MDX files

No:
- UI libraries
- Animation libraries
- Heavy client‑side logic

JavaScript is allowed only when unavoidable.

---

## 9. Content Management

- File‑based Markdown is the source of truth
- Folder structure mirrors domain structure
- Headless CMS optional only if Markdown‑first

Example:
```
/content
  /beranda.md
  /pandu-bangsaku/
  /akhlaq-mulia/
  /ilmu-bilangan-prima/
  /khayalan-kah/
  /miscellaneous/
```

---

## 10. Accessibility & Performance

- Semantic HTML
- Keyboard navigable
- Screen‑reader friendly
- Fast load on low bandwidth

Accessibility is mandatory, not optional.

---

## 11. Success Criteria

The site is successful if:
- The design fades away while reading
- The author feels no pressure to perform
- Pages feel permanent, not disposable

The site has failed if:
- It feels trendy
- It demands attention
- It behaves like a feed

---

## 12. Extensions: Projects & Tools Layer (NEW)

### 12.1 Conceptual Positioning

Pandu Ibuku is the **archive of thought**.

Projects and tools (e.g. *Prime Horizon*) are **instruments of demonstration** — they show how certain ideas, theses, or lines of inquiry behave when turned into systems, logic, or usable artifacts.

This creates a clear separation:
- **Pandu Ibuku** = source of ideas, essays, reasoning, worldview
- **Projects / Tools** = applied manifestations of selected ideas

The website must never flip this hierarchy.

---

### 12.2 New Top-Level Section: Projects

Add a new permanent navigation item **after** the six core domains:

7. Projects

Rules:
- Projects are not essays
- Projects are not posts
- Projects are not marketing pages

Each project is a *quiet gateway* to an external or internal system.

---

### 12.3 Project Page Structure (LOCKED)

Each project page contains:

1. Project title
2. One-paragraph intellectual framing ("Why this exists")
3. Relationship to Pandu Ibuku domains
4. External link to the live app/tool
5. Minimal metadata (year, status)

No screenshots required. No feature lists. No pricing language.

---

### 12.4 Prime Horizon — Canonical Project

**Prime Horizon** adalah sebuah instrumen visual untuk mengeksplorasi struktur dan keteraturan bilangan prima sebagai sebuah sistem, bukan sekadar kumpulan angka yang berdiri sendiri. Proyek ini berangkat dari pemikiran dalam *Ilmu Baru Bilangan Prima*, yang memandang bilangan prima sebagai relasi yang tidak acak dan memiliki pola yang dapat diamati.

Prime Horizon tidak dimaksudkan untuk membuktikan, melainkan **memperlihatkan**—memberi ruang bagi pengamatan dan pemahaman awal melalui visualisasi yang tenang dan terukur.

Tautan:
- https://primehorizon-eight.vercel.app/

---

### 12.5 Future Projects Policy

Future tools may include:
- Analytical instruments
- Educational explainers
- Visual reasoning systems
- Experimental SaaS or public utilities

Rules:
- Every project must trace back to at least one Pandu Ibuku domain
- No standalone startups inside Pandu Ibuku
- No marketing copy
- No growth language

If a project becomes commercial, Pandu Ibuku remains its **intellectual origin**, not its sales channel.

---

## 13. Updated Success Criteria

Pandu Ibuku succeeds if:
- Projects feel like footnotes made real
- Tools feel calm, serious, and explanatory
- The archive remains the center of gravity

It fails if:
- Tools overshadow writing
- The site feels like a product suite
- Navigation feels like a SaaS hub

---

## 14. Closing Principle

Ideas come first.
Tools follow.
The archive remains.

Pandu Ibuku is the mind.
Projects are its instruments.

