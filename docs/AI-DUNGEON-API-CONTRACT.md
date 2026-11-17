# AI Dungeon Scripting API Contract (V0.1)

Reference: https://help.aidungeon.com/scripting  
Checked: 2026-11-17

This document records platform behaviour that the implementation may rely on. Re-check the official reference before changing hook behaviour.

## Editor sections and hooks

- Library: shared functions and values.
- Input: `onInput` hook.
- Context: `onModelContext` hook.
- Output: `onOutput` hook.
- The final line of each non-Library editor section must be `modifier(text)`.

## Persistent state

- Hooks receive a `state` object.
- Script-owned data can be stored under a namespaced object such as `state.rpg`.
- The platform documents `state` as persistent information available across turns.
- The platform also reserves `state.memory`, `state.message`, and other top-level fields. Do not overwrite the root `state` object or platform-owned fields.
- `state.memory` includes `context`, `authorsNote`, and `frontMemory`.
- Memory updates made in `onOutput` do not affect the prompt until the next player action.
- An empty `context` or `authorsNote` does not clear UI values; the UI value may still be used.

## Useful parameters

- `text`: hook-specific input/output text.
- `history`: recent adventure actions.
- `storyCards`: currently available Story Cards.
- `info.actionCount`: action count.
- In `onModelContext`, `info.maxChars` is an estimated context character limit and `info.memoryLength` reports memory characters included.

## Runtime limits

The current reference documents a 16 MB memory limit and a two-second execution timeout for hooks. Keep hook work short and bounded.

## Return semantics — critical

- Returning `{ text: '...' }` replaces the hook's text.
- `state.message` is documented as a string shown to the user; verify exactly how it displays in the current editor/adventure.
- The official reference is internally inconsistent: the generic Return section says returning `stop` from `onInput` throws `Unable to run scenario scripts`, while the built-in Command Parser example returns `{ stop: true }` to suppress generation.
- Treat this as **unverified platform behaviour**. Do not make command handling depend on it until it has been tested in Script Test and a disposable live adventure. Record the observed result and date in the Test Log.
- Returning empty text also causes errors in Input and Output.

## Test and inspection surfaces

- Script Test can run a hook with supplied input and shows returned text, stop value, logs, state and Story Cards.
- Inspect can show recent model context and game state for eligible test adventures; inspect data expires after 15 minutes.
- Console logs are available for a limited time. Capture evidence in the Test Log rather than relying on transient logs.

## Behaviours not assumed

- This API contract does not claim that undo/retry rewinds arbitrary script state exactly as expected. Test and document it in a disposable adventure.
- Git does not manage AI Dungeon's runtime adventure state. Code rollback and game-state rollback are separate recovery procedures.

## Source

https://help.aidungeon.com/scripting
