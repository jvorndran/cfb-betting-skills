# CFB DFS Lineup Contract

Use this contract before presenting any candidate as valid. Apply the provider's actual rules; the categories below are a provider-neutral minimum, not substitute rules.

## Contents

- Authority boundaries
- CFBD crosswalk, cutoff, and endpoint ladder
- Batching, joins, and metric lineage
- FBS evidence packet
- Required inputs and hard checks
- Portfolio checks
- Minimum result shape

## Authority boundaries

Treat the provider salary/slate export and published contest rules as authoritative for provider player/game IDs, salaries, position eligibility, slate membership, lock state, late swap, and roster constraints. Current provider or authoritative team evidence governs availability. CFBD can corroborate identity and enrich historical football context, but it cannot override those provider-controlled facts.

FBS does not provide DFS salaries, site eligibility, contest rules, projections, ownership, provider lock state, or an authoritative injury feed. A missing or stale CFBD roster match does not make a provider-identified athlete ineligible or out. Preserve the unmatched enrichment as a gap while validating the lineup from the authoritative provider row.

Keep `provider_player_id`, `cfbd_player_id`, `provider_game_id`, and `cfbd_game_id` in separate fields. Build a crosswalk only after matching season, kickoff, home/away teams, player name, team, opponent, and position. Never compare or join unlike ID namespaces.

## CFBD crosswalk, cutoff, and endpoint ladder

When CFBD enrichment is needed, invoke `$fbs-cli`; let that skill govern exact flags, YAML parsing, credentials, and structured errors. Set the portfolio `as_of` instant before acquisition. Include only games completed before it, list their CFBD game IDs, and exclude target-slate and later outcomes. A week label alone is not a cutoff. Do not use a current full-season endpoint in a retrospective pre-lock build unless a dated pre-lock snapshot proves its state.

Use this staged ladder:

1. Query `games --year <year> --week <week>` once for the slate schedule, then crosswalk each provider game by kickoff and home/away teams. The provider export remains authoritative for slate inclusion and lock.
2. Batch reproducible historical features by team and category with week-bounded `stats player season`, `stats player success`, and `stats season advanced`. Keep season type and garbage-time treatment consistent.
3. Use `games players` for game-by-game box rows and `ppa players games` for game-level player efficiency when the user's objective needs them. Filter returned rows to the verified included-game set.
4. Use `player search` and `roster` only to resolve ambiguous crosswalks or enrich finalists. Use `player season overview`, player-specific calls, and play-level queries only when they can change a finalist decision.
5. Query `games weather --game-id` only for relevant outdoor games and treat a tier failure as unavailable evidence. Current weather and player availability still require current sources.

`player usage` is a whole-season opportunity-share view by pass/rush/down context; it is not snaps, routes, a projection, or a week-bounded historical snapshot. WEPA player metrics are also whole-season views. `player returning` describes team-season continuity and must not become a named player's workload projection. FBS lines and scoreboard betting fields are historical/contextual and lack the attached spread/total price, provider quote time, and rules needed for a live game-environment assumption.

### Batching, joins, and metric lineage

Resolve the slate/game crosswalk once, batch team/category queries next, and reserve player-specific or play-level retrieval for ambiguous identities and finalists. Do not make one season-overview request for every salary-row player when a bounded team/category response answers the question. Do not silently derive projections from CFBD fields; preserve supplied projections and label any transparent heuristic or scenario separately.

Use `(game_id, player_id, category, stat_type)` for flattened box rows. For play detail, discover stat-type IDs, query `plays stats` by game/athlete/type, and join `(game_id, play_id)` to `plays`. The play-stat endpoint is capped at 2,000 rows with no CLI pagination; a broad response at the cap is potentially truncated and cannot validate a complete sample.

Tag evidence by lineage, for example `provider_projection`, `box_opportunity`, `efficiency_from_plays`, `opponent_adjusted_efficiency`, `availability`, or `environment`. Usage, success, PPA, WEPA, and advanced metrics overlap; do not treat them as independent votes or sum them into an undisclosed projection.

### FBS evidence packet

