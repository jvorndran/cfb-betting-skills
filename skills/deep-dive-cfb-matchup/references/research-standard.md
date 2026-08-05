# Individual matchup research standard

Use this reference while building the two price-blind team profiles and the matchup synthesis.

## Evidence order

Prefer sources in this order, while preserving useful disagreements:

1. user-supplied structured data;
2. `$fbs-cli` output or another structured provider response;
3. official schedules, rosters, statistics, game books, and team reports;
4. attributable local reporting with a publication date;
5. national reporting or public aggregators, clearly labeled.

Record publication time, observation time, applicable-as-of time, source type, and a stable source ID whenever available. A search result snippet is a locator, not final evidence. Do not imply that the absence of a report confirms health, availability, or role.

## Team-side worksheet

Research each side independently and price-blind. Cover only fields that affect this game, but explicitly inspect every row before deciding it is immaterial.

| Area | Minimum questions |
| --- | --- |
| Staff and system | Which coordinators or position coaches changed? What terminology, structure, or play-calling responsibility carries over? |
| Quarterback | Starts, attempts, pressure and mobility evidence, role certainty, backup path, and sample limitations? |
| Offensive line | Returning starters and snaps, center/guard continuity, tackle floor, injuries, likely five, and communication risk? |
| Backs and targets | Returning usage, transfer production, pass protection, target hierarchy, role overlap, and competition translation? |
| Defensive front | Returning snaps, interior size, edge pressure, run-fit experience, rotation, and transfer translation? |
| Linebackers | Snap continuity, tackling and coverage roles, communication responsibility, and availability? |
| Secondary | Returning roles, corner/nickel/safety communication, coverage change, explosive-play risk, and depth? |
| Special teams | Kicker, punter, return roles, reliability, and any rules or venue effect that matters? |
| Continuity | Overall and position-level returning snaps, with the source methodology and transfer treatment? |
| Performance | Efficiency, explosiveness, havoc, finishing drives, field position, pace, and opponent/sample context? |
| Availability | Confirmed active, limited, questionable, unavailable, or unknown as of what time? |
| Environment | Venue, surface, travel, rest, altitude, kickoff window, and weather only when inside a useful forecast window? |

For every important area retain five fields: `fact`, `mechanism`, `counterevidence`, `unknown`, and `refresh_trigger`.

## Continuity and transfer discipline

- Treat returning snaps as shared repetition and communication, not as a talent grade.
- Treat CFBD returning production as retained PPA and usage, never as returning snaps. Use a source that explicitly measures snaps for team or position snap continuity.
- State whether incoming transfers are excluded. Do not silently add their prior snaps to team continuity.
- Separate individual experience from unit cohesion. Five experienced transfers can still form a new offensive line.
- Discount historical team efficiency when the quarterback, coordinator, line calls, target tree, or most of a defense changed.
- Do not assume a transfer's production translates unchanged across level, role, scheme, or health status.

## Matchup mechanisms

Build interactions at the unit level. Useful questions include:

- Can the offense stay ahead of schedule on neutral downs?
- What creates obvious passing downs, and which side can exploit them?
- Where can explosives arise, and what protection or coverage failure is required?
- Can pressure, havoc, or takeaways occur without exposing the defense elsewhere?
- Which side owns the likely red-zone, field-position, or special-teams advantage?
- Does pace or personnel grouping force an uncomfortable rotation or communication burden?

Phrase each interaction as a causal chain. Example structure:

```text
Returning tackles plus a stable backfield may keep the new quarterback out of third-and-long.
This fails if the rebuilt interior line loses early downs and forces protection identification against pressure.
```

A ranking difference without a causal bridge is not a matchup mechanism.

## Prior-meeting portability

Use a previous head-to-head only when it helps explain this game. Decompose:

- current versus departed contributors;
- concentration of yards, touchdowns, pressures, turnovers, or explosive plays;
- home/away or neutral-site change;
- coordinator and scheme changes;
- game-state and turnover effects; and
- whether several headline statistics encode the same cause.

State a portable lesson and a nonportable lesson. A prior result may show that a concept can stress an opponent while the departed player who executed it prevents literal projection.

## Game scripts

Create two to four scripts that cover materially different mechanisms. For each include:

- a short label;
- the causal sequence;
- necessary conditions;
- failure mode;
- evidence confidence; and
- observations that would strengthen or weaken it.

Keep scripts qualitative unless a separate reproducible forecasting method supports numbers. Do not assign probabilities that merely sum to 100, fabricate a score range, or use the scripts as a hidden fair-line model.

## Freshness rules

- Use official game-week notes and depth charts when available, while recognizing that an `OR` listing preserves uncertainty.
- Refresh material availability and role questions when camp reporting, official notes, or warmup information changes them.
- Check weather near T-72 and T-24 rather than presenting a distant forecast as decision evidence.
- Refresh any line, prop, salary, contest rule, or market contract immediately before its downstream decision.
- Keep stale evidence visible with a deadline and next action instead of silently overwriting it.
