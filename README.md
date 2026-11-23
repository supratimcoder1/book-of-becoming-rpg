# The Book of Becoming — AI Dungeon RPG Engine

A custom AI Dungeon Scenario built around a reality-manifesting magical book. The AI narrates and interprets player intent; the script owns persistent, validated game state and eventually resolves mechanical events.

## Current development status

- Current milestone: **V0.1 — Core Foundation**
- Source status: scaffold and design contracts; gameplay logic has not been implemented.
- Canonical source: this Git repository.
- Deployment target: one custom AI Dungeon Scenario, using the four scripting editor sections plus manually installed prompt components.
- Model constraint: design for the Free-tier short-context experience (approximately 4k tokens) and an unreliable narrator that needs explicit, repeated, compact instructions.

## Source-to-editor map

| Repository file | AI Dungeon editor location |
|---|---|
| `src/Library.js` | Library |
| `src/Input.js` | Input (`onInput`) |
| `src/Context.js` | Context (`onModelContext`) |
| `src/Output.js` | Output (`onOutput`) |
| `prompts/AI-INSTRUCTIONS.md` | Plot → AI Instructions (non-empty Custom / Scenario Default) |
| `prompts/PLOT-ESSENTIALS.md` | Plot → Plot Essentials |
| `prompts/AUTHORS-NOTE.md` | Plot → Author's Note |
| `prompts/STORY-CARD-TEMPLATES.md` | Reference for manually created or later script-managed Story Cards |

Keep the four script sections separate. Do not assume runtime imports between hooks. The Library section is the shared helper area.

## V0.1 scope

V0.1 includes prompt contracts and scenario configuration alongside the state schema, validation helpers, command parser, diagnostics, and tests. It does **not** implement the Book inscription interpreter, structured event bridge, combat, full player progression, or world simulation.

## Working rules

1. Every code or prompt change maps to a Task ID in the workbook.
2. Use a short-lived task branch and small commits.
3. Record each meaningful commit in the workbook's Change Log.
4. Test before merging into `work/v0.1-foundation`; only tested milestone work is promoted to `main`.
5. Tag only verified releases. A tag must point to the exact source and prompt text deployed to AI Dungeon.
6. Before deployment, archive all four editor sections and all three static prompt components; test in a disposable adventure.
7. Git rollback restores source/prompt files. It does not rewind persistent state already stored in an AI Dungeon adventure or automatically restore editor fields.
8. Do not commit credentials, API keys, private tokens, or personal data.

## Scenario baseline

See `docs/SCENARIO-CONFIG.md` and `docs/CONTEXT-AND-MEMORY.md`. Baseline: Auto Summarization OFF, Memory Bank OFF, Story Summary absent/unused, maximum available context, concise prompt components, and selective Story Cards. Do not add a blank custom AI Instructions component; use a non-empty version-controlled instruction set.

## Suggested commands

```bash
git status --short
git switch work/v0.1-foundation
git switch -c feat/BOB-006-state-init
# edit and test
git add src/ tests/
git commit -m "feat(state): initialize RPG root [BOB-006]"
git log --oneline --decorate --graph -20
```

See `docs/GIT-ROLLBACK.md` before restoring anything and `docs/AI-DUNGEON-API-CONTRACT.md` before implementing a hook.
