# Expert CFB Lines Workflows

Use these modules as a playbook, not a mandatory questionnaire. Cover the core modules that can change the market conclusion, combine related evidence, and stop when another endpoint cannot change the range, threshold, or uncertainty.

## Causal standard

Translate material evidence through:

`observed fact -> football mechanism -> game-script effect -> market impact`

Do not count a metric as support merely because it agrees with the thesis. Record the sample, opponent quality, game-state context, and data lineage well enough to tell whether it adds information.

## Core analysis modules

### 1. Define the market and its baseline

- Verify the exact side, spread or total, attached price, provider, observation time, and settlement rules.
- Convert the quote into the market's implied expectation before arguing that the market is wrong.
- Establish a cutoff-correct baseline from opponent-adjusted team strength, venue, rest, travel, schedule, and recent but representative performance.
- Separate stable team quality from current availability, matchup adjustments, and noisy outcomes such as turnovers or defensive scores.
- Use prior-season or current full-season views only when they were available at the decision cutoff, or label them as priors rather than pregame evidence.

### 2. Investigate matchup mechanics

Choose the few interactions most likely to move the distribution.

- **Trenches:** Compare offensive-line pass protection with the opponent's pressure, havoc, sack, and obvious-passing-down profile. Compare run blocking, line yards, stuff, power success, gap fit, and defensive-front depth. Adjust for injured or inexperienced linemen and continuity rather than treating a unit average as fixed.
- **Quarterback and coverage:** Evaluate how each quarterback handles pressure, coverage structure, blitzes, disguised looks, and opponent-specific weaknesses. Separate clean-pocket efficiency from pressured performance when evidence allows.
- **Early downs and explosiveness:** Compare success rate, early-down efficiency, rushing and passing splits, explosive creation and prevention, missed tackles, and field position. Ask whether a team can stay ahead of schedule or is forced into low-efficiency passing downs.
- **Finishing and variance:** Check red-zone and goal-to-go performance, field-goal dependence, fourth-down choices, special teams, turnovers, sacks, defensive touchdowns, and explosive-play tails. Regress unstable outcomes unless there is a football reason they should persist.
- **Scheme and coaching:** Look for tempo, formations, motion, coverage or front tendencies, coordinator preferences, matchup-specific adjustments, and evidence that a personnel change will alter the plan. Use web research for qualitative scheme or coaching information unavailable in FBS.

### 3. Build plausible game scripts

Model a small scenario distribution instead of one predicted score. At minimum, consider:

1. A close game with normal pace and neutral play calling.
2. The favorite leading early and the opponent chasing with more passing, tempo, or fourth-down risk.
3. The underdog leading early and the favorite forced into a different style.

For each scenario, ask how score state changes pace, pass/run rates, drive count, field position, clock usage, garbage-time opportunity, defensive substitutions, and late-game decisions. Map each script to the market:

- **Spread:** Margin distribution, favorite/underdog ability to protect or erase a lead, late scores, and key-number exposure.
- **Total:** Possession count, efficiency per drive, explosive-play and red-zone tails, field goals, weather, and whether a lead creates clock-killing or hurry-up behavior.
- **Moneyline:** Win-probability paths, upset routes, overtime or late-variance exposure, and whether the underdog can create the specific tail outcome needed to win.
- **Kalshi:** Apply the contract's exact threshold, expiry, resolution, and payout semantics to the same scenarios; do not substitute sportsbook assumptions.

State which scenario drives the thesis, which scenario breaks it, and whether the quote already prices the expected script.

### 4. Test personnel and environment

- Verify quarterback, offensive-line, defensive-front, secondary, skill-position, and special-teams availability and expected roles.
- Distinguish confirmed status from projected depth-chart position, beat-reporting inference, and speculation. Account for replacement quality and rotation depth, not just the missing player's name.
- Consider surface, venue, travel, rest, altitude, kickoff, wind, precipitation, heat, and weather uncertainty only when they have a plausible path to the script or efficiency.

### 5. Examine market psychology and structure

Always address this module, but never invent evidence or default to fading the public.

- Check whether brand, rankings, recent scores, unbeaten records, rivalry, primetime, conference narratives, or headline injuries could create a public-facing bias.
- When available, record timestamped ticket/handle splits, opener/current/consensus numbers, price movement at the same number, line movement, cross-provider disagreement, limits, liquidity, and stale or suspended quotes.
- Treat reverse line movement, steam, or a contrarian signal as a hypothesis requiring compatible market definitions and timestamps. Movement alone does not identify public or professional action.
- Distinguish a true market repricing from a changed contract, provider limit, low-liquidity print, stale screen, or altered rules. For Kalshi, inspect orderbook depth, trades, candles, spread, fees, and resolution language separately from sportsbook behavior.
- If public splits or reliable movement history are unavailable, say that market psychology is unobserved; do not infer it from a favorite's popularity or a single quote.

### 6. Stress-test price sensitivity and uncertainty

- Compare a scenario-weighted fair range with the exact number and attached price. Avoid unsupported point precision.
- Vary the assumptions that matter most: quarterback status, trench performance, pace, explosive rate, finishing drives, weather, and script probability.
- Identify key numbers, alternate lines, push behavior, vig, liquidity, and the no-play zone where the conclusion becomes pass or insufficient evidence.
- State the strongest competing explanation, what would falsify the thesis, and the exact number/price threshold that changes the conclusion.

## Useful workflow shapes

- **Market-first:** Start from a verified quote, identify its implied assumptions, and attack the assumptions most likely to be wrong.
- **Matchup-first:** Form a price-blind football range from baseline, trenches, coverage, scripts, and personnel, then compare it with the market.
- **Script-first:** Use when pace, quarterback status, weather, or a major trench mismatch creates materially different outcome paths.
- **Movement review:** Compare timestamped observations of the same market and separate number movement, attached-price movement, provider disagreement, and contract changes.
- **Retrospective:** Use only the price and information available at the historical cutoff; never grade the decision with later injuries, results, or closing information.

## Evidence discipline

- Keep the strongest counterargument visible instead of burying it in a conclusion.
- Count correlated PPA, success, explosiveness, WEPA, box-score, and play-derived views according to their shared source lineage.
- Treat turnover rate, defensive touchdowns, long plays, red-zone conversion, and late-game scoring as variance-sensitive unless role, scheme, or personnel evidence supports persistence.
- Stop when further research repeats an upstream data family, cannot affect the threshold, or would require unavailable pre-cutoff information.
