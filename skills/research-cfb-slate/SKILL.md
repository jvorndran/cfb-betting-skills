---
name: research-cfb-slate
description: Coordinate a weekly college-football research slate from schedule discovery through prioritized matchup assignments and the user's selected presentation, including optional persistent artifacts. Use when asked to build, refresh, triage, visualize, or summarize a CFB week or slate; choose games for deeper research; coordinate matchup dossiers; or prepare weekly command-center data.
---

# Research a CFB Slate

Coordinate the week. Delegate game-level work instead of turning the slate pass into many shallow matchup takes.

## Dependency preflight

Installing this skill by itself from skills.sh does not install sibling skills, the FBS CLI, or a CFBD credential. Do not install them without user authorization.

- Before CFBD retrieval, verify that `$fbs-cli` is available and run `fbs --version`. If either is missing, tell the user that Node.js 22.12 or newer is required and provide `npx skills add jvorndran/cfb-betting-skills --skill fbs-cli` plus `npm install --global @jvorndran/fbs-cli`.
- If no CFBD credential is configured, direct the user to <https://collegefootballdata.com/key> and ask them to run `fbs auth`. Never request the key in chat.
- If a requested public-web, matchup, market, player-prop, DFS, or validation sibling is missing, name it and provide `npx skills add jvorndran/cfb-betting-skills --skill SKILL_NAME`. If setup is unavailable or declined, continue only with applicable user-supplied or captured evidence and disclose the capability gap.

## Choose the presentation

At the start of a user-facing run, ask a short, capability-adjusted version of: **"How would you like this visualized: with this host's native interactive visualization or artifact feature, as a concise report in chat, as a persistent repository report or dashboard, or both?"** Offer only formats the current host can produce.

Skip the question only when the user already chose or an authorized parent passes `presentation_choice`. Inherit that choice and pass it to sibling skills so the user is asked once, not once per subtask. The choice changes presentation, not the evidence, provenance, calculation, or validation contract. Do not create visuals or report files before the choice exists. A persistent choice authorizes only new report and data artifacts in the already scoped workspace, not deployment or shared UI/configuration changes.

## Guardrails

- Keep all collection and analysis read-only. Never place a wager, trade, or lineup entry.
- Record the season, week, season type, timezone, retrieval time, and data cutoff. State any inferred value.
- Use user-supplied structured inputs first and label them as such. Use `$fbs-cli` next when available for CFBD data. Preserve exact commands, query fields, provider IDs, and structured errors without exposing credentials.
- Treat all `$fbs-cli` responses as one CFBD evidence family. Reuse inherited rows and source references when their scope, cutoff, and freshness still match; a narrower repeat query is not independent evidence.
- Route only lightweight non-FBS news or availability gaps through `$research-cfb-public-web` when it is available, passing the exact gap, game identity, cutoff, attempted FBS commands, and already-used sources. Preserve its registry coverage and Tavily provenance. If it is unavailable, use another public-web tool only when permitted and disclose the fallback. Do not bypass authentication, paywalls, robots controls, rate limits, or provider terms.
- Treat current news, availability, weather, and market information as time-sensitive. Timestamp each snapshot and distinguish missing from confirmed-none.
- Keep `price_blind_common` football evidence separate from `post_freeze_market` inputs. Market values may route work, but must not be exposed to a delegated team or matchup researcher before its price-blind context is frozen.
- Do not force a pick, probability, edge score, or deep dive for every game. `pass` and `not_researched` are valid states.
- Preserve prior snapshots during a refresh. Report material diffs instead of silently replacing history.

## Workflow

### 1. Establish the run

Resolve the requested season and week. If either is missing, inspect the current CFB calendar before inferring the upcoming slate. Confirm whether completed, live, postponed, canceled, FCS, postseason, and nonstandard games belong in scope.

Capture optional user priorities such as teams, conferences, kickoff windows, ranked games, lines, player props, or DFS. Treat those as routing preferences, not evidence of importance.

