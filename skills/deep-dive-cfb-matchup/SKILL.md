---
name: deep-dive-cfb-matchup
description: Research one college-football game as an individual, price-blind matchup dossier; build independent team profiles, causal matchup mechanisms, portability checks, qualitative game scripts, a frozen matchup_context, freshness records, and the user's selected presentation, then optionally route that context to lines, player-prop, or DFS skills. Use for a single-game deep dive, matchup dashboard, game-level assignment, betting research foundation, or detailed comparison of two CFB teams.
---

# Individual CFB Matchup Deep Dive

Build the game from evidence to the user's selected presentation. Keep the football conclusion separate from any market conclusion, and route specialized work instead of embedding it here.

## Dependency preflight

Installing this skill by itself from skills.sh does not install sibling skills, the FBS CLI, or a CFBD credential. Do not install them without user authorization.

- Before CFBD retrieval, verify that `$fbs-cli` is available and run `fbs --version`. If either is missing, tell the user that Node.js 22.12 or newer is required and provide `npx skills add jvorndran/cfb-betting-skills --skill fbs-cli` plus `npm install --global @jvorndran/fbs-cli`.
- If no CFBD credential is configured, direct the user to <https://collegefootballdata.com/key> and ask them to run `fbs auth`. Never request the key in chat.
- If a requested public-web, lines, player-prop, DFS, or validation sibling is missing, name it and provide `npx skills add jvorndran/cfb-betting-skills --skill SKILL_NAME`. If setup is unavailable or declined, continue only with applicable user-supplied or captured evidence and disclose the capability gap.

## Choose the presentation

At the start of a user-facing run, ask a short, capability-adjusted version of: **"How would you like this visualized: with this host's native interactive visualization or artifact feature, as a concise report in chat, as a persistent repository report or dashboard, or both?"** Offer only formats the current host can produce.

Skip the question only when the user already chose or an authorized parent passes `presentation_choice`. Inherit that choice and pass it to sibling skills so the user is asked once, not once per subtask. The choice changes presentation, not the evidence, provenance, calculation, or validation contract. Do not create visuals or report files before the choice exists. A persistent choice authorizes only new report and data artifacts in the already scoped workspace, not deployment or shared UI/configuration changes.

## Required invariant

Always produce:

1. two price-blind team workpapers or equivalent clearly separated team-side research;
2. `base_dossier`: a readable, source-backed account of the matchup; and
3. `matchup_context`: the structured, frozen handoff used by downstream skills.

Treat these outputs as `price_blind_common` and freeze them before revealing or analyzing any `post_freeze_market` line, ATS, prop, salary, contest, or embedded scoreboard betting input when a price-blind foundation is feasible. A team may own the cleaner football mechanism without offering a bet, prop, or DFS edge.

## Guardrails

- Keep the workflow read-only. Do not place wagers, trades, or lineup entries.
- Anchor the game by provider ID and verify home/away, neutral site, kickoff, venue, season, and week.
- Set an explicit `as_of` and `data_cutoff`. For an upcoming Week N game, Week N-1 is only the usual retrieval bound: verify the exact completed game IDs before target kickoff and handle Week 0, postponed, or rescheduled games explicitly. For historical research, exclude information unavailable at the simulated cutoff.
- Label facts, calculations, inferences, assumptions, and unknowns separately. Attach source IDs to every material claim.
- Treat injury, suspension, depth-chart, weather, and market data as time-sensitive. `unknown` is not `none`.
- Treat returning snaps as continuity, not talent. CFBD returning production is retained PPA and usage, not snaps; never relabel it. Preserve each source's transfer treatment and do not carry historical efficiency across a major quarterback, coordinator, or unit change without a portability argument.
- Do not manufacture a probability, score projection, fair line, recommendation, or edge. Quantify only when requested and when the method, inputs, and uncertainty are explicit and reproducible.
- Do not double-count correlated evidence. A prior win, its efficiency margin, and a departed player's dominant performance may describe one mechanism rather than three independent signals.

