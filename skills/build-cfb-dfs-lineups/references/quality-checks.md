# DFS Quality Checks

Apply the checks relevant to the request. A missing hard provider input should prevent a lineup from being called valid.

## Analysis

- Verify provider, slate, contest type, payout objective, lock time, scoring, multipliers, roster slots, and included games.
- Keep provider and CFBD player/game IDs separate.
- Distinguish provider facts, observed football data, supplied projections/ownership, and transparent assumptions.
- Check that historical inputs precede the decision cutoff and exclude target-slate outcomes.
- Identify current role, opportunity, teammate dependencies, quarterback/coordinator changes, game scripts, pace, scoring concentration, blowout risk, and late-news paths.
- Do not relabel FBS usage as snaps, routes, projections, current depth, ownership, or availability.
- Confirm current status and role with appropriately scoped sources.
- Preserve catalog limitations and disclose stale, inaccessible, capped, tier-blocked, or ambiguous evidence.
- Avoid double-counting related box, usage, success, PPA, WEPA, and play-derived metrics.
- Match floor, ceiling, salary efficiency, leverage, ownership, and correlation judgments to the contest objective.
- Identify recent-box-score, touchdown, brand, salary, chalk, and ownership bias without treating it as proven mispricing.
- State the strongest failure mode, shared fragile assumption, and late-news trigger.
- Do not produce lineups unless the user requested them.

## Requested lineups

- Recompute salary, slots, eligibility, slate membership, team/game rules, multipliers, locks, and user constraints from authoritative provider rows.
- Verify questionable, out, ineligible, off-slate, and locked players using current evidence.
- Recompute player, team, game, stack, multiplier, and portfolio exposures.
- Verify uniqueness, integer-feasible exposure bounds, stack rules, and duplication risk.
- Fail invalid or unverifiable lineups; never present drafts as ready entries.
- Show alternatives for material availability, role, projection, ownership, or late-swap uncertainty.
- Never upload, enter, or submit an entry.
