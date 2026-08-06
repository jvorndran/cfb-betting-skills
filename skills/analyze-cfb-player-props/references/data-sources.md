# Data Sources for CFB Player Props

Use the smallest set of sources that resolves identity, role, opportunity, matchup, and price.

## What FBS CLI can provide

| Question | Useful FBS commands | What they add |
| --- | --- | --- |
| Game and player identity | `games`, `player search`, `roster` | CFBD game/player IDs, team, position, roster membership, kickoff, and opponent |
| Game-by-game production | `games players` | Passing, rushing, receiving, defensive, kicking, and other box-score rows |
| Bounded season production | `stats player season` | Player aggregates with category and week-range filters |
| Play success and efficiency | `stats player success`, `stats player success game`, `ppa players games`, `ppa players season` | Play counts, success rates, and player PPA at game or season scope |
| Usage and overview | `player usage`, `player season overview` | Season-level usage shares and composite player summaries |
| Play associations | `plays stats types`, `plays stats`, `plays` | Player-to-play stat associations joined to down, distance, clock, score, and PPA context |
| Opponent and game context | `stats season advanced`, `stats game advanced`, `games teams`, `drives` | Opponent efficiency, pace-related counts, box statistics, and drive context |
| Personnel changes | `player portal`, `player returning`, `roster` | Transfer context, team continuity, and current roster records |
| Environment | `games weather`, `venues` | CFBD weather fields when available and venue attributes |

Run `fbs <complete leaf command> --help` before selecting flags. Resolve one player and game first, then reuse their IDs.

### FBS limitations

- FBS does not provide live prop quotes, sportsbook settlement rules, authoritative injury status, depth charts, route participation, or literal snap counts.
- `player usage` is a season-level opportunity-share view, not snaps, routes, targets, depth rank, availability, or a week-bounded historical snapshot.
- `player season overview` and player WEPA endpoints are current/full-season views without historical week cutoffs.
- `player returning` describes retained team production and usage, not a named player's current workload.
- `plays stats` is capped at 2,000 rows with no CLI pagination. A broad result at the cap may be incomplete.
- A missing record is not zero production, and a tier or transport failure is not an empty sample.
- Box stats, usage, success, PPA, WEPA, and play summaries often share underlying plays.

## When to use the web

Use web research when the prop depends on:

- Current availability, practice participation, or an official designation.
- Depth charts, starting roles, rotations, snap or route participation, target context, or red-zone roles.
- Coaching statements and recent personnel changes.
- A current line, attached price, period, provider rules, or settlement treatment.
- Current weather or late game-status news.
- A role-relevant fact absent from FBS or blocked by tier, cap, or stale endpoint scope.

Do not web-search ordinary historical production that adequate FBS results already establish.

## Use the bundled catalog

Open [sources.yaml](sources.yaml) when web evidence is material. Relevant categories commonly include:

- `official_availability_reports`
- `official_depth_charts`
- `official_game_notes`
- `player_usage`
- `beat_reporting`
- `play_by_play`
- `transactions` and `transfer_portal`

Match team and conference scope before using an entry. Prefer official current material for status and depth, then reputable independent reporting for role context and corroboration. Follow every entry's `guidance` and `limitations`.

For `public_client_rendered` sources, use a rendering-capable browser or report that the source could not be inspected. Verify season, publication/update time, and applicability to the target game. The catalog is not exhaustive and does not guarantee freshness; search more broadly when it lacks a suitable source.

Do not use snippets as decisive evidence, bypass access controls, or treat a failed search as proof of absence. Preserve URL, publisher, publication/update time when available, retrieval time, and important caveats.
