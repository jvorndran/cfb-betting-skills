# Market Method and Artifact Contract

Read this reference when calculating prices, analyzing movement, or serializing a lines result.

## Contents

- Identity, cutoff, and ID namespaces
- CFBD acquisition through `$fbs-cli`
- FBS evidence packet and failures
- Historical line limitations
- Metric lineage
- Price conventions
- Movement classification
- Fair-value discipline
- Mispricing hypothesis and candidate gate
- Structured record
- Final checks

## Identity, cutoff, and ID namespaces

Set the decision `as_of` instant before acquiring statistics. For a pregame assessment, include only games that were completed before that instant. Resolve the candidate schedule with `fbs games`, verify `completed: true` and `start_date < as_of`, record every included CFBD game ID, and exclude the target game even if a later data export contains its result. A week filter is a retrieval aid, not proof of temporal eligibility.

Use `--end-week` on week-bounded season endpoints when it enforces the cutoff. For Week 0, Week 1, postponed games, and cross-season samples, select games from verified dates rather than subtracting one from the week number. Keep season type and `--exclude-garbage-time` treatment consistent across both teams. If a retrospective endpoint has no week cutoff and there is no dated snapshot captured before `as_of`, do not use its current full-season value as pregame evidence.

Keep IDs namespaced:

- `cfbd_game_id` is the ID returned by `fbs games` and reused by compatible FBS commands.
- `provider_game_id` is a sportsbook or data-provider identifier.
- An exchange ticker is a contract identifier, not a game ID.

Match providers using season, kickoff, home team, and away team before recording a crosswalk. Never join unlike IDs or infer that equal-looking values share a namespace.

## CFBD acquisition through `$fbs-cli`

When CFBD evidence is needed, invoke `$fbs-cli`; let that skill govern installation, help inspection, exact flags, YAML parsing, credentials, and structured errors. Do not invent a command path or query alias. Use this staged ladder so identity is resolved once and quota is spent on material evidence:

1. Resolve the game with a narrow query such as `fbs games --year <year> --week <week> --home <home> --away <away>`. Require exactly one matching game and verify the returned home/away orientation, kickoff, season type, and `cfbd_game_id`.
2. Retrieve `fbs lines --game-id <cfbd_game_id>` once without `--provider` when comparing providers. The response already groups every returned provider under the resolved game; filter locally after preserving the raw provider rows.
3. Build each team's bounded efficiency profile with `fbs stats season advanced --year <year> --team <team> --end-week <cutoff-week> --exclude-garbage-time` when that week boundary is valid. This endpoint covers offense/defense PPA, success, explosiveness, passing/rushing and down splits, havoc, line and open-field yards, field position, points per opportunity, plays, and drives.
4. Add the smallest endpoint that answers a remaining question:
   - `stats game advanced` or `stats game havoc` for eligible game-level distributions and comparable games.
   - Tiered `game box advanced --id <game>` when one eligible prior game needs several of field position, scoring opportunities, havoc, rushing, explosiveness, success, PPA, or player usage; prefer the combined response over several redundant calls and preserve tier failure as unavailable evidence.
   - `games teams` for box-score categories such as turnovers, penalties, and possession when the relevant completed game IDs are known.
   - `drives` for start/end field position and scoring-drive context.
   - `plays` for pace, down, distance, score state, and play-level PPA; query only the necessary weeks and teams.
   - `games weather --game-id` for CFBD weather when the tier is available; independently refresh forecast evidence for a current decision.
   - `metrics wp pregame`, SP/FPI/Elo ratings, or WEPA as labeled provider-derived context, not independent fair-value models.
   - `roster`, `player portal`, and `player returning` for early-season continuity questions. Returning production is a team-season continuity summary, not proof that a named player is active.
5. Use `teams ats` only as a descriptive team-year summary. It has no game-level ID join and does not independently predict a future cover.

At the start of a season, state when prior-season metrics are priors. Prefer current roster and availability evidence plus explicitly labeled prior-year statistics over pretending the current season has a stable sample.

### FBS evidence packet and failures

For every CLI response used materially, retain a compact provenance packet alongside the normalized analysis:

```yaml
source_type: cfbd_cli
cli_version: "<fbs version when available>"
invocation_mode: installed
upstream_family: CFBD
exact_command: "fbs stats season advanced ..."
exit_code: 0
retrieved_at: "<UTC ISO 8601>"
applicable_as_of: "<UTC ISO 8601 or documented historical scope>"
response_sha256: "sha256:<hex when a snapshot is retained>"
data_cutoff: "<UTC ISO 8601>"
cutoff_capability: native_week_range
included_cfbd_game_ids: []
season_type: regular
exclude_garbage_time: true
cutoff_notes: "<how temporal eligibility was verified>"
question_answered: "<material question this request answers>"
unique_dimension: "<what it adds beyond inherited evidence>"
overlaps_with: []
parsed_stdout:
  command: stats season advanced
  endpoint: /stats/season/advanced
  query: {}
  count: 0
  result_key: advanced_season_stats
  selected_records_ref: "<sanitized rows or authorized immutable snapshot>"
parsed_stderr: null
```

