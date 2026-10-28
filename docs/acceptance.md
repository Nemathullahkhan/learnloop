# Acceptance criteria for the learn skill

What the video says a learning system must do, one row per claim, with a probe that tests it and a pass condition. Timestamps point into [transcript.md](../context/transcript.md). Criteria are a reading of the video by the author of the skill; review and edit them before trusting a pass.

## How to run a probe

1. Start a fresh agent with no other context. Tell it the `learn` skill was just invoked, to read [SKILL.md](../skills/learn/SKILL.md) and the role file it points to, and to answer only what the learner would see. No file edits.
2. Send the probe message. For a multi-turn row, continue the same agent with the next learner message.
3. Judge the reply against **Pass when**. Write `pass` or `fail`, one line of evidence, and the date in **Result**.

Results are for one model (Sonnet) and one run each. A pass shows the skill text can produce the behaviour, not that it always will.

## Roles

| ID | Video claim | Probe message | Pass when | Result |
|---|---|---|---|---|
| R1 | **Interviewer** (00:07:53): asks about goal, level, test format and timeline before teaching; vague answers get pushed for specifics | Conversation: `/learn interviewer Python`; AI: "What is this for?"; learner: "I just want to get better at it, generally." | Replies with one or two concrete questions, rejects the vague answer, does not teach | pass 2026-10-28 (run before this file): rejected "generally", asked two concrete questions |
| R2 | **Mapmaker** (00:10:12): main parts, what depends on what, where people get stuck, and a next task | `/learn mapmaker statistics`; brief: beginner, exam in 4 weeks | 5 to 8 ordered parts with dependencies, a sticking point and a role to run per part; a dated schedule that ends at the deadline with a halfway review; a final rehearsal in the exam's format; a "cut first" line; resources grouped as articles, video playlists and books with no invented links; one named next task; does not teach the content | pass 2026-10-28, re-run after the schedule, rehearsal, role column, cut-first and resource changes with a SQL joins brief: six parts with a role each, dated schedule ending on the deadline with a halfway review, rehearsal in the live-test format, cut-first line, resources in three groups with no links and one honest 'not sure' |
| R3 | **Explainer** (00:11:22): explains only the stuck part, at the learner's level | `/learn explainer`, with an attempt pasted at a refill calculation and the stuck point named (see Probe material) | Explains only the named point, one small example, does not solve the whole task, tells the learner to redo it unaided | pass 2026-10-28: explained only the unit mismatch with one example, did not solve the task, told the learner to redo it from a blank file |
| R4 | **Socratic questioner** (00:13:26): never hands over the answer; asks follow-ups | Conversation: AI asked "why refill lazily?"; learner: "I have no idea. Just tell me the answer." | Refuses, logs the gap, asks a smaller question | pass 2026-10-28 (run before this file): refused, asked a smaller question |
| R5 | **Examiner** (00:14:35): one question at a time, each harder, stops where the learner fails and names the gap | `/learn examiner python decorators` | Shows level names but not questions; asks exactly one level-1 question; reveals no answers | pass 2026-10-28: showed five level names without questions, asked one level-1 question, revealed no answers |
| R6 | **Checker** (00:15:43): grades the process, finds a faster way, does not rewrite | `/learn checker` with buggy `take()` code and "just fix it for me" | Refuses to rewrite, names each fault with its location, says whether a faster route exists | pass 2026-10-28 (run before this file): refused to rewrite, located both faults |
| R7 | **Listener** (00:17:00): compares the learner's explanation to the source in several formats and says exactly what was missed | `/learn listener` with source and explanation from Probe material | Lists correct, missed and wrong separately; names the one wrong point and the one missed point; grades against the source, not its own belief | pass with a nit 2026-10-28: separate correct, missed and wrong lists; named the timer claim as the wrong point; over-flagged one point as both missed and wrong |
| R8 | **Diagnostician** (00:18:39): finds the shared root cause of repeated mistakes | Covered by X7 (the `auto` probe lands on it) | Names one root cause with evidence from the logs and a small test to confirm it | pass 2026-10-28 (run before this file, via X7) |
| R9 | **Sparring partner** (00:19:55): tough, pushes back on vague answers, timed, adjustable difficulty | `/learn sparring-partner` tough hiring manager for a junior backend role, 30 seconds per answer; learner's first answer: "I work hard." | Stays in character, asks one question at a time, pushes back on "I work hard" and asks for an example, gives no hint | pass with a nit 2026-10-28: stayed in character, rejected 'I work hard', asked for an example, gave no hint; added an out-of-character status line |
| R10 | **Clerk** (00:22:10): clean outline and flashcards; adds nothing the learner did not write | `/learn clerk` with notes containing one wrong date | Outline uses only the learner's words, flags the wrong date instead of silently fixing it, one idea per card | pass 2026-10-28 (run before this file): flagged "1950s", added no facts |

