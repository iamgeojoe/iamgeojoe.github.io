
/* Update the footer year. */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   HORIZONTAL COMPANY LOGO CAROUSEL
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
  const previousButton = document.querySelector(".logo-prev");
  const nextButton = document.querySelector(".logo-next");
  const status = document.querySelector(".logo-carousel-status");

  if (!track || !list) return;

  let loadedFiles = [];
  let currentIndex = 0;
  let resizeTimer;

  function visibleCount() {
    if (window.matchMedia("(max-width: 560px)").matches) return 2;
    if (window.matchMedia("(max-width: 850px)").matches) return 3;
    return 5;
  }

  function maxIndex() {
    return Math.max(0, loadedFiles.length - visibleCount());
  }

  function updateCarousel() {
    const firstCard = list.querySelector(".logo-card");

    if (firstCard) {
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const distance = currentIndex * (cardWidth + gap);

      list.style.transform = `translateX(-${distance}px)`;
    }

    const pageCount = Math.max(
      1,
      Math.ceil(loadedFiles.length / visibleCount())
    );

    const activePage = Math.min(
      pageCount - 1,
      Math.floor(currentIndex / visibleCount())
    );

    if (status) {
      if (status.children.length !== pageCount) {
        status.replaceChildren(
          ...Array.from({ length: pageCount }, () => {
            const dot = document.createElement("span");
            dot.className = "logo-status-dot";
            return dot;
          })
        );
      }

      Array.from(status.children).forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activePage);
        dot.setAttribute("aria-hidden", "true");
      });
    }

    if (previousButton) {
      previousButton.disabled = currentIndex <= 0;
    }

    if (nextButton) {
      nextButton.disabled = currentIndex >= maxIndex();
    }
  }

  function renderLogos() {
    list.replaceChildren();

    loadedFiles.forEach(file => {
      const card = document.createElement("div");
      card.className = "logo-card";

      const image = document.createElement("img");
      image.src = `assets/portfolio-logos/${file}`;
      image.alt = file
        .replace(/\.[^.]+$/, "")
        .replace(/[_-]+/g, " ");
      image.loading = "lazy";
      image.decoding = "async";

      card.appendChild(image);
      list.appendChild(card);
    });

    currentIndex = Math.min(currentIndex, maxIndex());
    updateCarousel();
  }

  function moveCarousel(direction) {
    const step = visibleCount();

    currentIndex = Math.max(
      0,
      Math.min(maxIndex(), currentIndex + direction * step)
    );

    updateCarousel();
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      moveCarousel(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      moveCarousel(1);
    });
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      currentIndex = Math.min(currentIndex, maxIndex());
      updateCarousel();
    }, 120);
  });

  Promise.all(
    logoFiles.map(file => {
      return new Promise(resolve => {
        const image = new Image();

        image.onload = () => resolve(file);
        image.onerror = () => resolve(null);
        image.src = `assets/portfolio-logos/${file}`;
      });
    })
  ).then(results => {
    loadedFiles = results.filter(Boolean);
    renderLogos();

    if (loadedFiles.length === 0) {
      track.innerHTML =
        '<p class="logo-error">Company logos could not be loaded. Check the assets/portfolio-logos folder.</p>';
    }
  });
})();
