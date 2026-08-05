# Player Prop Method and Artifact Contract

Read this reference when estimating scenarios, converting prices, or serializing a player-prop result.

## Contents

- Identity, cutoff, and ID namespaces
- CFBD acquisition through `$fbs-cli`
- Player/play joins and endpoint semantics
- FBS evidence packet and metric lineage
- Identity and status labels
- Scenario and sample methods
- Role stability, mispricing hypothesis, and candidate gate
- Structured record
- Final checks

## Identity, cutoff, and ID namespaces

Set the decision `as_of` instant before acquiring statistics. Include only games completed before it, record their CFBD game IDs, and exclude the target game and all later games. Verify dates and `completed` state from `fbs games`; week labels alone do not prove temporal eligibility. Use week-bounded endpoints with an explicit start/end range for a historical pregame sample. If an endpoint cannot enforce the cutoff and no dated pre-cutoff snapshot exists, exclude its current full-season value from the retrospective assessment.

Keep `cfbd_player_id` and `cfbd_game_id` separate from sportsbook or other provider IDs. Resolve a CFBD player with `player search` using season, team, and position, then verify roster membership and returned team stints. Names, jersey numbers, and transfer-portal rows are supporting match fields, not stable cross-provider keys. Never join unlike ID namespaces.

## CFBD acquisition through `$fbs-cli`

When CFBD evidence is needed, invoke `$fbs-cli`; let that skill govern exact flags, YAML parsing, credentials, and structured errors. Use this staged ladder:

1. Resolve exactly one target game with `games --year --week --home --away`; preserve its `cfbd_game_id`, kickoff, and home/away orientation.
2. Resolve the player with `player search --search-term <name> --year <year> --team <team> --position <position>` and corroborate with `roster --year <year> --team <team>`. Keep ambiguous matches unresolved.
3. Build the role sample from eligible completed games:
   - Use `games players --year <year> --team <team> --category <category>` or known game IDs for game-by-game box rows.
   - Use `stats player season --year <year> --team <team> --start-week <start> --end-week <end> --category <category>` for a bounded aggregate.
   - Use `stats player success game` or bounded `stats player success` for play counts and success rates.
   - Use `ppa players games --year <year> --team <team> --player-id <cfbd_player_id>` for game-level efficiency and filter the returned games against the verified cutoff.
4. Escalate to play detail only when it changes the role assessment. Discover IDs with `plays stats types`, query `plays stats --game-id <id> --athlete-id <cfbd_player_id> --stat-type-id <id>`, and join its `play_id` to `plays.id` from the corresponding year/week/team response.
5. Build opponent context with week-bounded `stats season advanced`, plus game-level advanced/PPA data only when needed. Retrieve `games weather --game-id` when tier access exists, but refresh current forecast evidence separately.

Use `player season overview` as a convenient current/full-season composite and `player usage` as season-level opportunity shares by pass/rush/down context. Neither has a week-range filter. Do not use either as a historical cutoff snapshot, and do not describe usage share as snaps, routes, targets, or depth-chart rank. WEPA player endpoints are also whole-season views without a week cutoff. `player returning` is team-season continuity, not a named player's current workload; portal rows help identify transfer context but do not prove present availability.

FBS does not supply a live prop quote, sportsbook settlement rules, authoritative injury/availability status, depth charts, route participation, or snap counts. Acquire those from user-supplied or current authoritative sources and keep them separate from CFBD observations.

### Player/play joins and endpoint semantics

Use these composite keys:

- Box row: `(game_id, player_id, category, stat_type)`.
- Play association: `(game_id, play_id, athlete_id, stat_type)`.
- Play context join: `(game_id, play_id)`.

Never join by player name or play description alone. `plays stats` is capped at 2,000 rows and the CLI does not page. A response at the cap from a broad query may be truncated; narrow by game, athlete, and discovered stat type before using it as complete. Preserve ratios and mixed stat strings, and distinguish a missing category from zero production.

Apply one season-type and garbage-time policy to player opportunity, player efficiency, and opponent samples. State the role boundary before inspecting the split and list the included game IDs so another agent can reproduce it.

### FBS evidence packet and metric lineage

