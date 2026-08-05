# Matchup dossier and handoff contract

## Contents

- [Base dossier](#base-dossier)
- [`matchup_context`](#matchup_context)
- [Evidence artifacts](#evidence-artifacts)
- [Routed result envelope](#routed-result-envelope)
- [Workspace artifacts](#workspace-artifacts)

## Base dossier

Use these sections in order:

1. Game identity and research cutoff
2. Executive matchup summary
3. Independent team snapshots and sample windows
4. Unit-versus-unit matchup interactions and failure modes
5. Personnel and availability
6. Environment and scheduling context
7. Plausible qualitative game scripts and confirmation triggers
8. Prior-meeting portability, when relevant
9. Counterevidence and alternative explanations
10. Unknowns, stale inputs, and refresh triggers
11. Sources and decision-relevant calculations
12. Downstream analysis and validation statuses

Use claim labels `fact`, `calculation`, `inference`, `assumption`, and `unknown`. Give each material claim a stable ID and one or more source IDs.

Keep the base dossier and its common claims and sources `price_blind_common`. A dashboard may later summarize a sibling market result, but do not merge its quote, market source, or betting conclusion into the frozen common evidence.

## `matchup_context`

Emit one JSON-compatible object with:

```json
{
  "schema_version": "1.0",
  "analysis_id": "string",
  "kind": "matchup",
  "game": {
    "game_id": "string",
    "season": 2026,
    "week": 1,
    "season_type": "regular",
    "kickoff": "ISO-8601 timestamp",
    "timezone": "America/New_York",
    "home_team": "string",
    "away_team": "string",
    "neutral_site": false,
    "venue": null
  },
  "as_of": "ISO-8601 timestamp",
  "data_cutoff": "ISO-8601 timestamp",
  "price_blind_freeze": {
    "frozen_at": "ISO-8601 timestamp",
    "excluded_inputs": ["market prices", "props", "DFS salaries"]
  },
  "team_profiles": {
    "away": {},
    "home": {}
  },
  "matchup_factors": [],
  "personnel": [],
  "environment": {},
  "game_scripts": [],
  "sample_notes": [],
  "claims": [],
  "source_ids": [],
  "unknowns": []
}
```

For each team profile retain the relevant continuity, staff, quarterback, line, skill-position, defensive-unit, special-teams, availability, and sample-window evidence. Missing fields remain explicit unknowns.

For each matchup factor include the factor name, relevant team or unit, observation, claim type, direction only when supported, sample window, source IDs, caveats, and confidence in the evidence quality. For each game script include its causal description, necessary conditions, failure mode, evidence confidence, and confirmation triggers. Do not embed a betting or DFS recommendation in the shared context.

## Evidence artifacts

- `claims.json`: stable claim IDs, labels, text, confidence, source IDs, and applicable sample windows.
- `sources.json`: stable source IDs, type, publisher or provider, title, locator or exact command, publication time, observation time, and applicable-as-of time.
- `freshness.json`: current status, decision sensitivity, refresh deadline, and next action for every time-sensitive input.
- `comparison-rows.json`: tidy rows used by continuity or other categorical comparison visuals.
- `trend-rows.json`: tidy time-series rows only when a real repeated-provider series exists; an empty array is valid.

Never duplicate a changing value without its source time. Do not store credentials, raw authorization headers, or restricted source content.

The common `claims.json` and `sources.json` remain price-blind. Store line, ATS, prop, salary, contest, and scoreboard-betting observations only in the applicable namespaced downstream artifact after `price_blind_freeze`.

## Routed result envelope

Namespace every requested mode:

```json
{
  "skill": "analyze-cfb-lines",
  "status": "complete|partial|blocked|unavailable",
  "as_of": "ISO-8601 timestamp",
  "result_ref": null,
  "reason": null,
  "missing_inputs": [],
  "next_action": null
}
```

Do not merge a sibling's specialized conclusion into `matchup_context`; reference it separately so all modes consume the same frozen foundation.

## Workspace artifacts

Follow the caller's existing artifact convention. Keep the report and these records together under the timestamped `analysis_id`:

```text
<matchup_slug>-<YYYYMMDDTHHMMSSZ>.md
<analysis_id>/matchup_context.json
<analysis_id>/claims.json
<analysis_id>/sources.json
<analysis_id>/freshness.json
<analysis_id>/comparison-rows.json
<analysis_id>/trend-rows.json
<analysis_id>/downstream/<skill_name>.json
```

Give the dossier report metadata for `title`, `analysis_id`, `kind: matchup`, `season`, `week`, `as_of`, and `validation_status`. Start at `validation_status: unvalidated`; use `pass`, `warn`, or `fail` only after a separate validation result. Keep full ISO-8601 timestamps in data and metadata. Use compact UTC `YYYYMMDDTHHMMSSZ` in IDs and filenames so paths remain portable. Use relative references, stable IDs, and tidy chart rows. Preserve prior snapshots during refreshes. Do not create a new application structure or edit shared components, data loaders, routes, configuration, skills, or deployment files.

Read [presentation-contract.md](presentation-contract.md) before rendering or persisting the report.
