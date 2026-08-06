# Market Analysis

## Price discipline

Never detach a spread, total, or threshold from its price and rules. Preserve the provider's original format and value before converting it.

For American odds `a`:

- Positive: implied probability = `100 / (a + 100)`.
- Negative: implied probability = `abs(a) / (abs(a) + 100)`.

Remove vig only when compatible opposing prices from the same provider and observation time are known. Proportionally normalize their implied probabilities and state the method.

For a binary contract, verify the selected side, payout convention, expiry, close time, resolution source, fees, liquidity, and bid/ask semantics. A price in cents is not automatically comparable to sportsbook odds.

## Fair value

Prefer a range or scenario distribution over unsupported point precision. A useful fair range:

- Uses only evidence available before the decision cutoff.
- Separates stable team quality from matchup and availability adjustments.
- Makes the decisive assumptions visible.
- Reflects uncertainty from samples, status, rules, and market liquidity.

Do not call the difference an edge unless the current quote is verified and the comparison accounts for price, rules, and practical costs.

## Movement

Require at least two timestamped observations of the same market definition. Separate:

- Line or threshold movement.
- Attached-price movement at the same number.
- Cross-provider disagreement.
- A new contract or changed rules.

Movement alone does not establish public or professional sentiment, informed action, or predictive value.

## Mispricing hypothesis

State:

1. The market assumption being challenged.
2. The football mechanism that could make it wrong.
3. The evidence supporting that mechanism.
4. The strongest competing explanation.
5. What would falsify the thesis.
6. The exact number-and-price threshold where the conclusion changes.

Count correlated PPA, success, explosiveness, WEPA, and box-score views according to their shared lineage rather than as separate votes.