For each material CLI response, retain `source_type: cfbd_cli`, `cli_version`, invocation mode, `upstream_family: CFBD`, exact command, exit code, UTC `retrieved_at`, distinct `applicable_as_of` and `data_cutoff`, cutoff capability, included CFBD game IDs, season type, garbage-time policy, response hash or authorized selected-record reference, and cutoff notes. Preserve the returned YAML `command`, `endpoint`, `query`, `count`, and endpoint-specific result key under a parsed-stdout account. Also record `question_answered`, `unique_dimension`, and `overlaps_with` so another CFBD view is not counted as another source. Preserve `0`, `false`, IDs, arrays, and precision; an omitted field remains unknown. Parse stdout only on exit 0. On failure, retain the nonzero exit and structured stderr instead of parsed stdout. A tier denial, timeout, invalid response, or capped broad play-stat result is an evidence gap rather than an empty or complete sample; a successful empty collection is not proof of numeric zero or confirmed absence.

Tag inputs by lineage such as `box_opportunity`, `play_association`, `efficiency_from_plays`, `opponent_adjusted_efficiency`, `availability`, `market`, or `environment`. Box statistics, usage, success, PPA, WEPA, and play-level summaries overlap; do not count them as independent confirmations.

## Identity and status

Resolve the player using as many of these fields as available: namespaced provider and CFBD IDs, full name, team, position, season, game ID, and opponent. Treat a transfer's statistics and current roster status separately.

Use these availability labels consistently:

- `confirmed_available`: an authoritative current source confirms availability.
- `confirmed_out`: an authoritative current source confirms the player will not play.
- `expected`: reliable current evidence supports playing, but it is not official confirmation.
- `questionable`: credible evidence identifies a material limitation or game-time decision.
- `unverified`: current status cannot be established.

State-specific availability-report terminology may differ. Preserve the source's wording and map it cautiously.

## Scenario method

Build scenarios in this order:

1. Estimate team opportunities from pace, expected possessions, opponent pace, and likely score states.
2. Estimate player opportunity share from the current role: attempts, carries, targets, routes, snaps, or red-zone share.
3. Estimate per-opportunity efficiency using role-relevant history and opponent context.
4. Define low, base, and high cases by varying the assumptions that actually drive the prop.
5. Compare the resulting distribution or range with the exact threshold and settlement rules.

Do not treat the low and high scenarios as a confidence interval unless they were calculated as one. Use the phrase `plausible range` for judgment-based scenarios.

When converting American odds to implied probability:

- If odds `a > 0`, use `100 / (a + 100)`.
- If odds `a < 0`, use `abs(a) / (abs(a) + 100)`.

Remove vig only when both sides of the same prop at the same provider and observation time are available. Normalize the two implied probabilities proportionally and state the method.

## Sample discipline

- Use a role-based sample boundary, not an arbitrary recent-games window.
- Explain exclusions before using the resulting split.
- Keep garbage-time treatment consistent across the player and opponent samples.
- Avoid double-counting the same information through highly correlated metrics.
- Treat touchdowns and other rare outcomes as high-variance unless sufficient opportunity evidence supports a stable rate.
- Distinguish missing records from zero production.

## Role stability, mispricing hypothesis, and candidate gate

Classify decisive role evidence as `stable`, `conditional`, `fragile`, or `unknown`. Base the label on the distribution of verified opportunities across the declared role sample, teammate availability, depth or rotation evidence, and regime continuity. A small hot streak, touchdown burst, or long play does not make a role stable. CFBD usage can support an opportunity-share view but cannot prove snaps, routes, current depth, or health.

Write the prop hypothesis as `team opportunities × player opportunity share × per-opportunity efficiency`, then explain how matchup and game environment could alter each term. State the strongest competing explanation, the observation that would falsify the thesis, and the exact line-and-price threshold at which the conclusion changes.

End with one prose candidate gate:

- `bet`: player and game identity, current availability, role, exact quote, observation time, period, and settlement rules are verified; the reproducible range remains favorable after price and uncertainty; and no unresolved teammate or role change could reasonably reverse the conclusion.
- `watch`: one bounded item remains. Name a measurable workload, depth-chart, availability, weather, or price trigger; its source; its deadline; and the exact threshold.
- `pass`: the price absorbs the thesis, the plausible range spans both sides, recent production is dominated by unstable amplification, or identity/status/role/market evidence cannot be repaired before the decision.

If current availability or role is materially unresolved, `bet` is prohibited. FBS supplies no live prop quote or settlement rules, and a Kalshi player-specific CFB contract must not be assumed to exist; use a user-supplied or separately verified provider snapshot. `Bet` remains an analysis candidate only, never a stake recommendation or authorization to submit a wager.

Keep the existing structured contract: map the assessment to `favorable`, `neutral`, `unfavorable`, or `insufficient_evidence`, put the candidate gate in `conclusion.rationale`, and put the exact measurable price condition in `conclusion.decision_threshold`. Do not add a gate field or change the schema.

