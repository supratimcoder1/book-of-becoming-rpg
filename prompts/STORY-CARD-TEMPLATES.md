# Story Card Templates — The Book of Becoming

Story Cards are conditional reference notes, not the authoritative RPG database. Their **Entry** text is what the model sees when a trigger activates. The card's Name and Type are not shown to the model. A trigger found in AI output is not available to that same generation; it can affect the next generation.

Keep entries concise, specific, and focused on durable facts. Do not store volatile HP, XP, affection, inventory quantities, cooldowns, or other mutable numbers here. Those belong in `state.rpg` and the compact live state snapshot.

## Character card entry

- Identity: [name, species, role]
- Stable appearance: [distinctive features]
- Personality: [few explicit traits]
- Background: [short, durable history]
- Motivations: [goals and priorities]
- Knowledge: [what this character knows / does not know]
- Relationships: [durable relationship facts; no invented numerical affection]
- Abilities: [stable abilities and clear descriptions]
- Continuity constraints: [important facts the narrator must not contradict]

Suggested triggers: full name, commonly used first name, surname, title, and distinctive nickname. Avoid generic triggers that cause unrelated activations.

## Location card entry

- Identity and type: [place]
- Appearance and atmosphere: [concise sensory details]
- Important features: [durable locations or landmarks]
- Known history: [established facts]
- Relevant rules: [local facts that remain true]

Suggested triggers: exact location name and common short form.

## Object / creation card entry

- Identity and type: [object or creation]
- Appearance: [distinctive description]
- Properties: [durable, non-numerical properties]
- Origin: [how it came to exist]
- Known limitations: [only if explicitly established by the player]

Suggested triggers: exact name and common aliases.

## Reality concept / rule card entry

- Rule or concept: [explicitly established rule]
- Scope: [where / when it applies]
- Consequences: [stable implications]
- Exceptions: [only explicit exceptions]

Do not infer restrictions or exceptions that the player did not establish.
