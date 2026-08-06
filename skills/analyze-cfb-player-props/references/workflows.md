# Expert CFB Player-Prop Workflows

Use these modules as a playbook, not a mandatory questionnaire. Cover the modules that can change the prop's opportunity, efficiency, distribution, or price, and stop when another source cannot change the threshold or uncertainty classification.

## Causal standard

Translate material evidence through:

`observed fact -> role/opportunity mechanism -> game-script effect -> prop distribution -> market price`

Do not count a box score or usage view as independent support when it comes from the same plays. Tie every important metric to a role, matchup, or price assumption.

## Core analysis modules

### 1. Verify the player and contract

- Resolve player, team, opponent, position, game, stable IDs, transfer history, and namesakes.
- Verify the exact statistic, period, over/under side, threshold, attached price, provider, observation time, and settlement rules.
- Set the decision cutoff and identify the role regime that existed at that time.

### 2. Define the current role regime

- Identify starter, committee, rotation, situational, short-yardage, red-zone, third-down, two-minute, return, or coverage responsibilities relevant to the prop.
- Separate confirmed availability from projected depth-chart position, beat-reporting inference, and speculation.
- Check quarterback, offensive-line, coordinator, teammate, and defensive personnel changes that could alter opportunity.
- Use comparable games after the role change; do not blend obsolete usage with current usage without explaining the regime break.

### 3. Model opportunity before efficiency

Express the prop as:

`team opportunities x player opportunity share x per-opportunity efficiency`

Keep the opportunity units distinct:

- Passing: team dropbacks, pass attempts, completion share, pressure, scramble competition, and pass rate.
- Rushing: team carries, early-down work, short-yardage, goal-line work, quarterback carries, and scramble competition.
- Receiving: team pass attempts, routes, target share, air-yard share, red-zone targets, and catchable-target context.
- Other markets: define the actual observable unit before using a proxy.

Estimate whether the share is stable, conditional, fragile, or unknown. Do not substitute season-level usage, games played, or a category called `plays` for literal snaps or routes.

### 4. Investigate player-specific matchup mechanics

Choose the few interactions most likely to move the requested stat.

- **Trenches and pressure:** Compare the offensive line with the defensive front, pressure/havoc, run fits, stuff, and obvious passing downs.
- **Quarterback and coverage:** Evaluate coverage structure, likely matchup, blitzes, quarterback response, target distribution, and whether pressure changes the player's opportunities.
- **Defensive funnels:** Ask whether the opponent removes the player's normal strength, permits the relevant volume, or forces production to another position or area of the field.
- **Explosiveness and scoring area:** Separate steady volume from deep targets, broken tackles, long runs, touchdowns, red-zone usage, and defensive mistakes.
- **Pace and environment:** Use expected plays, drives, field position, weather, surface, and venue only when they change opportunity or efficiency through a plausible mechanism.

### 5. Build conditional game scripts

Model a small scenario distribution rather than one point projection:

1. Neutral or close game with normal pace and expected play calling.
2. The player's team leading, with clock control or reduced volume.
3. The player's team trailing, with more passing, tempo, or comeback usage.
4. Blowout or garbage-time conditions when they materially change the role.

For each script, state the effect on team opportunities, player share, efficiency, and tail outcomes. Identify whether the prop needs one narrow script, survives several scripts, or is harmed by the most likely game state.

### 6. Analyze distribution, variance, and market psychology

- Build low, base, and high cases around role, opportunity, and efficiency—not arbitrary hot/cold narratives.
- Identify floor, median, ceiling, zero-event risk, touchdown or long-play dependence, and teammate correlations.
- Check star-player, recent-box-score, touchdown, brand, and popular-player bias; do not assume a public fade without timestamped price, alternate-line, or market evidence.
- Compare compatible prices and alternate thresholds when available. Separate a changed line from a changed attached price and label user-supplied quotes.

### 7. Stress-test the price

- Convert the exact price, remove vig only when compatible opposing prices exist, and compare the quote with the plausible outcome range.
- Vary high-leverage assumptions: role, quarterback, teammate availability, pace, pressure, target/carry share, weather, and scoring-area usage.
- State the strongest competing role or matchup explanation, what would falsify the thesis, and the exact line/price threshold where the conclusion changes.

## Useful workflow shapes

- **Role-change analysis:** Define the personnel or coaching event that created the current role, then use only comparable post-change evidence.
- **Volume prop:** Center team attempts, carries, targets, routes, or another opportunity unit; treat efficiency as a modifier.
- **Efficiency prop:** Establish expected opportunities first, then analyze yards, completions, production per opportunity, or success rate.
- **Touchdown prop:** Model scoring-area opportunities and the wide, correlated distribution of rare outcomes rather than extrapolating recent touchdowns.
- **Matchup-funnel analysis:** Start with the opponent's defensive structure and identify whether it creates or removes the player's normal path to volume.
- **Portfolio comparison:** Apply consistent identity, role, price, cutoff, and uncertainty rules across several props while allowing different role models.
- **Retrospective:** Use only the role, quote, and information available before the historical game.

## Evidence discipline

- Preserve the strongest contrary role, teammate, and matchup evidence.
- Count box stats, usage, success, PPA, WEPA, and play summaries according to shared source lineage.
- Treat touchdowns, long plays, defensive scores, garbage-time production, and tiny samples as variance-sensitive unless role or scheme evidence supports persistence.
- Stop when further research repeats an upstream data family, cannot affect the opportunity range or price threshold, or would require unavailable pre-cutoff information.
