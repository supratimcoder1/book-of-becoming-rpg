# Context and Memory Policy — V0.1

## Working constraints

The target Free-tier experience is approximately 4,000 tokens, but the actual cap can depend on the selected model and account settings. Verify the live value in the Context Viewer. The scenario's short-context model is treated as unreliable: important invariants must be explicit, compact, repeated strategically, and mechanically enforced when implemented.

## AI Dungeon documented context behaviour

- Required context includes Instructions, Plot Essentials, Story Summary, Author's Note, script Front Memory, and the Last Action.
- If required components exceed 70% of the context, Front Memory and Last Action are kept in full. Remaining required-component priority is Author's Note, Plot Essentials, AI Instructions, then Story Summary; lower-priority content can be trimmed or excluded.
- Dynamic context is approximately allocated as 25% matching Story Cards, 50% Story History, and 25% Memory Bank. With Memory Bank disabled, Story History can receive up to 75% of remaining dynamic context.
- Story Cards are selected by trigger usage/relevance and may not all fit. Trigger matching examines at least four recent actions, potentially more when the available Story Card budget is larger.
- Story Card triggers in AI output are not available to the same generation; they can activate the card for the next output. Only Entry text is passed to the model, prefaced as World Lore; Name and Type are not model-visible.
- `state.memory.frontMemory` is appended after the most recent player input and is always included in full. It must therefore remain compact.

## Project policy

1. AI Instructions: concise operational rules, explicit priorities, player agency, and prohibitions against inventing mechanics.
2. Plot Essentials: stable canon for the Book of Becoming and starting world.
3. Author's Note: 3–4 sentences of high-priority immediate guidance; do not turn it into a second rulebook.
4. Story Cards: conditional durable reference sheets for named NPCs, places, objects, and reality concepts. Never rely on them as the sole source for volatile numbers or essential universal rules.
5. Front Memory: compact dynamic snapshot of only current player state, currently relevant NPCs, location, active effects, and immediate objective. Prefer a target of 100–250 tokens initially; tune using Context Viewer. Never dump the full database or full book ledger.
6. Story History: preserve as much as possible. Do not spend the whole context on duplicated rules or bloated snapshots.
7. Auto Summarization and Memory Bank: both OFF in the initial configuration. Any later experiment requires a task, a duplicated adventure, and recorded evidence.

## Important distinction about the Memory System

The official AI Dungeon Memory System documentation describes underlying Memories as summaries of batches of six actions, with the first batch created after 12 actions and then a new Memory every six actions. Separately, Auto Summarization updates the running Story Summary every 15 actions. These are different mechanisms. This project disables both Auto Summarization and Memory Bank for its baseline.

## Script implementation notes

- The API exposes `info.maxChars` and `info.memoryLength` in `onModelContext`; these are character estimates, not a direct token counter.
- Setting `state.memory.context` or `state.memory.authorsNote` overrides the corresponding UI content for the prompt without updating the UI. Do not set these in V0.1; static prompt files are deployed manually from the canonical Git source.
- `state.memory.frontMemory` is reserved for the script's compact dynamic snapshot. A memory change made in `onOutput` does not affect the prompt until the next player action.
- Script hooks have a 2-second timeout and 16 MB memory limit. Keep formatting and selection bounded.
- Use the Context Viewer / Inspect Input to verify actual prompt assembly. Character counts are not exact token counts.
