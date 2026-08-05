# Task

Use `$fbs-cli` to return a concise, auditable retrieval plan for a synthetic historical matchup. Network access and filesystem writes are unavailable, so plan the calls without executing them.

The target is Alpha State at Beta Tech in Week 6 of 2025. The research cutoff is immediately before kickoff. The user has already established these CFBD game IDs:

```yaml
eligible_completed_games:
  Alpha State: [510000, 510002]
  Beta Tech: [510001, 510005]
excluded_games:
  - id: 510004
    reason: completed after the target kickoff despite originally appearing in Week 4
prior_meeting_id: 500006
```

The requested evidence is a basic team-stat comparison over the eligible games and an answer to one prior-meeting question: did Beta Tech's quarterback account for most of its rushing advantage?

Return the exact `fbs` commands in order, the fields and provenance you would retain, and a clear stop condition. Also interpret these two hypothetical outcomes:

```yaml
successful_empty:
  exit: 0
  stdout:
    command: games teams
    endpoint: /games/teams
    query: {id: 510000}
    count: 0
    games: []
tier_failure:
  exit: 1
  stderr:
    error:
      code: cfbd_forbidden
      status: 403
      message: This endpoint is unavailable for the current tier.
```