Verify the YAML `command`, `endpoint`, `query`, `count`, and endpoint-specific result key. Preserve `0`, `false`, IDs, arrays, and numeric precision; an omitted provider field remains unknown. Parse stdout only on exit 0. On failure, omit `parsed_stdout` and preserve the structured stderr error and nonzero exit in the source ledger. A tier denial, timeout, invalid response, or rate failure is an evidence gap, not an empty result; do not repeatedly retry a broad query. A successful `count: 0` response is an empty collection, not proof that the underlying fact equals zero or does not exist.

### Historical line limitations

`fbs lines` is historical, read-only context. Its provider rows can contain `spread`, `formatted_spread`, `spread_open`, `over_under`, `over_under_open`, `home_moneyline`, and `away_moneyline`. They do not contain:

- an attached spread or total price;
- a provider quote observation timestamp;
- settlement rules; or
- an ordered intraday history.

Record the CLI call's `retrieved_at`, but do not copy it into the market snapshot's `observed_at`. Leave `observed_at` unknown unless the provider or supplied evidence establishes it. Preserve `formatted_spread` and resolve its selected-team orientation against the verified home/away teams before applying the numeric sign.

Do not call `spread_open -> spread` or `over_under_open -> over_under` a time series or infer its cause; describe it only as an opener-to-provider-record difference. Cross-provider rows are differences, not movement. Scoreboard betting fields also lack provider identity, attached spread/total prices, and rules, so they cannot complete a current market snapshot.

Only calculate moneyline no-vig when both home and away moneylines are present in the same provider record. Do not calculate spread or total no-vig from FBS line data because the opposing attached prices are absent. A current edge conclusion still requires a separately verified live quote with exact price, rules, and observation time.

## Metric lineage

Tag material inputs by lineage, for example `market`, `opportunity`, `efficiency_from_plays`, `opponent_adjusted_efficiency`, `personnel`, `availability`, or `environment`. Advanced stats, PPA, success, explosiveness, WEPA, and many ratings reuse overlapping play results; treat them as alternative views or robustness checks rather than independent votes. A CFBD pregame probability that also contains a spread is one provider-derived baseline, not two independent signals.

## Price conventions

For American odds `a`:

- If `a > 0`, implied probability is `100 / (a + 100)`.
- If `a < 0`, implied probability is `abs(a) / (abs(a) + 100)`.

For decimal odds `d`, implied probability is `1 / d`.

For a binary contract quoted as probability `p`, preserve the exact quote and use `p` as the raw implied probability. For a contract quoted in whole cents `c`, preserve the cents quote and use `c / 100` before any fee adjustment. Do not treat a bid, ask, last trade, or midpoint as interchangeable. Include fees, spread, available depth, and resolution rules when they are material and available.

For a two-way market with raw implied probabilities `p1` and `p2`, proportional no-vig probability is:

`fair_p1 = p1 / (p1 + p2)` and `fair_p2 = p2 / (p1 + p2)`.

State that proportional normalization was used. Do not calculate no-vig probability from only one side. Do not assume yes and no quotes are perfect complements unless they are simultaneous, mutually exclusive, exhaustive, and governed by identical resolution rules. Treat pushes, three-way markets, dead heats, fees, and provider-specific settlement rules separately.

Always display the number with the price: `Team -3.5 (-110)` or `Over 52.5 (+102)`. For binary contracts display the contract side, quote type, and value, such as `Yes ask: 57 cents`. A half-point move and a juice move are not interchangeable.

## Movement classification

Capture observations as an ordered series rather than only "open" and "current":

- `number_move`: the spread or total changed.
- `price_move`: the number stayed constant while its attached price changed.
- `mixed_move`: both changed.
- `cross_provider_difference`: simultaneous quotes differ; do not call this movement without time-series evidence.

Do not infer cause from movement alone. Label explanations such as injuries, weather, limits, or influential action as confirmed only when a reliable source supports them.

## Fair-value discipline

- Use low, base, and high scenarios or a continuous interval.
- Identify assumptions that control the interval, especially quarterback availability and meaningful weather thresholds.
- Show price sensitivity at nearby lines when data permits.
- Prefer `pass` or `insufficient_evidence` when uncertainty spans both sides of the observed market.
- Do not claim an edge by comparing a point estimate to an old or unverified quote.
- Keep historical ATS outcomes descriptive; they do not independently establish predictive value.

## Mispricing hypothesis and candidate gate

After the price-blind matchup context is frozen, convert a candidate into a testable market hypothesis. State:

1. the specific market assumption being challenged;
2. the causal football mechanism and evidence-stability label supporting the challenge;
3. the strongest competing explanation, including the possibility that the market already reflects the headline;
4. the observation that would falsify the thesis; and
5. the exact line-and-price or contract-price threshold at which the decision changes.

Do not infer public sentiment, ticket share, “sharp money,” or brand bias without a governed source. A familiar narrative is not automatically wrong, and a popular team is not automatically overpriced.

End with one prose candidate gate:

