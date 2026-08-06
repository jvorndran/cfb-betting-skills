# Lines Quality Checks

Apply the checks relevant to the conclusion.

- Verify season, week, kickoff, home/away orientation, venue, and namespaced game or contract IDs.
- Verify market type, side, line or threshold, exact price, provider, observation time, and settlement rules.
- Set an `as_of` time and include only games completed before it; exclude the target game and later results.
- Do not use a current full-season snapshot as historical pregame evidence without a dated archive.
- Recompute odds conversions, no-vig values, signs, push handling, and thresholds.
- Require compatible timestamped observations before claiming movement.
- Distinguish historical FBS lines from live quotes and Kalshi prints from executable prices.
- Check that current availability, roles, and weather have direct, appropriately scoped sources.
- Preserve catalog limitations and disclose stale, inaccessible, tier-blocked, capped, or ambiguous evidence.
- Identify overlapping metric lineage and avoid double-counting it.
- State the strongest contrary evidence and whether it changes the fair range.
- Use `insufficient_evidence` when a missing identity, price, rule, cutoff, or current status could reverse the result.
