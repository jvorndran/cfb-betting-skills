---
name: research-cfb-public-web
description: Fill college-football evidence gaps that remain after user inputs and the FBS CLI by searching a governed public-source registry through the Tavily MCP. Use for current game notes, projected depth charts, official availability reports, player-usage corroboration, attributable team or national reporting, public play-by-play, and transfer or transaction verification. Preserve cutoff, search, extraction, source, and uncertainty provenance; never treat snippets as evidence or bypass access controls.
---

# Research CFB Public Web

Retrieve a narrow missing fact from governed public sources. Do not redo structured FBS work or turn this into a general web-research agent.

## Inputs

Require or derive a `gap_request` containing:

- the exact question and evidence category;
- season, week, game, team, conference, player, and provider IDs when applicable;
- `as_of` and `data_cutoff`;
- relevant user inputs and attempted FBS commands, outputs, empty results, tier errors, or coverage limits;
- already-used source IDs, URLs, and upstream evidence chains; and
- whether an unregistered public-web fallback is authorized when the catalog has no coverage.

Do not use Tavily for a value already supplied reliably by the user or exposed by an applicable FBS endpoint. Use it to fill or corroborate a specific gap.

## Workflow

1. Classify the gap using one or more registry categories: `official_rosters`, `official_game_notes`, `official_depth_charts`, `official_availability_reports`, `weather`, `player_usage`, `beat_reporting`, `play_by_play`, `transactions`, or `transfer_portal`.

2. Select sources before searching.
   - Read [references/source-index.md](references/source-index.md) and select only category matches whose scope is the exact team, applicable conference, or national.
   - Rank exact official team sources, applicable official conference sources, attributable team reporting, then national or independent aggregators.
   - Treat the bundled index as the prioritized seed catalog. When the host supplies an additional governed registry, load its guidance only for selected IDs and treat it as an optional augmentation, not an exhaustive claim that every team is covered.
   - Record `registered_exact`, `registered_broader`, or `registry_gap`. Do not silently broaden a missing exact-team source into equivalent coverage.

3. Search with the Tavily MCP.
   - Use `tavily_search` with a narrow query containing the exact team or player, evidence type, season, week or opponent, and relevant date.
   - Set `include_domains` from the selected registry links, `topic: general`, a small `max_results` of 3–8, and cutoff-aligned `start_date` or `end_date` when they reduce leakage.
   - Prefer `search_depth: advanced` for ambiguous current-season discovery and `fast` or `basic` for an exact title or name. Keep `include_raw_content: false` and images off.
   - Run separate targeted queries for separate facts. Never use broad synthesized Tavily research by default.

4. Verify the actual page.
   - Treat search titles, snippets, relevance scores, and generated summaries only as locators.
   - Use `tavily_extract` on the exact selected URLs before supporting a claim. Use Markdown, a relevance query, and basic extraction first; use advanced extraction only for tables, PDFs, or entries marked `public_client_rendered`.
   - Use `tavily_map` only to locate a current item inside a known registered hub, with the registered domain, shallow depth, and a small limit. Do not broad-crawl by default.
   - If a client-rendered page still cannot be extracted, use an available browser only when the parent workflow permits it. Otherwise mark the fact unresolved, not confirmed-none.

5. Enforce cutoff and source quality.
   - Reject items published after `data_cutoff`, stale prior-season pages presented as current, forums, comments, opinion-only pieces, gated content, and results outside the selected domains unless explicitly authorized as an unregistered fallback.
   - For an authorized fallback, prefer a first-party team, conference, NCAA, venue, weather, or provider page, then attributable reporting. Mark it `unregistered_fallback` and retain the qualification rationale.
   - Preserve disagreements and shared upstream sourcing. Two articles repeating one report are one evidence chain, not independent corroboration.
   - Follow every registry limitation. Public access does not authorize bulk copying or archival.

6. Return evidence using [references/source-contract.md](references/source-contract.md).
   - Preserve the FBS attempt, selected and rejected catalog IDs, exact Tavily capability and parameters, actual page URL and title, publication time when available, retrieval time, applicability time, claim support, limitations, and unresolved gaps.
   - Store metadata, citations, hashes when available, and short paraphrases. Do not retain raw copyrighted pages in repository artifacts.
   - Return `found`, `partial`, `unresolved`, or `capability_unavailable`. A Tavily or extraction failure must not erase usable FBS or user-supplied evidence.

## Capability boundary

If the Tavily MCP is unavailable, return `capability_unavailable` unless the user or parent workflow explicitly permits another public-web tool. Never request or expose a Tavily credential in chat. Keep all retrieval read-only and never bypass authentication, subscriptions, metering, robots controls, rate limits, or provider terms.