## Structured record

Use this portable shape when the host can store JSON or YAML. Omit unknown optional values rather than inventing them.

```yaml
schema_version: 1
analysis_id: "<season>-w<week>-props-<player-slug>-<YYYYMMDDTHHMMSSZ>"
kind: props
season: 2026
week: 1
game:
  game_id: "<provider game id when known>"
  identifiers:
    cfbd_game_id: "<CFBD game id when known>"
    provider_game_ids:
      - provider: "Provider"
        id: "<provider-scoped game id>"
  away_team: "Away"
  home_team: "Home"
  kickoff: "<ISO 8601 with offset when known>"
player:
  player_id: "<provider player id when known>"
  identifiers:
    cfbd_player_id: "<CFBD player id when known>"
    provider_player_ids:
      - provider: "Provider"
        id: "<provider-scoped player id>"
  name: "Player Name"
  team: "Team"
  position: "Position"
as_of: "<UTC ISO 8601>"
data_cutoff:
  included_cfbd_game_ids: []
  last_included_game_start: "<ISO 8601 when applicable>"
  season_type: regular
  exclude_garbage_time: true
  notes: "<how temporal eligibility was verified>"
prop_snapshots:
  - snapshot_id: prop-over-1
    provider: "Provider"
    stat_type: "passing_yards"
    selection: over
    line:
      value: 249.5
      unit: yards
    price:
      format: american
      value: -110
    rules:
      period: full_game
      overtime: included
      push: refund
      settlement_criteria: "Provider's published passing-yards rules"
      settlement_source: "<provider rules URL or local path>"
    observed_at: "<UTC ISO 8601>"
    source_id: src-1
  - snapshot_id: prop-under-1
    provider: "Provider"
    stat_type: "passing_yards"
    selection: under
    line:
      value: 249.5
      unit: yards
    price:
      format: decimal
      value: 1.91
    rules:
      period: full_game
      overtime: included
      push: refund
      settlement_criteria: "Provider's published passing-yards rules"
      settlement_source: "<provider rules URL or local path>"
    observed_at: "<same UTC ISO 8601 as paired quote>"
    source_id: src-1
availability:
  status: expected
  confidence: medium
  rationale: "<brief evidence summary>"
role:
  sample_boundary: "<role-relevant start event or date>"
  opportunity_summary: "<attempt, carry, target, route, or snap evidence>"
scenarios:
  low: 205
  base: 247
  high: 291
  unit: yards
  method: "opportunity and efficiency scenarios"
conclusion:
  label: neutral
  confidence: low
  decision_threshold: "Favorable only below 235.5 at -110"
  rationale: "<brief summary>"
assumptions: []
counterevidence: []
unresolved_gaps: []
metric_lineage: []
sources:
  - source_id: src-1
    title: "<source title>"
    url_or_path: "<URL or local path>"
    retrieved_at: "<UTC ISO 8601>"
    supports: ["prop_snapshots"]
validation_status: warn
```

Use the snapshots array for provider comparisons and ordered observations. Compute no-vig values only from matching over and under snapshots at the same provider, threshold, rules, and observation time. Preserve each provider's original price format and numeric value; do not silently convert and discard the quote as observed.

Use explicit null-free arrays and objects so dashboards and other agent hosts can consume the record consistently. Keep raw evidence separate when licenses prohibit redistribution. Keep full ISO-8601 timestamps in data fields. For IDs and path segments, derive a compact UTC timestamp in `YYYYMMDDTHHMMSSZ` form, such as `20260829T233000Z`; never place `:` in a filename.

For persistent output, follow the caller's existing artifact convention and store the portable record beside a timestamped human-readable report. Do not overwrite a prior snapshot, create a new application structure, or edit shared configuration.

## Final checks

- Verify the player belongs to the stated team and game for the analyzed season.
- Verify the stat definition and settlement rules, including overtime and push handling.
- Verify that the role sample follows the stated boundary and does not include future information.
- Verify every included CFBD game ID and exclude the target and later games.
- Verify provider and CFBD identifiers remain namespaced and that transfers/team stints were checked.
- Verify capped or unbounded CLI results were not treated as complete cutoff samples.
- Verify correlated play-derived metrics were not counted as independent evidence.
- Verify that changing facts have timestamps and direct source support.
- Verify that confidence reflects status and role uncertainty.
- Verify that the candidate gate satisfies the requirements above and that a `watch` has a measurable source, trigger, deadline, and price condition.
- Preserve calculation precision internally and round only for presentation.
