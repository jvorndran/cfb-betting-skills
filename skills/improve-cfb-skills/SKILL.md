---
name: improve-cfb-skills
description: Safely improve college-football research skills through a human-approved teach, sanitized evaluation, minimal patch, and regression workflow. Use when a user explicitly asks to teach, correct, refine, or update a CFB skill after observed behavior, feedback, a failed research run, or an output-contract issue.
---

# Improve CFB Skills

Turn approved lessons into evidence-backed skill changes. Never perform silent self-editing or automatic learning.

## Non-negotiable approval rules

- Treat postmortems, low scores, contradictions, and agent suggestions as proposals only.
- Do not edit any skill, including this one, until a human explicitly approves the lesson, target skill, and file scope.
- Before approval, show the observed behavior, desired behavior, evidence, proposed files, minimal change, risks, and regression plan.
- Ask again before a breaking output-schema or artifact-path change, even when the general lesson was approved.
- Never commit, publish, install, or deploy a skill change unless separately requested.
- Invoke `$skill-creator` and follow its current guidance when available. If it cannot be loaded, state that limitation before editing.

## Workflow

### 1. Teach

Capture the lesson as a testable behavior, not a vague preference. Separate:

- the human's direct rule;
- the triggering example and observed output;
- the expected output or decision;
- inferred causes that still need proof;
- explicit non-goals and affected skills.

Inspect the target skill and its directly referenced resources. Identify whether the failure is trigger metadata, workflow guidance, a reference contract, a dependency, or the evaluation itself.

### 2. Obtain approval

Present a bounded change proposal. Wait for explicit human approval before writing. If the user approves only the principle, ask them to approve the concrete target and scope.

### 3. Create a sanitized evaluation

After approval, read [references/improvement-protocol.md](references/improvement-protocol.md). Convert the triggering case into a reproducible eval that preserves the behavioral signal while removing credentials, personal data, private account or position details, copyrighted source dumps, and unrelated context.

Use captured or mocked inputs. Never use a live wager, trade, lineup submission, private account, or unapproved network call for an eval.

For an FBS or CFBD lesson, include the sanitized `fbs_fixture` or evidence packet defined in [references/improvement-protocol.md](references/improvement-protocol.md). Preserve the envelope, filters, boundary values, provider-ID relationships, cutoff, and structured error class while removing credentials and unnecessary provider content.

Store the eval only in an existing or human-approved eval location outside the target skill's loadable instructions and references. Keep expected results separate from the prompt shown to the evaluated agent. If no location is approved, run it ephemerally and disclose that it was not saved.

Reproduce the failure before changing the skill. If it does not reproduce, stop and report the mismatch instead of editing speculatively.

### 4. Apply the minimal change

Modify only the smallest instruction or focused reference needed to make the eval pass:

- change `description` only for trigger or scope failures;
- change `SKILL.md` for core procedure or guardrail failures;
- change a focused reference for detailed contracts or examples;
- keep frontmatter to `name` and `description`;
- keep `agents/openai.yaml` aligned with the skill;
- do not add README files, unrelated assets, dependencies, or analysis scripts;
- preserve unrelated user changes.

Use a reviewable patch. Do not broaden the rule merely to make one fixture pass.

If a consumer-facing key, schema, path, or semantic meaning would change, treat it as a versioned integration change. Pause for explicit approval and a migration plan. Never edit a consuming application's presentation layer as an incidental skill fix.

### 5. Regress

Run the skill validator, the sanitized failing case, and the smallest relevant regression set. Include positive triggers, negative triggers, unavailable-dependency behavior, data-cutoff and source handling, routing behavior, and output/artifact contracts when affected.

When FBS evidence is involved, cover price-blind separation, cutoff leakage, evidence reuse and query budget, tier-error versus empty-success behavior, omitted values versus `0` or `false`, the 2,000-row play-stat boundary, and provider-ID or composite joins. Keep these cases offline with captured packets.

Use a fresh agent or subagent when practical. Give it the target skill and sanitized task, not the diagnosis, intended fix, or expected answer. Keep all evals offline and read-only unless the human approves a safe alternative.

If a regression fails, do not hide it or expand the patch automatically. Revert only the proposed patch when safe, or present the failure and request direction.

### 6. Report

Report the approved lesson, sanitized eval location or ephemeral status, files changed, concise diff, validation commands, before/after eval results, regressions, remaining risks, and whether any separate approval remains. A passing eval is evidence for the change, not permission for future silent edits.
