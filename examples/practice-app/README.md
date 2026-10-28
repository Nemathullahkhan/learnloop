# Practice app

A single-file flashcard app that schedules reviews with [Leitner boxes](https://en.wikipedia.org/wiki/Leitner_system). No build, no server, no dependencies.

## Use it

1. Open `index.html` in a browser (double-click it).
2. Paste cards as JSON into "Add cards" and press **Load cards**:

   ```json
   [
     {"front": "What does a token bucket do?", "back": "Lets bursts through up to its capacity, then limits to the refill rate.", "source": "rate-limiting example"},
     {"front": "Which status code means too many requests?", "back": "429, with a Retry-After header.", "source": "rate-limiting example"}
   ]
   ```

3. Press **Show answer**, then **Right** or **Wrong**. Try to answer out loud or on paper before you reveal it.

The [clerk](../../skills/learn/roles/clerk.md) writes cards as `front,back,source`. To turn a CSV from `examples/templates/flashcards.csv` into this JSON, ask the AI: "Convert this CSV to a JSON array with front, back and source keys."

## How cards move

| Box | Next review after answering Right in this box |
|---|---|
| 1 | 1 day |
| 2 | 2 days |
| 3 | 4 days |
| 4 | 8 days |
| 5 | 16 days |

Right moves a card up one box (box 5 stays in box 5). Wrong sends it to box 1. These intervals are an assumption, a common starting point; edit `DAYS` in `index.html` to change them.

## Where your cards are kept

Cards are saved in this browser's `localStorage`, for this file only. They are not shared between browsers or devices, and clearing site data deletes them. Press **Export JSON** now and then to keep a copy. If the browser blocks storage, the app still works for the session and tells you to export.

## Limits

One card per front text (duplicates are skipped). No editing or deleting in the app: change the cards by exporting, editing the JSON and loading it into a cleared browser.
