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

Cover the core expert modules below, but choose the order, depth, commands, and construction method that fit the contest and available inputs. Do not impose a fixed endpoint path, optimizer, source count, output schema, or presentation format. Mark a module `not applicable` or `insufficient_evidence` when the contest or evidence cannot support it.

## Establish provider authority

Treat the provider salary/slate file and published rules as authoritative for:

- Provider player and game IDs.
- Salaries, positions, eligibility, and slate membership.
- Scoring, roster slots, salary cap, multipliers, lock, late swap, and contest restrictions.

FBS can enrich football context but cannot override provider-controlled facts. Keep provider and CFBD IDs in separate namespaces. Tie important evidence to a causal chain: `observed fact -> role/opportunity mechanism -> game-script effect -> fantasy distribution -> salary/ownership decision`.

## Select evidence

Read [data-sources.md](references/data-sources.md) to understand FBS coverage, provider-required inputs, and when to use web research.

### FBS readiness is a hard gate

This skill cannot run until the FBS CLI is installed, executable, and authenticated:

1. Run `fbs --version`. If it is missing or fails, install it with `npm install --global @jvorndran/fbs-cli`, then rerun the check. If installation or the version check still fails, stop and report the setup failure.
2. Run `fbs info` as the authenticated CFBD readiness check. If it fails because no credential is configured, run `fbs auth` or configure `CFBD_API_KEY`; never ask the user to paste the key into chat. If `fbs info` still fails for any reason, stop.
3. Run the relevant leaf `--help` before choosing flags. If the help command fails, stop.

Do not continue with user-supplied, provider-only, or web-only evidence while this gate is failing. If a required FBS command fails later, stop the analysis or build and report the structured error instead of silently switching sources.

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

Every DFS analysis must address these expert questions, even if some answers are limited by the evidence:

- What provider, slate, scoring system, contest type, lock structure, salary rules, and eligibility constraints define the decision?
- What current role and opportunity regime drives each relevant player's floor and ceiling, and which quarterback, teammate, depth, or availability changes can alter it?
- Which game scripts create or remove fantasy opportunity, including pace, team scoring, blowout, garbage time, concentrated production, and late-swap paths?
- Are the football inputs observed, provider- or user-supplied projections, ownership estimates, or transparent assumptions?
- How do salary, ceiling, ownership, contest payout shape, leverage, correlation, and duplication risk interact?
- What is the strongest failure mode, shared fragile assumption, or late-news risk, and what would change the player pool or lineup construction?

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
