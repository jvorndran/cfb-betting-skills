---
name: analyze-cfb-lines
description: Analyze college football spreads, totals, moneylines, and compatible binary game contracts using price-aware historical data, matchup context, current information, and explicit uncertainty. Use for evaluating a CFB line, comparing market prices, investigating movement, estimating a fair range or threshold, or deciding whether the available evidence supports a play or pass. Never place a wager or trade.
---

# Analyze CFB Lines

Evaluate the market the user actually names. Keep the game, selection, number, attached price, provider, observation time, and settlement rules together.

## Use judgment

Choose only the analysis modules that can change the conclusion. Do not force a fixed endpoint ladder, source count, report template, or presentation format.

- Prefer user-supplied structured data when it is sufficiently identified and current.
- Use FBS CLI for reproducible CFBD history and football context.
- Use Kalshi CLI for compatible public Kalshi contracts; its supported endpoints require no key.
- Use public-web research for material current or qualitative gaps, not to duplicate structured data.
- Treat correlated metrics from the same games and plays as related evidence rather than independent confirmation.
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

If FBS retrieval is needed, first run `fbs --version` and the relevant leaf `--help`. If the executable is missing, explain that Node.js 22.12 or newer and `npm install --global @jvorndran/fbs-cli` are required. CFBD needs a key configured with `fbs auth` or `CFBD_API_KEY`; never ask the user to paste the key into chat.

For Kalshi evidence, run `kalshi --version` and discover the exact series, event, and market rather than constructing a ticker. If missing, explain the `@jvorndran/kalshi-cli` installation. Do not request a Kalshi key.

When current information is material, consult the bundled [sources.yaml](references/sources.yaml) and follow its scope, access, guidance, and limitations. Broaden to other reputable public sources when the catalog has no suitable current entry. Do not browse merely because browsing is available.

## Analyze

Use the relevant modules from [workflows.md](references/workflows.md). Read [market-analysis.md](references/market-analysis.md) for odds conversion, no-vig calculations, movement, fair ranges, and binary-contract semantics.

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
