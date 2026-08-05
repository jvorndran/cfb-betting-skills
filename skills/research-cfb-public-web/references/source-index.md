# Public CFB Source Index

Use this bundled index to choose sources before invoking Tavily. When the host supplies an additional governed registry, read its guidance and limitations only for selected IDs.

Selection order: exact official team source → applicable official conference source → attributable team reporting → official national source → independent national source. Category and scope must both be relevant.

| Source ID | Categories | Scope | Authority / access | Domains | Key constraint |
| --- | --- | --- | --- | --- | --- |
| `north-carolina-football-official` | official_rosters, official_game_notes, official_depth_charts | North Carolina | official / public | goheels.com | Seed the exact current roster hub at `goheels.com/sports/football/roster/2026`; roster presence does not prove availability or role. |
| `tcu-football-official` | official_rosters, official_game_notes, official_depth_charts | TCU | official / public | gofrogs.com | Seed `gofrogs.com/sports/football/roster` and `gofrogs.com/sports/2026/6/29/2026-media-center`; placeholders are not a populated depth chart. |
| `notre-dame-football-media` | official_game_notes, official_depth_charts | Notre Dame | official / public | fightingirish.com | Team-produced depth charts can change. |
| `virginia-football-media-center` | official_game_notes, official_depth_charts | Virginia | official / public | virginiasports.com | Depth charts are projected, not snap assignments. |
| `georgia-tech-football-media` | official_game_notes, official_depth_charts | Georgia Tech | official / public | ramblinwreck.com | Locate the current season inside the archive. |
| `clemson-football-media` | official_game_notes | Clemson | official / public | clemsontigers.com | Distinguish current game notes from slower media guides. |
| `michigan-football-game-notes` | official_game_notes | Michigan | official / public | mgoblue.com | Filter the broad archive to the target season and game. |
| `acc-football-availability` | official_availability_reports | ACC | official / client-rendered | theacc.com | Conference games only; season-dated; never reuse a prior-season report as current. |
| `sec-football-availability` | official_availability_reports | SEC | official / client-rendered | secsports.com | Recheck timestamped late updates. |
| `big12-football-availability` | official_availability_reports | Big 12 | official / client-rendered | big12sports.com | Season-dated route; verify the current replacement. |
| `game-on-paper-player-usage` | player_usage | national | independent / public | gameonpaper.com | Recorded-play measures are not snaps; some targets are incomplete. |
| `cfbstats-player-usage` | player_usage | national | independent / public | cfbstats.com | Category-specific “Plays” is not snaps; bulk packages are commercial. |
| `ncaa-fbs-player-statistics` | player_usage | national | official / public | ncaa.com | Leader tables can omit low-volume players. |
| `national-weather-service` | weather | United States | official / public | weather.gov | Use a location-specific forecast only inside its credible horizon; retain issue and retrieval times. |
| `ross-dellenger-yahoo` | beat_reporting | national | independent / public | sports.yahoo.com | Use current CFB bylines; recheck role and access. |
| `matt-zenitz-cbs-sports` | beat_reporting | national | independent / public | cbssports.com | Filter out NFL coverage; recheck role and access. |
| `eleven-warriors-ohio-state` | beat_reporting | Ohio State | independent / public | elevenwarriors.com | Exclude forums, comments, recruiting projections, and opinion-only pieces. |
| `michigan-daily-football-beat` | beat_reporting | Michigan | independent / public | michigandaily.com | Separate reporting from columns and opinion. |
| `daily-texan-football-beat` | beat_reporting | Texas | independent / public | thedailytexan.com | Separate reporting from commentary and predictions. |
| `cbs-sports-college-football-play-by-play` | play_by_play | national | independent / public | cbssports.com | Coverage varies; no documented API or redistribution license. |
| `on3-football-transfer-portal-wire` | transactions, transfer_portal | national | independent / public | on3.com | Predictions are not transactions; corroborate consequential moves officially. |

The registry has no governed venue, sportsbook, DFS-rule, or most-team-specific source category beyond the entries above. Return `registry_gap` before any explicitly authorized unregistered fallback.