For each material CLI result, retain `source_type: cfbd_cli`, `cli_version`, invocation mode, `upstream_family: CFBD`, exact command, exit code, UTC `retrieved_at`, distinct `applicable_as_of` and `data_cutoff`, cutoff capability, included CFBD game IDs, season type, garbage-time policy, response hash or authorized selected-record reference, and cutoff notes. Preserve the returned YAML `command`, `endpoint`, `query`, `count`, and endpoint-specific result key under a parsed-stdout account. Record `question_answered`, `unique_dimension`, and `overlaps_with` for request-budget review. Preserve `0`, `false`, IDs, arrays, and precision; omitted fields remain unknown. Parse stdout only on exit 0. On failure, retain the nonzero exit and structured stderr instead of parsed stdout. A tier denial, timeout, invalid response, or capped broad play response is an evidence gap, not an empty or complete response; a successful empty collection is not proof of numeric zero or confirmed absence.

## Required Inputs

Record the source and `as_of` time for:

- Provider/site, slate, contest type, lock time, and timezone.
- Included games, namespaced provider identifiers, and any verified CFBD crosswalk.
- Salary cap, roster slots, slot eligibility, and any flex or captain multipliers.
- Salary, eligible position, team, opponent, and slate membership for every selected athlete.
- Provider restrictions such as minimum teams or games, maximum athletes per team, late-swap behavior, duplicate-lineup policy, and locked-player handling.
- Requested lineup count and user constraints: locks, exclusions, stacking, correlation, uniqueness, and exposure bounds.

Projections and ownership estimates are optional. Label their creator, methodology if known, and observation time. Never present them as observed outcomes.

## Hard Per-Lineup Checks

Recompute and report each check:

1. Fill every required slot exactly once.
2. Use each athlete no more than once unless the verified rules explicitly allow otherwise.
3. Verify each athlete's provider ID or unambiguous provider identity, team, opponent, position eligibility, and slate membership. Keep any CFBD enrichment ID separate.
4. Sum provider salaries using all verified multiplier rules; remain at or below the cap and above any verified minimum.
5. Enforce minimum games or teams, maximum athletes per team, opponent requirements, captain restrictions, and every other supplied provider rule.
6. Exclude athletes who are ineligible, confirmed out, off-slate, or locked when late swap is not available.
7. Confirm that no requested lock, exclusion, or lineup-specific constraint was violated.

Fail the lineup if any hard check fails or cannot be verified. Do not convert unknown data into assumptions to make it pass.

A current, sourced `questionable` designation does not itself violate a hard roster rule; use `warn` and show the contingency when every hard check still passes. Use `fail` for a confirmed absence or when unresolved availability makes eligibility, slate membership, lock state, or another hard check unknowable.

## Portfolio Checks

Across all candidates:

- Recompute player, team, game, stack, and captain exposure percentages using the final lineup count.
- Enforce user-supplied minimum and maximum exposures, accounting for integer feasibility.
- Check required uniqueness between lineups and reject exact duplicates when disallowed.
- Identify highly correlated concentration, repeated fragile assumptions, and dependence on questionable players.
- Compare construction objective with the user's stated contest strategy. Label diversification heuristics separately from provider rules.

A portfolio fails if one of its lineups fails or a hard portfolio constraint is violated. Use `warn` for disclosed concentration or uncertainty that does not violate a rule.

## Minimum Result Shape

For each lineup, show:

| Field | Requirement |
|---|---|
| `lineup_id` | Stable within the report |
| `status` | `pass`, `warn`, or `fail` |
| `slots` | Slot, `provider_player_id`, optional separate `cfbd_player_id`, name, team, opponent, eligibility, salary |
| `total_salary` | Recomputed from source salary rows |
| `remaining_salary` | Cap minus recomputed salary |
| `projections` | Optional and explicitly sourced |
| `checks` | Every applicable hard constraint and its result |
| `notes` | Correlation, uncertainty, alternatives, and failure reasons |

At portfolio level, show exposures, uniqueness, constraint results, unresolved inputs, and the source ledger. Preserve enough detail for another agent to reproduce every validation result.

Use `schema_version`, an `analysis_id` matching `<season>-w<week>-dfs-<slate-slug>-<YYYYMMDDTHHMMSSZ>`, `kind: dfs`, season, week, `as_of`, namespaced game/player crosswalks, a `data_cutoff` with included CFBD game IDs, sources, metric lineage, assumptions, and overall `validation_status` at the top level. Keep full ISO-8601 timestamps in data fields, but use compact UTC `YYYYMMDDTHHMMSSZ` timestamps in IDs and filenames so paths remain portable. For persistent output, follow the caller's existing artifact convention and store the structured portfolio beside a timestamped report. Do not overwrite an older portfolio, create a new application structure, or edit shared configuration.
