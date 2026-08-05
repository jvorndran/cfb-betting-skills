# CFB Research Audit Checklist

Apply all universal checks and the checks for every artifact kind under review. Record `pass`, `warn`, `fail`, or `not_applicable` for each item; `not_applicable` does not affect the overall status.

## Contents

- Universal checks
- CFBD and FBS CLI checks
- Matchup, betting-line, player-prop, and DFS checks
- Validation reuse
- Severity and structured output

## Universal Checks

### Scope and identity

- Match game IDs, teams, home/away designation, season, week, date, venue, and timezone across the artifact and sources.
- Match athlete IDs or unambiguous name/team/position combinations. Detect transfers, duplicate names, and stale team assignments.
- Confirm that each statistic, price, rule, and news item belongs to the intended game, market, slate, season, and sample.
- Verify namespaced IDs as `<provider>:<entity>:<native-id>` while retaining the provider-native ID separately. Never join naked IDs across providers or entity types.
- Prefer stable provider IDs. When none exists, inspect every component of the declared composite join, its normalization, expected cardinality, and ambiguity; a name-only join is not sufficient.

### Freshness and provenance

- Require a source locator and retrieval time for every live or time-sensitive input.
- Judge freshness relative to the decision time. Recheck injuries, depth charts, weather, prices, salaries, eligibility, and lock status near their relevant deadline.
- Prefer primary or authoritative sources. Confirm that cited material supports the claim rather than merely mentioning the subject.
- Distinguish observed snapshots from inferred movement or historical recollection.
- Trace syndication and shared datasets. Multiple pages copying one report count as one evidence chain.
- Assign an `upstream_family` to decisive evidence. `fbs`, CFBD pages, and downstream extracts of either remain one `CFBD` upstream family.

### Calculations and reproducibility

- Recompute decisive totals, rates, margins, probabilities, prices, projections, simulations, and constraint checks from the cited inputs.
- Confirm units, signs, denominators, rounding, missing-value handling, sample filters, and deterministic seeds.
- Inspect generated-code inputs and outputs when they materially support a conclusion. Fail opaque calculations that cannot be reproduced and are necessary for action.
- Preserve numeric `0` and boolean `false`; do not convert either to missing. Do not turn an omitted FBS field into a confirmed null or zero.

### Method and uncertainty

- Check sample selection, opponent quality, garbage-time treatment, home/away context, regime changes, and small-sample sensitivity.
- Check that decisive recent results and prior meetings were decomposed for turnovers, non-offensive scores, short fields, concentrated explosives, high-leverage downs, finishing drives, and other result amplification when material.
- Require evidence-backed `stable`, `conditional`, `fragile`, or `unknown` judgments for decisive signals. Reject invented stability scores, unsupported regression magnitudes, and claims that a volatile result must reverse.
- Check that headline traps were tested against underlying evidence rather than automatically followed or faded. Rankings, final margins, ATS records, rivalry/revenge, brand, coach changes, and transfer narratives are not themselves proof of mispricing.
- Require an action-oriented conclusion to trace to a testable hypothesis with a causal mechanism, strongest competing explanation, falsifier, price threshold, and freshness trigger.
- Reject look-ahead leakage: do not use information unavailable at the artifact's stated decision time.
- Identify correlated features, outcomes, markets, lineups, or evidence presented as independent support.
- Identify correlated metric families as well as duplicated sources. Advanced efficiency, PPA, WEPA, ratings, box scores, and play-derived features may share CFBD data or football events even when their endpoint names differ.
- Separate facts, assumptions, estimates, and opinions. Require uncertainty or sensitivity where conclusions depend on volatile inputs.
- Find unsupported causal claims, overconfident language, cherry-picked comparables, and conclusions that exceed the evidence.

## CFBD and FBS CLI Checks

Apply this section whenever a decisive claim cites `fbs`, CollegeFootballData, a copied FBS result, or a derivative calculated from one.

### Reproduce and verify the envelope

- Use `$fbs-cli` for the smallest exact rerun when it is available and the audit is authorized to make a read-only request. Reuse a captured packet when network access is denied, the evidence is still valid for the cutoff, or another identical query would waste quota.
- Require a successful response to contain one YAML document on stdout with `command`, `endpoint`, supplied `query`, `count`, and the documented endpoint-specific result key. Check the result key rather than relying on YAML key order.
- Match the envelope query to the claimed season, week, team, player, game, season type, garbage-time policy, and other material filters. A broad or differently scoped response does not reproduce a narrow claim.
- Confirm `count` against the top-level result. When a sanitized packet retains only a sample, require its recorded original collection length and `sample_only: true` instead of pretending the sample is complete.
- On a nonzero exit, require stdout to be empty and parse the structured `error` from stderr. Preserve its code, command, query, status, and hint without exposing credentials.

