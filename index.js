

const menuToggle = document.getElementById("menuToggle");
  const fullscreenMenu = document.getElementById("fullscreenMenu");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    fullscreenMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when any nav link is clicked
  fullscreenMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      fullscreenMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  document.getElementById("learn-more-btn").addEventListener("click", function () {
    const startersSection = document.getElementById("starters");
    if (startersSection) {
      startersSection.scrollIntoView({ behavior: "smooth" });
    }
  });


  window.addEventListener("load", () => {
    const scrollContainers = document.querySelectorAll('.menu-scroll');

    scrollContainers.forEach(container => {
      const scrollAmount = 100; // adjust scroll distance
      const duration = 500; // time in ms

      setTimeout(() => {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth"
        });
      }, 2000); // wait before starting

      setTimeout(() => {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth"
        });
      }, duration + 2500); // scroll back after a pause
    });
  });

