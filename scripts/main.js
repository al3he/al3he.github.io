(() => {
  // Faces that non-queen cards pick from on their FIRST flip (then persist).
  // Add more names here (and in IMG) to get real randomness.
  const FACES = ["math"];
  const IMG = {
    queen: { src: "assets/image-17.png", alt: "Queen of diamonds" },
    math:  { src: "assets/image-20.png", alt: "Math card" },
  };

  const cover = document.getElementById("cover-view");
  const deckView = document.getElementById("deck-view");
  const deck = document.getElementById("deck-cards");

  // ----- view routing: #deck shows the deck, anything else shows the cover -----
  function route() {
    const isDeck = location.hash === "#deck";
    cover.hidden = isDeck;
    deckView.hidden = !isDeck;
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();

  // ----- build card markup -----
  document.querySelectorAll(".back-dark").forEach((el) =>
    el.insertAdjacentHTML("beforeend",
      '<span class="union union--a"><img src="assets/union.svg" alt=""></span>' +
      '<span class="union union--b"><img src="assets/union-1.svg" alt=""></span>'));

  document.querySelectorAll(".card").forEach((card) => {
    const back = card.dataset.back;
    card.innerHTML =
      '<span class="card__inner"><span class="card__back">' +
      `<img src="assets/card-back-${back}-v1.png" alt="">` +
      '</span><span class="card__front"></span></span>';
  });
  document.querySelectorAll(".pair__pink").forEach((el) => (el.inert = true));

  // ----- deck1=before -> deck1=after (3 cards -> 7 cards) -----
  function expand() {
    if (deck.classList.contains("is-expanded")) return;
    deck.querySelectorAll(":scope > :nth-child(n+4)").forEach((el, i) =>
      el.style.setProperty("--d", i * 80 + "ms"));
    deck.classList.add("is-expanded");
  }

  // ----- assign a face once; it persists on every later flip -----
  function ensureFace(card) {
    if (card.dataset.ready) return;
    if (!card.dataset.face) {
      card.dataset.face = FACES[Math.floor(Math.random() * FACES.length)];
    }
    const f = IMG[card.dataset.face];
    card.querySelector(".card__front").innerHTML = `<img src="${f.src}" alt="${f.alt}">`;
    card.dataset.ready = "1";
  }

  deck.addEventListener("click", (e) => {
    // pair: start -> final (dark card slides away, pink card becomes flippable)
    const dark = e.target.closest(".back-dark");
    if (dark) {
      const pair = dark.closest(".pair");
      pair.dataset.state = "final";
      pair.querySelector(".pair__pink").inert = false;
      expand();
      return;
    }
    const card = e.target.closest(".card");
    if (!card) return;

    // queen: once flipped, the next click goes to /projects/ (relative link)
    if (card.classList.contains("is-flipped") && card.dataset.href) {
      window.location.href = card.dataset.href;
      return;
    }
    ensureFace(card);
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-label", flipped
      ? (card.dataset.href ? "Queen of diamonds, open projects" : "Face-up card, click to flip back")
      : "Face-down card");
    expand();
  });
})();
