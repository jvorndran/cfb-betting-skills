# Player-Prop Quality Checks

Apply the checks relevant to the prop. A missing item that could reverse the result should produce `insufficient_evidence`, not a confident guess.

## Identity, contract, and cutoff

- Verify player, team, opponent, position, game, transfers, namesakes, and namespaced IDs.
- Verify exact statistic, period, direction, threshold, attached price, provider, observation time, and settlement rules.
- Set an `as_of` time and exclude the target game and later outcomes.
- Confirm the sample boundary reflects the current role and uses consistent season-type and garbage-time treatment.

## Role, matchup, and distribution

- Identify the current starter/committee/rotation role and teammate dependencies.
- Do not relabel FBS usage as snaps, routes, targets, depth, availability, or a current role.
- Separate team opportunities, player share, and per-opportunity efficiency; identify which drives the result.
- Address relevant trenches, pressure/coverage, defensive funnels, explosive plays, scoring-area usage, pace, and game-script effects.
- Stress-test neutral, leading, trailing, blowout, weather, quarterback, and teammate-availability scenarios when material.
- Treat touchdowns, long plays, garbage-time production, defensive mistakes, and tiny samples as variance-sensitive unless role or scheme evidence supports persistence.

## Market and price controls

- Recompute price conversions, vig treatment, push handling, and the exact threshold—not a nearby market.
- Check star-player, brand, recent-box-score, touchdown, and popular-player bias. Require observable market evidence before making a public or narrative-bias claim.
- Separate line/threshold movement, attached-price movement, alternate lines, cross-provider disagreement, stale quotes, and changed rules.
- State the strongest competing role or matchup explanation, the falsifier, and the exact line/price threshold that changes the conclusion.

## Evidence integrity

- Check current status, role, and teammate dependencies with appropriately scoped sources.
- Preserve catalog limitations and disclose stale, inaccessible, capped, tier-blocked, or ambiguous evidence.
- Avoid double-counting box stats, usage, success, PPA, WEPA, and play summaries from the same underlying plays.
- Use `insufficient_evidence` when identity, role, availability, price, rules, sample scope, or a decisive matchup assumption could materially reverse the conclusion.
