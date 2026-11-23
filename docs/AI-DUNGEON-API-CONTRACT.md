# AI Dungeon Scripting API Contract (V0.1)

Reference: https://help.aidungeon.com/scripting  
Context reference: https://help.aidungeon.com/faq/what-goes-into-the-context-sent-to-the-ai  
Memory reference: https://help.aidungeon.com/faq/the-memory-system  
Story Cards: https://help.aidungeon.com/faq/story-cards  
Checked: 2026-11-23

This document records platform behaviour that V0.1 may rely on. Re-check official documentation and the live editor before changing hook behaviour.

## Hooks and editor sections

- Library: shared helper source area.
- Input: `onInput` hook; can inspect/modify player input before context construction.
- Context: `onModelContext` hook; can modify the assembled model context before generation.
- Output: `onOutput` hook; can inspect/modify model output before it is returned to the player.
- Hooks run in isolated sandboxes with a 16 MB memory limit and a two-second execution timeout.
- The `modifier(text)` call must remain the final line in each non-Library section.

## Persistent state and memory

- `state` is documented as persistent across turns. Store all RPG-owned data under `state.rpg`; do not overwrite the root `state` or platform-owned keys.
- `state.memory.context` is added near the beginning of context and corresponds to the UI Memory / Plot Essentials area.
- `state.memory.authorsNote` is inserted near the end. Setting either `context` or `authorsNote` overrides the corresponding UI value for model context but does not update the UI. Empty values fall back to UI settings; they cannot be used to clear UI content.
- `state.memory.frontMemory` is appended after the latest player input. Front Memory is a Required context element and is always included in full, so keep it very small.
- Memory changes made in `onOutput` do not affect prompt construction until the next player action.
- V0.1 must not set `state.memory.context` or `state.memory.authorsNote`; canonical static prompt files are manually deployed to the Scenario editor. Script-managed dynamic status may use Front Memory after its timing is verified.

## Parameters and utility functions

- `text`: hook-specific input, assembled context, or output text.
- `history`: recent actions with `text` and `type` (e.g. `start`, `continue`, `do`, `say`, `story`, `see`).
- `storyCards`: available cards with `id`, `keys`, `entry`, and `type`.
- `state`: persistent scenario state.
- `info.actionCount`: total action count.
- In `onModelContext`, `info.maxChars` is the estimated maximum context character count and `info.memoryLength` is the number of characters included from Memory. These are character-level values, not exact token counts.
- `addStoryCard(keys, entry, type)`, `updateStoryCard(index, keys, entry, type)`, and `removeStoryCard(index)` are documented. `addStoryCard` returns false if a card with the same keys already exists.

## AI Dungeon context assembly

- Required elements: Instructions, Plot Essentials, Story Summary, Author's Note, script Front Memory, and Last Action.
- If required components exceed 70% of context, Front Memory and Last Action are kept in full. Remaining required-component priority: Author's Note, Plot Essentials, AI Instructions, then Story Summary. Lower-priority elements may be trimmed or excluded.
- Dynamic context is approximately split between matching Story Cards (~25%), Story History (~50%; up to ~75% when Memory Bank is disabled), and Memory Bank (~25%). These are approximate allocations, not guarantees.
- Story Cards are trigger-based. Triggers can occur in player input or AI output. If a trigger occurs in AI output, the card is not available to that same generation; it can be present next generation. Only Entry text is sent to the model (prefaced as World Lore); card Name and Type are not visible to the model. A card can remain active for a variable number of turns.
- Matching considers a minimum of four recent actions; a larger Story Card budget may cause a wider lookback. Do not assume every matching card fits.

## Memory System behaviour

- Official documentation separates two mechanisms: Memories are generated from batches of six prior actions (first generated after 12 actions, then every six actions); Auto Summarization updates the running Story Summary every 15 actions.
- V0.1 baseline configuration disables both Auto Summarization and Memory Bank. Story Summary should remain absent/unused in the baseline.
- Do not treat the user's observed 15-action behaviour as a guarantee of the internal summarization window. The documented behaviour is a 15-action update cadence; verify the live account through Context Viewer if needed.

## AI Instructions configuration warning

- If no AI Instructions component is added, AI Dungeon uses the model's default instructions.
- A blank custom AI Instructions component behaves differently from no component and may produce poor results. V0.1 must install a non-empty, version-controlled Custom / Scenario Default prompt.
- AI Instructions are system-level guidance near the beginning. Author's Note is placed near the end and has a stronger immediate influence; official guidance recommends keeping it to roughly 3–4 concise sentences.

## Return semantics and unresolved discrepancy

- `{ text: '...' }` replaces the hook's text. Empty text from `onInput` or `onOutput` raises an error; empty text from `onModelContext` causes context to be built as if the script did not run.
- The generic API section says `stop: true` in `onInput` throws an error. However, the same official page's Command Parser example (lines around 659–684) returns `{ text, stop }` and comments that `{ stop: true }` stops processing before the AI is called.
- Treat this as a documentation contradiction, not a settled contract. BOB-005 must test the exact behaviour in Script Test and a disposable live adventure before the command parser relies on it.
- `state.message` is documented as a string shown to the user; its exact UX must be verified in the current editor/adventure.

## Testing and observability

- Script Test can exercise hooks with supplied text and show return values, logs, state, and Story Cards.
- Inspect can show recent model context and game state for eligible creator-owned test adventures; Inspect and console logs are temporary (15-minute expiry is documented).
- Script errors are skipped for that turn and shown in the Scripts tab.
- Test normal-turn persistence, adventure isolation, undo, retry, and state replay empirically. Do not assume Git history rewinds AI Dungeon's adventure state.

## Sources

- https://help.aidungeon.com/scripting
- https://help.aidungeon.com/faq/what-goes-into-the-context-sent-to-the-ai
- https://help.aidungeon.com/faq/the-memory-system
- https://help.aidungeon.com/faq/story-cards
- https://help.aidungeon.com/faq/ai-instructions
- https://help.aidungeon.com/faq/what-is-the-authors-note
