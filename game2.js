// Train the Bot - Game Logic for Scenario 2 (Fruits vs Vegetables)

let selectedImages = [];
const SELECTION_LIMIT = 5;
let currentImageId = null;

document.addEventListener("DOMContentLoaded", function() {
  const imageGrid = document.getElementById("image-grid");

  if (imageGrid && typeof scenario2 !== "undefined") {
    renderTrainingImages(scenario2.trainingImages);

    document.getElementById("train-btn").addEventListener("click", trainModel);

    document.getElementById("label-a-btn").addEventListener("click", function() {
      labelImage("fruit");
    });

    document.getElementById("label-b-btn").addEventListener("click", function() {
      labelImage("vegetable");
    });

    document.getElementById("cancel-label-btn").addEventListener("click", closeModal);
  }
});

function renderTrainingImages(images) {
  const imageGrid = document.getElementById("image-grid");
  imageGrid.innerHTML = "";

  images.forEach(function(image) {
    const div = document.createElement("div");
    div.id = image.id;
    div.className = "aspect-square rounded-lg flex flex-col items-center justify-end text-center cursor-pointer border-2 border-slate-600 hover:border-slate-500 transition overflow-hidden relative";

    if (image.imageUrl) {
      div.style.backgroundImage = "url(" + image.imageUrl + ")";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "center";

      const label = document.createElement("div");
      label.className = "w-full bg-black/60 text-white text-xs py-1 px-1";
      label.textContent = image.label;
      div.appendChild(label);
    } else {
      div.style.backgroundColor = image.placeholderColor;
      div.classList.add("justify-center");
      div.classList.remove("justify-end");
      div.style.color = isLight(image.placeholderColor) ? "#1e293b" : "#ffffff";
      div.innerHTML = "<span class='text-xs p-2'>" + image.label + "</span>";
    }

    div.addEventListener("click", function() {
      handleImageClick(image.id);
    });

    imageGrid.appendChild(div);
  });
}

function handleImageClick(id) {
  const existingIndex = selectedImages.findIndex(item => item.id === id);

  if (existingIndex !== -1) {
    selectedImages.splice(existingIndex, 1);
    updateImageBorder(id, null);
    updateSelectionCount();
    updateTrainButton();
  } else {
    if (selectedImages.length >= SELECTION_LIMIT) return;
    currentImageId = id;
    showModal(id);
  }
}

function showModal(id) {
  const image = scenario2.trainingImages.find(img => img.id === id);
  const modalImage = document.getElementById("modal-image");

  if (image.imageUrl) {
    modalImage.style.backgroundImage = "url(" + image.imageUrl + ")";
    modalImage.style.backgroundSize = "cover";
    modalImage.style.backgroundPosition = "center";
    modalImage.style.backgroundColor = "transparent";
    modalImage.textContent = "";
  } else {
    modalImage.style.backgroundImage = "";
    modalImage.style.backgroundColor = image.placeholderColor;
    modalImage.textContent = image.label;
    modalImage.style.color = isLight(image.placeholderColor) ? "#1e293b" : "#ffffff";
  }

  document.getElementById("label-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("label-modal").classList.add("hidden");
  currentImageId = null;
}

function labelImage(label) {
  if (currentImageId === null) return;

  selectedImages.push({
    id: currentImageId,
    label: label
  });

  updateImageBorder(currentImageId, label);
  updateSelectionCount();
  updateTrainButton();
  closeModal();
}

function updateImageBorder(id, label) {
  const div = document.getElementById(id);
  div.classList.remove("border-slate-600", "border-green-400", "border-orange-400");

  if (label === "fruit") {
    div.classList.add("border-green-400");
  } else if (label === "vegetable") {
    div.classList.add("border-orange-400");
  } else {
    div.classList.add("border-slate-600");
  }
}

function updateSelectionCount() {
  document.getElementById("selection-count").textContent = selectedImages.length;
}

function updateTrainButton() {
  const trainBtn = document.getElementById("train-btn");

  if (selectedImages.length >= 1) {
    trainBtn.disabled = false;
    trainBtn.className = "bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition cursor-pointer";
  } else {
    trainBtn.disabled = true;
    trainBtn.className = "bg-slate-600 text-slate-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed transition";
  }
}

function trainModel() {
  if (selectedImages.length >= 1) {
    sessionStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    window.location.href = "scenario2-review.html";
  }
}

function isLight(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
