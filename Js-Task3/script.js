function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const closeBtn = document.querySelector(".close-btn");

  fetch("events.json")
    .then(response => response.json())
    .then(data => {
      for (const year in data) {
        const yearBlock = document.createElement("div");
        yearBlock.classList.add("year-block");

        const yearHeading = document.createElement("h2");
        yearHeading.textContent = year;
        yearBlock.appendChild(yearHeading);

        data[year].forEach(event => {
          const card = document.createElement("div");
          card.classList.add("event-card");

          card.innerHTML = `
            <img src="${event.imageURL}" alt="${event.title}">
            <h3>${event.title}</h3>
          `;

          card.addEventListener("click", () => {
            modalTitle.textContent = event.title;
            modalImage.src = event.imageURL;
            modalDescription.textContent = event.description;
            modal.style.display = "block";
          });

          yearBlock.appendChild(card);
        });

        timeline.appendChild(yearBlock);
      }
    })
    .catch(err => console.error("Error loading events:", err));

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
