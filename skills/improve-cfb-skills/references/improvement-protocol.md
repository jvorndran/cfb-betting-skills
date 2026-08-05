# Skill improvement protocol

Use these compact records to keep an improvement auditable.

## Contents

- Teach and approval records
- Sanitization and eval separation
- FBS fixtures and evidence packets
- FBS offline regression matrix
- Minimal-change and regression reports

## Teach record

```yaml
lesson_id: cfb-skill-lesson-001
reported_at: ISO-8601 timestamp
human_rule: "Testable behavior stated by the user"
target_skills: []
observed_behavior: "What happened"
expected_behavior: "What should happen"
evidence_refs: []
inferred_causes: []
non_goals: []
approval:
  approved_by: null
  approved_at: null
  approved_files: []
```

Do not treat an empty approval block as permission to edit.

## Sanitization checklist

Remove or replace:

- API keys, cookies, authorization headers, passwords, and environment values;
- names, email addresses, account IDs, precise locations, and other personal data;
- private balances, exact stake sizes, open positions, and private trading history;
- proprietary raw datasets and long copied source text;
- irrelevant timestamps, IDs, and surrounding chat history.

Preserve provider field shapes, relative relationships, boundary conditions, missing-data behavior, and the minimum text needed to reproduce the failure. Never store a reversible secret-to-placeholder map beside the eval.

## FBS Fixtures and Evidence Packets

Use an `fbs_fixture` when the lesson concerns CFBD retrieval, endpoint selection, YAML handling, cutoff discipline, evidence reuse, or joins. Keep it agent-visible; keep the expected interpretation only in the evaluator rubric.

```yaml
fbs_fixture:
  fixture_id: fbs-synthetic-001
  tool: fbs
  tool_version: "1.x"
  invocation_mode: captured
  upstream_family: CFBD
  exact_command: 'fbs games --id 900000001'
  retrieved_at: "2026-08-20T12:00:00Z"
  applicable_as_of: "2026-08-20T12:00:00Z"
  data_cutoff: "2026-08-20T12:00:00Z"
  price_blind_phase: before_freeze
  query_budget:
    maximum_calls: 2
    calls_used: 1
    reusable_source_ids: [fbs-game-1]
  exit_code: 0
  parsed_stdout:
    command: games
    endpoint: /games
    query: {id: 900000001}
    count: 1
    result_key: games
    result:
      collection_length: 1
      sample_only: false
      records:
        - id: 900000001
          season: 2026
          completed: false
  parsed_stderr: null
  provider_ids:
    - namespace: cfbd:game
      native_id: "900000001"
      namespaced_id: cfbd:game:900000001
  joins: []
  metric_families: []
  limitations: []
```

The packet is a normalized representation of one CLI execution; it does not invent a second output format for `fbs`. `result_key` names the YAML's endpoint-specific final key and `result` holds that key's sanitized value. For an error fixture, set a nonzero `exit_code`, omit `parsed_stdout`, and retain the structured `error` envelope under `parsed_stderr`. A wrapper-level null may indicate an unavailable stream; inside provider results, preserve FBS semantics: nullish provider fields are omitted while numeric `0` and boolean `false` remain.

Sanitize FBS evidence as follows:

- Remove API keys, authorization headers, environment values, private paths, and unrelated raw response fields. Exact commands must never contain credentials.
- Replace provider IDs consistently, retain their entity namespace, and preserve join cardinality. Do not collapse distinct players or games onto one placeholder.
- Preserve command path, endpoint, supplied query, result key, count, exit code, error code, enum spelling, filter boundaries, and whether the result was empty.
- Preserve `retrieved_at`, `applicable_as_of`, and `data_cutoff` as distinct fields. Shift dates consistently when sanitization requires synthetic time.
- Label every FBS packet `upstream_family: CFBD` and retain material `metric_families` so an eval can detect correlated evidence.
- For a 2,000-row play-stat boundary, retain `collection_length: 2000`, a small sanitized record sample, and `sample_only: true`; do not copy all provider rows into the eval.
- Record the authorized query budget and reusable prior evidence so the eval can distinguish necessary reproduction from duplicate quota use.
- Set `price_blind_phase` explicitly when market evidence could leak into a matchup foundation.

## FBS Offline Regression Matrix

When the approved lesson affects FBS integration, choose the smallest cases that cover the relevant rows below. Keep network and side effects denied.

| Behavior | Positive case | Failure signal |
|---|---|---|
| Price-blind separation | Schedule, roster, and football metrics are available before freeze; line evidence is routed after freeze. | A line, price, ATS result, or market-derived conclusion enters the frozen common context. |
| Cutoff discipline | Every query and record is at or before the simulated cutoff. | Week N evidence, a later roster, or a retrospective update leaks into a Week N pregame analysis. |
| Evidence reuse and query budget | A fresh packet with the identical query is reused and credited once. | The agent spends another call without a material freshness, revision, or conclusion reason, or counts one packet twice. |
| Empty versus tier error | `count: 0` plus the correct empty result key remains a successful no-row response; a structured tier error remains unavailable. | Either state is converted into the other or into a factual zero/none claim. |
| Missing versus zero/false | Omitted provider fields remain unknown while `0` and `false` survive parsing and calculations. | Truthiness filtering drops boundary values or invents a null/zero for an omitted field. |
| Play-stat cap | A 2,000-row `/plays/stats` result is narrowed or labeled potentially capped. | The agent calls it complete without a narrower query or limitation. |
| ID joins | Native and namespaced game/player IDs match; a documented composite is used only when stable IDs are absent. | A naked cross-provider ID, name-only player match, swapped home/away game, or ambiguous composite is accepted. |
| Upstream correlation | CFBD and material metric families are labeled and credited once per evidence chain. | Multiple CFBD endpoints are presented as independent corroboration merely because their command paths differ. |

Put evaluator-only expected statuses, exact findings, and forbidden behaviors in the rubric, never in the agent-visible fixture. Include at least one counterexample that should remain valid so the patch does not simply reject all FBS evidence.

## Eval case

Keep the agent-visible task separate from evaluator-only expectations:

```yaml
eval_id: cfb-skill-eval-001
target_skill: deep-dive-cfb-matchup
task_fixture: path/to/sanitized-task.md
input_fixtures: []
network: denied
side_effects: denied
evaluator_only:
  required_behaviors: []
  forbidden_behaviors: []
  output_contract_checks: []
```

Record a baseline result before patching. Do not put evaluator-only expectations where the evaluated agent can read them.

## Minimal-change review

Confirm:

- every changed line serves the approved lesson;
- trigger metadata did not expand unintentionally;
- detailed content lives in one focused reference rather than being duplicated;
- sibling routing and degraded behavior remain explicit;
- no credential, live-action, or dashboard permission was introduced;
- no permanent data collector, parser, cache, prediction engine, or other out-of-scope runtime was introduced;
- any schema or artifact change is separately approved and versioned.

## Regression report

```yaml
change_id: cfb-skill-change-001
baseline: fail
patched_eval: pass
validator: pass
regressions:
  positive_triggers: pass
  negative_triggers: pass
  unavailable_dependencies: pass
  source_and_cutoff_rules: pass
  output_contract: pass
  fbs_contract: pass
remaining_risks: []
files_changed: []
approval_still_required: []
```

A failed or unrun check must remain visible. Never convert `not_run` into `pass`.
