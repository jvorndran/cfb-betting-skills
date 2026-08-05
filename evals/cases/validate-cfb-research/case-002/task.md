# Task

Use `$validate-cfb-research` to audit the synthetic decision-support artifact and captured FBS evidence below. Present the audit as a concise report in chat. Network access and side effects are unavailable; do not rerun commands or write files. Use `2026-08-20T16:00:00Z` as the simulated validation time.

```yaml
artifact:
  source_analysis_id: synthetic-fbs-matchup-r2
  source_revision: sha256:synthetic-r2
  kind: matchup
  season: 2026
  week: 1
  decision_cutoff: "2026-08-20T12:00:00Z"
  conclusions:
    - conclusion_id: defense-edge
      text: "North Valley's defense has two independent efficiency confirmations."
      evidence_refs: [advanced-2025, wepa-2025]
    - conclusion_id: backup-unused
      text: "Quarterback Alex Example had zero usage and can be excluded."
      player_id: cfbd:player:7002
      evidence_refs: [usage-empty]
    - conclusion_id: weather-clear
      text: "The game has confirmed calm weather."
      evidence_refs: [weather-tier]
    - conclusion_id: complete-play-sample
      text: "The captured play-stat rows are a complete Week 1 sample available at the cutoff."
      evidence_refs: [play-stats-cap]
  joins:
    - join_id: alex-usage
      method: composite
      fields: [player_name]
      left: {player_name: "Alex Example", player_id: cfbd:player:7002, team: North Valley}
      right: {player_name: "Alex Example", player_id: cfbd:player:7001, team: South Ridge}

fbs_evidence:
  - fixture_id: advanced-2025
    tool: fbs
    tool_version: "1.0.0"
    invocation_mode: captured
    upstream_family: CFBD
    exact_command: 'fbs stats season advanced --year 2025 --team "North Valley" --exclude-garbage-time'
    retrieved_at: "2026-08-20T12:05:00Z"
    applicable_as_of: "2025-12-31T23:59:59Z"
    data_cutoff: "2026-08-20T12:00:00Z"
    exit_code: 0
    parsed_stdout:
      command: stats season advanced
      endpoint: /stats/season/advanced
      query: {year: 2025, team: North Valley, exclude_garbage_time: true}
      count: 1
      result_key: advanced_season_stats
      result:
        collection_length: 1
        sample_only: false
        records:
          - season: 2025
            team: North Valley
            offense: {success_rate: 0}
            defense: {havoc: 0.18, standard_downs_explosive: false}
    parsed_stderr: null
    provider_ids: []
    metric_families: [advanced_efficiency]

  - fixture_id: wepa-2025
    tool: fbs
    tool_version: "1.0.0"
    invocation_mode: captured
    upstream_family: CFBD
    exact_command: 'fbs wepa team season --year 2025 --team "North Valley"'
    retrieved_at: "2026-08-20T12:06:00Z"
    applicable_as_of: "2025-12-31T23:59:59Z"
    data_cutoff: "2026-08-20T12:00:00Z"
    exit_code: 0
    parsed_stdout:
      command: wepa team season
      endpoint: /wepa/team/season
      query: {year: 2025, team: North Valley}
      count: 1
      result_key: team_metrics
      result:
        collection_length: 1
        sample_only: false
        records: [{year: 2025, team: North Valley, defense: 0.11}]
    parsed_stderr: null
    provider_ids: []
    metric_families: [wepa]

  - fixture_id: usage-empty
    tool: fbs
    tool_version: "1.0.0"
    invocation_mode: captured
    upstream_family: CFBD
    exact_command: 'fbs player usage --year 2026 --player-id 7001'
    retrieved_at: "2026-08-20T12:07:00Z"
    applicable_as_of: "2026-08-20T12:00:00Z"
    data_cutoff: "2026-08-20T12:00:00Z"
    exit_code: 0
    parsed_stdout:
      command: player usage
      endpoint: /player/usage
      query: {year: 2026, player_id: 7001}
      count: 0
      result_key: player_usage
      result: {collection_length: 0, sample_only: false, records: []}
    parsed_stderr: null
    provider_ids:
      - {namespace: "cfbd:player", native_id: "7001", namespaced_id: "cfbd:player:7001"}
    metric_families: [player_usage]

  - fixture_id: weather-tier
    tool: fbs
    tool_version: "1.0.0"
    invocation_mode: captured
    upstream_family: CFBD
    exact_command: 'fbs games weather --game-id 900000001'
    retrieved_at: "2026-08-20T12:08:00Z"
    applicable_as_of: "2026-08-20T12:08:00Z"
    data_cutoff: "2026-08-20T12:00:00Z"
    exit_code: 1
    parsed_stderr:
      error:
        code: cfbd_forbidden
        status: 403
        message: "Subscription tier does not authorize this endpoint."
        command: games weather
        query: {game_id: 900000001}
        hint: "This endpoint requires a higher CFBD subscription tier."
    provider_ids:
      - {namespace: "cfbd:game", native_id: "900000001", namespaced_id: "cfbd:game:900000001"}
    metric_families: []

  - fixture_id: play-stats-cap
    tool: fbs
    tool_version: "1.0.0"
    invocation_mode: captured
    upstream_family: CFBD
    exact_command: 'fbs plays stats --year 2026 --week 1 --team "North Valley"'
    retrieved_at: "2026-09-05T12:00:00Z"
    applicable_as_of: "2026-09-05T12:00:00Z"
    data_cutoff: "2026-08-20T12:00:00Z"
    exit_code: 0
    parsed_stdout:
      command: plays stats
      endpoint: /plays/stats
      query: {year: 2026, week: 1, team: North Valley}
      count: 2000
      result_key: play_stats
      result:
        collection_length: 2000
        sample_only: true
        records:
          - {game_id: 900000001, play_id: p1, athlete_id: 7002, value: 0, scoring: false}
    parsed_stderr: null
    provider_ids:
      - {namespace: "cfbd:game", native_id: "900000001", namespaced_id: "cfbd:game:900000001"}
      - {namespace: "cfbd:player", native_id: "7002", namespaced_id: "cfbd:player:7002"}
    metric_families: [play_derived]
    limitations: ["Provider response reached the documented 2,000-row boundary."]
```

Return the audit in chat with a new validation identity only if the supplied artifact actually requires a new audit.
