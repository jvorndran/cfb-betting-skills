# Data Sources for CFB DFS

Separate provider-controlled slate facts from football enrichment.

## Provider-required data

Obtain these from the DFS provider, user export, or published contest rules:

- Provider/site, slate, contest type, included games, lock time, and timezone.
- Provider player/game IDs, salaries, positions, eligibility, and slate membership.
- Salary cap, roster slots, scoring, multipliers, team/game restrictions, lock, and late-swap rules.
- Optional projections and ownership, including their creator and observation time.

FBS does not provide DFS salaries, provider eligibility, slate membership, contest rules, scoring, projections, ownership, lock state, or an authoritative injury feed.

## What FBS CLI can provide

| Question | Useful FBS commands | What they add |
| --- | --- | --- |
| Slate game crosswalk | `games`, `scoreboard` | CFBD game IDs, teams, kickoff, status, and home/away orientation |
| Player identity | `player search`, `roster` | CFBD player IDs, position, team, and roster context |
| Game-by-game production | `games players` | Player box statistics by game and category |
| Bounded player history | `stats player season`, `stats player success`, `stats player success game` | Week-bounded production, play counts, and success rates |
| Player efficiency | `ppa players games`, `ppa players season`, player WEPA commands | Game/season efficiency and opponent-adjusted player views |
| Usage and role context | `player usage`, `player season overview` | Season-level usage shares and player summaries |
| Opponent and game environment | `stats season advanced`, `stats game advanced`, `games teams`, `drives`, `plays` | Opponent efficiency, pace-related counts, box, drive, and play context |
| Personnel change | `player portal`, `player returning`, `roster` | Transfers, team continuity, and roster records |
| Weather and venue | `games weather`, `venues` | CFBD weather fields when available and venue attributes |

Run `fbs <complete leaf command> --help` before selecting flags. Resolve the slate schedule once, batch team/category history, and reserve player-specific or play-level calls for ambiguous identities or finalists.

### FBS limitations

- `player usage` is not snaps, routes, targets, a projection, a depth chart, or a week-bounded historical view.
- Player season overview and player WEPA are current/full-season views.
- Returning production is a team continuity measure, not a projection for a named player.
- `plays stats` is capped at 2,000 rows with no CLI pagination.
- A missing CFBD roster match does not overrule an authoritative provider row.
- Usage, success, PPA, WEPA, and advanced metrics often overlap in lineage.
- Tier, cap, or transport failures are evidence gaps rather than zeroes.

## When to use the web

Use web research for:

- Current availability, depth, rotation changes, and late scratches.
- Provider rules or public slate details not present in the supplied export.
- Current weather that may affect the slate.
- Publicly available projections or ownership when the user requests them and their source can be identified.
- Coaching comments, practice news, and material role changes absent from FBS.

Do not use web sources to override provider salaries, eligibility, or slate membership.

## Use the bundled catalog

Open [sources.yaml](sources.yaml) only when a current external fact matters. Common categories include official availability reports, depth charts, game notes, player usage, beat reporting, and transfers.

Match team or conference scope and verify the season. Prefer official current sources for availability and depth; use reputable independent reporting for role context and corroboration. Follow every entry's `guidance` and `limitations`.

Use a rendering-capable browser for `public_client_rendered` entries or disclose that the source could not be inspected. If the catalog has no appropriate source, search broadly and prefer primary provider/team pages, then reputable reporting.

Do not rely on snippets, bypass access controls, or infer absence from a failed search. Preserve URL, publisher, publication/update time when available, retrieval time, and material caveats.