### Interpret absence and provider limits

- Treat `count: 0` plus the correct empty result collection as a successful query that returned no rows. It is not proof that the underlying fact is zero, false, or nonexistent.
- Treat `cfbd_forbidden`, a tier-related `cfbd_unauthorized`, or another structured provider error as unavailable evidence, never as an empty result.
- FBS omits provider `null` and `undefined` fields while preserving `0`, `false`, IDs, arrays, and precision. Do not recreate an omitted value without another source.
- Treat exactly 2,000 `/plays/stats` rows as a possible provider-cap boundary. Narrow by game, athlete, stat type, team, or week before claiming the sample is complete; otherwise keep the truncation risk visible.

### Verify identity, cutoff, and joins

- Reuse returned game and player IDs in follow-up queries. Match both native and namespaced IDs across source packets, claims, calculations, and artifacts.
- Reject a player join based only on a shared name when player ID, season, team, or position conflicts. Reject a game join that loses home/away orientation or conflates seasons.
- Permit a composite join only when no stable provider ID exists. Record its ordered fields, normalization, collision check, and expected one-to-one or one-to-many relationship.
- Distinguish `retrieved_at`, `applicable_as_of`, and `data_cutoff`. A response retrieved later may reproduce a historical query but cannot prove that the value was available before the stated cutoff without suitable snapshot evidence.
- For an upcoming Week N analysis, verify that performance evidence stops at the approved cutoff, normally through Week N-1. Do not accept `end_week: N-1` by itself: compare the included game IDs, kickoff times, and completed state with the target kickoff. Week 0, postponed, rescheduled, and cross-season games may require game-row reconstruction. Flag later games, updated rosters, or retrospective provider corrections when they create leakage.
- Classify the endpoint's cutoff capability. Week-ranged season/player stats can be natively bounded; game advanced/havoc/PPA/success/box rows can be reconstructed from eligible game IDs; Elo or CFP rankings are weekly snapshots; team PPA, WEPA, SP/SRS/FPI, records, player season overview, player usage, and returning production require a dated archived snapshot for historical pregame use or must be excluded/labeled as a prior-season baseline.

### Track upstream and metric correlation

- Label each FBS packet `upstream_family: CFBD` even when different CLI commands or downstream artifacts carry it.
- Assign one or more `metric_families`, such as `advanced_efficiency`, `ppa`, `wepa`, `ratings`, `box_score`, or `play_derived`, when those fields materially support a conclusion.
- Multiple endpoints can be complementary without being independent. Do not increase confidence merely because the same CFBD games or plays appear through several transformed metric families.
- A rerun through `$fbs-cli` reproduces the provider result; it is not independent corroboration of CFBD. Use a separate authoritative upstream when independence matters.

## Matchup Checks

- Verify kickoff, venue, surface, weather horizon, travel and rest claims.
- Confirm roster, injury, depth-chart, coaching, and role-change evidence is current and attributed.
- Check offense/defense direction, opponent adjustment, pace, explosiveness, efficiency, finishing drives, turnovers, and field-position definitions.
- Confirm comparable opponents were selected before outcomes were known and are genuinely comparable; disclose conflicting evidence.
- Confirm the team-quality prior, result-quality audit, evidence-stability labels, continuity/translation discounts, headline tests, and causal hypotheses remain price-blind until the matchup context is frozen.

## Betting-Line Checks

- Verify market type, side, provider, line, odds or price, timestamp, and settlement semantics.
- Keep spread or total points distinct from price; account for pushes and key-number movement when relevant.
- Recompute implied and no-vig probabilities with the correct market structure. Verify fair-value ranges and claimed edge at the quoted executable price.
- Require multiple time-stamped observations before claiming movement. Do not call an old quote current.
- Audit the prose `bet`, `watch`, or `pass` candidate gate. A `bet` requires verified executable quote and rules, a favorable reproducible range after costs and uncertainty, fresh decision-sensitive availability, and no reversal-risk gap. A `watch` requires a measurable source, trigger, deadline, and price condition. Require `pass` when the fair range spans the market, the market absorbs the thesis, the hypothesis fails, or no bounded repair exists.

