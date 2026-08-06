# CFB Betting Skills

Five reusable agent skills for college-football data retrieval, market analysis, player props, and DFS. They combine structured [CollegeFootballData](https://collegefootballdata.com/) data, public Kalshi market data, and targeted public-web research without placing bets, trades, or contest entries.

Browse the collection on [skills.sh](https://skills.sh/jvorndran/cfb-betting-skills).

## Setup

[Node.js](https://nodejs.org/) 22.20 or newer satisfies the current skills installer and both data CLIs.

### 1. Install the skills

From the project where your agent will use them:

```bash
npx skills add jvorndran/cfb-betting-skills
```

Install one skill with `--skill`:

```bash
npx skills add jvorndran/cfb-betting-skills --skill analyze-cfb-lines
```

The installer downloads agent instructions and bundled references. It does not install the data CLIs automatically; the FBS skill can install `@jvorndran/fbs-cli` when it is missing, then blocks retrieval until the executable and CFBD authentication work.

### 2. Install the data CLIs

```bash
npm install --global @jvorndran/fbs-cli @jvorndran/kalshi-cli
fbs --version
kalshi --version
```

### 3. Configure CollegeFootballData

CollegeFootballData requires an API key. [Request a CFBD key](https://collegefootballdata.com/key), then run this from the project where the agent will work:

```bash
fbs auth
```

`fbs auth` accepts the key through a masked prompt, validates it with one `GET /info` request, and writes `CFBD_API_KEY` to a `.env` file in the current directory only after validation succeeds. Keep `.env` out of version control. Never paste the key into an agent prompt, chat, command argument, issue, or log.

To use an environment variable instead:

```bash
export CFBD_API_KEY="your_key_here"
```

```powershell
$env:CFBD_API_KEY = "your_key_here"
```

An existing environment value takes precedence over the current directory's `.env` file. Live `fbs` calls consume CFBD quota.

### 4. Use Kalshi public data

No Kalshi API key or authentication is needed. The `kalshi` CLI exposes only supported public, read-only market-data endpoints:

```bash
kalshi series --category Sports --tags Football --include-product-metadata
```

It does not access accounts, portfolios, orders, or trading endpoints.

## Skills

| Skill | Purpose |
| --- | --- |
| [`fbs-cli`](skills/fbs-cli/) | Retrieve schedules, rosters, games, plays, statistics, ratings, recruiting, transfers, and historical betting data from CFBD. |
| [`kalshi-cli`](skills/kalshi-cli/) | Discover and capture public Kalshi series, events, markets, quotes, orderbooks, trades, and price history. |
| [`analyze-cfb-lines`](skills/analyze-cfb-lines/) | Analyze spreads, totals, moneylines, and compatible binary game contracts. |
| [`analyze-cfb-player-props`](skills/analyze-cfb-player-props/) | Analyze player markets through identity, role, opportunity, matchup, price, and uncertainty. |
| [`build-cfb-dfs-lineups`](skills/build-cfb-dfs-lineups/) | Analyze DFS slates and players, and construct validated lineups only when requested. |

## Data and research approach

The analysis skills are flexible playbooks, not workflow engines. They explain which FBS CLI data can answer a question, which facts remain outside CFBD, and common ways betting professionals structure an analysis.

Use structured data for reproducible historical facts. Use current public sources only for material gaps such as availability, depth charts, changing roles, live prices, provider rules, late news, and forecasts. Each analysis skill includes its own copy of [`sources.yaml`](sources.yaml), a curated catalog of official media pages, conference availability reports, player-usage resources, beat reporting, play-by-play, and transfer coverage. The catalog is a starting point, not a freshness guarantee or a requirement to visit every source.

The root catalog is canonical. After editing it, synchronize the bundled copies:

```bash
node scripts/sync-sources.mjs
node scripts/sync-sources.mjs --check
```

## Safety

- Research and analysis only; never place or size wagers, execute trades, or submit DFS entries.
- CFBD endpoint commands are read-only. `fbs auth` is the sole credential-writing step.
- Kalshi access is public, read-only, and unauthenticated.
- Treat outputs as decision support, not guarantees of accuracy, availability, or profit.
- Follow provider terms, applicable laws, platform rules, and age restrictions.
