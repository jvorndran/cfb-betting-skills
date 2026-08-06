# DFS Analysis and Lineup Construction

## Evidence layers

Keep these layers separate and label them in the analysis:

1. **Provider facts:** salary, eligibility, slate, scoring, roster slots, locks, and contest rules.
2. **Observed football history:** role, opportunity, efficiency, matchup, environment, and game scripts.
3. **Supplied forecasts:** projection, floor/ceiling, ownership, or leverage with creator and timestamp.
4. **Judgment:** contest objective, salary efficiency, leverage, correlation, contingency value, and portfolio risk.

Do not silently derive a projection or ownership estimate from FBS fields. If a transparent heuristic is requested, label inputs, assumptions, and uncertainty separately from provider facts.

## Player range and game-script assessment

For each relevant player, define the current role regime and model:

`team opportunities × player opportunity share × fantasy efficiency`

Keep carries, targets, routes, snaps, red-zone work, and touchdowns distinct. Evaluate floor, median, ceiling, volatility, zero-event risk, and outcome tails under neutral, favorite-leading, underdog-leading, shootout, low-pace, and blowout scripts when material.

Ask which teammate, quarterback, offensive-line, coordinator, weather, or defensive change could move the range. Treat recent touchdowns, long plays, defensive scores, and garbage-time production as variance-sensitive unless role evidence supports persistence.

## Required lineup inputs

Before calling a lineup valid, know:

- Provider, slate, contest, included games, lock time, timezone, and scoring.
- Every roster slot, eligibility rule, salary cap, minimum salary if any, and multiplier treatment.
- Team/game minimums or maximums, late-swap rules, and payout objective.
- Slate membership and lock eligibility for every selected athlete.
- Provider identity, salary, position, team, and opponent for every selected athlete.
- User locks, exclusions, stack rules, uniqueness, exposure requirements, and lineup count.

If a hard input is missing, provide analysis or draft combinations rather than valid lineups.

## Construction objectives

Use the objective the user specifies: median, floor, ceiling, leverage, uniqueness, correlation, diversification, or a combination. State tradeoffs rather than hiding them in an optimizer score.

- **Cash-style:** Favor stable role, floor, salary efficiency, and lower failure risk.
- **Tournament:** Favor ceiling, ownership leverage, correlation, and paths to first-place outcomes.
- **Single-game:** Apply multiplier rules, script clusters, conditional correlations, and duplication risk.
- **Late swap:** Preserve unlocked alternatives, remaining-salary paths, and current-status flexibility.

For larger pools or portfolios, use deterministic temporary code with immutable local inputs and a recorded seed where randomness is involved. Do not embed credentials or let the script retrieve network data.

## Per-lineup validation

Recompute:

1. Every required slot is filled exactly once.
2. Each athlete appears only as allowed by the provider.
3. Position and slot eligibility.
4. Provider salary total, minimums, maximums, and any multiplier.
5. Slate membership, team/opponent identity, lock state, and scoring treatment.
6. Team/game restrictions and other provider rules.
7. User locks, exclusions, stacks, and lineup-specific constraints.

Use `pass` only when all hard rules are verified. Use `warn` for a rule-valid lineup with bounded uncertainty, such as a currently sourced questionable player. Use `fail` for a violation, confirmed absence, or unverifiable hard rule.

## Portfolio validation

Recompute player, team, game, stack, and multiplier exposures from the final lineup set. Verify uniqueness and integer-feasible exposure bounds. Highlight concentration in uncertain players, shared game-script assumptions, duplicated constructions, and correlated failure modes. Show alternatives when material availability or role uncertainty remains.
