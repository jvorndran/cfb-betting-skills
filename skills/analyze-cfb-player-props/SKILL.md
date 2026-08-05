---
name: analyze-cfb-player-props
description: Analyze college football player props using verified player identity, availability, role, usage, matchup, game environment, current price, and evidence-based outcome ranges. Use when a user asks about a CFB passing, rushing, receiving, scoring, or other player-stat market; wants a prop comparison or price threshold; or wants to extend an existing matchup context with player-level analysis. Provide decision support only and never place a wager.
---

# Analyze CFB Player Props

Produce a reproducible, time-stamped prop assessment. Resolve the player and market exactly, model role uncertainty explicitly, and withhold a confident conclusion when status or price cannot be verified.

## Dependency preflight

Installing this skill by itself from skills.sh does not install sibling skills, the FBS CLI, or a CFBD credential. Do not install them without user authorization.

- Before CFBD retrieval, verify that `$fbs-cli` is available and run `fbs --version`. If either is missing, tell the user that Node.js 22.12 or newer is required and provide `npx skills add jvorndran/cfb-betting-skills --skill fbs-cli` plus `npm install --global @jvorndran/fbs-cli`.
- If no CFBD credential is configured, direct the user to <https://collegefootballdata.com/key> and ask them to run `fbs auth`. Never request the key in chat.
- If another requested sibling skill is missing, name it and provide `npx skills add jvorndran/cfb-betting-skills --skill SKILL_NAME`. If setup is unavailable or declined, continue only with applicable user-supplied or captured evidence and disclose the capability gap.

## Choose the presentation

At the start of a user-facing run, ask a short, capability-adjusted version of: **"How would you like this visualized: with this host's native interactive visualization or artifact feature, as a concise report in chat, as a persistent repository report or dashboard, or both?"** Offer only formats the current host can produce.

Skip the question only when the user already chose or an authorized parent passes `presentation_choice`. Inherit that choice and pass it to sibling skills so the user is asked once, not once per subtask. The choice changes presentation, not the evidence, provenance, calculation, or validation contract. Do not create visuals or report files before the choice exists. A persistent choice authorizes only new report and data artifacts in the already scoped workspace, not deployment or shared UI/configuration changes.

## Workflow

1. Resolve identity and market terms.
   - Confirm season, week, game, player, team, position, and stable player ID when available.
   - Keep `cfbd_game_id` and `cfbd_player_id` separate from sportsbook and other provider IDs. Never join unlike ID namespaces.
   - Guard against namesakes, transfers, duplicate jersey numbers, and stale roster associations.
   - Capture the exact stat category, over/under side, threshold, attached price, provider, settlement rules when material, and observation time.
   - If the live prop cannot be verified, analyze it only as a labeled user-supplied or hypothetical quote.

2. Assemble evidence in this order.
   - Set the decision `as_of` time and data cutoff before retrieval. Include only games completed before that instant, record their IDs, and exclude the target game and all later games from pregame evidence.
   - Use user-supplied structured data first and label it as user supplied.
   - Reuse a supplied `matchup_context`, but independently confirm player identity and refresh live price, availability, depth-chart, and weather evidence when stale.
   - When CFBD evidence is needed, invoke `$fbs-cli` and follow the identity resolution, endpoint ladder, bounded joins, evidence packet, and error handling in [references/prop-method.md](references/prop-method.md). If the skill or command is unavailable, mark CFBD evidence unavailable rather than guessing commands or values.
   - For remaining public-web gaps, invoke `$research-cfb-public-web` when available for projected depth charts, official availability, role reporting, game books, team statements, and complementary usage evidence. Pass exact player and game identity, cutoff, attempted FBS commands, and already-used sources; preserve its registry coverage and Tavily search and extraction provenance. If it is unavailable, use another public-web tool only when permitted and disclose the fallback. Distinguish credible reporting from speculation.
   - Record a source and retrieval time for every live prop, roster role, status, and weather claim. Never fabricate an unavailable line, price, salary, projection, or injury status.

