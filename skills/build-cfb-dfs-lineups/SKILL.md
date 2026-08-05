---
name: build-cfb-dfs-lineups
description: Build and validate provider-neutral college-football DFS candidate lineups from a user's slate, contest rules, salaries, projections, availability, and exposure preferences. Use for CFB daily-fantasy lineup construction, portfolio generation, salary-cap and roster-rule checking, stack or correlation analysis, exposure review, or when matchup research should be converted into DFS candidates. Never upload or submit entries.
---

# Build CFB DFS Lineups

Build reproducible candidate lineups from verified slate inputs. Treat every lineup as invalid until all applicable rules pass.

## Dependency preflight

Installing this skill by itself from skills.sh does not install sibling skills, the FBS CLI, or a CFBD credential. Do not install them without user authorization.

- Before CFBD retrieval, verify that `$fbs-cli` is available and run `fbs --version`. If either is missing, tell the user that Node.js 22.12 or newer is required and provide `npx skills add jvorndran/cfb-betting-skills --skill fbs-cli` plus `npm install --global @jvorndran/fbs-cli`.
- If no CFBD credential is configured, direct the user to <https://collegefootballdata.com/key> and ask them to run `fbs auth`. Never request the key in chat.
- If another requested sibling skill is missing, name it and provide `npx skills add jvorndran/cfb-betting-skills --skill SKILL_NAME`. If setup is unavailable or declined, continue only with applicable user-supplied or captured evidence and disclose the capability gap.

## Choose the presentation

At the start of a user-facing run, ask a short, capability-adjusted version of: **"How would you like this visualized: with this host's native interactive visualization or artifact feature, as a concise report in chat, as a persistent repository report or dashboard, or both?"** Offer only formats the current host can produce.

Skip the question only when the user already chose or an authorized parent passes `presentation_choice`. Inherit that choice and pass it to sibling skills so the user is asked once, not once per subtask. The choice changes presentation, not the evidence, provenance, calculation, or validation contract. Do not create visuals or report files before the choice exists. A persistent choice authorizes only new report and data artifacts in the already scoped workspace, not deployment or shared UI/configuration changes.

## Workflow

1. Establish the decision context.
   - Record provider/site, contest type, slate name, included games, lock time, timezone, entry count, and research `as_of` time.
   - Request or locate the salary file, roster slots, salary cap, position eligibility, and provider-specific restrictions.
   - Capture optional projections, ownership estimates, matchup contexts, exclusions, locks, stack rules, correlation preferences, and player or team exposure bounds.
2. Resolve inputs in this order:
   - Prefer user-supplied structured data.
   - Treat the provider salary/slate export and published contest rules as authoritative for provider IDs, salaries, positions, eligibility, slate membership, lock state, and roster constraints.
   - Reuse verified matchup-context artifacts when supplied, refreshing time-sensitive availability.
   - When CFBD evidence is needed, invoke `$fbs-cli` and follow the crosswalk, historical cutoff, batching, evidence packet, and endpoint ladder in [references/lineup-contract.md](references/lineup-contract.md). CFBD may enrich the pool but must not override provider-controlled facts.
   - Use applicable FBS roster, schedule, game, weather, and player-usage evidence before public-web retrieval. For remaining public provider-rule, slate-page, availability, role, or usage gaps, invoke `$research-cfb-public-web` when available with exact player, game, provider, cutoff, FBS attempts, and already-used sources. Preserve its registry coverage and Tavily search and extraction provenance. If it is unavailable, use another public-web tool only when permitted and disclose the fallback. Cite the actual page and retrieval time; do not bypass authentication, paywalls, robots controls, or provider restrictions.
   - Never infer missing salaries, player IDs, eligibility, slate membership, or contest rules. If a required input remains missing, produce an input-gap report or clearly labeled draft combinations, not valid lineups.
3. Normalize the player pool.
   - Preserve `provider_player_id`, `cfbd_player_id`, `provider_game_id`, and `cfbd_game_id` as separate namespaces. Reconcile names only within the verified team, opponent, position, season, and game crosswalk.
   - Keep observed fields separate from projections and assumptions.
   - Exclude confirmed out, ineligible, off-slate, or locked players. Flag ambiguous identities and unresolved availability.
   - Set the decision `as_of` time and include only games completed before it. Do not use target-slate or later outcomes, or an unbounded full-season snapshot, as pre-lock evidence.
4. Choose the construction method.
   - Enumerate manually only for a small, transparent candidate set.
   - Write temporary constraint or optimization code when the pool, lineup count, portfolio exposure, stacking, or correlation requirements make manual construction error-prone.
   - Run temporary code in an isolated temporary directory from immutable local inputs, with no embedded credentials or independent network access. Use deterministic seeds when randomness is involved. Record the method, objective, seed, and limitations; do not add the code to this skill.
   - Batch slate and team enrichment first; reserve player-specific and play-level retrieval for ambiguous mappings or finalists. Do not silently synthesize projections from CFBD fields.
5. Construct candidates that match the user's objective. Do not silently optimize for projected points when the user requested leverage, floor, ceiling, uniqueness, or diversification.
6. Validate every candidate and the portfolio using [references/lineup-contract.md](references/lineup-contract.md). Recompute salary and constraints from source rows rather than trusting generated summaries.
7. Report results without uploading, entering, or submitting them.

## Output

Return:

- Context, input sources, retrieval times, and freshness notes.
- Confirmed rules, user preferences, assumptions, and unresolved gaps.
- A player-pool summary showing exclusions and material availability concerns.
- Each candidate lineup with slot, player ID or unambiguous identity, team, opponent, position, salary, relevant projections, and total salary.
- Portfolio exposures, stacks, correlations, alternatives, and sensitivity to questionable players or assumptions.
- Per-lineup validation results plus an overall `pass`, `warn`, or `fail` status.
- A compact FBS source account for every material CFBD enrichment: CLI version, exact invocation, exit code, `retrieved_at`, `applicable_as_of`, cutoff and included game IDs, plus returned `command`, `endpoint`, `query`, `count`, and result key. Keep lineage, overlap, and structured failures visible.
- Explicit reasons to avoid or revisit candidates.

Render the portfolio according to `presentation_choice`. For a native interactive choice, use the host's available visualization or artifact feature while keeping lineup identities, constraints, warnings, and validation readable without interaction. For a persistent choice, follow the caller's existing artifact convention and append the structured portfolio and a timestamped report without creating a new application structure. Preserve prior revisions. Otherwise return the same content in the selected host-native or chat form.

Use `pass` only when every hard roster constraint is verified and satisfied. Use `warn` for a rule-valid lineup with a material but non-invalidating uncertainty, including a currently sourced questionable designation. Use `fail` for any rule violation; confirmed ineligibility or absence; or when required rules, salaries, identities, eligibility, slate membership, or lock state cannot be verified. If availability uncertainty makes a hard eligibility or lock check unknowable, use `fail`; otherwise disclose it as `warn`. Never present failed or merely draft combinations as ready to enter.

State that projections and candidate lineups are decision support, not guarantees. Never place a wager, upload a lineup, or submit a contest entry.
