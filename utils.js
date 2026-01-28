/* Train the Bot - Shared Utility Functions */

/**
 * Check if a hex color is light or dark
 * Used to determine text color on colored backgrounds
 * @param {string} hexColor - Hex color code (e.g., "#ff0000" or "ff0000")
 * @returns {boolean} - True if light, false if dark
 */
function isLight(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (original unchanged)
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Render an image card element for the training grid
 * @param {Object} image - Image data object
 * @param {Function} onClick - Click handler function
 * @returns {HTMLElement} - The created div element
 */
function createImageCard(image, onClick) {
  const div = document.createElement("div");
  div.id = image.id;
  div.className = "aspect-square rounded-lg flex flex-col items-center justify-end text-center cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-200 overflow-hidden relative";

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

  if (onClick) {
    div.addEventListener("click", function() {
      onClick(image.id);
    });
  }

  return div;
}

/**
 * Update selection counter display
 * @param {number} count - Current selection count
 */
function updateSelectionCount(count) {
  const countElement = document.getElementById("selection-count");
  if (countElement) {
    countElement.textContent = count;
  }
}

/**
 * Update train button state based on selection count
 * @param {number} count - Current selection count
 * @param {number} minRequired - Minimum selections required (default 1)
 */
function updateTrainButton(count, minRequired = 1) {
  const trainBtn = document.getElementById("train-btn");
  if (!trainBtn) return;

  if (count >= minRequired) {
    trainBtn.disabled = false;
    trainBtn.className = "bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-lg transition cursor-pointer";
  } else {
    trainBtn.disabled = true;
    trainBtn.className = "bg-slate-600 text-slate-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed transition";
  }
}
