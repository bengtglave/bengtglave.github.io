/* Builds the hub and the year pages from data/content.js.
   Loaded with a plain <script> tag rather than fetch(), so the site also works
   when you just double-click index.html on your own computer. */

(function () {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function countPages(year) {
    return (year.events || []).reduce(function (total, event) {
      return total + (event.pages || []).length;
    }, 0);
  }

  function plural(n, word) {
    return n + " " + word + (n === 1 ? "" : "s");
  }

  /* ------------------------------------------------------------------ home */

  function renderHome(mount) {
    document.title = SITE.title;

    var years = (SITE.years || []).slice().sort(function (a, b) {
      return b.year - a.year;
    });

    var html = '<header class="masthead">' +
      '<div class="crest">' + esc(SITE.title) + "</div>" +
      "<h1>Every year, a few good ideas.</h1>" +
      '<p class="tagline">' + esc(SITE.tagline) + "</p>" +
      "</header>" +
      '<div class="rule"></div>' +
      '<main class="years">';

    years.forEach(function (year) {
      var names = (year.events || []).map(function (e) { return e.name; });
      html += '<a class="year-card" href="year.html?y=' + encodeURIComponent(year.year) + '">' +
        '<div class="numeral">' + esc(year.year) + "</div>" +
        "<div>" +
        '<p class="blurb">' + esc(year.blurb || "") + "</p>" +
        '<p class="contents">' + esc(names.join("  ·  ")) +
        "  —  " + plural(countPages(year), "page") + "</p>" +
        '<span class="go">Open ' + esc(year.year) + " &#8594;</span>" +
        "</div></a>";
    });

    html += "</main>";
    html += '<footer class="foot">Made at home. Add the next one whenever inspiration strikes.</footer>';
    mount.innerHTML = html;
  }

  /* ------------------------------------------------------------ year page */

  function renderYear(mount) {
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("y");

    var years = (SITE.years || []).slice().sort(function (a, b) {
      return b.year - a.year;
    });

    var year = years.filter(function (y) {
      return String(y.year) === String(requested);
    })[0] || years[0];

    if (!year) {
      mount.innerHTML = '<a class="backlink" href="index.html">&#8592; All years</a>' +
        '<div class="empty">Nothing here yet.</div>';
      return;
    }

    document.title = year.year + " · " + SITE.title;

    var html = '<a class="backlink" href="index.html">&#8592; All years</a>' +
      '<header class="masthead" style="text-align:left">' +
      '<div class="crest">' + esc(SITE.title) + "</div>" +
      '<h1 class="year-title">' + esc(year.year) + "</h1>" +
      '<p class="tagline" style="margin-left:0;text-align:left">' +
      esc(year.blurb || "") + "</p></header>";

    (year.events || []).forEach(function (event) {
      var accent = event.accent || "#c8a24a";
      html += '<section class="event" style="--accent:' + esc(accent) + '">' +
        '<div class="event-head">' +
        "<h3>" + esc(event.emoji || "") + " " + esc(event.name) + "</h3>";
      if (event.when) html += '<span class="when">' + esc(event.when) + "</span>";
      html += "</div>";
      if (event.blurb) html += '<p class="event-blurb">' + esc(event.blurb) + "</p>";

      html += '<div class="pages">';
      (event.pages || []).forEach(function (page) {
        html += '<a class="page-card" href="' + esc(page.href) + '">' +
          '<span class="icon">' + esc(page.emoji || "✦") + "</span>" +
          "<h4>" + esc(page.title) + "</h4>" +
          "<p>" + esc(page.blurb || "") + "</p>" +
          '<span class="open">Open &#8594;</span>' +
          "</a>";
      });
      html += "</div></section>";
    });

    html += '<footer class="foot">' + esc(SITE.title) + " &middot; " + esc(year.year) + "</footer>";
    mount.innerHTML = html;
  }

  /* ---------------------------------------------------------------- start */

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.querySelector("[data-site]");
    if (!mount) return;
    if (typeof SITE === "undefined") {
      mount.innerHTML = '<div class="empty">Could not load data/content.js.</div>';
      return;
    }
    if (mount.getAttribute("data-site") === "year") {
      renderYear(mount);
    } else {
      renderHome(mount);
    }
  });
})();
