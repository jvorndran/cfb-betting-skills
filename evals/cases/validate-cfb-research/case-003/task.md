# Task

Use `$validate-cfb-research` to determine whether this unchanged synthetic artifact needs another validation. Present the audit as a concise report in chat. Network access and side effects are unavailable. Use `2026-08-20T16:00:00Z` as the simulated validation time.

```yaml
artifact:
  source_analysis_id: synthetic-lines-r1
  source_revision: sha256:unchanged-r1
  conclusions_hash: sha256:unchanged-conclusions
  decision_cutoff: "2026-08-20T12:00:00Z"
  decisive_evidence_hash: sha256:unchanged-evidence
  new_conclusions: []
  refreshed_evidence: []
prior_validation:
  validation_id: synthetic-lines-r1-validation-20260820T130000Z
  validation_mode: new
  source_analysis_id: synthetic-lines-r1
  source_revision: sha256:unchanged-r1
  conclusions_hash: sha256:unchanged-conclusions
  decision_cutoff: "2026-08-20T12:00:00Z"
  decisive_evidence_hash: sha256:unchanged-evidence
  validated_at: "2026-08-20T13:00:00Z"
  overall_status: warn
  freshness_deadlines: ["2026-08-21T12:00:00Z"]
  unresolved_gaps: ["Refresh the quoted market before the listed deadline."]
```

Return the correct validation identity and status in chat. Do not create a duplicate validation artifact.
