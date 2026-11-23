/*
 * THE BOOK OF BECOMING — Input hook
 * V0.1 scaffold for onInput.
 * The official API page is contradictory: generic return docs warn that
 * onInput stop throws, while its Command Parser example uses { stop: true }.
 * Do not rely on stop until BOB-005 verifies it in Script Test and live play.
 */
const modifier = (text) => {
  // V0.1 implementation will initialize state and parse supported commands.
  return { text };
};

// Required final expression for non-Library script sections.
modifier(text)
