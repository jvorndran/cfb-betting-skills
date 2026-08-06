# DFS Analysis and Lineup Construction

## Player assessment

Keep these layers separate:

1. Provider facts: salary, eligibility, slate, scoring, and lock.
2. Observed football history: opportunity, efficiency, matchup, and environment.
3. Supplied forecasts: projection and ownership with creator and timestamp.
4. Judgment: floor, ceiling, leverage, correlation, and contingency value.

Do not silently derive a projection from FBS fields. If the user asks for a transparent heuristic, label its inputs and assumptions and keep it separate from provider facts.

## Required lineup inputs

Before calling a lineup valid, know:

- Every roster slot and eligibility rule.
- Salary cap, minimum salary if any, and multiplier treatment.
- Team/game minimums or maximums.
- Slate membership and lock state.
- Provider identity, salary, position, team, and opponent for every selected athlete.
- User locks, exclusions, stack rules, uniqueness, and exposure requirements.

If a hard input is missing, provide analysis or draft combinations rather than valid lineups.

## Construction

Use the objective the user specifies: median, floor, ceiling, leverage, uniqueness, correlation, diversification, or a combination. State tradeoffs rather than hiding them in an optimizer score.

For larger pools or portfolios, use deterministic temporary code with immutable local inputs and a recorded seed where randomness is involved. Do not embed credentials or let the script retrieve network data.

## Per-lineup validation

Recompute:

1. Every required slot is filled exactly once.
2. Each athlete appears only as allowed.
3. Position and slot eligibility.
4. Provider salary total and any multiplier.
5. Slate membership, team/opponent identity, and lock eligibility.
6. Team/game restrictions and other provider rules.
7. User locks, exclusions, and lineup-specific constraints.

Use `pass` only when all hard checks are verified. Use `warn` for a valid lineup with bounded uncertainty, such as a currently sourced questionable player. Use `fail` for a violation, confirmed absence, or unverifiable hard rule.

## Portfolio validation

Recompute player, team, game, stack, and multiplier exposures from the final lineup set. Verify uniqueness and integer-feasible exposure bounds. Highlight concentration in uncertain players, correlated failure modes, and assumptions shared by most candidates.