3. Establish current role and opportunity.
   - Evaluate snaps, routes, targets, carries, attempts, red-zone work, designed usage, depth-chart position, and teammate availability as appropriate to the prop.
   - Distinguish what CFBD actually supplies from external evidence. CFBD usage is a season-level opportunity share, not snaps, routes, a depth chart, or an availability report.
   - Mark status as `confirmed_available`, `confirmed_out`, `expected`, `questionable`, or `unverified`; do not silently convert reports into certainty.
   - Segment samples at meaningful role changes. Do not let full-season averages conceal a new starter, returning player, position change, or coordinator change.
   - Apply the same season-type, included-game, and garbage-time policy across the player and opponent samples.
   - Separate opportunity from efficiency and identify which one drives the conclusion.
   - Classify role evidence as `stable`, `conditional`, `fragile`, or `unknown` from the distribution of verified attempts, carries, targets, routes, or snaps; teammate availability; and the current regime. Do not invent a role-stability score, and do not relabel CFBD usage as snaps or routes.
   - Decompose recent production into repeatable opportunity versus touchdown, long-play, garbage-time, and score-state amplification.

4. Evaluate the matchup and game environment.
   - Assess opponent tendencies, personnel, scheme, pace, likely play volume, score-state sensitivity, weather, and correlated teammates.
   - Adjust defensive comparisons for opponent quality and exclude games that do not match the player's current role when justified.
   - Treat projected game script as a scenario, not a fact.
   - Record metric lineage and treat box statistics, usage, success, PPA, WEPA, and play-level summaries as related views of overlapping plays.
   - Read [references/prop-method.md](references/prop-method.md) before creating outcome ranges, implied probabilities, or the structured result.

5. Estimate an evidence-based range.
   - Build low, base, and high opportunity scenarios, then translate them into the requested statistic.
   - Report a plausible outcome range and key threshold rather than unsupported point precision.
   - Estimate over/under probability or fair price only when the sample and method support it. State the method and preserve uncertainty.
   - Test a prop mispricing hypothesis as opportunity share × per-opportunity efficiency × game environment, with the strongest competing explanation, a falsifier, and an exact price threshold.
   - End with a prose `bet`, `watch`, or `pass` candidate gate under the prop-method requirements. This is decision support only and never permits sizing or submission.
   - If the player's availability, role, exact market, or settlement rules materially change the answer and remain unresolved, return `insufficient_evidence`.

6. Use temporary code only when it improves reliability.
   - Use it for multi-game normalization, role-segmented splits, simulations, distribution summaries, price conversion, or chart transforms.
   - Work in an isolated temporary directory with immutable input snapshots, deterministic seeds where applicable, and no embedded credentials.
   - Do not let generated code make network requests independently. Retrieve evidence first through approved tools, then analyze saved inputs.
   - Preserve the method, input references, seed, and material outputs with the analysis. Delete or leave the temporary workspace according to the host's policy.

7. Challenge the conclusion.
   - Verify player and game identity, stat definitions, push rules, prices, timestamps, role cutoffs, opponent filters, and arithmetic.
   - Search for contrary evidence such as a committee role, snap limitation, quarterback change, weather risk, or misleading outlier.
   - State what new information would materially change the assessment.

## Deliverable

Return a concise decision-support report containing:

- Verified player, matchup, UTC `as_of` time, and exact prop snapshot.
- Availability assessment with evidence and confidence.
- Current role and usage summary, including the selected sample boundary.
- Matchup and game-environment analysis.
- Low, base, and high scenarios with a plausible outcome range.
- Implied probability, fair probability, or fair price only where inputs support it.
- Supporting evidence, counterevidence, assumptions, unresolved gaps, and reasons to pass.
- The testable prop hypothesis and prose `bet`, `watch`, or `pass` candidate gate, including any measurable role, availability, or price trigger.
- A compact FBS source account for every material CFBD input: CLI version, exact invocation, exit code, `retrieved_at`, `applicable_as_of`, cutoff and included game IDs, plus returned `command`, `endpoint`, `query`, `count`, and result key. Keep lineage, overlap, and structured failures visible.
- A conclusion labeled `favorable`, `neutral`, `unfavorable`, or `insufficient_evidence`, with calibrated confidence.
- Direct citations or local source paths adjacent to the claims they support.

Render the report according to `presentation_choice`. For a native interactive choice, use the host's available visualization or artifact feature and keep the decision summary and source limitations readable without interaction. When the host supports structured artifacts, also emit the portable record in [references/prop-method.md](references/prop-method.md). For a persistent choice, follow the caller's existing artifact convention and append a timestamped report and data record without creating a new application structure. Otherwise return the same content in the selected host-native or chat form. Append a new revision rather than overwriting an older assessment. Never place, size, or submit a wager, and never imply guaranteed profit.