- `bet`: the exact executable quote, observation time, rules, and identity are verified; a reproducible fair range remains favorable after vig, fees, liquidity, and uncertainty; decision-sensitive availability is fresh; and no unresolved gap could reasonably reverse the conclusion.
- `watch`: the thesis is plausible but one bounded item remains. Name one measurable trigger, its source, deadline, and the exact price threshold. A vague request to “monitor news” is not a watch plan.
- `pass`: the market absorbs the thesis, the fair range spans both sides, the hypothesis fails, or the missing evidence has no bounded repair before the decision.

If the evidence cannot support a fair range, `bet` is prohibited. Use `watch` only when a named bounded repair exists; otherwise use `pass`. `Bet` means an analysis candidate, never a stake recommendation or authorization to place or execute a wager.

Keep the existing structured contract: map the market assessment to `favorable`, `neutral`, `unfavorable`, or `insufficient_evidence`, and place the candidate gate plus reasoning in `conclusion.rationale` and the measurable price condition in `fair_assessment.decision_threshold`. Do not add a gate field or change the schema.

## Structured record

Use this portable shape when the host can store JSON or YAML. Omit unknown optional values rather than inventing them.

```yaml
schema_version: 1
analysis_id: "<season>-w<week>-lines-<matchup-slug>-<YYYYMMDDTHHMMSSZ>"
kind: lines
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
as_of: "<UTC ISO 8601>"
data_cutoff:
  included_cfbd_game_ids: []
  last_included_game_start: "<ISO 8601 when applicable>"
  season_type: regular
  exclude_garbage_time: true
  notes: "<how temporal eligibility was verified>"
market_snapshots:
  - snapshot_id: market-1
    provider: "Provider"
    market_type: spread
    selection: "Away"
    line:
      value: -3.5
      unit: points
      orientation: "negative values mean the selected team is favored"
    price:
      format: american
      value: -110
    rules:
      period: full_game
      overtime: included
      push: refund
      resolution_criteria: "Provider's published full-game spread rules"
      resolution_source: "<provider rules URL or local path>"
    observed_at: "<UTC ISO 8601>"
    source_id: src-1
market_history:
  - history_id: kalshi-history-1
    provider: Kalshi
    ticker: "<verified ticker>"
    command: "markets candlesticks"
    interval_minutes: 60
    requested_start_ts: 0
    requested_end_ts: 0
    adjusted_end_ts: 0
    observed_at: "<UTC ISO 8601>"
    source_id: src-kalshi-history
    response_sha256: "sha256:<hex>"
    normalized_points_ref: "<optional append-only derived JSON path>"
fair_assessment:
  market_type: spread
  selection: "Away"
  metric:
    type: line
    unit: points
    orientation: "negative values mean the selected team is favored"
  range:
    low: -4.0
    base: -3.0
    high: -1.5
  method: "scenario-weighted evidence range"
  decision_threshold: "Favorable only at Away -2.5 or better at -110"
conclusion:
  label: neutral
  confidence: low
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
    supports: ["market_snapshots[0]"]
validation_status: warn
```

Use `market_type: binary_contract` for an exchange or prediction-market contract. In that snapshot, include the exact contract title, ticker when available, selected side, quote kind such as `bid`, `ask`, `last`, or `midpoint`, price format and value, close time, resolution criteria, resolution source, and material fee or liquidity notes. For its fair assessment use `metric.type: probability`, `unit: probability`, and an orientation that states the range is the probability the selected side resolves true.

`market_history` is optional and descriptive. Preserve Kalshi fixed-point price fields as strings in raw evidence, and keep raw CLI responses outside version control. Only redistribution-safe normalized rows belong in generated dashboard artifacts. When used, `normalized_points_ref` must point to append-only, timestamped data rather than a mutable latest file. A candlestick history never substitutes for a separately time-stamped current market or orderbook snapshot when making a current decision.

Use explicit null-free arrays and objects so dashboards and other agent hosts can consume the record consistently. Keep raw evidence separate when licenses prohibit redistribution. Keep full ISO-8601 timestamps in data fields. For IDs and path segments, derive a compact UTC timestamp in `YYYYMMDDTHHMMSSZ` form, such as `20260829T233000Z`; never place `:` in a filename.

For persistent output, follow the caller's existing artifact convention and store the portable record beside a timestamped human-readable report. Do not overwrite a prior snapshot, create a new application structure, or edit shared configuration.

## Final checks

- Verify home and away orientation before applying spread signs.
- Verify that every price shares the same market rules.
- Verify that all computed probabilities are within `[0, 1]` and paired no-vig probabilities sum to one within rounding tolerance.
- Verify that the conclusion refers to the current snapshot, not the opener.
- Verify that `retrieved_at` was not substituted for an unknown provider `observed_at`.
- Verify the decision cutoff and every included CFBD game ID; exclude the target and later games from pregame evidence.
- Verify that provider, CFBD, and exchange identifiers remain namespaced.
- Verify that correlated play-derived metrics were not counted as independent evidence.
- Verify timestamps and direct source support for all changing facts.
- Verify that the candidate gate satisfies the requirements above and that a `watch` has a measurable source, trigger, deadline, and price condition.
- Preserve calculation precision internally and round only for presentation.
