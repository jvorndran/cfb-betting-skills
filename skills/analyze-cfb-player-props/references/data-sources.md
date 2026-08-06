# Data Sources for CFB Player Props

Start with the evidence gap. Use the smallest set of sources that resolves identity, current role, opportunity, matchup, environment, and exact price. Run `fbs <complete leaf command> --help` before selecting flags, resolve one player and game first, then reuse their IDs.

## What FBS CLI can provide

| Expert question | Useful FBS commands | What they add |
| --- | --- | --- |
| Game and player identity | `games`, `player search`, `roster` | CFBD game/player IDs, team, position, roster membership, kickoff, opponent, and namesake disambiguation |
| Game-by-game production | `games players` | Passing, rushing, receiving, defensive, kicking, return, and other box-score rows by game |
| Bounded season production | `stats player season` | Player aggregates with category and week-range filters when supported by the leaf command |
| Play success and efficiency | `stats player success`, `stats player success game`, `ppa players games`, `ppa players season` | Play counts, success rates, and player PPA at game or season scope |
| Usage and role context | `player usage`, `player season overview` | Season-level opportunity shares, player summaries, and available role dimensions |
| Play associations | `plays stats types`, `plays stats`, `plays` | Player-to-play associations joined to down, distance, clock, score, and PPA context |
| Opponent and game environment | `stats season advanced`, `stats game advanced`, `games teams`, `drives`, `games weather` | Opponent efficiency, pressure or style context when returned, pace-related counts, box statistics, drive context, and weather fields |
| Personnel and continuity | `player portal`, `player returning`, `roster` | Transfers, retained team production, current roster records, and continuity context |
| Venue and conditions | `venues`, `games weather` | Surface and venue attributes plus CFBD weather fields when available |

Use FBS to establish historical opportunity and efficiency. Use current sources for what the player will do now.

## FBS limitations

- FBS does not provide live prop quotes, sportsbook settlement rules, authoritative injury status, depth charts, route participation, literal snap counts, or a guaranteed current role.
- `player usage` is a season-level opportunity-share view, not snaps, routes, targets, depth rank, availability, or a week-bounded historical snapshot.
- `player season overview` and player WEPA endpoints are current/full-season views without historical week cutoffs unless the leaf command explicitly supplies one.
- `player returning` describes retained team production and usage, not a named player's current workload.
- `plays stats` is capped at 2,000 rows with no CLI pagination. A broad result at the cap may be incomplete.
- A missing record is not zero production, and a tier, cap, rate-limit, or transport failure is an evidence gap rather than an empty sample.
- Box stats, usage, success, PPA, WEPA, and play summaries often share the same underlying plays; preserve that lineage.

## When to use the web

Use targeted web research for material facts FBS cannot provide or may not keep current:

- Current availability, practice participation, official designations, depth charts, starters, rotations, snap or route participation, target context, red-zone roles, and late scratches.
- Coaching statements, practice observations, quarterback changes, coordinator changes, and teammate developments that alter role or game plan.
- Current prop lines, attached prices, alternate lines, provider rules, period definitions, and settlement treatment.
- Current weather or late game-status information.
- Role-relevant facts absent from FBS or blocked by tier, cap, stale endpoint scope, or missing player identity.

Do not web-search ordinary historical production that adequate FBS results already establish. Do not use snippets as decisive evidence, bypass access controls, or infer absence from a failed search.

## Use the bundled catalog

Open [sources.yaml](sources.yaml) when web evidence is material. Match team or conference scope and use categories such as:

- `official_availability_reports`
- `official_depth_charts`
- `official_game_notes`
- `player_usage`
- `beat_reporting`
- `play_by_play`
- `transactions` and `transfer_portal`

Prefer official current material for status and depth, then reputable independent reporting for role context and corroboration. Follow every entry's `guidance`, `limitations`, and `access` fields. For `public_client_rendered` sources, use a rendering-capable browser or disclose that the source could not be inspected. The catalog is a discovery aid, not a freshness guarantee; search more broadly when it lacks a suitable source.

For changing claims, preserve the URL, publisher, publication/update time when available, retrieval time, and material caveats.
