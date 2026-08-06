# Data Sources for CFB Lines

Use this reference to select evidence. Start with the question, not with a desire to call every endpoint.

## What FBS CLI can provide

| Question | Useful FBS commands | What they add |
| --- | --- | --- |
| Game identity and schedule | `games`, `calendar`, `scoreboard` | CFBD game ID, teams, kickoff, week, season type, status, and current scoreboard fields |
| Historical market context | `lines`, `teams ats`, scoreboard betting fields | Historical provider lines and team-season ATS summaries |
| Team results and box context | `games teams`, `records`, `game box advanced` | Scoring, turnovers, penalties, possession, field position, opportunities, and advanced box context |
| Efficiency and style | `stats season advanced`, `stats game advanced`, `stats game havoc` | PPA, success, explosiveness, rushing/passing splits, havoc, line yards, pace-related counts, and field position |
| Play-derived context | `ppa teams`, `ppa games`, `drives`, `plays`, `metrics wp` | Efficiency by unit or game, drive context, play situations, and win-probability paths |
| Opponent adjustment and priors | `wepa team season`, `ratings sp`, `ratings srs`, `ratings elo`, `ratings fpi`, `rankings` | Provider-derived team strength and opponent-adjusted context |
| Personnel and continuity | `roster`, `player returning`, `player portal`, `talent` | Roster identity, retained production/usage, transfer movement, and team talent |
| Venue and environment | `venues`, `games weather`, `games media` | Venue attributes, CFBD weather fields when available, and broadcast context |

Run `fbs <complete leaf command> --help` before choosing flags. Use narrow queries and reuse returned IDs.

### FBS limitations

- `lines` and scoreboard fields are historical context, not proof of a current executable quote, attached spread/total price, observation time, or settlement rules.
- `teams ats` is a descriptive team-year summary, not a prediction.
- Current/full-season ratings, usage, returning production, and some opponent-adjusted endpoints can leak later information into a historical pregame analysis unless a dated snapshot exists.
- Several advanced metrics derive from the same underlying plays. More endpoints do not automatically mean more independent evidence.
- Weather fields can be tier-limited or stale for an upcoming kickoff.
- A tier denial, rate limit, timeout, or capped result is an evidence gap, not an empty sample.

## Kalshi public data

Use the public `kalshi` CLI when the requested question involves a compatible Kalshi contract:

- Discover `series`, `events`, and `markets` before selecting a ticker.
- Use market detail for contract terms and current provider fields.
- Use orderbooks for bid depth, trades for historical prints, and candlesticks for price history.
- Treat trades and candle closes as historical observations. Do not invent an ask or midpoint from bid-only depth.
- Verify that the selected side, threshold, close time, and resolution rules match the football question.

The supported CLI routes are read-only and unauthenticated. No Kalshi API key is needed.

## When to use the web

Use web research when a material fact is:

- Current and likely to change: availability, injuries, depth, roles, late weather, or a live market observation.
- Qualitative: coaching comments, scheme changes, practice reports, or reasons behind a role change.
- Provider-controlled: sportsbook rules, settlement treatment, limits of a displayed market, or the exact DFS/sportsbook page.
- Outside FBS or unavailable because a relevant endpoint is stale, capped, or tier-blocked.

Do not use web search to re-collect historical schedules, box scores, or metrics already available from adequate structured evidence.

### Use the bundled catalog

Open [sources.yaml](sources.yaml) only when web evidence is needed.

1. Match `categories` to the gap.
2. Respect `scope.kind` and any team or conference `scope.id`.
3. Prefer `authority: official` for availability, depth charts, game notes, and transactions.
4. Follow every entry's `guidance` and `limitations`.
5. For `public_client_rendered`, use an available rendering-capable browser. If none exists, disclose the gap.
6. Verify the page is for the intended season and that the relevant item predates the decision cutoff.

The catalog is a lead list, not an endorsement or freshness guarantee. If no suitable entry exists, search more broadly and prefer primary official pages, then reputable reporting. Do not rely on search snippets, bypass access controls, or infer absence from a failed search.

For changing claims, preserve the page URL, publisher, publication or update time when available, retrieval time, and material limitations.
