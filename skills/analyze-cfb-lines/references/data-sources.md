# Data Sources for CFB Lines

Start with the evidence gap, not a desire to call every endpoint. Run `fbs <complete leaf command> --help` before choosing flags, use narrow queries, and reuse returned IDs.

## What FBS CLI can provide

| Expert question | Useful FBS commands | What they add |
| --- | --- | --- |
| Game identity and schedule | `games`, `calendar`, `scoreboard` | CFBD game ID, teams, kickoff, week, season type, status, venue, and available scoreboard betting fields |
| Historical market context | `lines`, `teams ats`, scoreboard betting fields | Historical provider spreads, totals, moneylines, and descriptive team-year ATS context |
| Baseline team quality | `records`, `ratings sp`, `ratings srs`, `ratings elo`, `ratings fpi`, `rankings`, `wepa team season` | Strength priors, opponent-adjusted context, schedule or rating information, and regression anchors |
| Unit efficiency and trenches | `stats season advanced`, `stats game advanced`, `stats game havoc`, `wepa team season`, `wepa players passing`, `wepa players rushing` | PPA, success, explosiveness, rushing/passing splits, havoc, line-yard or related unit context, pressure/production indicators, and opponent-adjusted views when returned |
| Play and drive mechanics | `ppa teams`, `ppa games`, `drives`, `plays`, `plays stats`, `metrics wp` | Early-down and situation context, drive starts/ends, down-and-distance, play descriptions, efficiency by game, and win-probability paths |
| Game-state and box variance | `games teams`, `game box advanced`, `scoreboard` | Scoring, turnovers, penalties, possessions, field position, opportunities, advanced box context, and final-state information |
| Personnel and continuity | `roster`, `player returning`, `player portal`, `talent`, `player usage` | Player identity, retained production or usage, transfers, roster depth, and team talent context |
| Venue and environment | `venues`, `games weather`, `games media` | Surface and venue attributes, CFBD weather fields when available, and broadcast or kickoff context |

Use the commands that connect to the causal thesis. For example, a trench hypothesis should combine unit efficiency with pressure/havoc, down-and-distance, personnel continuity, and the opponent's likely protection or run plan—not just a season scoring average.

## FBS limitations

- `lines` and scoreboard fields are historical context, not proof of a current executable quote, complete provider consensus, attached price, observation time, or settlement rules.
- `teams ats` is descriptive team-year history, not a prediction or evidence of current market skill.
- FBS does not guarantee complete public ticket/handle splits, sportsbook limits, live market depth, literal snap counts, route detail, scheme explanations, or a dated historical snapshot for every metric.
- Current/full-season ratings, usage, returning production, and some opponent-adjusted endpoints can leak later information into a historical pregame analysis unless a dated snapshot exists.
- Several advanced metrics derive from the same underlying plays. More endpoints do not automatically mean more independent evidence; preserve source lineage.
- Weather fields can be tier-limited, stale, or missing for an upcoming kickoff.
- A tier denial, rate limit, timeout, or capped result is an evidence gap, not an empty sample. If a required FBS command fails, stop under the main skill's readiness rule rather than silently replacing it with guesses.

## Kalshi public data

Use the public `kalshi` CLI when the question involves a compatible Kalshi contract:

- Discover `series`, `events`, and `markets` before selecting a ticker.
- Use market detail for contract terms, close time, resolution source, and current provider fields.
- Use orderbooks for bid/ask depth and liquidity, trades for historical prints, and candlesticks for price history.
- Treat trades and candle closes as historical observations. Do not invent an ask or midpoint from bid-only depth.
- Verify the selected side, threshold, close time, fees, and resolution rules before comparing it with a sportsbook market.

The supported CLI routes are read-only and unauthenticated. No Kalshi API key is needed.

## When to use the web

Use targeted web research for material facts that FBS cannot provide or may not keep current:

- Current injuries, availability, depth charts, expected roles, line combinations, and late weather.
- Coaching comments, practice observations, formations, tempo or coordinator changes, and qualitative scheme information.
- Current sportsbook quotes, rules, limits, consensus history, ticket/handle splits, or market pages controlled by a provider.
- Information outside FBS or unavailable because an endpoint is stale, capped, tier-blocked, or missing.

Do not use web search to re-collect historical schedules, box scores, or metrics already available from adequate structured evidence. Do not treat search snippets as evidence.

### Use the bundled catalog

Open [sources.yaml](sources.yaml) only when web evidence is needed.

1. Match `categories` to the evidence gap, including availability, depth, game notes, player usage, beat reporting, play-by-play, and transactions.
2. Respect `scope.kind` and any team or conference `scope.id`.
3. Prefer `authority: official` for availability, depth charts, game notes, and transactions; use reputable independent reporting for roles and corroboration.
4. Follow each entry's `guidance`, `limitations`, and `access` fields.
5. For `public_client_rendered`, use an available rendering-capable browser. If none exists, disclose the access limitation.
6. Verify the page is for the intended season and that the relevant item predates the decision cutoff.

The catalog is a lead list, not an endorsement or freshness guarantee. If no suitable entry exists for market psychology, public splits, or another material gap, search more broadly and prefer primary official pages, then reputable reporting. For changing claims, preserve the page URL, publisher, publication or update time when available, retrieval time, and material limitations.
