/* ===========================================================================
   THIS IS THE FILE YOU EDIT.

   Everything on the site is built from the list below. To add a new activity,
   copy an existing block and change the words. Nothing else needs to change.
   See README.md for the step-by-step.

   Rules of thumb:
   - Keep the commas and curly braces exactly where they are.
   - Newest year goes at the top of the "years" list.
   - "href" is the path to the page file, starting from this repo's root.
   =========================================================================== */

const SITE = {
  title: "Glave Family Happenings",
  tagline: "Parties, trips, games, and other excellent ideas — kept year by year.",

  years: [

    /* ---------------------------------------------------------------- 2027 */
    {
      year: 2027,
      blurb: "Ringing it in loud.",
      events: [
        {
          name: "Glow Into the New Year",
          when: "New Year's Eve",
          emoji: "\u{1FAA9}",
          accent: "#ff39d5",
          blurb: "Neon, noise, and questionable dancing to carry us across midnight.",
          pages: [
            {
              title: "Dance Move Roulette",
              emoji: "\u{1F57A}",
              blurb: "Tap the button, get a move, everybody does it for twenty seconds. Eighteen moves and no wrong answers.",
              href: "pages/2027/dance-move-roulette.html"
            }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- 2026 */
    {
      year: 2026,
      blurb: "A jungle expedition and a full carnival of Christmas.",
      events: [
        {
          name: "Christmas Cheer Carnival",
          when: "December 2026",
          emoji: "\u{1F384}",
          accent: "#a8181d",
          blurb: "Making merry, making memories. The year's holiday headquarters.",
          pages: [
            {
              title: "12 Photos of Christmas",
              emoji: "\u{1F4F8}",
              blurb: "A twelve-shot holiday scavenger hunt. Pick the Classic Challenge or the Story Challenge, then capture December before it blurs past.",
              href: "pages/2026/christmas-photo-challenge.html"
            },
            {
              title: "Merry Sips & Spirits",
              emoji: "\u{1F378}",
              blurb: "Twelve drinks you can filter by spirit and flavor. Every one starts as a mocktail, and the spirited version is optional.",
              href: "pages/2026/drink-menu.html"
            }
          ]
        },
        {
          name: "Expedition Yucatán",
          when: "November 22 – December 1, 2026",
          emoji: "\u{1F334}",
          accent: "#0d7476",
          blurb: "Ten days across Bacalar, Río Bec, Calakmul and Tulum.",
          pages: [
            {
              title: "Field Dispatch Command Center",
              emoji: "\u{1F5FA}\u{FE0F}",
              blurb: "Zoomable posters, day-by-day timelines, a cenote picker, and the official bat volcano decision.",
              href: "pages/2026/expedition-yucatan.html"
            }
          ]
        }
      ]
    }

  ]
};
