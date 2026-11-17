/*
 * THE BOOK OF BECOMING — Input hook
 * V0.1 scaffold for onInput.
 * Do not rely on { stop: true } here: AI Dungeon's current API reference
 * documents that returning stop from onInput throws a script error.
 */
const modifier = (text) => {
  // V0.1 implementation will initialize state and parse supported commands.
  return { text };
};

// Required final expression for non-Library script sections.
modifier(text)
