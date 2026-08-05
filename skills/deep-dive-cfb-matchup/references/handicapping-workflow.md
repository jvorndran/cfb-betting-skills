# Expert Handicapping Workflow

Use this reference after both price-blind team workpapers exist and before the `matchup_context` is frozen. It is a disciplined evidence pass, not a request to force a contrarian opinion, numeric model, or wager.

## Repeatable pass

1. **Set the regime and sample.** Name the season, eligible game IDs, garbage-time policy, opponent context, and material quarterback, coordinator, or personnel boundary.
2. **Form a broad team-quality prior.** Use bounded efficiency and opponent-adjusted context when available. Early in a season, label prior-year performance and preseason ratings as priors and apply a continuity/translation discount rather than pretending current-year data exists.
3. **Decompose results from performance.** For decisive recent games and prior meetings, inspect turnovers, non-offensive touchdowns, short fields, concentrated explosives, third- and fourth-down outcomes, finishing drives, penalties, garbage time, and opponent strength. Call these amplification or instability flags; do not call them luck or assign a regression magnitude without a calibrated method.
4. **Classify the evidence.** Label each decisive signal `stable`, `conditional`, `fragile`, or `unknown` and explain why. When the record supports both, explicitly name the comparatively most stable signal and the most fragile or regression-prone outcome; otherwise state which side of that comparison is unavailable. These are comparative judgments about repeatability and portability, not universal causal findings or numeric scores.
5. **Apply continuity and translation discounts.** Separate retained production from returning snaps, individual experience from unit cohesion, and prior production from its likely translation across level, role, scheme, and health.
6. **Build causal unit matchups.** State what must occur on the field, the supporting evidence, the opponent's countermechanism, and the observation that would falsify the mechanism.
7. **Challenge the headline.** Test final-score, ranking, ATS, rivalry/revenge, coach-change, returning-starter, and transfer-talent narratives against the underlying evidence. A popular headline is a hypothesis to test, not a reason to fade it automatically.
8. **Retain zero to three price-blind hypotheses.** Each retained hypothesis needs a mechanism, evidence-stability label, strongest competing explanation, and falsifier. `No price-blind edge hypothesis` is a valid result.
9. **Freeze before price.** Put the judgments in existing `team_profiles`, `matchup_factors`, `sample_notes`, claims, counterevidence, unknowns, and refresh triggers. Do not add market language or new schema keys. Downstream market skills decide whether price offers anything.

## Source-capability map

Use the capability labels `direct`, `derived`, `public_required`, and `unavailable` in working notes or existing caveat fields. An unavailable input becomes an explicit unknown; it is never silently omitted or invented.

| Question | Best available source | Capability and limit |
| --- | --- | --- |
| Schedule, identity, rest, venue | `fbs games`, `calendar`, `venues`, and `games media` | `direct`; derive rest and geographic exposure from verified dates/locations. These sources do not establish travel itinerary, arrival time, or fatigue impact. |
| Bounded baseline efficiency | `fbs stats season advanced` with verified week bounds and game IDs | `direct`; covers PPA, success, explosiveness, down/rush/pass splits, havoc, field position, and finishing drives. Early-season rows may be empty. |
| Opponent-adjusted prior | FBS WEPA, SP, SRS, Elo, or FPI | `direct` when populated, but many are current/full-season rather than historical-cutoff snapshots. They share the CFBD upstream family and are not independent model votes. Never convert a rating gap to points without a calibrated method. |
| Result amplification and prior-game portability | `games teams`, `stats game advanced`, `stats game havoc`, tiered `game box advanced`, `drives`, and bounded `plays` | Mostly `direct`; explosive concentration and short-field scoring can be `derived` only with a stated formula and eligible-play list. Do not mix garbage-filtered and unfiltered samples silently. |
| Rosters, transfers, and continuity | `roster`, `player portal`, `player returning`, official roster pages, and current team reporting | `public_required` when FBS is empty or identity/role is current. Returning production is retained PPA/usage, not snaps or starters. Portal rows do not prove enrollment, availability, role, or translation. |
| Player opportunity and role | `games players`, bounded player stats/success/PPA, and `player usage`; official notes/reporting for current role | CFBD supplies production and usage views, not snaps, routes, depth order, or injuries. Those are `public_required`; if unverified, role remains `unknown`. |
| Staff and scheme | `fbs coaches` plus official staff releases and attributable reporting | Head-coach history can be `direct`; coordinator, play-caller, and scheme claims are normally `public_required`. |
| Weather | tiered `games weather` for provider observations; official point forecast near kickoff | Current decision weather is `public_required` near its credible horizon. Empty/tier-denied FBS weather is unavailable evidence, not benign weather. |
| Current game markets | Verified sportsbook/exchange snapshot or `$kalshi-cli` after the freeze | FBS lines are historical context and lack attached spread/total juice, provider quote time, and rules. Kalshi can supply verified public contract metadata, quotes/orderbooks, trades, candles, and rules only when a matching contract exists. |
| Player-prop markets | User-supplied or separately verified provider quote and rules | Normally `public_required`. FBS supplies no props, and Kalshi contract discovery must not be assumed to include player-specific CFB markets. |
| Public percentages, “sharp money,” proprietary grades, quantified motivation | No governed source in the current stack | `unavailable`; do not use these as evidence or infer them from line movement, brand, rivalry, or media attention. |

Current-season empty responses are expected before coverage is populated. Preserve the exact successful empty envelope or structured error and move to the named supplement; never convert `count: 0`, a tier error, or a registry gap into a factual zero.
