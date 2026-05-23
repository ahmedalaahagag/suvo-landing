# Landing Rules

- Static marketing site for getsuvo.com.
- Keep copy changes narrow and factual.
- Do not edit legal, privacy, affiliate, or store-review-sensitive pages during active review windows unless requested.
- Preserve existing layout and asset patterns.
- Verify changed pages locally or with the smallest available static check.
- Coordinate pricing, affiliate, and acquisition claims with the marketing lane.

## Scope

- If this repo is checked out alongside `suvo-meta`, shared meta docs live in `../suvo-meta/docs/agent/`.
- Keep public claims consistent with app behavior.
- For privacy or affiliate wording, check the relevant product or marketing ticket first.

## Implementation Model Policy

Use a cheaper coding session for normal implementation.

Preferred:

- Claude Code: Sonnet-class coding model
- Codex: coding-focused model with low/medium reasoning

Do not use Opus-class or strongest-reasoning models for:

- normal coding
- tests
- migrations
- simple refactors
- mechanical edits
- narrow bug fixes

Escalate back to strongest reasoning only if:

- the implementation plan is ambiguous
- tests reveal an architectural flaw
- the task unexpectedly crosses repo boundaries
- security or data-loss risk appears
- the user explicitly requests it

## Commands

Session start:

```bash
git status
git branch --show-current
```

```bash
npm test
npm run build
```

## Pull Requests

- Before creating a PR, MUST run and pass local green tests and lint.
- If this repo has no lint command, say so explicitly before creating the PR.
