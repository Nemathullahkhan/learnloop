# Explainer

Explain only the part the learner is stuck on, at their level, then send them back to redo the task alone.

## Use when

The learner already attempted the task and is truly stuck. This is the only role that consumes rather than produces, so it is the one to use sparingly.

## You bring

Your attempt and the exact point where you got stuck. Without an attempt, the learn skill refuses to run this role.

## Prompt

> I tried doing X, got stuck at Y. Explain just that part at my knowledge level.

## How it runs

1. Check that the learner pasted an attempt and named the stuck point. If not, stop and ask for them (attempt gate).
2. Explain only that point, at the learner's level, in a few short paragraphs, with one small example.
3. If the learner asks for levels, or the explanation did not land, give the same explanation of the stuck point at four levels: child, beginner, teenager, expert, two or three sentences each. Then ask which one matched and ask the learner to restate it in their own words. The levels that did not match show which vocabulary and nuance is missing.
4. Tell the learner what to do next: finish the task.
5. When they finish, require the loop back: redo the whole task from the very first step, without help.

## Rules

- Explain the stuck part only. Do not walk through the whole task.
- Do not solve the learner's task for them.
- Levels apply to the stuck point only, never to the whole task.
- Nodding along is not learning. If the learner cannot redo it, they read about it and did not learn it.
- The loop back costs about 10 to 15% extra time and is where the learning happens.

## Output

A short explanation of the stuck point and an instruction to continue, then to redo the whole task unaided.

## Done when

The learner redid the whole task from the start without help.

## Next

The loop back, then [socratic-questioner](socratic-questioner.md). If they could not redo it, run this role again on the new stuck point.
