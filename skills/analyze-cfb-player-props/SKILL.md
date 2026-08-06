---
name: analyze-cfb-player-props
description: Analyze college football player props using verified identity, current role and availability, historical opportunity, matchup, game environment, exact market price, and explicit uncertainty. Use for CFB passing, rushing, receiving, scoring, or other player-stat markets; prop comparisons; fair ranges; and price thresholds. Never place a wager.
---

# Analyze CFB Player Props

Treat player props as role and opportunity problems before treating them as efficiency problems. Keep this analysis separate from game lines and DFS salaries or scoring.

## Use judgment

Cover the core expert modules below, but choose the order, depth, commands, and presentation that fit the prop. Do not impose a fixed endpoint sequence, source count, output schema, or presentation format. Mark a module `not applicable` or `insufficient_evidence` when the market or available evidence cannot support it.

- Resolve player and market identity before joining data.
- Prefer user-supplied structured data when it is adequately identified.
- Use FBS CLI for reproducible historical football data.
- Use web research for current availability, role, depth, price, and rules that FBS does not supply.
- Separate opportunity, efficiency, matchup, and game-environment assumptions.
- Tie important evidence to a causal chain: `observed fact -> role/opportunity mechanism -> game-script effect -> prop distribution -> market price`.
- Always conclude with `play`, `pass`, or `insufficient_evidence`.

## Establish the decision

Verify:

- Player, team, position, opponent, season, week, kickoff, and stable IDs when available.
- Exact stat, period, over/under side, threshold, attached price, provider, `observed_at`, and settlement rules.
- Decision `as_of` time, data cutoff, included games, and the current role regime.

Keep CFBD, sportsbook, and other provider IDs separate. Guard against namesakes, transfers, stale team associations, and changed positions. If the live quote cannot be verified, label it user-supplied or hypothetical.

## Select evidence

Read [data-sources.md](references/data-sources.md) when selecting FBS data or deciding whether web research is needed.

### FBS readiness is a hard gate

This skill cannot run until the FBS CLI is installed, executable, and authenticated:

1. Run `fbs --version`. If it is missing or fails, install it with `npm install --global @jvorndran/fbs-cli`, then rerun the check. If installation or the version check still fails, stop and report the setup failure.
2. Run `fbs info` as the authenticated CFBD readiness check. If it fails because no credential is configured, run `fbs auth` or configure `CFBD_API_KEY`; never ask the user to paste the key into chat. If `fbs info` still fails for any reason, stop.
3. Run the relevant leaf `--help` before choosing flags. If the help command fails, stop.

Do not continue with user-supplied or web-only evidence while this gate is failing. If a required FBS command fails later, stop the analysis and report the structured error instead of silently switching sources.

For current information, select relevant entries from the bundled [sources.yaml](references/sources.yaml). Respect source scope, access mode, guidance, and limitations. Broaden to other reputable public sources when the catalog has no current fit. Do not browse for historical fields already answered by suitable structured evidence.

## Analyze

Choose appropriate modules from [workflows.md](references/workflows.md). Read [prop-analysis.md](references/prop-analysis.md) when defining samples, scenarios, probability, or a price threshold.

Every prop analysis must address these expert questions, even if some answers are limited by the evidence:

- What is the player's current role regime, and which personnel, quarterback, coordinator, or depth changes define it?
- What team opportunities and player shares drive this prop, and are attempts, carries, targets, routes, snaps, red-zone work, and returns being kept distinct?
- Which matchup mechanics matter most, including trenches, pressure/coverage, defensive funnels, run fits, explosive-play prevention, and scoring-area usage?
- How do neutral, leading, trailing, blowout, and high- or low-pace game scripts change the player's volume and efficiency?
- Which outcomes are stable opportunity versus touchdowns, long plays, garbage-time amplification, turnovers, or other variance?
- What market or narrative bias may affect a star, touchdown, recent-box-score, or popular-player prop, and is that evidence observable rather than assumed?
- What low/base/high scenarios, counterargument, falsifier, and exact line/price threshold determine the conclusion?

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
