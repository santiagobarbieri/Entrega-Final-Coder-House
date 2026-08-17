const filterButtons = document.querySelectorAll("[data-filter]");
const archiveItems = document.querySelectorAll(".archive-item[data-genres]");
const resultCount = document.querySelector("#resultCount");
const emptyMessage = document.querySelector("#archiveEmpty");

function filterArchive(selectedGenre) {
  let visibleItems = 0;

  archiveItems.forEach((item) => {
    const genres = item.dataset.genres.split(" ");
    const shouldShow = selectedGenre === "all" || genres.includes(selectedGenre);

    item.hidden = !shouldShow;
    if (shouldShow) visibleItems += 1;
  });

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === selectedGenre;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  resultCount.textContent = `${visibleItems} ${visibleItems === 1 ? "resultado" : "resultados"}`;
  emptyMessage.hidden = visibleItems !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedGenre = button.dataset.filter;
    filterArchive(selectedGenre);
    history.replaceState(null, "", selectedGenre === "all" ? location.pathname : `#${selectedGenre}`);
  });
});

const initialGenre = location.hash.slice(1).toLowerCase();
const hasMatchingFilter = [...filterButtons].some((button) => button.dataset.filter === initialGenre);

filterArchive(hasMatchingFilter ? initialGenre : "all");
