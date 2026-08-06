# Lines Quality Checks

Apply the checks relevant to the conclusion. A missing item that could reverse the result should produce `insufficient_evidence`, not a confident guess.

## Identity, market, and cutoff

- Verify season, week, kickoff, home/away orientation, venue, and namespaced game or contract IDs.
- Verify market type, side, line or threshold, exact price, provider, observation time, and settlement rules.
- Set an `as_of` time. Include only information available before it; exclude the target game and later results.
- Do not use a current full-season snapshot as historical pregame evidence without a dated archive.

## Football thesis

- Explain the baseline, opponent adjustment, and the specific matchup mechanism rather than listing basic stats.
- Address offensive-line versus defensive-front play, quarterback pressure/coverage, early-down success, explosive plays, finishing drives, and relevant scheme or coaching effects.
- Describe plausible close-game, favorite-leading, and underdog-leading scripts. Connect pace, play calling, drive volume, clock, garbage time, and fourth-down behavior to the selected market.
- Verify current personnel, role, continuity, venue, rest, travel, and weather when they can change the scripts.
- State the strongest contrary evidence and whether it changes the fair range.

## Market and bias controls

- Recompute odds conversions, no-vig values, signs, push handling, fees, and thresholds.
- Require compatible timestamped observations before claiming movement, public bias, reverse movement, sharp action, or closing-line value.
- Separate line/threshold movement, attached-price movement, cross-provider disagreement, liquidity or limit effects, stale screens, and new contracts or rules.
- Treat ticket/handle splits, brand/ranking/recency narratives, rivalry, primetime, and public sentiment as evidence-dependent hypotheses. Do not automatically fade a popular side.
- Distinguish historical FBS lines, live quotes, Kalshi prints, and executable prices.

## Uncertainty and evidence integrity

- Identify scenario assumptions, high-leverage sensitivities, key numbers, alternate prices, and the no-play zone.
- State a falsifier and the exact number/price threshold that changes the conclusion.
- Preserve catalog limitations and disclose stale, inaccessible, tier-blocked, capped, ambiguous, or unavailable public-market evidence.
- Identify overlapping metric lineage and avoid double-counting PPA, success, explosiveness, WEPA, box-score, or play-derived evidence.
- Regress turnover, defensive-touchdown, long-play, and red-zone noise unless role, scheme, or personnel evidence supports persistence.
- Use `insufficient_evidence` when identity, price, rules, cutoff, current status, decisive matchup evidence, or public-market context cannot be resolved.
