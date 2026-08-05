# Task

Use `$deep-dive-cfb-matchup` to plan and return a synthetic Week 6 matchup dossier in chat, then route the requested spread work. Network access and filesystem writes are unavailable. The simulated research cutoff is immediately before Week 6; use only information legal at that cutoff.

```yaml
synthetic: true
analysis_id: synthetic-river-at-mesa-w06
game:
  id: "synthetic-606"
  season: 2025
  week: 6
  away: River Tech
  home: Mesa State
  kickoff: 2025-10-11T20:00:00-06:00
data_cutoff: 2025-10-05T23:59:59-06:00
requested_modes: [lines]
inherited_observations:
  - source_id: cfbd-advanced-through-w05
    command: fbs stats season advanced --year 2025 --start-week 1 --end-week 5 --exclude-garbage-time
    upstream_family: CFBD
    retrieved_at: 2025-10-06T00:05:00-06:00
    rows:
      - {team: River Tech, offense_ppa: 0.17, offense_success_rate: 0.43, defense_havoc: 0.16}
      - {team: Mesa State, offense_ppa: 0.21, offense_success_rate: 0.46, defense_havoc: 0.19}
  - source_id: cfbd-returning-2025
    command: fbs player returning --year 2025
    upstream_family: CFBD
    retrieved_at: 2025-08-20T12:00:00Z
    rows:
      - {team: River Tech, percent_ppa: 0.61, usage: 0.58, passing_usage: 0.75}
      - {team: Mesa State, percent_ppa: 0.54, usage: 0.63, passing_usage: 0.22}
  - source_id: cfbd-roster-river
    command: fbs roster --year 2025 --team "River Tech"
    upstream_family: CFBD
    rows:
      - {id: "player-9", name: Casey North, position: QB, team: River Tech}
  - source_id: cfbd-player-overview
    command: fbs player season overview --year 2025 --player-id player-9
    upstream_family: CFBD
    retrieved_at: 2025-10-05T23:50:00-06:00
    applicable_as_of: 2025-10-05T23:50:00-06:00
    snapshot_scope: archived_pre_cutoff
    included_cfbd_game_ids: [synthetic-501, synthetic-502, synthetic-503, synthetic-504, synthetic-505]
    rows:
      - {id: "player-9", games: 5, passing_yards: 1180, usage: {overall: 0.72}, ppa: {average_all: 0.23}}
  - source_id: cfbd-full-season-ppa
    command: fbs ppa teams --year 2025
    upstream_family: CFBD
    retrieved_at: 2026-01-10T12:00:00Z
    limitation: full 2025 season, including Weeks 6 through postseason
  - source_id: cfbd-full-season-wepa
    command: fbs wepa team season --year 2025
    upstream_family: CFBD
    retrieved_at: 2026-01-10T12:00:00Z
    limitation: full 2025 season, including games after the simulated cutoff
  - source_id: cfbd-scoreboard
    command: fbs scoreboard
    upstream_family: CFBD
    rows:
      - id: "synthetic-606"
        status: scheduled
        tv: Synthetic Sports
        betting: {spread: -3.5, over_under: 48.5}
prior_meeting:
  game_id: "synthetic-505"
  team_stats_available: true
  player_stats_available: true
  decisive_question: Did Mesa State's departed quarterback account for most of its rushing advantage?
```
