# Data Sources for CFB DFS

Separate provider-controlled slate facts from football enrichment and supplied forecasts. Start with the missing decision input, not a desire to call every endpoint. Run `fbs <complete leaf command> --help` before selecting flags.

## Provider-required data

Obtain these from the DFS provider, a user export, or published contest rules:

- Provider/site, slate, contest type, included games, lock time, timezone, and payout structure.
- Provider player/game IDs, salaries, positions, eligibility, and slate membership.
- Salary cap, roster slots, scoring, multipliers, team/game restrictions, locks, late-swap rules, minimums, and maximums.
- Projections, floor/ceiling, ownership, and leverage estimates when used, including their creator and observation time.

FBS does not provide DFS salaries, provider eligibility, slate membership, contest rules, scoring, ownership, projections, lock state, contest payout structure, or an authoritative current injury feed. Never infer these from another provider.

## What FBS CLI can provide

| Expert question | Useful FBS commands | What they add |
| --- | --- | --- |
| Slate game crosswalk | `games`, `scoreboard` | CFBD game IDs, teams, kickoff, status, home/away orientation, and schedule context |
| Player identity | `player search`, `roster` | CFBD player IDs, position, team, roster context, and namesake disambiguation |
| Game-by-game production | `games players` | Player box statistics by game and category |
| Bounded player history | `stats player season`, `stats player success`, `stats player success game` | Week-bounded production when supported, play counts, and success rates |
| Player efficiency | `ppa players games`, `ppa players season`, player WEPA commands | Game/season efficiency and opponent-adjusted player views when returned |
| Usage and role context | `player usage`, `player season overview` | Season-level usage shares, opportunity context, and player summaries |
| Opponent and game environment | `stats season advanced`, `stats game advanced`, `games teams`, `drives`, `plays` | Opponent efficiency, pace-related counts, box, drive, play, pressure, and matchup context when returned |
| Personnel change | `player portal`, `player returning`, `roster` | Transfers, team continuity, and roster records |
| Weather and venue | `games weather`, `venues` | CFBD weather fields when available and venue attributes |

Use FBS to inform role, opportunity, efficiency, matchup, and game-script assumptions. Do not turn FBS output into an unlabelled DFS projection or ownership estimate.

## FBS limitations

- `player usage` is not snaps, routes, targets, a projection, a depth chart, or a week-bounded historical view.
- Player season overview and player WEPA are current/full-season views unless the leaf command explicitly supplies a historical boundary.
- Returning production is a team continuity measure, not a projection for a named player.
- `plays stats` is capped at 2,000 rows with no CLI pagination; capped results may be incomplete.
- A missing CFBD roster match does not overrule an authoritative provider row, but it does require identity reconciliation.
- Usage, success, PPA, WEPA, advanced metrics, and box summaries often share underlying plays.
- Tier, cap, rate-limit, or transport failures are evidence gaps rather than zeroes.

## When to use the web

Use targeted web research for:

- Current availability, depth, rotation changes, starters, late scratches, and role news.
- Provider rules or public slate details not present in the supplied export.
- Current weather that may affect the slate or game scripts.
- Publicly available projections, ownership, and leverage estimates when the user requests them and the creator/time can be identified.
- Coaching comments, practice news, quarterback or teammate changes, and qualitative role information absent from FBS.

Do not use web sources to override provider salaries, eligibility, scoring, slate membership, lock status, or contest rules. Do not rely on snippets or infer absence from a failed search.

## Use the bundled catalog

Open [sources.yaml](sources.yaml) only when a current external fact matters. Common categories include official availability reports, depth charts, game notes, player usage, beat reporting, play-by-play, and transfers.

Match team or conference scope. Prefer official current sources for availability and depth, then reputable independent reporting for role context and corroboration. Follow each entry's `guidance`, `limitations`, and `access` fields.

Use a rendering-capable browser for `public_client_rendered` entries or disclose that the source could not be inspected. If the catalog has no appropriate source, search broadly and prefer primary provider/team pages, then reputable reporting. Preserve URL, publisher, publication/update time when available, retrieval time, and material caveats.
