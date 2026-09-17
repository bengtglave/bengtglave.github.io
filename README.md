# Glave Family Happenings

A home for the party pages, trip guides, and games we make — kept year by year.

Live at **https://bengtglave.github.io/**

---

## How it fits together

```
index.html            The front door. Lists the years. Don't edit.
year.html             Renders any year's page. Don't edit.
data/content.js       >>> THIS IS THE ONE YOU EDIT. <<<
assets/site.css       Shared look of the hub pages.
assets/site.js        Builds the hub pages from content.js.
assets/img/<slug>/    Photos pulled out of the activity pages.
pages/<year>/         The activity pages themselves.
tools/import-page.py  Brings a new HTML file into the site.
```

The whole site is generated from `data/content.js`. There is no build step and
nothing to install — edit that file, and the pages update.

---

## Adding a new activity

Say there's a new file called `Cookie_Bake_Off.html` for 2027.

### 1. Import it

Open a terminal in this folder and run:

```
py tools/import-page.py "C:\path\to\Cookie_Bake_Off.html" 2027 cookie-bake-off "Cookie Bake-Off"
```

The four things you pass it:

| | |
|---|---|
| `"C:\path\to\..."` | where the file is now (your original is never touched) |
| `2027` | which year it belongs to |
| `cookie-bake-off` | a short lowercase name, dashes instead of spaces |
| `"Cookie Bake-Off"` | what shows in the back-to-hub bar at the top of the page |

This pulls any embedded photos out into `assets/img/cookie-bake-off/`, adds the
navigation bar, and saves the result to `pages/2027/cookie-bake-off.html`.

### 2. List it

Open `data/content.js`. Find the year, find the event it belongs under, and copy
an existing page block:

```js
{
  title: "Cookie Bake-Off",
  emoji: "\u{1F36A}",
  blurb: "One sentence about what this is.",
  href: "pages/2027/cookie-bake-off.html"
},
```

Watch the commas — every block needs one after its closing `}` unless it's the
last one in the list.

For the emoji, either paste the emoji directly between the quotes, or look up
its code at [unicode-table.com](https://unicode-table.com) and write it as
`\u{XXXX}`.

### 3. Check it

Double-click `index.html`. It works straight off your hard drive — no server
needed. Click through to make sure the new card is there and opens.

### 4. Publish it

```
git add -A
git commit -m "Add Cookie Bake-Off"
git push
```

GitHub Pages picks it up within a minute or so.

---

## Adding a new event

An "event" is a group of pages — a party, a trip, a holiday. In `data/content.js`,
copy an existing event block into the right year:

```js
{
  name: "Summer Road Trip",
  when: "July 2027",
  emoji: "\u{1F697}",
  accent: "#0d7476",
  blurb: "One line about the event.",
  pages: [ ... ]
},
```

`accent` is the stripe color on the cards. Pick anything that suits the theme.

## Adding a new year

Copy a whole year block to the **top** of the `years` list:

```js
{
  year: 2028,
  blurb: "One line about the year.",
  events: [ ... ]
},
```

Nothing else to do — the front page picks it up automatically.

---

## Why the photos live in `assets/`

The files these pages start life as have their photos base64-encoded straight
into the HTML, which made one of them 13.7 MB for a single page. `import-page.py`
writes them out as real image files instead. Same page, loads in a fraction of
the time on a phone, and Git stops storing a fresh multi-megabyte copy every time
a word changes.

The originals on your computer are left exactly as they were.
