# CFBD matchup evidence plan

Use this plan to choose and sequence `$fbs-cli` evidence. Executable help remains authoritative for flags and result keys.

## Phase boundary

- `price_blind_common` may contain identity, football statistics, rosters, personnel history, venues, weather, and other non-market observations.
- `post_freeze_market` contains lines, ATS records, props, DFS salaries and rules, and the `betting` object embedded in scoreboard rows.
- Never expose `post_freeze_market` values to team researchers or place their source IDs, claims, or conclusions in the base dossier, common `claims.json`, common `sources.json`, or `matchup_context`.
- If scoreboard is needed for status, copy only non-betting fields before common use. Route the untouched market-bearing row only after the price-blind freeze.

## Plan and reuse before requesting

For each candidate request record in the working plan: the unresolved question, exact command/query, source ID, selected IDs, cutoff capability, freshness trigger, `upstream_family: CFBD`, overlap with existing evidence, and the unique dimension it adds.

Reuse caller-inherited rows when they cover the same game or teams, were legal at the cutoff, and remain fresh. Immutable completed-season statistics normally stay reusable; current roster, status, availability, weather, and markets expire independently. Do not repeat a broad slate query once per team merely to narrow it. Shared year-only responses such as talent, portal, venues, and full-year ratings should be collected once and sliced for independent team researchers.

Treat independence as separate interpretation, not separate provider retrieval. All FBS CLI endpoints share CFBD lineage and do not corroborate one another merely because their command paths differ.

## Progressive query ladder

1. **Identity:** anchor with inherited game ID or `games --id`. Use `scoreboard` only when richer current status is material, and strip betting before common use.
2. **Baseline team mechanism:** prefer cutoff-bounded season advanced stats. They already cover passing/rushing and standard/passing-down efficiency, explosiveness, PPA, havoc, field position, finishing drives, and line/open-field yard measures.
3. **Personnel and continuity:** use roster IDs before fuzzy player search. Use returning production only as retained PPA/usage. Use portal or public evidence for transfers and an actual snap source for returning snaps.
4. **Targeted player question:** for a current single-player question, start with `player season overview`, which can include box-score categories, usage, and PPA. It has no week-range filter: for a historical pregame cutoff, use it only from an archived snapshot proven legal at that cutoff; otherwise start with bounded player-season/success rows or eligible game rows. Add player success, game PPA, usage, or season-stat calls only for a missing field, threshold, garbage-time control, or game/week split.
5. **Opponent adjustment or rating:** add WEPA, SP, Elo, or another rating only when it changes the mechanism or supplies a distinct dimension. Record overlap; do not count it as independent confirmation of another CFBD metric.
6. **Prior game:** locate the game ID, then use game team and player stats. Escalate to game advanced stats or havoc for a specific mechanism, and to drives, plays, or win probability only when game state or sequence matters. Use the tiered advanced box only when its field position, scoring-opportunity, rushing, success, PPA, or player-usage detail is necessary; preserve a tier failure as a failure.
7. **Special teams and environment:** use SP special-teams or WEPA kicking only when they add relevant evidence, and pair them with role/availability context. Use venue details for surface, dome, timezone, or elevation and weather only inside a decision-useful horizon.
8. **Stop:** do not request another endpoint when it only repeats a CFBD dimension or cannot change a material claim, caveat, confidence judgment, or refresh action.

Scope plays and play-stat queries tightly. The play-stat endpoint caps results and the CLI does not provide custom pagination.

## Completed-game cutoff capability

| Endpoint family | Cutoff use |
| --- | --- |
| season stats and player success with week ranges | Use Week N-1 only after the game index proves that range equals the games completed before target kickoff. For Week 0, postponed, rescheduled, or cross-season cases, reconstruct from eligible game rows when possible or mark the aggregate cutoff-unsafe. |
| game advanced stats, havoc, game PPA, player game PPA/success, game/team/player boxes | Keep only games completed by the cutoff. |
| Elo and CFP rankings | Use the week snapshot available at the cutoff; CFP is the only supported poll. |
| team PPA, WEPA, SP/SRS/FPI, records | These lack a complete week-range contract. For a past simulated cutoff, require an archived snapshot or use them only as a labeled prior-season baseline. |
| player season overview and player usage | These lack a week-range contract. Require an archived pre-cutoff snapshot for historical use, or replace them with bounded/player-game evidence. |
| returning production, talent, portal, roster | Treat as season-context observations with explicit retrieval time and applicable-as-of scope, not a reconstructed Week N performance sample. |
| drives, plays, win probability, advanced box | Postgame evidence only; never use before that game was completed at the simulated cutoff. |

Do not use a response retrieved after later games as if it were a contemporaneous Week N snapshot. Reconstruct from cutoff-safe game rows when possible; otherwise mark the field unavailable or non-reproducible.

## Evidence packet and YAML semantics

For every material FBS response, retain `source_type: cfbd_cli`, CLI version and invocation mode, exact credential-free command, exit code, `upstream_family: CFBD`, `retrieved_at`, distinct `applicable_as_of` and data cutoff, cutoff capability, included CFBD game IDs, response hash or authorized selected-record reference, freshness trigger, `question_answered`, `unique_dimension`, and `overlaps_with`. Under a parsed-stdout account preserve the returned `command`, `endpoint`, supplied `query`, `count`, and endpoint-specific result key.

Preserve `0`, `false`, IDs, arrays, and numeric precision; an omitted provider field remains unknown. Parse stdout only on exit 0. On failure, preserve the structured stderr envelope and do not create parsed stdout. A tier denial, timeout, or provider error is unavailable evidence rather than an empty response; a successful `count: 0` collection is not proof of numeric zero or confirmed absence.

## Semantics and overlap

- CFBD `player returning` reports retained PPA and usage percentages. It does not report returning snaps or unit cohesion.
- Advanced season stats often make a separate team-PPA call redundant. Use team PPA only when its quarter splits or another distinct field answers the question.
- `player season overview` may make separate season box, usage, and PPA calls redundant for one identified athlete.
- SP can add pace, run rate, modeled unit ratings, and special-teams rating; disclose that its efficiency dimensions overlap other CFBD outputs.
- WEPA adds opponent adjustment, not a second data source.
- Coach endpoints describe head-coach history; use public evidence for coordinators and position coaches.

Preserve these semantics in existing source scope, claim caveats, and sample notes. Do not add or alter an artifact schema incidentally.
