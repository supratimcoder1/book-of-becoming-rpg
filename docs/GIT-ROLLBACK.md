# Git and Rollback Playbook

## Branch model

- `main`: last known-good baseline/release only.
- `work/v0.1-foundation`: V0.1 integration branch.
- `feat/BOB-###-short-name`, `fix/BOB-###-short-name`, `test/BOB-###-short-name`: short-lived task branches.

## Commit convention

Use Conventional Commit style and always include a Task ID, for example:

```text
feat(state): initialize RPG root [BOB-006]
fix(parser): reject empty command [BOB-012]
test(state): add idempotency cases [BOB-016]
```

One logical change per commit. Record commit SHA and test evidence in the workbook.

## Safe rollback

### Uncommitted change

```bash
git status --short
git diff
```

Save any work worth keeping before restoring a file. To restore one path from the current commit:

```bash
git restore --source=HEAD -- src/Input.js
```

### Committed change (preferred)

```bash
git revert <commit-sha>
```

This adds a new commit that reverses the change while preserving history. Re-run tests afterwards.

### Inspect a known-good release

```bash
git switch --detach <release-tag>
```

This is for inspection/testing. Create a new branch before making further edits.

### Restore one file from a release

```bash
git restore --source=<release-tag> -- src/Context.js
git diff -- src/Context.js
git add src/Context.js
git commit -m "revert(context): restore known-good context hook [BOB-###]"
```

Avoid `git reset --hard` as a normal rollback tool. It can discard local work and rewrite the checked-out branch state.

## Deployment rollback

1. Stop editing the AI Dungeon Scenario.
2. Identify the exact release tag and commit SHA.
3. Restore the four local source files to that release.
4. Test those files in a disposable adventure.
5. Copy the tested Library, Input, Context and Output sections into the Scenario editor.
6. Save, take a turn, inspect context/state and check for script errors.
7. Record the rollback as a Change Log entry.

## Important: source vs runtime state

Git restores source code only. It does not rewind `state.rpg` values already stored in an existing AI Dungeon adventure. Until a dedicated, tested state export/restore feature exists, duplicate the adventure before installing a new script build and use that duplicate for testing. Do not treat a code rollback as a game-save rollback.
