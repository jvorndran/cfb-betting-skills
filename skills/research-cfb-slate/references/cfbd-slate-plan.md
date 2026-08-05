# CFBD slate query and reuse plan

Use this plan to keep weekly discovery efficient, cutoff-safe, and compatible with price-blind matchup research. Executable `$fbs-cli` help remains authoritative for exact flags and result keys.

## Phase boundary

- `price_blind_common` contains schedule identity, football performance, personnel, venue, weather, and other non-market observations.
- `post_freeze_market` contains lines, ATS records, props, salaries, contest data, and the `betting` object embedded in scoreboard rows.
- A market value may route a game to lines research, but it must not enter team slices, common claims, or the matchup context before `$deep-dive-cfb-matchup` freezes that context.
- When scoreboard data is needed for status, copy only identity, status, clock, situation, TV, venue, team, and weather fields into `price_blind_common`; remove `betting` before delegation.

## Bounded slate sequence

1. Reuse user-supplied or inherited structured observations whose scope and cutoff match.
2. Use `fbs calendar --year <year>` only when the week or date window is unresolved.
3. Build the canonical index with one scoped `fbs games --year <year> --week <week> --season-type <type>` request, adding classification only when scope calls for it. Key every later join by game ID.
4. Add `games media` only when broadcast or kickoff-window routing matters. Use `venues` only when timezone, surface, dome, elevation, or location is material.
5. Triage with the smallest bulk context that can change a priority tier, such as one records response, one week-specific Elo snapshot, or one CFP rankings snapshot when CFP rankings exist. The CLI does not provide AP rankings.
6. Query wide advanced statistics only when statistical triage is requested and the response will be reused across games. Extract only fields used in stated priority reasons. A bounded game box or game-advanced row may flag turnover, non-offensive-score, explosive, or finishing-drive amplification for a small candidate set; do not retrieve drives or plays across the full slate merely to simulate deep-dive work.
7. Use `scoreboard` only for current status enrichment or a live refresh. A `games` row with `completed: false` and `status: not_completed` does not prove scheduled rather than live status.
8. Stop when another request would not change identity, routing, freshness, or a stated priority reason.

Do not call `info usage` mechanically. Use it only when quota state affects whether a large slate can proceed or after a quota error. Treat a tier or provider error as an error, not an empty slate.

## Cutoff capability

| Evidence | Safe bounded use | Historical-cutoff rule |
| --- | --- | --- |
| `games` | Exact week or game ID | Exclude completed-game fields unavailable at the simulated cutoff. |
| season stats, including advanced | `--start-week` and `--end-week` | Use Week N-1 only after the canonical schedule proves that range equals the games completed before the target kickoff. For Week 0, postponed, rescheduled, or cross-season cases, reconstruct from eligible game rows when possible or mark the aggregate cutoff-unsafe. |
| game advanced stats, havoc, game PPA | Exact week or game rows | Keep only games completed by the cutoff. |
| Elo and CFP rankings | Week-specific snapshots | Use the snapshot available at the cutoff; CFP is the only supported poll. |
| team PPA, WEPA, SP/SRS/FPI, records | No complete week-range contract | For a past simulated cutoff, require an archived snapshot or use only as a labeled prior-season baseline. Do not treat a later full-season response as Week N knowledge. |
| returning production, talent, portal, roster | Season-level context | Record retrieval time, applicable-as-of scope, and methodology; refresh roster and portal identity when material. |

Postgame scores, excitement, postgame win probability, final records, and other completed-game fields are look-ahead information when unavailable at the stated cutoff.

## Reuse, lineage, and query budget

Treat all CLI observations as `upstream_family: CFBD` in the working source plan. For every planned or inherited observation retain its source ID, exact command and query, selected provider IDs, `retrieved_at`, distinct `applicable_as_of` and data cutoff, cutoff capability, freshness trigger, material overlap, and the unique routing question it answers. Retrieval time is not a provider observation time. Use existing source scope, notes, or claim caveats when the artifact schema has no dedicated field; do not change a schema incidentally.

Reuse an inherited response when its query covers the game or teams, it was legal at the cutoff, and its freshness deadline has not passed. Do not refetch immutable prior-season advanced data, talent, or ratings merely to narrow a response already collected for the slate. Refresh current status, availability, weather, and market inputs independently because their deadlines differ.

Pass selected rows and source references to a matchup assignment, not credentials, authorization data, or raw provider exports. Independent team research means independent interpretation of the same frozen evidence, not duplicate CFBD requests.

## Evidence packet and YAML semantics

For every material FBS response, retain the CLI version and invocation mode, `source_type: cfbd_cli`, exact credential-free command, exit code, `upstream_family: CFBD`, response hash or authorized selected-record reference, and the planning fields above. Under its parsed-stdout account preserve the returned `command`, `endpoint`, supplied `query`, `count`, and endpoint-specific result key. Preserve `0`, `false`, IDs, arrays, and numeric precision; an omitted provider field remains unknown.

Parse stdout only on exit 0. On failure, preserve the structured stderr envelope and do not create parsed stdout. A tier denial, timeout, or provider error is unavailable evidence, not an empty slate. A successful `count: 0` response is an empty collection, not proof that the underlying fact equals zero or does not exist.

## Validation ownership

A deep-dive result owns validation of its dossier and routed outputs. Reuse its validation ID and status when the source analysis revision, cutoff, and freshness remain unchanged. Revalidate only after a material source refresh, an analysis revision, an expired decision-sensitive input, or a new slate-level conclusion.
