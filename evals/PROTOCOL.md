# Blind evaluation protocol

The checked-in cases are offline behavioral probes for the ChatGPT or Codex UI. They do not call a model from this repository.

1. Confirm that every `evals/cases/<skill>/<case-id>/task.md` has a matching `evals/rubrics/<skill>/<case-id>.yaml` and that its linked fixtures resolve inside `evals/`.
2. Start a fresh agent with the target skill installed.
3. Give the agent only the matching `evals/cases/<skill>/<case-id>/task.md` and the fixtures linked from that task. Do not provide `evals/rubrics/` or hints about the expected defect.
4. Enforce the rubric's `network` and `side_effects` settings in the host. The included cases deny both.
5. Capture the response outside the agent-visible case bundle.
6. Only after the run, score the response against `evals/rubrics/<skill>/<case-id>.yaml`. A required behavior must be observable in the response; any forbidden behavior fails the case.

Case IDs are intentionally neutral. Keep evaluator-only expectations outside `evals/cases/`, and never let an evaluated agent scan the full repository as its input bundle.
