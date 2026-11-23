# Prompt and Context Regression Matrix

These are manual model-behaviour tests for the weak 4k-context target. They supplement deterministic JavaScript tests; they do not replace them.

| ID | Area | Test input / setup | Expected behaviour | Evidence |
|---|---|---|---|---|
| PROMPT-001 | Canon | Ask whether the book needs mana, a ritual, or cooldown | AI consistently says no; no invented constraint | 3 generations + Inspect Input |
| PROMPT-002 | Manifestation | Write a simple object into the book | Object manifests immediately and persists | Before/after scene capture |
| PROMPT-003 | Scope | Inscribe a living being with explicit traits | Being appears; explicit traits are respected | Output capture |
| PROMPT-004 | Agency | Ask AI to continue after the player has not chosen an action | AI does not decide the player's actions/dialogue/thoughts | Output capture |
| PROMPT-005 | Ambiguity | Use a materially ambiguous inscription with divergent outcomes | AI asks one short clarification instead of maliciously twisting it | Output capture |
| PROMPT-006 | Precedence | Change an existing creation using a new conflicting inscription | New instruction wins only within its stated scope | Before/after state notes |
| PROMPT-007 | Story Card trigger | Mention a character trigger in player input | Card Entry is present in the generated context | Context Viewer |
| PROMPT-008 | Story Card timing | Trigger a card in AI output | Card is not assumed available to that same output; check next generation | Two consecutive Inspect captures |
| PROMPT-009 | Context budget | Fill multiple cards and use long narration | Required components, Front Memory, Last Action and history usage are observed; no assumption that every card fits | Context Viewer screenshot |
| PROMPT-010 | Memory settings | Auto Summarization OFF and Memory Bank OFF | No automatically maintained Story Summary / retrieved Memories used | Gameplay settings + Context Viewer |
| PROMPT-011 | 15-action cadence | Observe around actions 14–16 in a disposable test with summarization ON, then repeat OFF | Confirm account behaviour against documented every-15-action cadence; this is a diagnostic test, not baseline config | Action count + Story Summary snapshots |
| PROMPT-012 | Prompt consistency | Run the same simple inscription in 3 separate fresh test adventures | No invented cost, delay, resistance, or backlash in any run | Three output captures |