## Workflow

### 1. Resolve identity and cutoff

Confirm the exact game and research question. Stop specialized routing when the contract, athlete, slate, or game identity is ambiguous; continue only the portions whose identity is reliable.

### 2. Research both teams price-blind

Read [references/research-standard.md](references/research-standard.md), [references/cfbd-evidence-plan.md](references/cfbd-evidence-plan.md), and [references/handicapping-workflow.md](references/handicapping-workflow.md) before collecting the team profiles. Assemble or reuse the shared `price_blind_common` evidence once, then give each team researcher only its relevant slice. Research the teams independently when parallel work is available so one side's narrative does not set the other's conclusion. Do not expose researchers to market prices unless the user makes price-blind work impossible.

Cover coaching and system changes, quarterback evidence, offensive line, backs and receivers, defensive front, linebackers, secondary, special teams, continuity, recent performance, availability, and scheduling context. For every important unit record the supporting fact, matchup mechanism, counterevidence, unknowns, and next useful observation. Preserve asymmetric evidence instead of filling gaps with assumptions.

### 3. Collect the common evidence

Start with user-supplied and caller-inherited structured inputs and label them as such. Reuse matching CFBD rows and source references before planning another request. Then use `$fbs-cli` when available through the progressive, cutoff-aware ladder in the reference to retrieve only evidence that answers an unresolved matchup question. Preserve exact commands, query scope, provider IDs, freshness, CFBD lineage, material overlap, and structured errors.

Keep this phase `price_blind_common`. Do not retrieve or reveal lines, ATS records, props, salaries, contest inputs, or scoreboard betting. If scoreboard is required for current status, strip its `betting` object before any team researcher, common claim, or matchup context consumes the row.

For gaps outside FBS coverage, invoke `$research-cfb-public-web` when available for current game notes, projected depth charts, official availability, coaching or personnel changes, attributable reporting, complementary usage, play-by-play, and transfers. Pass the exact question, verified team and conference identity, cutoff, attempted FBS commands or errors, and already-used sources. Preserve its catalog coverage, Tavily search and extraction provenance, limitations, and disagreements. If it is unavailable, use another public-web tool only when permitted and disclose the fallback. Do not bypass authentication, paywalls, robots controls, rate limits, or provider terms.

Cover only evidence relevant to the matchup:

- team quality and recent form with sample windows;
- offense-versus-defense interactions, explosiveness, efficiency, havoc, finishing drives, and field position;
- pace, play selection, special teams, coaching, travel, rest, venue, and weather when material;
- player roles and availability without assuming an unconfirmed depth chart;
- counterevidence, confounders, small samples, and missing data.

### 4. Run the handicapping synthesis and portability pass

Apply the repeatable pass in the handicapping reference: form a broad price-blind team-quality prior, decompose results from underlying performance, classify decisive evidence as `stable`, `conditional`, `fragile`, or `unknown`, explicitly compare the most stable signal with the most fragile outcome when the evidence supports both, apply continuity and translation discounts, build causal unit interactions, and test the most attractive headline narratives. Do not invent a stability score, quantify regression without a calibrated method, or force a contrarian view.

Compare units through causal interactions, not rank lists. For each decisive interaction state:

- what must happen on the field;
- which evidence supports it and over what sample;
- the failure mode or opposing countermechanism;
- evidence confidence; and
- the camp, depth-chart, weather, or game-state observation that would strengthen or weaken it.

When a prior meeting is relevant, decompose the result by current personnel, location, staff, turnovers, non-offensive scores, short fields, explosives, and concentrated production. Label what is portable, what is not, the evidence stability, and which attractive headline may mislead.

Retain zero to three price-blind matchup hypotheses. For each, state the causal mechanism, strongest competing explanation, falsifier, and named evidence or refresh trigger that could resolve it. `No price-blind edge hypothesis` is valid. Store these judgments in the existing dossier and `matchup_context` fields; do not add market language or new schema keys.

