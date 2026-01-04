# Gig Quest - AI Agent Context

**Purpose:** Static reference guide for AI coding assistants
**Type:** Architecture, patterns, and principles (does not change frequently)
**For Status Updates:** See `PROGRESS.md` (updated after each work session)

---

## Quick Start for AI Agents

Welcome to **Gig Quest**! This file provides essential context for AI coding assistants working on this project.

### What You're Working On

**Gig Quest** is a story-driven educational game that teaches JavaScript through narrative. Players write real, executable code in a professional Monaco editor to complete freelance programming gigs for memorable clients (Betty's Bakery, Mario's Pizza Shop, etc.), guided by Chip the AI teaching companion.

**Core Innovation:** Phoenix Wright-style visual novel presentation + real JavaScript coding + professional dev tools.

---

## Essential Reading (Load These Files First)

Before starting any task, read these files to understand the project:

### 1. Project Status & Recent Work
- **File:** `PROGRESS.md` ⚠️ **READ THIS FIRST**
- **What:** Current status, completed work, active tasks, recent commits
- **Why:** Understand what's been done and what's in progress

### 2. Game Design Document (Design Reference)
- **File:** `_bmad-output/gdd.md`
- **What:** Comprehensive game design - core concept, platforms, audience, goals, USPs
- **Why:** Source of truth for design decisions

