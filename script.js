
/* =========================================
   FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   CONTINUOUS RIGHT-TO-LEFT LOGO CAROUSEL
========================================= */

(() => {
  const logoFiles = [
    "3m-original.svg",
    "Amg-gt-original.svg",
    "Disney.svg",
    "Epic Games-original.svg",
    "LAMBO Bull-original-1024.png",
    "m-performance.svg",
    "PS-original.svg",
    "United_Parcel_Service_logo_2014.svg.webp",
    "adobe-original.svg",
    "airbnb-original.svg",
    "american-airlines-original.svg",
    "american-broadcasting-company-original.svg",
    "american-express-original.svg",
    "audi-ag-original.svg",
    "bank-of-america-original.svg",
    "blackrock-original.svg",
    "bmw-original.svg",
    "boeing-original.svg",
    "bugatti-original.svg",
    "cadillac-original.svg",
    "capital-one-original.svg",
    "caterpillar-inc-original.svg",
    "chevrolet-original.svg",
    "chevron-corporation-original.svg",
    "church-dwight-original.svg",
    "cnn-original.svg",
    "coca-cola-original.svg",
    "colgate-original.svg",
    "conocophillips-original.svg",
    "cummins-original.svg",
    "dc-comics-original.svg",
    "delta-air-lines-original.svg",
    "dodge-original.svg",
    "ducati-original.svg",
    "duke-energy-original.svg",
    "ea-sports-original.svg",
    "emirates-thesvg-color.svg",
    "espn-original.svg",
    "fedex-original.svg",
    "ford-motor-company-original.svg",
    "gap-inc-original.svg",
    "general-electric-original.svg",
    "general-motors-original.svg",
    "google-original.svg",
    "googlecloud-thesvg-color.svg",
    "groupon-original.svg",
    "harley-davidson-original.svg",
    "honda-original.svg",
    "indian-motorcycle-original.svg",
    "intel-original.svg",
    "jeep-original.svg",
    "johnson-johnson-original.svg",
    "jpmorgan-chase-original.svg",
    "kawasaki-original.svg",
    "kellogg-s-original.svg",
    "lamborghini-original.svg",
    "levi-strauss-co-original.svg",
    "lg-thesvg-color.svg",
    "lucid-motors-original.svg",
    "macy-s-original.svg",
    "mahindra-mahindra-mahindra-logo.svg",
    "marathon-petroleum-original.svg",
    "marvel-comics-original.svg",
    "mercedes-benz-original.svg",
    "ministry-of-culture-of-slovenia-original.svg",
    "mondelez-international-original.svg",
    "nestle-original.svg",
    "netflix-original.svg",
    "new-balance-original.svg",
    "nike-original.svg",
    "nintendo-original.svg",
    "paramount-original.svg",
    "pepsico-original.svg",
    "procter-gamble-original.svg",
    "ralph-lauren-corporation-original.svg",
    "revlon-original.svg",
    "roblox-original.svg",
    "rogers-original.svg",
    "shopify-thesvg-color.svg",
    "skechers-original.svg",
    "sony-group-original.svg",
    "southwest-airlines-original.svg",
    "state-street-corporation-original.svg",
    "target-corporation-original.svg",
    "tesla-original.svg",
    "the-hershey-company-original.svg",
    "the-vanguard-group-original.svg",
    "uber-original.svg",
    "under-armour-original.svg",
    "union-pacific-corporation-original.svg",
    "united-airlines-original.svg",
    "universal-music-group-original.svg",
    "visa-inc-original.svg",
    "volkswagen-volkswagen-logo.svg",
    "warner-bros-entertainment-original.svg",
    "whirlpool-original.svg",
    "xbox-game-studios-original.svg",
    "zoho-corporation-original.svg"
  ];

  const track = document.querySelector(".logo-track");
  const list = document.querySelector(".logo-list");

  if (!track || !list) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let animationFrame;
  let previousTime = 0;
  let offset = 0;
  let loopWidth = 0;
  let paused = reducedMotion.matches;
  let resizeTimer;

  const SPEED = 35; // Pixels per second

  function loadImage(file) {
    return new Promise(resolve => {
      const image = new Image();

      image.onload = () => resolve({ file, image });
      image.onerror = () => resolve(null);

      image.src = `assets/portfolio-logos/${file}`;
      image.alt = file
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ");
      image.decoding = "async";
    });
  }

  function createCard(file, image) {
    const card = document.createElement("div");
    card.className = "logo-card";

    image.alt = image.alt || file;
    image.loading = "eager";

    card.appendChild(image);
    return card;
  }

  function renderCards(files, loadedImages) {
    list.replaceChildren();

    files.forEach(file => {
      const image = loadedImages.get(file);

      if (image) {
        list.appendChild(createCard(file, image.cloneNode()));
      }
    });

    // Duplicate the complete logo row for seamless looping.
    files.forEach(file => {
      const image = loadedImages.get(file);

      if (image) {
        const card = createCard(file, image.cloneNode());
        card.setAttribute("aria-hidden", "true");
        card.querySelector("img").alt = "";
        list.appendChild(card);
      }
    });
  }

  function measure() {
    const cards = [...list.children];
    const half = Math.floor(cards.length / 2);

    if (!half) return;

    loopWidth = 0;

    for (let i = 0; i < half; i++) {
      loopWidth += cards[i].getBoundingClientRect().width;

      if (i < half - 1) {
        loopWidth += parseFloat(
          getComputedStyle(list).columnGap
        ) || 0;
      }
    }

    offset = loopWidth > 0 ? offset % loopWidth : 0;
    list.style.transform = `translateX(-${offset}px)`;
  }

  function animate(time) {
    if (!previousTime) previousTime = time;

    const delta = Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;

    if (!paused && loopWidth > 0) {
      offset = (offset + SPEED * delta) % loopWidth;
      list.style.transform = `translateX(-${offset}px)`;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  Promise.all(logoFiles.map(loadImage)).then(results => {
    const loadedImages = new Map();

    results.forEach(result => {
      if (result) loadedImages.set(result.file, result.image);
    });

    const validFiles = logoFiles.filter(file => loadedImages.has(file));

    if (!validFiles.length) {
      track.innerHTML =
        '<p class="logo-error">Company logos could not be loaded. Please check assets/portfolio-logos.</p>';
      return;
    }

    renderCards(validFiles, loadedImages);

    requestAnimationFrame(() => {
      measure();
      animationFrame = requestAnimationFrame(animate);
    });
  });

  track.addEventListener("mouseenter", () => {
    paused = true;
  });

  track.addEventListener("mouseleave", () => {
    paused = reducedMotion.matches;
  });

  track.addEventListener("focusin", () => {
    paused = true;
  });

  track.addEventListener("focusout", event => {
    if (!track.contains(event.relatedTarget)) {
      paused = reducedMotion.matches;
    }
  });

  reducedMotion.addEventListener("change", event => {
    paused = event.matches;
  });

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      measure();
    }, 150);
  });
})();
