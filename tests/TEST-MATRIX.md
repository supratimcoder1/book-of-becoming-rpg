# V0.1 Test Matrix

Track execution status and evidence in the `Test Log` sheet of the project workbook.

| Test | Area | Expected behaviour |
|---|---|---|
| TEST-001 | Initialization | Missing state creates the V0.1 root and defaults. |
| TEST-002 | Idempotency | Repeated initialization preserves populated fields. |
| TEST-003 | Schema | Required root keys and types exist. |
| TEST-004 | Malformed state | A malformed child is repaired conservatively; unrelated keys survive. |
| TEST-005 | Version guard | Unsupported future schema is not destructively downgraded. |
| TEST-006 | Helpers | Boundary and malformed values yield deterministic safe results. |
| TEST-007 | Parser | Known, unknown and malformed commands parse safely. |
| TEST-008 | Status | Diagnostics are accurate and read-only. |
| TEST-009 | Persistence | State survives normal turns. |
| TEST-010 | Isolation | Separate adventures have separate state. |
| TEST-011 | Undo/retry | Actual platform behaviour is observed and documented. |
| TEST-012 | Release smoke test | Release candidate runs without script errors in a fresh test adventure. |
