---
name: analyze-cfb-lines
description: Analyze college football spreads, totals, moneylines, binary game contracts, market prices, movement, implied probabilities, no-vig probabilities, and evidence-based fair ranges. Use when a user asks to evaluate a CFB betting line or prediction-market contract, compare providers, investigate movement, quantify price sensitivity, identify a possible market edge, or extend an existing matchup context with market analysis. Provide decision support only and never place a wager or trade.
---

# Analyze CFB Lines

Produce a reproducible, time-stamped market assessment. Treat the quoted market as live evidence, not a permanent fact, and prefer a defensible range over false precision.

## Dependency preflight

Installing this skill by itself from skills.sh does not install sibling skills, data CLIs, or credentials. Do not install them without user authorization.

- Before CFBD retrieval, verify that `$fbs-cli` is available and run `fbs --version`. If either is missing, tell the user that Node.js 22.12 or newer is required and provide `npx skills add jvorndran/cfb-betting-skills --skill fbs-cli` plus `npm install --global @jvorndran/fbs-cli`.
- If no CFBD credential is configured, direct the user to <https://collegefootballdata.com/key> and ask them to run `fbs auth`. Never request the key in chat.
- Before Kalshi retrieval, verify that `$kalshi-cli` is available and run `kalshi --version`. If either is missing, tell the user that Node.js 22.12 or newer is required and provide `npx skills add jvorndran/cfb-betting-skills --skill kalshi-cli` plus `npm install --global @jvorndran/kalshi-cli`. State explicitly that the supported public Kalshi endpoints need no API key.
- If another requested sibling skill is missing, name it and provide `npx skills add jvorndran/cfb-betting-skills --skill SKILL_NAME`. If setup is unavailable or declined, continue only with applicable user-supplied or captured evidence and disclose the capability gap.

## Choose the presentation

At the start of a user-facing run, ask a short, capability-adjusted version of: **"How would you like this visualized: with this host's native interactive visualization or artifact feature, as a concise report in chat, as a persistent repository report or dashboard, or both?"** Offer only formats the current host can produce.

Skip the question only when the user already chose or an authorized parent passes `presentation_choice`. Inherit that choice and pass it to sibling skills so the user is asked once, not once per subtask. The choice changes presentation, not the evidence, provenance, calculation, or validation contract. Do not create visuals or report files before the choice exists. A persistent choice authorizes only new report and data artifacts in the already scoped workspace, not deployment or shared UI/configuration changes.

## Workflow

1. Establish the exact game and market.
   - Confirm season, week, away team, home team, kickoff, and game ID when available.
   - Keep `cfbd_game_id` separate from sportsbook, exchange, and other provider game IDs. Never join unlike ID namespaces.
   - Identify market type, selection or contract side, line when applicable, attached price and format, provider, observation time, and settlement or resolution rules.
   - Keep spread, total, moneyline, and binary-contract analyses separate. Never detach a line or contract from its price and rules.
   - Ask only for information that cannot be discovered safely. If the requested quote cannot be verified, analyze it explicitly as a user-supplied or hypothetical price.

2. Assemble evidence in this order.
   - Set the decision `as_of` time and data cutoff before retrieval. Include only games completed before that instant, record their IDs, and exclude the target game and all later games from pregame evidence.
   - Use user-supplied structured data first and label it as user supplied.
   - Reuse a supplied `matchup_context`, but inspect its timestamps and refresh prices, weather, and availability when stale for the decision at hand.
   - For a Kalshi contract or requested prediction-market history proxy, invoke `$kalshi-cli` when available. Discover and verify the series, event, market ticker, title, close time, and resolution rules before retrieving the market, orderbook, trades, or candlesticks. Preserve the exact command, query, source URL, request and observation timestamps, response hash, and provider values. Treat a missing or ambiguous matching contract as unresolved rather than constructing a ticker.
   - When CFBD evidence is needed, invoke `$fbs-cli` and follow the endpoint ladder, cutoff rules, evidence packet, and error handling in [references/market-method.md](references/market-method.md). If the skill or command is unavailable, mark CFBD evidence unavailable rather than guessing commands or values.
   - Treat `fbs lines` and scoreboard betting fields as historical provider context, not a verified live quote. They do not supply an attached spread/total price, provider quote time, or settlement rules; retrieval time is not observation time.
   - For remaining public-web gaps, invoke `$research-cfb-public-web` when available with the exact availability, team-news, weather, venue, provider-rule, or corroboration question; game identity and cutoff; attempted FBS or Kalshi commands; and already-used sources. Preserve its registry coverage and Tavily search and extraction provenance. A registry gap is not evidence that the fact is absent. If the sibling is unavailable, use another public-web tool only when permitted and disclose the fallback.
   - Record a source and retrieval time for every live line, status, injury, and weather claim. Never fabricate an unavailable value.

