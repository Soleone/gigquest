# Gig Quest

**"Code for Rent: Your Dev Origin Story"**

A story-driven educational game where you learn JavaScript by taking freelance programming gigs to make rent.

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![Platform](https://img.shields.io/badge/platform-web%20browser-blue)
![Tech](https://img.shields.io/badge/Next.js-16-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎮 What is Gig Quest?

**Gig Quest** combines Phoenix Wright-style visual novel storytelling with real JavaScript programming. Players write actual, executable code in a professional Monaco editor (the same engine that powers VS Code) to complete tasks for memorable clients like Betty the bakery owner and Mario the pizza shop owner.

### The Problem We're Solving

Traditional coding tutorials are boring. Game Dev Story lets you "pretend" to program. Codecademy is effective but lacks narrative motivation. **No game teaches programming through story with real, executable code in a professional editor.**

### What Makes It Different

- ✅ **Real JavaScript** - Not multiple choice, not abstraction - actual code that runs
- ✅ **Professional Tools** - Monaco editor with syntax highlighting, autocomplete, debugging
- ✅ **Story-Driven** - Every task has purpose - help Betty save her bakery, optimize Mario's pizza orders
- ✅ **Expert Teaching** - Built by someone who understands games, development, AND pedagogy
- ✅ **Universal Access** - Beginners to experts, any age, browser-based (no install friction)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (recommended)
- Modern browser (Chrome, Firefox, Safari, Edge - last 2 versions)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gigquest.git
cd gigquest

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start coding!

### First Steps

1. **Meet Betty** - Your first client runs a bakery and needs help tracking sales
2. **Write Real Code** - Use the Monaco editor to store variables, calculate totals
3. **Pass Tests** - Your code validates automatically - instant feedback
4. **Earn Money** - Complete tasks to make rent and unlock new clients
5. **Level Up** - Build expertise in JavaScript concepts through granular progression

---

## 🎯 Core Features

### 🖥️ Professional Code Editor
- Monaco editor (VSCode engine) with full syntax highlighting
- Real-time error detection and autocomplete
- Standard keyboard shortcuts (Ctrl+C/V/Z, etc.)
- <100ms code execution feedback

### 📖 Visual Novel Presentation
- Phoenix Wright-style character portraits and dialogue
- Personality-driven storytelling (Betty is warm, Mario is enthusiastic)
- Chip the AI teaching companion explains concepts through narrative context
- Memorable clients with real problems to solve

### 🎓 Real Learning Outcomes
- Write JavaScript that actually executes (no toy language)
- Scale from variables to complete applications
- Learn professional development patterns
- Build a portfolio of projects by the end

### 📊 Progression Systems
- **Money** - Earn cash to make rent, unlock new opportunities
- **Reputation** - Build credibility to access higher-tier clients
- **Expertise** - Granular skill tracking (const, let, loops, functions, etc.)

---

## 🏗️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict mode) |
| **UI** | React 19, Tailwind CSS 4 |
| **Code Editor** | Monaco Editor |
| **State Management** | Zustand |
| **Content** | YAML (narrative) + JSON (technical) |
| **Deployment** | Vercel (web browser) |

---

## 📁 Project Structure

```
gigquest/
├── src/
│   ├── app/              # Next.js pages and routing
│   ├── components/       # React components
│   │   ├── TaskView.tsx           # Main game screen
│   │   ├── CodeEditor.tsx         # Monaco integration
│   │   ├── TestRunner.tsx         # Code validation
│   │   └── CharacterDialogue.tsx  # Visual novel UI
│   ├── content/          # YAML files (story, dialogue, clients)
│   ├── data/             # JSON files (tests, skills, technical data)
│   ├── lib/              # Utilities (code execution, formatting)
│   ├── store/            # Zustand state management
│   └── types/            # TypeScript definitions
├── _bmad/                # Game development methodology
├── _bmad-output/         # Generated docs (GDD, architecture)
└── docs/                 # Additional documentation
```

---

## 🎨 Design Pillars

These five pillars guide all development decisions:

1. **Authentic Code Editor** - Monaco mimics professional workflows
2. **Real JavaScript** - Executable code teaches transferable skills
3. **Visual Novel Presentation** - Phoenix Wright-style character-driven storytelling
4. **Pro Developer Teaching** - Industry-standard practices, expert pedagogy
5. **Concise Gameplay** - Tight loops, clear goals, satisfying progress

---

## 🎯 Target Audience

**Age:** All ages (13+ for reading comprehension)
**Experience:** Complete beginners to expert developers seeking fresh perspective
**Motivation:**
- Want to become a programmer (career change, exploration)
- Tried tutorials but found them boring
- Curious what it feels like to code
- Want narrative motivation and context
- Experienced devs seeking "beginner's mind" and opinionated patterns

---

## 🚧 Development Status

### ✅ Completed (Phase 1)
- Core game loop (view job → write code → pass tests → next task)
- Monaco editor integration with syntax highlighting
- Code execution and validation system
- Visual novel dialogue system
- One complete job (Betty's Bakery - 4 tasks)
- YAML + JSON content separation architecture

### 🚧 In Progress
- Game Design Document (GDD) finalization
- Additional client jobs (Mario, Chen, Sarah)
- Character dialogue refinement
- Progression system implementation

### 📋 Planned (Future Phases)
- Money/reputation mechanics
- Expertise tracking and skill trees
- Hint system with progressive guidance
- Mobile/iPad optimization
- Additional chapters (advanced JavaScript, frameworks)

---

## 🤝 Contributing

This is currently a solo side project, but contributions are welcome! If you'd like to help:

1. **Read** `CLAUDE.md` for AI agent context and architecture
2. **Check** `_bmad-output/gdd.md` for game design reference
3. **Follow** existing code patterns (see `CLAUDE.md` style guidelines)
4. **Test** your changes locally before submitting PR

### Areas Where Help is Welcome
- Content creation (new jobs, characters, tasks)
- UI/UX improvements
- Performance optimization
- Bug fixes
- Documentation

---

## 📊 Performance Targets

- **60fps** UI interactions
- **<100ms** code execution feedback
- **<3s** initial page load
- **<2s** Monaco editor ready

---

## 📖 Documentation

- **CLAUDE.md** - Comprehensive AI agent context (start here for development)
- **_bmad-output/gdd.md** - Game Design Document (vision, goals, mechanics)
- **src/types/game.ts** - Core type definitions and data models

---

## 🎮 Live Demo

Coming soon at [gigquest.dev](https://gigquest.dev)

---

## 📜 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

Built with:
- **Monaco Editor** - Microsoft's VSCode editor engine
- **Next.js** - Vercel's React framework
- **BMAD** - Game development methodology
- **AgentVibes** - AI agent collaboration tools

---

## 📬 Contact

**Project Owner:** Sole
**Status:** Active side project
**Feedback:** Open an issue on GitHub

---

**Remember:** This isn't just a game about programming - it's about the journey of becoming a developer. Every line of code should make that journey feel meaningful, satisfying, and human.