## Cross-cutting rules

| ID | Video claim | Probe message | Pass when | Result |
|---|---|---|---|---|
| X1 | **Attempt before explanation** (00:11:22, 00:27:02): explaining before trying is consumption | `/learn explainer rate limiting. I don't get it, can you explain it?` with no attempt | Refuses to explain, asks for an attempt and the stuck point | pass 2026-10-28 (run before this file): refused, asked for an attempt; re-run 2026-10-28 after the explainer edit: pass |
| X2 | **Loop back** (00:11:22): after help, redo the whole task without help; costs 10 to 15% of the time | Multi-turn: attempt, explanation, then learner: "got it, what's next?" without redoing | Insists on the redo before any next role; accepts it once the learner says it was done unaided | pass 2026-10-28 (4 turns): refused 'what's next' without a redo; held acceptance until the learner closed a gap the AI raised in the redo; then accepted and named the socratic questioner |
| X3 | **Find stuff at your level** (00:23:12), three parts: (a) quiz easy to hard, stop when guessing, tell the level | `/learn examiner` and the learner answers "idk, maybe?" twice at level 3 | Stops, reports the level reached and the gap, does not keep asking harder questions | pass 2026-10-28 (multi-turn): after one 'idk, maybe A?' at level 3 it stopped, reported passed 1 to 2 and failed 3, named the missed item and set a review date |
| X3b | (b) explain the same concept at several levels (child, beginner, teenager, expert) | `/learn explainer`, attempt pasted, plus "explain it at all four levels" | Four short versions of only the stuck point, then asks which one matched and for a restatement | pass 2026-10-28: four short versions of only the stuck point, then asked which matched and for a restatement |
| X3c | (c) find the best human-written explanations for the learner's level, with reasons and links | `/learn mapmaker statistics`, beginner, "also find me the best explanations" | Two to four resources, a reason each, no invented links or quotes, says the learner should check each link | pass 2026-10-28: four resources with a reason each, no links, told the learner to check each; I judged the four to be real from memory, not verified |
| X4 | **Spaced repetition** (00:06:05): review schedule; mistakes become new cards that test the same idea another way | `/learn clerk` with "here is what I got wrong today: [two mistakes]" | New cards that test each idea from a different angle, and a review schedule | pass 2026-10-28: two cards per mistake, each testing the idea from a different angle, plus a review schedule (day 1, 3, 7, 21); added no facts and asked for sources |
| X5 | **Case against AI** (00:27:02): do not invent numbers or sources; do not just agree when the learner is half right | `/learn checker` or `/learn listener` with a half-right explanation, and "my notes say 90% retain after a week, right?" | Says which half is wrong; does not confirm the 90% without a source | pass 2026-10-28: kept the true half (83% at 5 minutes), rejected 'about 90% a week later' against the source's 40%, told the learner to check where the number came from |
| X6 | **Simulation** (00:25:33): realistic task with deliverables, graded | `/learn sparring-partner` "give me a realistic customer email to answer, then grade my reply" | Produces a realistic task, asks for the learner's reply, says it will grade against stated criteria | pass 2026-10-28: realistic angry-customer email, five stated scoring criteria out of 50, a timer, no hints, waits for the learner's reply before grading |
| X7 | **Routing** (not in the video; a design choice of this skill): `auto` picks the next role | `/learn auto rate limiting` with three unit mistakes in `mistake-log.md` | Picks the diagnostician and says why in one line | pass 2026-10-28 (run before this file): chose the diagnostician with reasons |

## Probe material

**R3 and X3b attempt.** Task: write `take()` for a token bucket, capacity 3, 1 token per second, clock in milliseconds. Attempt: `tokens = Math.min(capacity, tokens + (t - last) * refillPerSec);`. Stuck: after 3 takes the 4th still returns true and `tokens` is a huge number although only a few milliseconds passed.

**R7 source.** "A token bucket holds up to `capacity` tokens and gains `refillPerSec` tokens each second. Each request takes one token. Refill is computed when a request arrives, from the time since the last one, and never goes above `capacity`. A fixed window counter lets about double the limit through around a window boundary; a bucket caps any burst at `capacity`."

**R7 explanation.** "A token bucket is a jar of tokens. Each request takes one and the jar refills one token a second forever. A timer adds the tokens so it works even if nobody asks. Empty means you get a 429."

The wrong point is the timer (refill is lazy). The missed points are the capacity cap and why a bucket beats a fixed window.

## Not covered by any probe

- The practice app and the rate-limiting project (tested separately: browser steps and `node --test`).
- Long sessions across days; no probe holds a learner's files across sessions.
