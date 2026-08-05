# FBS command index

Use this reference only to select an endpoint or confirm its result key and required filters. Executable `fbs <complete leaf path> --help` remains authoritative for the exact current flags, enum choices, and examples.

## Contents

- Account, teams, and reference data
- Games, drives, and plays
- Statistics, players, and metrics
- Recruiting, ratings, playoffs, draft, and coaches
- Shared filters and cutoff capability
- Important output semantics

## Account, teams, and reference data

| Command | Endpoint -> key | Required rule |
|---|---|---|
| `fbs info` | `/info` -> `info` | No filters. |
| `fbs info usage` | `/info/usage` -> `usage` | Optional; `--days` is 1-31 and `--limit` is 1-50. |
| `fbs conferences` | `/conferences` -> `conferences` | No filters. |
| `fbs talent` | `/talent` -> `talent` | Require `--year`. |
| `fbs venues` | `/venues` -> `venues` | No filters. |
| `fbs records` | `/records` -> `records` | Require `--year` or `--team`. |
| `fbs calendar` | `/calendar` -> `calendar` | Require `--year`. |
| `fbs scoreboard` | `/scoreboard` -> `scoreboard` | Filters optional; may require an eligible tier and can include embedded betting fields. |
| `fbs teams` | `/teams` -> `teams` | Filters optional. |
| `fbs teams fbs` | `/teams/fbs` -> `teams` | Optional `--year`. |
| `fbs teams matchup` | `/teams/matchup` -> `matchup` | Require `--team1` and `--team2`; keep `--min-year <= --max-year`. |
| `fbs teams ats` | `/teams/ats` -> `team_ats` | Require `--year`; optional `--team` and `--conference`. |
| `fbs roster` | `/roster` -> `players` | Filters optional. |

## Games, box scores, and live data

| Command | Endpoint -> key | Required rule |
|---|---|---|
| `fbs games` | `/games` -> `games` | Require `--id` or `--year`; `--round` requires `--competition cfp`. |
| `fbs games teams` | `/games/teams` -> `games` | Require `--id`, or `--year` plus `--week`, `--team`, or `--conference`. |
| `fbs games players` | `/games/players` -> `player_stats` | Same ID-or-scoped-year rule as `games teams`. |
| `fbs games weather` | `/games/weather` -> `weather` | Require `--game-id` or `--year`; may require an eligible tier. |
| `fbs games media` | `/games/media` -> `media` | Require `--year`. |
| `fbs lines` | `/lines` -> `lines` | Require `--game-id` or `--year`; historical provider context only. |
| `fbs game box advanced` | `/game/box/advanced` -> `box_score` | Require `--id`; may require an eligible tier. |
| `fbs live plays` | `/live/plays` -> `live_game` | Require `--game-id`; may require an eligible tier. |
| `fbs drives` | `/drives` -> `drives` | Require `--year`. |
| `fbs plays` | `/plays` -> `plays` | Require both `--year` and `--week`. |
| `fbs plays stats` | `/plays/stats` -> `play_stats` | Filters optional; scope narrowly because CFBD caps results at 2,000 rows and the CLI does not page. |
| `fbs plays stats types` | `/plays/stats/types` -> `play_stat_types` | No filters. |
| `fbs plays types` | `/plays/types` -> `play_types` | No filters. |

## Statistics and players

| Command | Endpoint -> key | Required rule |
|---|---|---|
| `fbs stats game advanced` | `/stats/game/advanced` -> `advanced_game_stats` | Require `--year` or `--team`. |
| `fbs stats game havoc` | `/stats/game/havoc` -> `game_havoc_stats` | Require `--year` or `--team`. |
| `fbs stats season` | `/stats/season` -> `team_stats` | Require `--year` or `--team`; keep `--start-week <= --end-week`. |
| `fbs stats season advanced` | `/stats/season/advanced` -> `advanced_season_stats` | Same year/team and week-range rules. |
| `fbs stats player season` | `/stats/player/season` -> `player_season_stats` | Require `--year`; keep the week range ordered. |
| `fbs stats player success` | `/stats/player/success` -> `player_success_rates` | Require `--year` or `--player-id`; keep the week range ordered. |
| `fbs stats player success game` | `/stats/player/success/game` -> `player_game_success_rates` | Require `--year` plus `--week`, `--team`, or `--player-id`. |
| `fbs stats categories` | `/stats/categories` -> `categories` | No filters. |
| `fbs player usage` | `/player/usage` -> `player_usage` | Require `--year`. |
| `fbs player search` | `/player/search` -> `players` | Require `--search-term`. |
| `fbs player season overview` | `/player/season/overview` -> `player_season_overview` | Require `--year` and `--player-id`. |
| `fbs player returning` | `/player/returning` -> `returning_production` | Require `--year` or `--team`. |
| `fbs player portal` | `/player/portal` -> `transfers` | Require `--year`. |

## PPA, probability, and opponent adjustment

| Command | Endpoint -> key | Required rule |
|---|---|---|
| `fbs ppa predicted` | `/ppa/predicted` -> `predicted_points` | Require `--down` and `--distance`; down is 1-4. |
| `fbs ppa teams` | `/ppa/teams` -> `team_ppa` | Require `--year` or `--team`. |
| `fbs ppa games` | `/ppa/games` -> `game_ppa` | Require `--year`. |
| `fbs ppa players games` | `/ppa/players/games` -> `player_game_ppa` | Require `--year` plus `--week` or `--team`. |
| `fbs ppa players season` | `/ppa/players/season` -> `player_season_ppa` | Require `--year` or `--player-id`. |
| `fbs metrics wp` | `/metrics/wp` -> `win_probability` | Require `--game-id`. |
| `fbs metrics wp pregame` | `/metrics/wp/pregame` -> `pregame_win_probabilities` | Filters optional. |
| `fbs metrics fg ep` | `/metrics/fg/ep` -> `field_goal_expected_points` | No filters. |
| `fbs wepa team season` | `/wepa/team/season` -> `team_metrics` | Filters optional. |
| `fbs wepa players passing` | `/wepa/players/passing` -> `player_metrics` | Filters optional. |
| `fbs wepa players rushing` | `/wepa/players/rushing` -> `player_metrics` | Filters optional. |
| `fbs wepa players kicking` | `/wepa/players/kicking` -> `kicker_ratings` | Filters optional. |

