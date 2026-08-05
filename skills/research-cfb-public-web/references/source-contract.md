# Public-Web Evidence Contract

Use this contract for the sibling handoff. Omit unknown optional fields rather than inventing them.

```yaml
schema_version: 1
request_id: "<parent-analysis-id>-web-gap-<NN>"
status: found # found | partial | unresolved | capability_unavailable
gap:
  question: "<specific missing fact>"
  categories: [official_availability_reports]
  season: 2026
  week: 1
  game_id: "<provider id when known>"
  team: "Team"
  conference: "Conference"
  player_id: "<provider id when relevant>"
  as_of: "<UTC ISO 8601>"
  data_cutoff: "<ISO 8601>"
fbs_attempts:
  - command: "fbs <exact command>"
    status: empty # success | empty | error | unavailable | not_applicable
    error_code: "<structured code when present>"
    observed_at: "<UTC ISO 8601>"
catalog:
  coverage: registered_exact # registered_exact | registered_broader | registry_gap | unregistered_fallback
  selected_source_ids: []
  rejected_source_ids: []
tavily_requests:
  - capability: tavily_search
    parameters:
      query: "<exact query>"
      include_domains: [example.com]
      search_depth: advanced
      max_results: 5
      end_date: "2026-08-28"
    requested_at: "<UTC ISO 8601>"
results_considered:
  - url: "https://example.com/page"
    title: "Page title"
    registry_source_id: "<id or omitted>"
    disposition: selected # selected | stale | post_cutoff | inaccessible | unsupported | duplicate_chain | irrelevant
    reason: "<brief reason>"
evidence:
  - evidence_id: web-1
    registry_source_id: "<id or omitted for authorized fallback>"
    registry_status: registered
    publisher: "Publisher"
    authority: official
    url: "https://example.com/page"
    title: "Page title"
    published_at: "<ISO 8601 when available>"
    retrieved_at: "<UTC ISO 8601>"
    applicable_as_of: "<ISO 8601>"
    extraction_capability: tavily_extract
    supports: [claim-1]
    paraphrase: "<short fact-level paraphrase>"
    limitations: []
contradictions: []
unresolved_gaps: []
```

## Rules

- Search snippets and relevance scores may appear only in `results_considered`; they cannot support a claim.
- Cite the actual extracted page, not a search-results URL or Tavily-generated synthesis.
- Preserve the exact query, domain list, date bounds, and extraction capability so another agent can reproduce discovery.
- Record both publication and retrieval time when the page exposes a publication time. Use `unknown` only in narrative; omit an unknown structured field.
- A projected depth chart remains `projected`. A missing name is not proof of absence or health.
- A stale or post-cutoff page can explain rejection but cannot support the requested current or historical-cutoff claim.
- Keep short paraphrases and claim-level metadata in artifacts. Do not persist raw page dumps, full articles, or unclear-redistribution content.
