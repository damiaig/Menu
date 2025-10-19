

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
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', function () {
        const img = this.getAttribute('data-img');
        const name = this.getAttribute('data-name');
        const desc = this.getAttribute('data-description');
        const price = this.querySelector('.price')?.textContent || '';
  
        // Remove existing modal if any
        const existingModal = document.getElementById('dynamicModal');
        if (existingModal) existingModal.remove();
  
        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'dynamicModal';
        modal.className = 'menu-modal';
        modal.innerHTML = `
          <div class="menu-modal-content">
            <span class="close-btn">&times;</span>
            <img src="${img}" alt="${name}">
            <h3>${name}</h3>
            <p>${desc}</p>
            <span class="price">${price}</span>
          </div>
        `;
  
        // Append to body
        document.body.appendChild(modal);
  
        // Show modal
        modal.style.display = 'flex';
  
        // Close logic
        modal.querySelector('.close-btn').addEventListener('click', () => {
          modal.remove();
        });
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.remove();
        });
      });
    });
  });
  
  
