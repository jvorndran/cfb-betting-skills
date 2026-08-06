---
name: analyze-cfb-player-props
description: Analyze college football player props using verified identity, current role and availability, historical opportunity, matchup, game environment, exact market price, and explicit uncertainty. Use for CFB passing, rushing, receiving, scoring, or other player-stat markets; prop comparisons; fair ranges; and price thresholds. Never place a wager.
---

# Analyze CFB Player Props

Treat player props as role and opportunity problems before treating them as efficiency problems. Keep this analysis separate from game lines and DFS salaries or scoring.

## Use judgment

Choose the evidence and workflow modules that fit the prop. Do not impose a fixed endpoint sequence, source count, output schema, or presentation format.

- Resolve player and market identity before joining data.
- Prefer user-supplied structured data when it is adequately identified.
- Use FBS CLI for reproducible historical football data.
- Use web research for current availability, role, depth, price, and rules that FBS does not supply.
- Separate opportunity, efficiency, matchup, and game-environment assumptions.
- Always conclude with `play`, `pass`, or `insufficient_evidence`.

## Establish the decision

Verify:

- Player, team, position, opponent, season, week, kickoff, and stable IDs when available.
- Exact stat, period, over/under side, threshold, attached price, provider, `observed_at`, and settlement rules.
- Decision `as_of` time, data cutoff, included games, and the current role regime.

Keep CFBD, sportsbook, and other provider IDs separate. Guard against namesakes, transfers, stale team associations, and changed positions. If the live quote cannot be verified, label it user-supplied or hypothetical.

## Select evidence

Read [data-sources.md](references/data-sources.md) when selecting FBS data or deciding whether web research is needed.

If FBS retrieval is useful, run `fbs --version` and the relevant leaf `--help`. If missing, explain that Node.js 22.12 or newer and `npm install --global @jvorndran/fbs-cli` are required. CFBD needs a key configured with `fbs auth` or `CFBD_API_KEY`; never request the key in chat.

For current information, select relevant entries from the bundled [sources.yaml](references/sources.yaml). Respect source scope, access mode, guidance, and limitations. Broaden to other reputable public sources when the catalog has no current fit. Do not browse for historical fields already answered by suitable structured evidence.

## Analyze

Choose appropriate modules from [workflows.md](references/workflows.md). Read [prop-analysis.md](references/prop-analysis.md) when defining samples, scenarios, probability, or a price threshold.

Distinguish:

- Current role from full-season average role.
- Attempts, carries, targets, routes, and snaps from one another.
- Opportunity from per-opportunity efficiency.
- Stable usage from touchdowns, long plays, garbage time, and score-state amplification.
- A plausible game-script scenario from a known future outcome.
- Correlated views of the same plays from independent evidence.

Use a role-based sample boundary. Build low, base, and high cases around the assumptions that matter, and explain what current news or price would reverse the conclusion.

## Conclude

Return the detail the question warrants: verified prop snapshot, availability and role assessment, sample boundary, decisive matchup context, plausible outcome range, price threshold when supportable, counterevidence, assumptions, and current-source citations.

Use:

- `play` when the verified line and price remain favorable across reasonable role uncertainty.
- `pass` when the market is inside the defensible range, the role is fragile, or the apparent advantage depends on unstable outcomes.
- `insufficient_evidence` when identity, current role, availability, price, rules, or a decisive sample boundary cannot be established.

Run [quality-checks.md](references/quality-checks.md) before an action-oriented conclusion. Never size or submit a wager, and never imply guaranteed profit.
