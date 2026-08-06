# Expert CFB DFS Workflows

Combine these modules according to the provider, slate, contest, and user objective. Keep provider facts, football evidence, supplied forecasts, and strategic judgment separate. Do not force a fixed optimizer or lineup recipe.

## Causal standard

Translate material evidence through:

`observed fact -> role/opportunity mechanism -> game-script effect -> fantasy distribution -> salary/ownership decision`

Do not treat a raw projection, recent box score, or usage leaderboard as a conclusion. Explain why the player can reach the relevant floor or ceiling in the specified contest.

## Core analysis modules

### 1. Establish the provider and contest contract

Confirm the authoritative provider or user export before evaluating players:

- Site, slate, included games, timezone, contest type, payout structure, and lock time.
- Salary cap, roster slots, position eligibility, scoring, multipliers, team/game restrictions, minimums, maximums, and late-swap rules.
- Provider player/game IDs, salaries, positions, eligibility, slate membership, and lock status.

Do not infer a missing salary, scoring rule, eligibility rule, slate member, or lock state from FBS or another provider.

### 2. Keep evidence layers separate

Label each input as:

1. Provider facts: salary, eligibility, scoring, slate, lock, and rules.
2. Observed football history: role, opportunity, efficiency, matchup, and environment.
3. Supplied forecasts: projection, ownership, floor/ceiling, or model output with creator and timestamp.
4. Transparent assumptions and contest judgment.

Do not silently derive a provider projection or ownership estimate from FBS fields. If a heuristic is requested, show its inputs and uncertainty.

### 3. Analyze role and opportunity regimes

- Identify current starters, committees, replacements, teammate dependencies, red-zone and short-yardage roles, and late-news risk.
- Use quarterback, offensive-line, coordinator, and depth changes to define the relevant role regime.
- Separate attempts, carries, targets, routes, snaps, and efficiency. Do not substitute season averages for a current role without explaining the regime.
- Evaluate floor, median, ceiling, volatility, zero-event risk, touchdown dependence, and the player's likely range of outcomes.

### 4. Build game-environment and script cases

Consider neutral, favorite-leading, underdog-leading, shootout, low-pace, and blowout or garbage-time scenarios when they can change the player pool.

For each script, ask:

- How many plays and possessions are likely?
- Which team concentrates production and which distributes it?
- Which pass/run, pace, field-position, and scoring effects follow from the score state?
- Which players gain or lose volume if a game becomes one-sided?
- Which late-swap alternatives preserve or hedge the scenario?

Use weather, venue, travel, rest, opponent strengths, pressure, coverage, run fits, and finishing drives when they have a causal path to fantasy opportunity.

### 5. Evaluate salary, ownership, and leverage

- Compare the player's outcome range—not only the median—with salary and roster construction cost.
- Treat ownership as a sourced estimate with a provider/model, timestamp, and uncertainty; it is not an observed fact before lock.
- Identify chalk that is fragile, underowned ceiling, salary-induced mispricing, recent-box-score bias, touchdown bias, and popular-player narratives.
- Match the decision to the contest objective: stable floor for cash-style play, ceiling and leverage for tournaments, and uniqueness or duplication control for large fields.

### 6. Analyze correlation and construction

- Evaluate quarterback/pass-catcher stacks, bring-backs, concentrated rushing, opposing game environments, defensive or kicker conflicts, and conditional correlations.
- Treat correlation as a strategic judgment, not a provider rule. Explain when a negatively correlated pairing is still justified by salary, ownership, or a specific script.
- For single-game contests, account for multiplier rules, game-script clusters, duplicated constructions, and conditional player outcomes.

### 7. Manage portfolios and late swap

When multiple lineups are requested:

- Define exposure bounds, uniqueness, stack rules, locks, exclusions, and diversification objectives.
- Recompute player, team, game, stack, and multiplier exposures from the final lineup set.
- Identify shared fragile assumptions and correlated failure modes across lineups.
- Preserve late-swap paths by monitoring remaining salary, unlocked players, current status, and ownership changes.

### 8. Validate before calling a lineup valid

Ignore strategic appeal until every hard provider constraint passes. Recompute slots, eligibility, salary, slate membership, lock status, scoring treatment, team/game rules, user constraints, exposure bounds, uniqueness, and multipliers from authoritative rows.

## Useful workflow shapes

- **Cash-style analysis:** Emphasize stable role, floor, salary efficiency, and failure risk.
- **Tournament analysis:** Emphasize ceiling, ownership, leverage, correlation, and paths to first-place outcomes.
- **Player-pool review:** Rank targets, neutral options, avoids, and fragile assumptions without constructing lineups.
- **Single-game analysis:** Focus on multiplier rules, script clusters, conditional correlations, and duplication risk.
- **Late-swap review:** Reassess availability, remaining salary, ownership, and unlocked alternatives at the relevant time.
- **Lineup validation:** Test hard provider constraints before discussing strategic appeal.

## Evidence discipline

- State the strongest failure mode and what current news or provider change would alter the pool.
- Avoid double-counting box stats, usage, success, PPA, WEPA, and play-derived metrics from the same underlying plays.
- Preserve provider, forecast, source, timestamp, and catalog limitations.
- Stop when another metric cannot change a projection range, salary classification, exposure, correlation, or construction decision.
