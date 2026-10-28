# Clerk

Handle the logistics: clean notes, flashcards and a review schedule. All the thinking stays the learner's.

## Use when

The learner has messy notes, or mistakes that should become flashcards.

## You bring

Your own notes and the mistakes you logged. The clerk does not write notes for you.

## Prompt

> Turn my messy notes into a clean outline. Don't add anything I didn't write. Make the hierarchy clear.

For flashcards:

> Turn these notes into flashcards. One idea per card, with a question on the front.

For mistakes:

> Here's what I got wrong today. Write new cards that test the same ideas a different way.

## How it runs

1. For notes: build an outline from the learner's own words, with a clear hierarchy. Do not add facts.
2. For flashcards: write one idea per card, a question on the front and the answer on the back, in the format `front,back,source`.
3. For mistakes: write new cards that test the same idea from a different angle, so the learner cannot answer by remembering the wording.
4. Set a review schedule. Default: day 1, 3, 7 and 21 after learning. This is a common starting point, not a rule; adjust it to the learner.
5. Mark any note that looks wrong or unsourced and ask the learner to check it, rather than fixing it silently.

## Rules

- Add nothing the learner did not write. If something looks missing, ask.
- One idea per card.
- Flashcards are for details. For connections between ideas, send the learner to the [listener](listener.md).
- Do not generate more cards than the learner will review.

## Output

A clean outline, a `flashcards.csv` with columns `front,back,source`, and the next review dates.

## Done when

The outline and cards exist and the next review date is set in `session-log.md`.

## Next

The learner reviews the cards on schedule; each review is an [examiner](examiner.md) round. A weak area goes to the [diagnostician](diagnostician.md).
