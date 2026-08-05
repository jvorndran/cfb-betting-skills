# Task

Use `$improve-cfb-skills` to design a minimized, offline regression for this approved lesson. Approval covers only the proposed eval under `improve-cfb-skills`; do not edit a target skill or run the CLI.

Human rule: “When a CFB skill uses captured FBS evidence, its regression must preserve the machine-visible contract and catch early market leakage, cutoff violations, unnecessary duplicate queries, tier errors misread as empty data, lost zero or false values, the 2,000-row play-stat boundary, and unsafe player/game joins.”

The triggering incident included an unsanitized local command transcript, an API-key-bearing environment dump, two CFBD endpoints described as independent sources, a `count: 0` success, a tier-denied weather request, a false boolean dropped during conversion, a 2,000-row play-stat response called complete, and two same-name players joined without checking their IDs. The expected behaviors belong only in the evaluator rubric.

Return a proposed sanitized agent-visible `fbs_fixture` or evidence-packet design, the evaluator-only checks, the smallest responsible instruction/reference scope, and the offline regression plan. Keep credentials, private paths, and evaluator expectations out of the agent-visible fixture.
