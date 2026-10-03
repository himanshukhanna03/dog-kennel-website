const photoFiles = [
  "WhatsApp Image 2026-09-26 at 10.16.45.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.45 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.45 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.45 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.45 (4).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.46.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.46 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.46 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.46 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.47.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.47 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.47 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.47 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.48.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.48 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.48 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.48 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.49.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.49 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.49 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.49 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.50.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.50 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.50 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.50 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.51.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.51 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.51 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.51 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.52.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.52 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.52 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.52 (3).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.53.jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.53 (1).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.53 (2).jpeg",
  "WhatsApp Image 2026-09-26 at 10.16.54.jpeg"
];

const videoFiles = [
  "10.18.32", "10.18.35", "10.18.37", "10.18.39", "10.18.40",
  "10.18.43", "10.18.46", "10.18.47", "10.18.48", "10.18.49",
  "10.18.50", "10.18.51", "10.18.54", "10.18.55", "10.18.57",
  "10.19.01", "10.19.05", "10.19.18", "10.20.11", "10.20.15"
].map((time) => `WhatsApp Video 2026-09-26 at ${time}.mp4`);

const galleryItems = [
  ...photoFiles.map((file, index) => ({
    type: "photo",
    src: `assests/${file}`,
    alt: `Dog at Kyra Kennels, photo ${index + 1}`,
    label: "A day at the kennels"
  })),
  ...videoFiles.map((file, index) => ({
    type: "video",
    src: `assests/${file}`,
    label: `Kennel moments ${index + 1}`
  }))
];

const galleryGrid = document.querySelector("#gallery-grid");
const galleryMore = document.querySelector("#gallery-more");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const pageSize = 8;
let activeFilter = "all";
let visibleCount = pageSize;

function getFilteredItems() {
  return activeFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.type === activeFilter);
}

function renderGallery() {
  if (!galleryGrid) return;

  const items = getFilteredItems();
  galleryGrid.replaceChildren();

  items.slice(0, visibleCount).forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    const mediaWrap = document.createElement("div");
    mediaWrap.className = "gallery-media-wrap";

    const media = item.type === "video"
      ? document.createElement("video")
      : document.createElement("img");
    media.src = item.src;

    if (item.type === "video") {
      media.controls = true;
      media.preload = "none";
      media.poster = `assests/${photoFiles[galleryItems.indexOf(item) % photoFiles.length]}`;
      media.setAttribute("aria-label", item.label);
      const openButton = document.createElement("button");
      openButton.className = "gallery-open video-open";
      openButton.type = "button";
      openButton.dataset.galleryIndex = String(galleryItems.indexOf(item));
      openButton.setAttribute("aria-label", `Open ${item.label}`);
      openButton.textContent = "Expand video";
      mediaWrap.append(media, openButton);
    } else {
      media.alt = item.alt;
      media.loading = "lazy";
      media.decoding = "async";
      const openButton = document.createElement("button");
      openButton.className = "gallery-open";
      openButton.type = "button";
      openButton.dataset.galleryIndex = String(galleryItems.indexOf(item));
      openButton.setAttribute("aria-label", `Open photo ${galleryItems.indexOf(item) + 1}`);
      const openLabel = document.createElement("span");
      openLabel.className = "gallery-open-label";
      openLabel.textContent = "View photo";
      openButton.append(media, openLabel);
      mediaWrap.append(openButton);
    }

    const caption = document.createElement("figcaption");
    const label = document.createElement("span");
    label.textContent = item.label;
    const type = document.createElement("span");
    type.className = "media-type";
    type.textContent = item.type;
    caption.append(label, type);
    figure.append(mediaWrap, caption);
    galleryGrid.append(figure);
  });

  galleryGrid.setAttribute("aria-busy", "false");
  galleryMore.hidden = items.length <= visibleCount;
}

const mediaDialog = document.querySelector("#media-dialog");
const mediaDialogContent = document.querySelector("#media-dialog-content");
const mediaDialogTitle = document.querySelector("#media-dialog-title");
const mediaCounter = document.querySelector("#media-counter");
let viewerIndex = 0;

function renderViewer() {
  const items = getFilteredItems();
  if (!items.length || !mediaDialogContent) return;

  viewerIndex = (viewerIndex + items.length) % items.length;
  const item = items[viewerIndex];
  const media = item.type === "video"
    ? document.createElement("video")
    : document.createElement("img");
  media.src = item.src;

  if (item.type === "video") {
    media.controls = true;
    media.preload = "auto";
    media.poster = `assests/${photoFiles[galleryItems.indexOf(item) % photoFiles.length]}`;
    media.setAttribute("aria-label", item.label);
  } else {
    media.alt = item.alt;
  }

  mediaDialogTitle.textContent = item.label;
  mediaCounter.textContent = `${viewerIndex + 1} / ${items.length}`;
  mediaDialogContent.replaceChildren(media);
  if (item.type === "video") media.play().catch(() => {});
}

function openGalleryItem(globalIndex) {
  const items = getFilteredItems();
  viewerIndex = items.findIndex((item) => galleryItems.indexOf(item) === globalIndex);
  if (viewerIndex < 0) return;
  if (!mediaDialog.open) mediaDialog.showModal();
  renderViewer();
}

galleryGrid?.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-gallery-index]");
  if (openButton) openGalleryItem(Number(openButton.dataset.galleryIndex));
});

document.querySelector("#media-dialog-close")?.addEventListener("click", () => {
  mediaDialog.close();
});

document.querySelector("#media-previous")?.addEventListener("click", () => {
  viewerIndex -= 1;
  renderViewer();
});

document.querySelector("#media-next")?.addEventListener("click", () => {
  viewerIndex += 1;
  renderViewer();
});

mediaDialog?.addEventListener("click", (event) => {
  if (event.target === mediaDialog) mediaDialog.close();
});

mediaDialog?.addEventListener("close", () => {
  mediaDialogContent.replaceChildren();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    visibleCount = pageSize;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderGallery();
  });
});

galleryMore?.addEventListener("click", () => {
  visibleCount += pageSize;
  renderGallery();
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");
const today = new Date().toISOString().split("T")[0];

if (startDate) {
  startDate.min = today;
  startDate.addEventListener("change", () => {
    endDate.min = startDate.value || today;
    if (endDate.value && endDate.value < startDate.value) {
      endDate.value = "";
    }
  });
}

document.querySelector("#booking-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-status").textContent =
    "This form is not connected to a booking service yet, so your enquiry has not been sent.";
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

renderGallery();