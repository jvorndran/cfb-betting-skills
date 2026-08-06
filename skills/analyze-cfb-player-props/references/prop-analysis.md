# Player-Prop Analysis

## Sample and role-regime discipline

Choose the sample from the player's current role, not an arbitrary “last N.” Define the boundary before inspecting the split and list included games when practical.

- Keep season type and garbage-time treatment consistent.
- Exclude the target game and later outcomes from pregame work.
- Treat transfers, quarterback changes, injuries, new starters, coordinator changes, and depth changes as possible regime breaks.
- Prefer comparable post-change games and explain any prior or blended sample.
- Distinguish missing statistics from observed zeroes and category-specific workload from literal snaps or routes.

## Opportunity model

Express the prop through:

`team opportunities × player opportunity share × per-opportunity efficiency`

Define the relevant opportunity unit before using a proxy:

- Passing: team dropbacks/attempts, completion share, pressure, and scramble competition.
- Rushing: team carries, early-down work, short-yardage, goal-line work, and quarterback carries.
- Receiving: team attempts, routes, target share, air-yard share, and red-zone targets.
- Tackles, sacks, returns, kicking, and other markets: identify the observable role and its opportunity pool separately.

Adjust only the terms affected by opponent, weather, score state, scheme, or teammate availability. Keep role, opportunity, and efficiency uncertainty separate.

## Scenario method

Build low, base, and high cases around the decisive assumptions. At minimum, consider neutral/close, leading, trailing, and blowout or garbage-time conditions when relevant.

For each case, state:

1. Team opportunity environment.
2. Player share and role stability.
3. Per-opportunity efficiency.
4. Matchup, weather, and score-state adjustments.
5. Tail risks such as touchdown dependence, long plays, zero-event outcomes, or teammate substitution.

Call the result a plausible range unless it is produced by a defined statistical interval or simulation. Do not disguise judgment as model precision.

Useful role labels are `stable`, `conditional`, `fragile`, and `unknown`. Base them on observed opportunity, teammate dependencies, depth/rotation evidence, and regime continuity—not a hot streak.

## Price and prop-market bias

For American odds `a`:

- Positive: implied probability = `100 / (a + 100)`.
- Negative: implied probability = `abs(a) / (abs(a) + 100)`.

Remove vig only with compatible opposing prices from the same provider and observation time. State the normalization method.

Check whether star-player status, recent box scores, touchdown streaks, brand, news recency, or popular-player demand may affect the quote. Treat these as hypotheses unless compatible prices, alternate lines, movement, or other market evidence supports them. Never assume that a popular player is automatically overpriced.

Estimate fair probability only when the sample and assumptions support it. Otherwise compare the market to the plausible outcome range and give a threshold rather than false precision.

## Prop hypothesis

State:

1. The expected team-opportunity environment.
2. The player's expected share and why it should persist.
3. The per-opportunity efficiency assumption.
4. The matchup and game-script paths that raise or lower each term.
5. The strongest competing role or matchup explanation.
6. The market-bias evidence observed or unavailable.
7. What would falsify the thesis.
8. The exact line-and-price threshold where the conclusion changes.