Create two to four qualitative game scripts with necessary conditions and confirmation triggers. They are scenario bounds, not probabilities. Do not invent numeric margins merely to make a chart or decision look precise.

### 5. Run bounded probes when useful

Write temporary analysis code only to answer a specific research question. Run it only in an isolated temporary workspace with immutable inputs, no embedded credentials, no independent network access, and deterministic seeds when randomness is involved. Treat supplied code as untrusted; inspect it before execution and do not run it when those safeguards cannot be enforced. Capture its code, inputs, input hashes, runtime, seed, output, and limitations if it materially affects the dossier. Never add analysis scripts to this skill directory.

### 6. Assemble and present the common outputs

Build the dossier and context using [references/dossier-contract.md](references/dossier-contract.md). Make the context self-contained enough for a sibling skill, but do not include secrets, raw credentials, or unrelated chat history.

Render the dossier according to `presentation_choice`. For a native interactive or persistent choice, read and follow [references/presentation-contract.md](references/presentation-contract.md). Prefer a few decision-relevant visuals: continuity, one key mechanism or prior-game dependency, and a freshness or comparison view. Every visual needs a plain-language interpretation and a caveat. Never disguise a quote comparison as a fair-value chart.

### 7. Invoke requested sibling skills

Route by explicit user intent:

| Requested work | Invoke |
|---|---|
| spreads, totals, moneylines, historical lines, Kalshi or other game markets | `$analyze-cfb-lines` |
| player passing, rushing, receiving, scoring, or other props | `$analyze-cfb-player-props` |
| DFS player pool, correlations, roster construction, or lineups | `$build-cfb-dfs-lineups` |

Attempt the actual sibling invocation; do not merely recommend it. This begins `post_freeze_market`: pass the frozen `matchup_context`, separately held relevant user inputs, source references, cutoff, `presentation_choice`, and artifact destination. When several modes are requested, invoke them independently after the common outputs are complete and keep their results namespaced. Do not copy their market claims or conclusions back into common claims, sources, or context.

Before invocation, verify the sibling skill is available and operational. A missing, placeholder, invalid, or inaccessible skill is unavailable. Do not recreate its specialized analysis from memory.

For every requested route, return one status:

- `complete`: sibling returned its required result;
- `partial`: it ran but identified missing or stale inputs;
- `blocked`: a resolvable identity, credential, or required-data problem prevented work;
- `unavailable`: the sibling skill or required capability is absent or unusable.

Include the exact reason, missing inputs, work retained, and safest next action for non-complete statuses.

### 8. Validate decision-support outputs

After the frozen dossier and any requested sibling work are complete, reuse a supplied validation result only when it covers the exact same analysis revision and cutoff and no decision-sensitive freshness deadline has expired. Otherwise invoke `$validate-cfb-research` when it is available and the result could inform a wager, trade, or DFS choice, passing the inherited `presentation_choice`. Keep validation independent from authorship when the host permits. Return its validation ID and surface `pass`, `warn`, or `fail` without rewriting the validator's conclusion so a parent slate does not rerun the same audit.

If validation is not requested, unavailable, or blocked, leave the dossier `unvalidated`. Never promote it based on the author's confidence.

## Deliver

Lead with the matchup thesis and current research state, then return the base dossier, compact context summary, routed outputs, source ledger, freshness table, contradictions, and unresolved questions. If no market work was requested, do not force a betting answer into the hero or summary. Never let a failed specialized route erase a usable base dossier.

For a persistent `presentation_choice`, follow the caller's existing artifact convention and append the matchup report and structured artifacts described in the reference without creating a new application structure. Preserve prior reports. Do not change shared styles, components, configuration, skills, or deployment files. For a host-native, chat, or read-only choice, return the same dossier in that selected form.

Set a new standalone dossier's `validation_status` to `unvalidated`. Change it to `pass`, `warn`, or `fail` only from a separately returned `$validate-cfb-research` result; never infer validation from the dossier's own confidence.