3. Normalize the market snapshot.
   - Preserve the provider's exact spread or total, or the binary contract's exact title, side, ticker when available, resolution source, expiry, price format, value, and observed time.
   - Convert prices and remove vig only when the necessary opposing prices are known. State the method.
   - For binary contracts, distinguish quoted probability or cents from sportsbook odds, and account for bid-ask spread, fees, liquidity, and resolution semantics when the available evidence supports doing so.
   - Treat candlesticks and trades as historical observations, not executable current quotes. Treat orderbook levels as bids; do not invent an ask or midpoint. Keep fixed-point strings unchanged until a stated calculation requires conversion, and distinguish same-contract time-series movement from cross-contract or cross-provider differences.
   - Separate movement in the quoted number from movement in the attached price.
   - Compare sources only when they describe the same market or contract, rules, selection, and game.

4. Build the case without inventing a predictive model.
   - Evaluate opponent-adjusted efficiency, success, explosiveness, finishing drives, field position, turnovers, pace, availability, weather, rest, travel, and relevant scheme interactions.
   - Weight role changes and current personnel more heavily than stale full-season averages.
   - Use week-bounded inputs for a historical pregame analysis. Do not use a full-season or current snapshot that cannot enforce the decision cutoff.
   - Record metric lineage and treat PPA, success, explosiveness, WEPA, and other play-derived views as correlated evidence rather than independent votes.
   - Use comparable games only when the comparison criteria are stated before inspecting outcomes.
   - Express fair value as an interval or scenario range. If evidence cannot support a fair range, say so and stop short of an edge claim.
   - Test each candidate through a written mispricing hypothesis: the market assumption being challenged, causal football mechanism, evidence stability, strongest competing explanation, falsifier, and exact price threshold. Explicitly test whether the observed market may already reflect the headline; never infer public or sharp sentiment from attention or movement alone.
   - End with a prose candidate gate of `bet`, `watch`, or `pass` under the requirements in the market-method reference. This is decision support only: never size or execute a wager.
   - Read [references/market-method.md](references/market-method.md) before computing no-vig prices, classifying movement, or creating the structured result.

5. Use temporary code only when it improves reliability.
   - Use it for multi-row normalization, no-vig calculations, historical splits, scenario simulations, distribution summaries, or chart transforms.
   - Work in an isolated temporary directory with immutable input snapshots, deterministic seeds where applicable, and no embedded credentials.
   - Do not let generated code make network requests independently. Retrieve evidence first through approved tools, then analyze the saved inputs.
   - Preserve the method, input references, seed, and material outputs with the analysis. Delete or leave the temporary workspace according to the host's policy.

6. Challenge the conclusion.
   - Check game identity, Kalshi series/event/ticker identity, market or contract rules, contract close time, live-versus-historical cutoff, observation times, odds conversions, sign conventions, push or resolution handling, and sample boundaries.
   - Search for the strongest contrary evidence and explain what would invalidate the thesis.
   - Distinguish a genuine informational disagreement from a stale quote, different provider rule, or price-only difference.
   - Mark the result `insufficient_evidence` when identity, current price, or decisive availability information remains unresolved.

## Deliverable

Return a concise decision-support report containing:

- The verified matchup and UTC `as_of` time.
- A market snapshot table with provider, market or contract, selection, line when applicable, exact price format and value, rules, and `observed_at`.
- Implied and no-vig probabilities only where inputs support them.
- The evidence-based fair range and the exact threshold at which the conclusion changes.
- The testable mispricing hypothesis and prose `bet`, `watch`, or `pass` candidate gate, including any measurable refresh trigger.
- Supporting evidence, counterevidence, assumptions, unresolved gaps, and reasons to pass.
- A compact FBS source account for every material CFBD input: CLI version, exact invocation, exit code, `retrieved_at`, `applicable_as_of`, cutoff and included game IDs, plus returned `command`, `endpoint`, `query`, `count`, and result key. Keep lineage, overlap, and structured failures visible.
- A conclusion labeled `favorable`, `neutral`, `unfavorable`, or `insufficient_evidence`, with calibrated confidence.
- Direct citations or local source paths adjacent to the claims they support.

Render the report according to `presentation_choice`. For a native interactive choice, use the host's available visualization or artifact feature and keep the decision summary and source limitations readable without interaction. When the host supports structured artifacts, also emit the portable record in [references/market-method.md](references/market-method.md). For a persistent choice, follow the caller's existing artifact convention and append a timestamped report and data record without creating a new application structure. Otherwise return the same content in the selected host-native or chat form. Append a new revision rather than overwriting an older assessment. Never place, size, submit, or execute a wager or trade, and never imply guaranteed profit.
