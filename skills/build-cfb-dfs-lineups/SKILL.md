---
name: build-cfb-dfs-lineups
description: Analyze college football DFS slates, players, projections, ownership, leverage, correlation, and provider constraints, and build validated candidate lineups only when explicitly requested. Use for CFB DFS research, player-pool decisions, cash or tournament strategy, lineup construction, salary-cap validation, stacking, uniqueness, or exposure review. Never upload or submit entries.
---

# Analyze and Build CFB DFS

Keep DFS separate from sportsbook lines and player props. DFS decisions depend on provider salaries, eligibility, scoring, slate membership, contest structure, ownership, and lineup correlation.

## Respect the requested scope

First determine whether the user wants player/slate analysis or actual lineup construction.

- For analysis, assess the slate and player pool without inventing candidate lineups.
- Construct lineups only when the user explicitly asks for lineups, builds, combinations, or optimization.
- Never upload, enter, or submit a lineup.

Choose only the modules that fit the contest and available inputs. Do not impose a fixed endpoint path, optimizer, source count, output schema, or presentation format.

## Establish provider authority

Treat the provider salary/slate file and published rules as authoritative for:

- Provider player and game IDs.
- Salaries, positions, eligibility, and slate membership.
- Scoring, roster slots, salary cap, multipliers, lock, late swap, and contest restrictions.

FBS can enrich football context but cannot override provider-controlled facts. Keep provider and CFBD IDs in separate namespaces.

## Select evidence

Read [data-sources.md](references/data-sources.md) to understand FBS coverage, provider-required inputs, and when to use web research.

If FBS enrichment is useful, run `fbs --version` and the relevant leaf `--help`. If missing, explain that Node.js 22.12 or newer and `npm install --global @jvorndran/fbs-cli` are required. CFBD needs a key configured with `fbs auth` or `CFBD_API_KEY`; never request the key in chat.

For current availability, depth, roles, provider rules, or late news, select relevant entries from the bundled [sources.yaml](references/sources.yaml). Follow scope, access, guidance, and limitations. Search more broadly when the catalog has no suitable current source. Do not browse for historical data already supplied adequately by FBS or the provider.

Never infer missing salary, eligibility, slate membership, lock state, or provider rules.

## Analyze

Choose appropriate modules from [workflows.md](references/workflows.md). Separate:

- Observed historical data.
- User- or provider-supplied projections and ownership.
- Transparent assumptions or heuristics.
- Current availability and role evidence.
- Contest-strategy judgments.

Assess floor, median, ceiling, volatility, salary efficiency, ownership, leverage, correlation, late-swap flexibility, and failure modes according to the user's contest objective. Do not silently optimize for median projection when the user asked for ceiling, leverage, or diversification.

If the task stops at analysis, return player or strategy conclusions with uncertainties and avoid unsolicited builds.

## Construct only when requested

Read [dfs-analysis.md](references/dfs-analysis.md) before constructing or validating lineups.

- Use manual enumeration only for a small transparent pool.
- Use temporary deterministic optimization code when constraints, lineup count, exposures, or uniqueness make manual construction unreliable.
- Keep temporary code isolated, credential-free, and unable to make its own network requests.
- Recompute all hard rules from authoritative provider rows.
- Label invalid or unverifiable combinations as drafts or failures, never as ready lineups.

Run [quality-checks.md](references/quality-checks.md) before delivering player recommendations or candidates.

For analysis, conclude with clearly supported targets, neutral options, avoids, or `insufficient_evidence`. For requested lineups, use `pass` only when every hard constraint is verified, `warn` for a rule-valid build with bounded uncertainty, and `fail` for any violation or unverifiable hard input.

State assumptions, freshness, current-source citations, and meaningful alternatives. Never promise profit or submit an entry.
