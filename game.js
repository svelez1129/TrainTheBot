// Train the Bot - Game Logic

// Track selected images with their labels
let selectedImages = []; // { id: "train-1", label: "cat" }
const SELECTION_LIMIT = 5;

// Currently clicked image (for labeling)
let currentImageId = null;

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function() {
  const imageGrid = document.getElementById("image-grid");
  
  // Only run if we're on a scenario page with an image grid
  if (imageGrid && typeof scenario1 !== "undefined") {
    renderTrainingImages(scenario1.trainingImages);
    
    // Set up train button
    const trainBtn = document.getElementById("train-btn");
    trainBtn.addEventListener("click", trainModel);
    
    // Set up label modal buttons
    document.getElementById("label-cat-btn").addEventListener("click", function() {
      labelImage("cat");
    });
    
    document.getElementById("label-dog-btn").addEventListener("click", function() {
      labelImage("dog");
    });
    
    document.getElementById("cancel-label-btn").addEventListener("click", function() {
      closeModal();
    });
  }
});

// Render training images to the grid
function renderTrainingImages(images) {
  const imageGrid = document.getElementById("image-grid");
  imageGrid.innerHTML = "";

  images.forEach(function(image) {
    const div = document.createElement("div");
    div.id = image.id;
    div.className = "aspect-square rounded-lg flex items-center justify-center text-center text-xs p-2 cursor-pointer border-2 border-slate-600 hover:border-slate-500 transition";
    div.style.backgroundColor = image.placeholderColor;
    
    // Use dark text for light backgrounds
    const isLightColor = isLight(image.placeholderColor);
    div.style.color = isLightColor ? "#1e293b" : "#ffffff";
    
    div.textContent = image.label;
    
    div.addEventListener("click", function() {
      handleImageClick(image.id);
    });

    imageGrid.appendChild(div);
  });
}

// Handle clicking an image
function handleImageClick(id) {
  // Check if already selected
  const existingIndex = selectedImages.findIndex(function(item) {
    return item.id === id;
  });
  
  if (existingIndex !== -1) {
    // Already selected - deselect it
    selectedImages.splice(existingIndex, 1);
    updateImageBorder(id, null);
    updateSelectionCount();
    updateTrainButton();
  } else {
    // Not selected - check limit
    if (selectedImages.length >= SELECTION_LIMIT) {
      return; // At limit, do nothing
    }
    
    // Show labeling modal
    currentImageId = id;
    showModal(id);
  }
}

// Show the labeling modal
function showModal(id) {
  const image = scenario1.trainingImages.find(function(img) {
    return img.id === id;
  });
  
  const modalImage = document.getElementById("modal-image");
  modalImage.style.backgroundColor = image.placeholderColor;
  modalImage.textContent = image.label;
  modalImage.style.color = isLight(image.placeholderColor) ? "#1e293b" : "#ffffff";
  
  document.getElementById("label-modal").classList.remove("hidden");
}

// Close the modal
function closeModal() {
  document.getElementById("label-modal").classList.add("hidden");
  currentImageId = null;
}

// Label the current image
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

// Update image border based on label
function updateImageBorder(id, label) {
  const div = document.getElementById(id);
  
  // Remove all border classes
  div.classList.remove("border-slate-600", "border-blue-400", "border-amber-400");
  
  if (label === "cat") {
    div.classList.add("border-blue-400");
  } else if (label === "dog") {
    div.classList.add("border-amber-400");
  } else {
    div.classList.add("border-slate-600");
  }
}

// Update the selection counter
function updateSelectionCount() {
  const countElement = document.getElementById("selection-count");
  countElement.textContent = selectedImages.length;
}

// Enable/disable train button based on selection count
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

// Train model - save selections and go to review page
function trainModel() {
  if (selectedImages.length >= 1) {
    sessionStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    window.location.href = "scenario1-review.html";
  }
}

// Check if a hex color is light or dark
function isLight(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
}