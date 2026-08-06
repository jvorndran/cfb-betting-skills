---
name: fbs-cli
description: Query CollegeFootballData through the read-only FBS CLI. Use for CLI setup, command or filter selection, schedules, rosters, games, box scores, plays, team or player statistics, historical lines and ATS, ratings, recruiting, transfers, coaches, live data, multi-endpoint retrieval, YAML parsing, and error recovery.
---

# FBS CLI

Use `fbs` as a thin retrieval layer. It mirrors all 71 GET routes in the pinned `cfbd` 5.21.0 client and returns deterministic YAML; perform analysis after retrieval.

## First-run setup

A skills.sh install provides this skill's instructions only; it does not install the executable or configure a credential automatically.

- Run `fbs --version` before retrieval. If it is unavailable, install it with `npm install --global @jvorndran/fbs-cli` when the environment permits, then rerun the check. Do not retrieve CFBD data until the version check succeeds.
- CFBD requires an API key. If no credential is configured, direct the user to <https://collegefootballdata.com/key>, then run or have the user complete `fbs auth` from the project where the skill will run. The prompt is masked and saves the validated key to the working-directory `.env` file.
- Run `fbs info` as the authenticated readiness check after installation and credential setup. If it fails for any reason, stop and report the setup or provider error; do not fall back to web data or continue with endpoint retrieval.
- Never ask the user to paste a key into chat or an agent prompt. An existing `CFBD_API_KEY` environment value is also supported and takes precedence over `.env`.

## Start here

1. Prefer user-supplied structured data. Query CFBD only for a specific unresolved question.
2. If setup or authentication is needed, read [runtime-contract.md](references/runtime-contract.md), install the CLI if necessary, and complete authentication before retrieval. Never ask the user to paste an API key into chat.
3. Verify `fbs --version` and the executable path before relying on this skill's stable version 1 envelope. If an older global install shadows the source repository, follow [runtime-contract.md](references/runtime-contract.md); do not mix major contracts silently.
4. Run `fbs <complete leaf path> --help` before guessing a flag. If the leaf command is unclear, read [command-index.md](references/command-index.md).
5. Set the research `as_of` and cutoff, issue the smallest useful query, and reuse returned game, player, coach, drive, and play IDs.
6. Parse stdout only on exit `0`. Record the exact invocation and returned envelope. On failure, parse the structured stderr error and keep stdout empty.

## Choose the smallest flow

| Need | Start | Add only when it answers a distinct question |
|---|---|---|
| Week or slate | `fbs games --year Y --week W --season-type regular` | `calendar` only to resolve the week; `games media` for broadcast; `scoreboard` for richer current status. |
| One game | `fbs games --id ID` | `games teams`, `games players`, then targeted advanced box, drives, plays, or win probability. |
| Team matchup | Bounded `stats season advanced` after resolving both teams | Roster/continuity, game-level detail, then one opponent-adjusted or rating view if it adds a unique dimension. |
| Player | `player search` or `roster`, then reuse `player_id` | Bounded player season/success or game rows; play associations only for a stated role question. |
| Historical market | `fbs lines --game-id ID` | `teams ats` for descriptive context; obtain live price, quote time, and rules elsewhere. |
| Reproduction or audit | Rerun the recorded exact command | Compare the envelope, IDs, cutoff, preserved boundary values, and structured errors. |

Stop when another endpoint would only repeat a CFBD-derived dimension. Several FBS commands are complementary views of the same upstream games and plays, not independent corroboration.

## Protect the cutoff and semantics

- Include only games completed before the target kickoff. Record their IDs; do not trust `end-week: N-1` until the schedule proves it matches that set.
- Use week-bounded season/player endpoints for historical pregame aggregates. Reconstruct from eligible game rows when Week 0, postponements, or rescheduling break the week boundary.
- Treat team PPA, WEPA, SP/SRS/FPI, records, player usage, player season overview, and returning production as current/full-season views unless an archived snapshot establishes the historical state.
- `player returning` reports retained PPA and usage, not returning snaps. `player usage` reports usage shares, not snaps, routes, depth charts, or availability.
- Scope `plays stats` narrowly; CFBD caps it at 2,000 rows and the CLI does not page.
- Preserve tier, authorization, timeout, rate, and provider failures as errors. Never convert them into an empty collection.
- Treat `lines`, ATS, and scoreboard betting fields as historical read-only context. They do not establish a current executable quote, attached spread/total price, provider observation time, or settlement rules.

## Read the YAML correctly

Success is one YAML document on stdout:

```yaml
command: games
endpoint: /games
query:
  year: 2026
count: 1
games: []
```

- Verify `command`, `endpoint`, supplied `query`, `count`, and the endpoint-specific final key.
- Preserve `0`, `false`, IDs, arrays, and numeric precision. Omitted provider fields remain unknown.
- Treat `count: 0` with the correct empty final collection as a successful no-row response, not proof of numeric zero or confirmed absence.
- For every material call, retain CLI version, exact command, exit code, retrieval time, applicable cutoff, included IDs, result key, CFBD lineage, and any structured error.

Failures are one `error` document on stderr with a nonzero exit. Apply a deterministic `hint` when present; do not repeatedly retry broad queries. Read [runtime-contract.md](references/runtime-contract.md) for credential precedence, exit classes, YAML failure details, and recovery rules.

## Boundaries

- Endpoint commands are read-only and consume CFBD quota. `fbs auth` is the only interactive or local-write command.
- Do not expect writes, custom pagination, caching, file export, output-format switches, model execution, or hidden analysis.
- Never run the live smoke-test suite during research.

## Load details only when needed

- [command-index.md](references/command-index.md): all 71 commands, endpoint/result keys, required filters, enums, and endpoint-specific caveats.
- [runtime-contract.md](references/runtime-contract.md): installation, authentication, invocation rules, YAML streams, errors, and side effects.
- [compatibility.md](references/compatibility.md): the stable version 1 contract.

FBS CLI is an independent community project built on CollegeFootballData and its official `cfbd` client. It is not affiliated with or endorsed by CollegeFootballData or Rad Sports Analytics.