### 3. Recent Code Changes (Dynamic - Run This)
```bash
git log --oneline -10
```
**Why:** See what changed recently (don't rely on hardcoded commits in this file)

### 4. Project Structure
- **Files:** `src/types/game.ts`, `src/data/jobs.ts`, `src/store/gameStore.ts`
- **What:** Core type definitions, data models, state management

### 5. Key Components
- **Files:**
  - `src/components/TaskView.tsx` - Main game screen
  - `src/components/CodeEditor.tsx` - Monaco editor integration
  - `src/components/TestRunner.tsx` - Code validation system
  - `src/components/CharacterDialogue.tsx` - Visual novel dialogue
- **What:** Primary UI components

---

## Project Architecture

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **UI:** React 19, Tailwind CSS 4
- **Code Editor:** Monaco Editor (VSCode engine)
- **State:** Zustand
- **Deployment:** Web Browser (gigquest.dev)

### Directory Structure
```
gigquest/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components (UI, game systems)
│   ├── content/          # YAML files (narrative content - jobs, dialogue)
│   ├── data/             # JSON/TS files (technical data - tests, skills)
│   ├── lib/              # Utilities (codeRunner, formatText)
│   ├── store/            # Zustand state management
│   └── types/            # TypeScript type definitions
├── _bmad/                # BMAD methodology framework (agents, workflows)
├── _bmad-output/         # Generated documents (GDD, architecture, etc.)
└── docs/                 # Additional documentation
```

### Key Design Patterns

**Content Separation (IMPORTANT):**
- **YAML files** (`src/content/jobs/`) = Narrative content (dialogue, story, client personality)
- **JSON/TS files** (`src/data/`) = Technical data (tests, starter code, skills taught)
- **Reason:** Allows writers to edit story without touching code validation logic

**Data Flow:**
```
User types code → Monaco Editor → codeRunner.ts validates → TestRunner checks tests →
Success → gameStore updates → TaskView shows next task
```

---

## Core Game Pillars (DO NOT VIOLATE)

These are the **5 Core Pillars** from the GDD - any code changes must align with these:

1. **Authentic Code Editor** - Monaco mimics professional dev workflows
2. **Real JavaScript** - Executable code that teaches transferable skills
3. **Visual Novel Presentation** - Phoenix Wright-style character-driven storytelling
4. **Pro Developer Teaching** - Industry-standard practices, expert pedagogy
5. **Concise Gameplay** - Tight loops, clear goals, satisfying progress

---

## Important Context & Decisions (Static)

### Recent Pivot (Critical!)
**Original Plan:** 3D-enhanced code editor with Three.js particle effects, variable inspector 3D scene
**New Direction:** Focus on core learning experience - visual novel + real code. 3D effects deprioritized as "nice to have"
**Reason:** De-risk the project, focus on validated core mechanics

### Character Name Update
**Old:** Pixel (the teaching companion robot)
**New:** Chip (confirmed 2026-01-03)
**Update this everywhere you see "Pixel"**

### Audience Philosophy
- **Age:** All ages (13+ for reading level)
- **Experience:** Complete beginners to expert developers ("beginner's mind")
- **Goal:** Maximum accessibility and discovery, not narrow demographic targeting

---

## Common Tasks & Where to Start

### Adding a New Job
1. Create YAML in `src/content/jobs/` (narrative: client, dialogue, story)
2. Create JSON in `src/data/jobs/` (technical: tests, skills, starter code)
3. Update `src/data/jobs.ts` to merge and export
4. Reference: `bettys-bakery.yaml` and `jobs.json`

### Adding a New Component
1. Create in `src/components/`
2. Follow existing patterns (TaskView, CodeEditor as examples)
- Use TypeScript strict mode
4. Import types from `src/types/game.ts`

### Debugging Code Execution
- **File:** `src/lib/codeRunner.ts`
- **Key function:** `executeCode()` - runs user code in sandbox
- **Tests:** Defined in job data, validated in `TestRunner.tsx`

### Updating Game State
- **File:** `src/store/gameStore.ts`
- **Pattern:** Zustand store with actions
- **Key actions:** `completeTask()`, `setCurrentTask()`, `getStarterCode()`

---

## Style Guidelines

### Code Style
- TypeScript strict mode (no implicit any)
- Functional components with hooks
- Zustand for state (no Redux)
- Tailwind for styling (no CSS modules)
- ESLint rules enforced

### Naming Conventions
- Components: PascalCase (`TaskView.tsx`)
- Files: kebab-case for content (`bettys-bakery.yaml`)
- Types: PascalCase interfaces (`PlayerState`, `Job`, `Task`)
- Functions: camelCase (`executeCode`, `completeTask`)

### Comments
- Explain "why" not "what"
- Document complex algorithms
- Add JSDoc for public functions
- Keep concise - code should be self-documenting

---

## Testing & Validation

### Manual Testing Checklist
- [ ] Code executes in <100ms
- [ ] Monaco editor loads in <2s
- [ ] Tests validate correctly (pass/fail)
- [ ] UI updates on task completion
- [ ] Dialogue displays correctly
- [ ] No console errors

### Performance Targets (from GDD)
- 60fps UI interactions
- <100ms code execution feedback
- <3s initial page load
- Monaco ready within 2s

---

## Questions? Read These First

**"What's the game about?"** → Read `_bmad-output/gdd.md` Executive Summary
**"How does code execution work?"** → Read `src/lib/codeRunner.ts`
**"How are jobs structured?"** → Read `src/types/game.ts` and example job files
**"What's the current architecture?"** → Read this file's "Project Architecture" section
**"What should I not break?"** → Read "Core Game Pillars" section above

---

## External References

- **GDD v4 (Original):** User provided comprehensive design doc in conversation history
- **BMAD Framework:** `_bmad/` directory - game development methodology
- **Monaco Editor Docs:** https://microsoft.github.io/monaco-editor/
- **Next.js 16 Docs:** https://nextjs.org/docs

---

## Your Responsibilities as an AI Agent

### After Completing Work

**⚠️ CRITICAL:** Update `PROGRESS.md` after each work session:
1. Add completed tasks to the "Recently Completed" section
2. Update "Currently Working On" if focus shifted
3. Add commit references if you made commits
4. Note any blockers or next steps

**Example:**
```markdown
## Recently Completed
- [2026-01-03] Created CLAUDE.md and PROGRESS.md for better session continuity
- [2026-01-03] Updated README with GDD-based project description
```

### Before Starting Work

1. **Read `PROGRESS.md`** - Understand current state
2. **Run `git log --oneline -10`** - See recent commits
3. **Read relevant sections** of this file for patterns/architecture
4. **Check GDD** if making design decisions

---

## Contact & Collaboration

**Project Owner:** Sole
**Development Mode:** Side project alongside full-time job
**Methodology:** BMAD (Brownfield, Game Dev track)

---

**Remember:** This is a narrative-driven educational game. Every feature should either enhance the story, improve the learning experience, or make coding feel more satisfying. When in doubt, prioritize player experience over technical complexity.
