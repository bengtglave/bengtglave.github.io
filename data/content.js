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
      blurb: "A whole October of magic, and a full carnival of Christmas.",
      events: [
        {
          name: "Season of the Witch",
          when: "October 2026",
          emoji: "\u{1F52E}",
          accent: "#7d4a9e",
          blurb: "Magic, mayhem and monsters. The Halloween season, start to finish.",
          pages: [
            {
              title: "The October Spellbook",
              emoji: "\u{1F408}\u{200D}\u{2B1B}",
              blurb: "The whole month's plan — eleven scheduled nights, a shelf of weather-permitting adventures, and everyone's assigned role.",
              href: "pages/2026/october-spellbook.html"
            },
            {
              title: "The Glave Laboratory",
              emoji: "\u{1F52C}",
              blurb: "Twelve authorized experiments, each with a mission, an equipment list, the specimens required, and the science hiding behind the sorcery.",
              href: "pages/2026/glave-laboratory.html"
            },
            {
              title: "The Witch's Pantry",
              emoji: "\u{2697}\u{FE0F}",
              blurb: "Build a potion or a concoction from the shelves. Tap any specimen only when you dare to reveal its mortal identity.",
              href: "pages/2026/witchs-pantry.html"
            },
            {
              title: "The Witch's Kitchen Lexicon",
              emoji: "\u{1F4D6}",
              blurb: "Every mortal ingredient and its truer name — 107 of them across nine shelves, searchable when the Grimoire fails you.",
              href: "pages/2026/witchs-kitchen-lexicon.html"
            }
          ]
        },
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
        }

        /* Expedition Yucatán is deliberately kept off the public site — it
           spells out when the house is empty. The page still exists locally at
           pages/2026/expedition-yucatan.html (see .gitignore); to publish it,
           un-ignore those files and add its event block back here. */
      ]
    }

  ]
};