## Player-Prop Checks

- Verify player identity, team, opponent, exact stat, direction, line, price, period, provider, timestamp, and settlement rules.
- Confirm availability, expected role, depth-chart position, snap or usage evidence, and material substitutions.
- Check that projections use the correct opportunity base and do not mix incompatible stat definitions or game samples.
- Fail action-oriented conclusions when unresolved status or role information could materially reverse them.
- Block a prop `bet` when the current quote/rules, player identity, availability, or role is unresolved, or when the apparent edge is dominated by touchdown, long-play, garbage-time, or score-state amplification without stable opportunity support. Require a measurable workload, availability, source, deadline, and price trigger for `watch`.

## DFS Checks

- Verify provider, slate, contest type, lock time, salary cap, roster slots, eligibility, salary rows, multipliers, and all provider restrictions.
- For every lineup, recompute salary, slot eligibility, uniqueness of athletes, slate membership, team/game restrictions, availability, locks, and user constraints.
- Across the portfolio, recompute exposures, uniqueness, stacks, correlations, and concentration in uncertain players or assumptions.
- Fail every invalid lineup and the overall portfolio when any included lineup or hard portfolio constraint fails.

## Validation Reuse

Inspect prior validation before allocating another ID or repeating calls.

- Reuse the existing `validation_id`, overall status, and still-current check results when the source revision or hash, decisive conclusions, decision cutoff, material evidence, and freshness state are unchanged.
- Return `validation_mode: reused`, identify the reused validation, and explain the equality checks. Do not append another JSON or Markdown artifact for a pure reuse.
- Start a new validation when the source revision changes, a conclusion is added or materially revised, decisive evidence is refreshed or passes a deadline, a previously unresolved check becomes verifiable, or the decision cutoff changes its meaning.
- A new validation may cite unchanged prior checks, but must rerun every check affected by the change. Keep the prior ID as `prior_validation_id`; never overwrite it.

## Severity Decisions

Use `fail` for a defect that invalidates or could reverse an affected recommendation, violates a hard rule, introduces look-ahead information, confuses identity or market semantics, or prevents necessary reproduction. Use `warn` only when the limitation is disclosed, bounded, and non-invalidating. Use `pass` only when enough evidence was inspected to support it.

For each non-pass finding, name the affected conclusion, show the evidence or missing evidence, and specify the smallest repair plus the checks that must be rerun.

## Structured Validation Record

Use this shape when serializing an audit. Keep the reviewed artifact's identity separate from this validation run's identity.

```yaml
schema_version: 1
validation_id: "<source-analysis-id>-validation-<YYYYMMDDTHHMMSSZ>"
validation_mode: new
prior_validation_id: null
kind: validation
source_analysis_id: "<reviewed analysis ID>"
source_revision: "<revision or content hash when available>"
source_kind: lines
season: 2026
week: 1
validated_at: "<UTC ISO 8601>"
decision_cutoff: "<UTC ISO 8601 used by the source analysis>"
reviewer:
  independence: independent
  disclosure: "Reviewer did not author the source analysis."
overall_status: fail
upstream_families: [CFBD]
checks:
  - check_id: market-freshness
    name: "Market freshness"
    status: fail
    evidence_refs: [src-1]
    finding: "The decisive quote predates the decision cutoff."
    affected_conclusions: [recommendation-1]
    required_repair: "Refresh the same contract and rerun price checks."
recomputed_values: []
blocked_recommendations: [recommendation-1]
unresolved_gaps: []
freshness_deadlines: []
sources:
  - source_id: src-1
    title: "<source title>"
    upstream_family: CFBD
    metric_families: []
    url_or_path: "<URL or local path>"
    retrieved_at: "<UTC ISO 8601>"
```

Use `independence: self_review` and disclose the conflict when the reviewer authored or materially influenced the source. Each check status must be `pass`, `warn`, `fail`, or `not_applicable`; overall status is the worst material applicable status. Keep full ISO-8601 timestamps in fields. Use compact UTC `YYYYMMDDTHHMMSSZ` in new `validation_id` values and filenames so every genuine revalidation is append-only and portable across filesystems. For a pure reuse, return the existing ID and status with `validation_mode: reused` and create no new artifact.
