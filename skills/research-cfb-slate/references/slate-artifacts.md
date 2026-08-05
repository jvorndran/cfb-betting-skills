# Weekly slate artifact contract

Use this contract for durable output or return the same shapes in chat when no workspace is available.

## Placement

Follow the caller's existing artifact layout. Keep the run page, `manifest.json`, `games.json`, `research-queue.json`, and `sources.json` together under a timestamped `run_id`. Do not create a new application structure solely to persist the report.

Use a `run_id` containing season, zero-padded week, a short slate slug, and a compact UTC timestamp in `YYYYMMDDTHHMMSSZ` form. Keep full ISO-8601 timestamps inside the records; never place `:` in a path segment.

Give the run page metadata for `title`, `analysis_id`, `kind`, `season`, `week`, `as_of`, and `validation_status`. Use relative paths for generated JSON or CSV and add only evidence-supported tables or views. If no convention or write permission exists, return the report in the selected host presentation. Never change shared components, loaders, routes, configuration, skills, or deployment files as an incidental research step.

## Serialization rules

- Use UTF-8 JSON or Markdown.
- Use strings for provider IDs and ISO 8601 timestamps with offsets.
- Use `null` for known-unavailable values and omit fields that do not apply.
- Keep arrays as arrays; do not encode nested records as JSON strings.
- Preserve source precision and provider terminology.
- Include `schema_version` and `generated_at` in every top-level artifact.
- Keep chart tables tidy: one game, source, task, or observation per row.

## `manifest.json`

Required fields:

```json
{
  "schema_version": "1.0",
  "kind": "cfb_weekly_slate",
  "run_id": "2026-w01-2026-08-24t120000z",
  "season": 2026,
  "week": 1,
  "season_type": "regular",
  "timezone": "America/New_York",
  "generated_at": "2026-08-24T08:00:00-04:00",
  "data_cutoff": "2026-08-24T08:00:00-04:00",
  "requested_modes": [],
  "artifacts": {}
}
```

Add source and dossier counts, run status, and prior-run reference when available.

## `games.json`

Represent each game with:

- `game_id`, `season`, `week`, `season_type`, and `status`;
- `kickoff`, `timezone`, `home_team`, `away_team`, `neutral_site`, and `venue`;
- `priority_tier` and `priority_reasons`;
- `research_status`: `not_researched`, `queued`, `running`, `complete`, `partial`, `blocked`, or `unavailable`;
- `requested_modes` and per-mode status;
- `dossier_ref`, `source_ids`, `freshness`, and `unresolved_questions`.

## `research-queue.json`

Give each assignment a stable ID, game ID, priority tier, requested skill, requested modes, user questions, cutoff, dependency status, artifact destination, and execution status. Preserve failed and skipped assignments with reasons.

## `sources.json`

Give every source a stable `source_id`, source type, title, publisher or provider, URL or exact command, retrieved timestamp, applicable as-of timestamp, and scope. Never include credentials, authorization headers, raw environment values, or private account data.

Create one source entry for a reusable CFBD response and reference it wherever applicable instead of duplicating narrower entries. Use the existing `scope` text to disclose cutoff compatibility, freshness, CFBD lineage, overlap with other provider observations, and which selected rows were used. Keep market-valued sources out of price-blind team and matchup handoffs even when they remain in the slate-level source ledger.