### 2. Build the canonical game index

Read [references/cfbd-slate-plan.md](references/cfbd-slate-plan.md) before planning CFBD calls. Retrieve the scoped schedule once and normalize each game around the provider game ID. Preserve exact home/away orientation, neutral-site status, kickoff timestamp, venue, status, and source references. Deduplicate by provider ID; use a documented composite key only when no ID exists.

Resolve contradictions before assigning research. Mark unresolved identity or kickoff conflicts as blocked.

### 3. Triage cheaply

Use only lightweight slate-wide context: rankings or ratings, records, recent results, conference implications, data availability, user priorities, and unusual scheduling or availability signals. Declare a bounded query plan and why each additional request can change routing. Prefer one reusable slate-wide response over repeated team queries, but avoid collecting a full statistical profile for every game.

Before promoting a game, record one result-quality or evidence-stability question, one plausible price-blind alternative to the headline, and the observation that would falsify that alternative. Final-score shock, rankings, ATS records, rivalry/revenge, a coaching headline, and market attention are triage flags, not evidence of mispricing. Do not force a contrarian hypothesis when the lightweight evidence does not support one.

Assign transparent priority tiers such as `focus`, `watch`, and `background`. Give a short rationale and list the evidence used; never hide the ranking behind an invented composite score.

### 4. Coordinate matchup deep dives

Invoke `$deep-dive-cfb-matchup` for every selected `focus` game and any game the user explicitly requests. Pass a frozen assignment containing:

- provider game ID and canonical matchup;
- season, week, season type, kickoff, timezone, and data cutoff;
- home, away, and neutral-site context;
- relevant inherited CFBD source references and selected structured rows, with query scope, `retrieved_at`, `applicable_as_of`, cutoff, freshness, and known overlap;
- requested downstream modes (`lines`, `player_props`, `dfs`);
- inherited `presentation_choice`;
- user questions and known source conflicts;
- the triage result-quality question, price-blind alternative, and falsifier as `user_questions` or unresolved questions rather than new schema fields;
- the caller-selected artifact directory, when one exists.

Pass only `price_blind_common` observations in the shared research payload. Keep line, ATS, prop, salary, and embedded scoreboard betting values in a separate `post_freeze_market` routing payload for the requested sibling analysis.

Run independent games in bounded parallel batches when tools and quota permit. Do not reproduce the deep-dive workflow locally if the sibling skill is missing or unusable; mark the assignment `unavailable`, explain why, and continue the rest of the slate.

### 5. Consolidate and refresh

Merge dossier statuses and references without rewriting their conclusions. Keep unresolved questions, stale inputs, downstream-skill availability, and next refresh triggers visible. On refresh, compare kickoff, status, availability, weather, market, and dossier timestamps and rerun only affected work.

When a dossier or downstream result could inform a decision, reuse a returned `$validate-cfb-research` result when it covers the same analysis revision and cutoff and no relevant freshness deadline has expired. Otherwise invoke the validator with the inherited `presentation_choice` if that sibling is available and operational. Invoke it separately for a new slate-level conclusion. Preserve its `pass`, `warn`, or `fail` result; never convert a failed result into a slate-level recommendation. If validation is unavailable, label the artifact `unvalidated` and explain why.

## Deliver

Return a concise weekly summary, the canonical game index, the prioritized research queue, dossier links or statuses, freshness warnings, and unresolved blockers.

Render the summary according to `presentation_choice`. For a native interactive choice, use the host's available visualization or artifact feature and keep priority rationales, freshness, and blockers readable without interaction. For a persistent choice, read [references/slate-artifacts.md](references/slate-artifacts.md), follow the caller's existing artifact convention, and append timestamped records without creating a new application structure. Preserve old reports and do not edit shared styles, components, configuration, skills, or deployment files unless separately requested. For a host-native, chat, or read-only choice, return the same report in that selected form.
