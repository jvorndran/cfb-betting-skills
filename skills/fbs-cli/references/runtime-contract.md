# FBS runtime contract

Read this reference when installing the CLI, configuring credentials, invoking commands, or recovering from a structured failure.

## Install and authenticate

- Use Node.js 22.12 or newer. Install with `npm install --global @jvorndran/fbs-cli`, or run an occasional command with `npx --yes @jvorndran/fbs-cli@latest <arguments>`.
- In the source repository, use `bun run src/cli.ts <arguments>`. Bun is a development dependency, not an npm-user requirement.
- Obtain a CFBD key from <https://collegefootballdata.com/key>. Never put it in a command argument, log, issue, agent prompt, or chat.
- Credential precedence is an existing `CFBD_API_KEY` environment value, then `CFBD_API_KEY` in `.env` in the current working directory. There is no global credential store.
- `fbs auth` accepts a masked TTY entry or piped stdin. It validates the candidate with exactly one authenticated `GET /info`, then creates or updates the working-directory `.env` while preserving unrelated entries. Validation failure leaves the file unchanged.
- Interactive auth explains the request and save before prompting. Piped auth emits neither prose nor a prompt.
- After auth, inspect `active_source`. `env_file` means the saved value will be used; `environment` means an existing process value still wins and the precedence warning must be surfaced.
- `.env` is plaintext and must remain ignored by Git.

## Invoke a command

1. Run `fbs --version` and verify that the executable implements the stable version 1 contract before relying on this skill's schemas. Record the executable path and version in material evidence. If an older global install shadows the source repository, use `bun run src/cli.ts <arguments>` from the repository or update the install; never silently mix envelopes from different major contracts.
2. Run `fbs --help` to find a family, then `fbs <complete leaf path> --help` for its exact flags, enums, validation rules, and examples.
3. Put flags after the complete leaf path and quote multiword values: `fbs games --year 2026 --team "Florida State"`.
4. Treat kebab-case flags as direct mappings to provider query fields: `--game-id` becomes `gameId`, `--player-id` becomes `playerId`, and `--season-type` becomes `seasonType`. Do not invent aliases.
5. Bare switches such as `--exclude-garbage-time`, `--latest`, and `--final` mean boolean `true`.
6. A leaf inherits an explicitly supplied ancestor flag only if the leaf exposes the same flag; a duplicate leaf-position flag wins. An unsupported ancestor flag produces `cli_parse_error` and exit 2.
7. Whitespace-only free text produces `invalid_query`; correct it instead of retrying unchanged.

Every endpoint call consumes CFBD quota. Prefer one narrow request and reuse provider IDs in follow-ups.

## Parse streams and exits

A successful endpoint command writes exactly one YAML document to stdout and no prose:

```yaml
command: games
endpoint: /games
query:
  year: 2026
count: 1
games: []
```

Verify the command, endpoint, supplied query, count, and endpoint-specific final key. Output uses snake_case, omits only null and undefined values, and preserves zero, false, IDs, arrays, and numeric precision. Parse additive unknown keys safely; do not depend on textual key order.

`fbs auth` is the only success-envelope exception:

```yaml
command: auth
status: saved
env_file: /project/.env
```

A failure writes exactly one YAML `error` document to stderr, keeps stdout empty, and exits nonzero:

```yaml
error:
  code: cfbd_bad_request
  status: 400
  message: year is required when id is not specified
  command: games
  query:
    team: Florida State
  hint: Supply --year or query a game with --id.
```

Exit classes are stable:

- `0`: success, help, version, or quiet stdout `EPIPE`.
- `2`: locally correctable invocation, query, or credential configuration failure.
- `1`: provider, network, filesystem, or unexpected runtime failure.

## Recover by error code

| Code | Response |
|---|---|
| `missing_api_key` | Set `CFBD_API_KEY` or run `fbs auth` in the intended working directory. Do not request the key in chat. |
| `invalid_api_key` | If sourced from the environment, replace or unset that value. If sourced from `.env`, rerun auth. |
| `env_file_read_failed` | Fix working-directory `.env` permissions. |
| `env_file_invalid` | Fix `.env` syntax. |
| `unsafe_env_file` | Replace a symlink or non-regular `.env` with a regular file. |
| `cli_parse_error` or `invalid_query` | Apply the deterministic hint and executable leaf help. |
| `network_timeout` | The 30-second request timed out. Retry deliberately; narrow broad queries first. There is no automatic retry. |
| `cfbd_invalid_response` | Treat the provider payload as invalid, not empty. For `games teams`, normalized stat categories may have collided. |
| authorization, tier, rate, or provider errors | Preserve the error in the research record. Do not reinterpret it as an empty collection. |

A downstream pipe may close stdout early and yield quiet `EPIPE` success. Do not infer complete or missing data from that event alone.

## Side effects and limits

- Endpoint commands are read-only. `fbs auth` is the only command that prompts or writes locally.
- The CLI has no provider writes, custom pagination, cache, database, RAG, file export, output-format switch, model execution, or hidden analysis.
- Do not run live smoke tests during research.
- Package installation includes the skill files but does not activate them in an agent host; use that host's normal skill installation or linking workflow.

See [compatibility.md](compatibility.md) for the stable version 1 surface.
