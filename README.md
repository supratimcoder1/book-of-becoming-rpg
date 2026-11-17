# The Book of Becoming — AI Dungeon RPG Engine

A custom AI Dungeon scenario built around a reality-manifesting magical book. The AI narrates and interprets player intent; the script owns persistent, validated game state and eventually resolves mechanical events.

## Current development status

- Current milestone: **V0.1 — Core Foundation**
- Source status: scaffold only; gameplay logic has not been implemented.
- Canonical source: this Git repository.
- Deployment target: the four sections in the AI Dungeon Scripting Editor.

## Source-to-editor map

| Repository file | AI Dungeon editor section |
|---|---|
| `src/Library.js` | Library |
| `src/Input.js` | Input (`onInput`) |
| `src/Context.js` | Context (`onModelContext`) |
| `src/Output.js` | Output (`onOutput`) |

Keep these as four separate editor sections. Do not assume that code imported by one hook is automatically available in another; the Library section is the platform's shared helper area.

## V0.1 scope

V0.1 establishes version control, state initialization, schema versioning, defensive helpers, the command parser, diagnostics and tests. It does **not** implement the book inscription interpreter, structured event bridge, combat, full player progression or world simulation.

## Working rules

1. Every code change maps to a Task ID in the workbook.
2. Use a short-lived task branch and small commits.
3. Record each meaningful commit in the workbook's Change Log.
4. Test before merging into `work/v0.1-foundation`; only tested milestone work is promoted to `main`.
5. Tag only verified releases. A tag must point to the exact source deployed to AI Dungeon.
6. Before deployment, archive all four editor sections and test in a disposable adventure.
7. Git rollback restores source files. It does not rewind persistent state already stored in an AI Dungeon adventure.

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
