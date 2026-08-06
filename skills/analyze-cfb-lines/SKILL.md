---
name: analyze-cfb-lines
description: Analyze college football spreads, totals, moneylines, and compatible binary game contracts using price-aware historical data, matchup context, current information, and explicit uncertainty. Use for evaluating a CFB line, comparing market prices, investigating movement, estimating a fair range or threshold, or deciding whether the available evidence supports a play or pass. Never place a wager or trade.
---

# Analyze CFB Lines

Evaluate the market the user actually names. Keep the game, selection, number, attached price, provider, observation time, and settlement rules together.

## Use judgment

Cover the core expert modules below, but choose their order, depth, commands, and presentation. Do not force a fixed endpoint ladder, source count, report template, or presentation format. Mark a module `not applicable` or `insufficient_evidence` when the market or available evidence cannot support it.

- Prefer user-supplied structured data when it is sufficiently identified and current.
- Use FBS CLI for reproducible CFBD history and football context.
- Use Kalshi CLI for compatible public Kalshi contracts; its supported endpoints require no key.
- Use public-web research for material current or qualitative gaps, not to duplicate structured data.
- Treat correlated metrics from the same games and plays as related evidence rather than independent confirmation.
- Tie important evidence to a causal chain: `observed fact -> football mechanism -> game-script effect -> market impact`.
- Always finish with `play`, `pass`, or `insufficient_evidence`. A pass is a useful conclusion.

## Establish the decision

Resolve the matchup and market before calculating:

- Season, week, home and away teams, kickoff, and CFBD game ID when available.
- Spread, total, moneyline, or binary-contract side.
- Exact line or threshold, price format and value, provider, `observed_at`, and applicable rules.
- Decision `as_of` time and the historical data cutoff.

Keep CFBD IDs, sportsbook IDs, and exchange tickers in separate namespaces. If a quote cannot be independently verified, label it user-supplied or hypothetical.

## Select evidence

Read [data-sources.md](references/data-sources.md) when choosing FBS commands, Kalshi data, or web sources. It maps the available FBS data and explains when web search adds value.

### FBS readiness is a hard gate

This skill cannot run until the FBS CLI is installed, executable, and authenticated:

1. Run `fbs --version`. If it is missing or fails, install it with `npm install --global @jvorndran/fbs-cli`, then rerun the check. If installation or the version check still fails, stop and report the setup failure.
2. Run `fbs info` as the authenticated CFBD readiness check. If it fails because no credential is configured, run `fbs auth` or configure `CFBD_API_KEY`; never ask the user to paste the key into chat. If `fbs info` still fails for any reason, stop.
3. Run the relevant leaf `--help` before choosing flags. If the help command fails, stop.

Do not continue with user-supplied, web-only, Kalshi-only, partial, or guessed evidence while this gate is failing. If a required FBS command fails later, stop the analysis and report the structured error instead of silently switching sources.

For Kalshi evidence, run `kalshi --version` and discover the exact series, event, and market rather than constructing a ticker. If missing, explain the `@jvorndran/kalshi-cli` installation. Do not request a Kalshi key.

When current information is material, consult the bundled [sources.yaml](references/sources.yaml) and follow its scope, access, guidance, and limitations. Broaden to other reputable public sources when the catalog has no suitable current entry. Do not browse merely because browsing is available.

## Analyze

Use the relevant modules from [workflows.md](references/workflows.md). Read [market-analysis.md](references/market-analysis.md) for odds conversion, no-vig calculations, movement, fair ranges, and binary-contract semantics.

Every Lines analysis must address these expert questions, even if some answers are limited by the evidence:

- What baseline team-quality and opponent-adjusted expectation does the market imply, and where could it be wrong?
- Which matchup mechanics matter most, including offensive-line versus defensive-front play, quarterback pressure/coverage interactions, explosiveness, early-down success, and finishing drives?
- What are the plausible close-game, favorite-leading, and underdog-leading scripts, and how would pace, play calling, drive volume, clock, garbage time, and fourth-down decisions change the spread, total, or moneyline distribution?
- Which current personnel, continuity, coaching, scheme, venue, travel, rest, and weather facts can alter those scripts?
- What market-psychology or public-bias evidence is observable (or unavailable), including brand/ranking/recency narratives, ticket or handle splits, opener/current movement, reverse movement, stale numbers, liquidity, and cross-provider disagreement?
- What assumptions, variance sources, counterarguments, falsifiers, and number/price thresholds determine the conclusion?

Build a causal case rather than tallying metrics. Distinguish:

- Baseline team quality from matchup-specific interactions.
- Stable opportunity or efficiency from turnovers, touchdowns, long plays, and score-state noise.
- A changed market number from a changed attached price.
- Historical context from a current executable quote.
- Model or judgment uncertainty from unresolved identity, availability, or rules.

State the strongest counterargument and the information or price change that would reverse the conclusion.

## Conclude

Return the amount of detail the question warrants. Include the verified market snapshot, decisive evidence, contrary evidence, fair range or threshold when supportable, material assumptions, freshness limitations, and citations adjacent to changing claims.

Use:

- `play` when the verified price and rules remain favorable after uncertainty and practical costs.
- `pass` when the market is inside the defensible range, the thesis is already priced, or the downside dominates.
- `insufficient_evidence` when identity, price, rules, cutoff, or decisive current information cannot be resolved.

Run [quality-checks.md](references/quality-checks.md) before delivering an action-oriented conclusion. Never size or execute a wager or trade, and never imply guaranteed profit.
