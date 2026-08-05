# Task

Use `$research-cfb-slate` to refresh this synthetic Week 4 slate in chat. Network access and filesystem writes are unavailable. Return the canonical game state, current research queue decision, and the frozen matchup assignment you would use if a refresh trigger fires.

```yaml
synthetic: true
season: 2026
week: 4
season_type: regular
data_cutoff: 2026-09-22T16:00:00Z
requested_modes: [lines]
inherited_cfbd:
  - source_id: cfbd-games-w04
    exact_command: fbs games --year 2026 --week 4 --season-type regular --classification fbs
    query: {year: 2026, week: 4, seasonType: regular, classification: fbs}
    retrieved_at: 2026-09-22T15:55:00Z
    rows:
      - id: "synthetic-401"
        away_team: Lake University
        home_team: Hill State
        completed: false
        status: not_completed
        start_date: 2026-09-26T19:30:00-04:00
  - source_id: cfbd-scoreboard-w04
    exact_command: fbs scoreboard --classification fbs
    retrieved_at: 2026-09-22T15:56:00Z
    rows:
      - id: "synthetic-401"
        status: scheduled
        tv: Synthetic Network
        weather: {description: clear, temperature: 72}
        betting: {spread: -4.5, over_under: 51.5}
  - source_id: cfbd-advanced-2025
    exact_command: fbs stats season advanced --year 2025 --classification fbs --exclude-garbage-time
    query: {year: 2025, classification: fbs, excludeGarbageTime: true}
    retrieved_at: 2026-08-01T12:00:00Z
    applicable_as_of: 2025-12-31T23:59:59Z
    rows:
      - {team: Lake University, offense_ppa: 0.18, defense_success_rate: 0.42}
      - {team: Hill State, offense_ppa: 0.24, defense_success_rate: 0.39}
prior_matchup_result:
  analysis_id: synthetic-401-matchup-r3
  source_revision: r3
  data_cutoff: 2026-09-22T16:00:00Z
  research_status: complete
  next_refresh: 2026-09-25T23:30:00Z
  validation:
    validation_id: synthetic-401-matchup-r3-validation-v1
    source_analysis_id: synthetic-401-matchup-r3
    source_revision: r3
    status: warn
    validated_at: 2026-09-22T15:59:00Z
```
