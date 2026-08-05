# CFB Betting Skills

A collection of reusable agent skills for college-football research, matchup analysis, market evaluation, DFS lineup construction, and evidence validation. The skills coordinate structured [CollegeFootballData](https://collegefootballdata.com/) data, public Kalshi market data, and cited web research without placing bets, submitting lineups, or making trades.

These skills will also be available through [skills.sh](https://skills.sh/jvorndran/cfb-betting-skills), where they can be discovered and installed individually or as a collection.

## Quick setup

### 1. Install the skills

After the repository is published, run this from the project where your agent will use the skills:

```bash
npx skills add jvorndran/cfb-betting-skills
```

To install only one skill, add a selector such as `--skill fbs-cli`.

The skills installer adds the agent instructions. It does **not** install the command-line tools used to retrieve CFBD and Kalshi data.

### 2. Install the data CLIs

[Node.js](https://nodejs.org/) 22.12 or newer is required.

```bash
npm install --global @jvorndran/fbs-cli @jvorndran/kalshi-cli
fbs --version
kalshi --version
```

### 3. Configure CollegeFootballData

CollegeFootballData requires an API key. [Request a free CFBD key](https://collegefootballdata.com/key), then run this command from the project where you will use the skills:

```bash
fbs auth
```

`fbs auth` accepts the key at a masked prompt, validates it with one `GET /info` request, and saves `CFBD_API_KEY` to a local `.env` file only after validation succeeds. Keep that file out of version control, and never paste the key into an agent prompt, chat, command argument, issue, or log.

For environment-based setup instead:

```bash
export CFBD_API_KEY="your_key_here" # macOS/Linux
```

```powershell
$env:CFBD_API_KEY = "your_key_here" # PowerShell
```

An existing environment value takes precedence over the working-directory `.env` file. Each live `fbs` request consumes CFBD quota, so the skills favor narrow queries and reuse provider IDs.

### 4. Use Kalshi public data: no key needed

The `kalshi` CLI uses Kalshi's public market-data endpoints at `https://external-api.kalshi.com/trade-api/v2`. These supported endpoints require no API key or authentication setup:

```bash
kalshi series --category Sports --tags Football --include-product-metadata
```

The CLI is intentionally read-only and unauthenticated. It does not access accounts, portfolios, orders, or trading endpoints, and it never places a trade.

## Included skills

| Skill | Purpose |
| --- | --- |
| [`fbs-cli`](skills/fbs-cli/) | Retrieve structured CFBD schedules, rosters, games, plays, statistics, ratings, recruiting, and historical betting data. |
| [`kalshi-cli`](skills/kalshi-cli/) | Discover and capture public Kalshi series, events, markets, quotes, orderbooks, trades, and price history. |
| [`research-cfb-public-web`](skills/research-cfb-public-web/) | Fill evidence gaps with governed, cited public-web research. |
| [`research-cfb-slate`](skills/research-cfb-slate/) | Discover, prioritize, and coordinate a weekly college-football research slate. |
| [`deep-dive-cfb-matchup`](skills/deep-dive-cfb-matchup/) | Build a price-blind, source-aware dossier for one matchup. |
| [`analyze-cfb-lines`](skills/analyze-cfb-lines/) | Evaluate spreads, totals, moneylines, and binary game contracts. |
| [`analyze-cfb-player-props`](skills/analyze-cfb-player-props/) | Evaluate player markets using verified identity, role, usage, matchup, and price. |
| [`build-cfb-dfs-lineups`](skills/build-cfb-dfs-lineups/) | Build and validate provider-neutral DFS candidate lineups without submitting entries. |
| [`validate-cfb-research`](skills/validate-cfb-research/) | Audit freshness, identity, arithmetic, market semantics, evidence overlap, and unsupported claims. |
| [`improve-cfb-skills`](skills/improve-cfb-skills/) | Turn human-approved lessons into sanitized evaluations and minimal skill updates. |

## How the collection fits together

The retrieval skills preserve raw source identity and provenance. Research skills turn that evidence into matchup or slate context. Analysis skills evaluate a specific market or DFS problem. `validate-cfb-research` independently checks the result before it informs a decision.

Not every workflow needs every skill. Start with the smallest relevant skill, retrieve only the evidence needed, and preserve the distinction between CFBD IDs, sportsbook/provider IDs, and Kalshi tickers.

## Safety and scope

- Research and analysis only: no wagers, trades, deposits, withdrawals, or DFS submissions.
- CFBD access is read-only; `fbs auth` is the sole credential-writing step.
- Kalshi access is limited to public, unauthenticated market-data endpoints.
- Outputs are decision support, not guarantees of accuracy, availability, or profit.
- Follow provider terms, applicable laws, platform rules, and local age restrictions.

## Evaluation

Offline, synthetic evaluation cases live in [`evals/`](evals/). The fixtures contain no live credentials and are designed to test source handling, identity joins, cutoff discipline, validation, and graceful degradation without consuming provider quota.
