# AI Dungeon Scenario Configuration Baseline

This file is the deployment checklist for the one custom Book of Becoming Scenario. The source files in `prompts/` are canonical; the AI Dungeon editor is the deployed copy.

## Plot components

- AI Instructions: install `prompts/AI-INSTRUCTIONS.md` as non-empty Custom / Scenario Default instructions. Do not add an empty custom AI Instructions component: official documentation says a blank custom component behaves differently from no component, which falls back to model-default instructions.
- Plot Essentials: install `prompts/PLOT-ESSENTIALS.md`.
- Author's Note: install `prompts/AUTHORS-NOTE.md`. Keep it short; AI Dungeon recommends approximately 3–4 sentences.
- Story Summary: absent / Auto Summarization disabled for this project.
- Third Person: disabled unless multiplayer is later required.

## Memory settings

- Auto Summarization: OFF.
- Memory Bank: OFF for the baseline. Reconsider only through a recorded experiment.
- Context length: maximum available to the selected model/account; verify in the in-game Context Viewer rather than assuming the nominal limit is exactly 4,096 tokens.
- Story Cards: only add concise entries from `prompts/STORY-CARD-TEMPLATES.md` when stable facts merit a reference card.

## Validation before release

1. Confirm the correct AI Instructions, Plot Essentials and Author's Note are visible in the Context Viewer / Inspect Input.
2. Confirm Story Summary is not being automatically populated and Memory Bank is disabled.
3. Trigger one test Story Card by name and verify its Entry is included; test a trigger in AI output separately because it is not available until the next generation.
4. Record actual context usage and remaining story history from the Context Viewer.
5. Archive screenshots / observations in the Test Log and commit configuration changes with the relevant BOB task ID.

Do not assume that disabling Auto Summarization also disables Memory Bank; these are separate controls in the Memory System.