## Recruiting, ratings, and rankings

| Command | Endpoint -> key | Required rule |
|---|---|---|
| `fbs recruiting players` | `/recruiting/players` -> `recruits` | Require `--year` or `--team`. |
| `fbs recruiting teams` | `/recruiting/teams` -> `team_rankings` | Filters optional. |
| `fbs recruiting groups` | `/recruiting/groups` -> `recruiting_groups` | Filters optional; keep `--start-year <= --end-year`. |
| `fbs ratings sp` | `/ratings/sp` -> `sp_ratings` | Require `--year` or `--team`. |
| `fbs ratings sp conferences` | `/ratings/sp/conferences` -> `conference_sp_ratings` | Filters optional. |
| `fbs ratings srs` | `/ratings/srs` -> `srs_ratings` | Require `--year` or `--team`. |
| `fbs ratings srs expanded` | `/ratings/srs/expanded` -> `expanded_srs_ratings` | Require `--year` or `--team`. |
| `fbs ratings elo` | `/ratings/elo` -> `elo_ratings` | Filters optional. |
| `fbs ratings fpi` | `/ratings/fpi` -> `fpi_ratings` | Require `--year` or `--team`. |
| `fbs rankings` | `/rankings` -> `rankings` | Require `--year`; the supported poll is CFP. |

When `fbs ratings sp` receives `--year` and `--team`, it makes one full-year provider request and filters locally. Use one full-year response and filter several teams locally when comparing a slate; do not repeat the same provider request per team.

## Playoffs, draft, and coaches

| Command | Endpoint -> key | Required rule |
|---|---|---|
| `fbs playoffs cfp` | `/playoffs/cfp` -> `playoff` | Require `--year`. |
| `fbs playoffs cfp participants` | `/playoffs/cfp/participants` -> `participants` | Require `--year`. |
| `fbs playoffs cfp games` | `/playoffs/cfp/games` -> `games` | Require `--year`. |
| `fbs draft teams` | `/draft/teams` -> `draft_teams` | No filters. |
| `fbs draft positions` | `/draft/positions` -> `draft_positions` | No filters. |
| `fbs draft picks` | `/draft/picks` -> `draft_picks` | Filters optional. |
| `fbs coaches` | `/coaches` -> `coaches` | Filters optional; keep `--min-year <= --max-year`. |
| `fbs coaches profile` | `/coaches/profile` -> `coach_profile` | Require `--coach-id`. |
| `fbs coaches seasons` | `/coaches/seasons` -> `coach_seasons` | Filters optional; keep `--min-year <= --max-year`. |
| `fbs coaches tenures` | `/coaches/tenures` -> `coach_tenures` | Filters optional; `--active` accepts `true` or `false`. |

## Shared filters

Use these generated-client domains:

- `--season-type`: `regular`, `postseason`, `both`, `allstar`, `spring_regular`, `spring_postseason`
- `--classification`: `fbs`, `fcs`, `ii`, `iii` for division; `JUCO`, `PrepSchool`, `HighSchool` for recruiting
- `--recruit-type`: `JUCO`, `PrepSchool`, `HighSchool`
- `--media-type`: `tv`, `radio`, `web`, `ppv`, `mobile`
- `--competition` and `--poll`: `cfp`
- `--round`: `first_round`, `quarterfinal`, `semifinal`, `championship`
- `--api`: `all`, `cfb`, `cbb`

Kebab-case flags map directly to CFBD fields. Put flags after the complete leaf path, quote multiword values, and never invent an alias. Bare switches such as `--exclude-garbage-time`, `--latest`, and `--final` mean boolean `true`. Whitespace-only text is `invalid_query`.

## Cutoff capability

| Family | Historical pregame use |
|---|---|
| Season stats and player success with week ranges | Use a verified week range, then confirm its included completed game IDs. |
| Game advanced, havoc, PPA, player success, team/player box rows | Keep only games completed before the target kickoff. |
| Elo and CFP rankings | Use a dated weekly snapshot available at the cutoff. |
| Team PPA, WEPA, SP/SRS/FPI, records, player usage/overview, returning production | Require an archived pre-cutoff snapshot or exclude from historical pregame evidence. |
| Drives, plays, win probability, advanced box | Use only after that game was completed at the simulated cutoff. |

## Important semantics

- `games.status` is only `completed` or `not_completed`; inspect `completed`, and use `scoreboard` for richer current status.
- `player returning` contains retained PPA and usage shares, not returning snaps. `player usage` contains usage shares, not snaps, routes, depth charts, or injuries.
- `metrics wp pregame` includes provider spread context; it is not independent of the market input it embeds.
- `lines` has historical provider spread/total/moneyline fields but no spread/total price, provider quote timestamp, or settlement rules.
- Join box rows by `(game_id, player_id, category, stat_type)`. Join play associations by `(game_id, play_id, athlete_id, stat_type)` and play context by `(game_id, play_id)`, never description text.
- Discover `stat_type_id` through `plays stats types`; do not guess it.
