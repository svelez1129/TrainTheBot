// Train the Bot - Review Logic

// Get selected images from sessionStorage
let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages")) || [];

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function() {
  if (selectedImages.length === 0) {
    // No selections, go back to training
    window.location.href = "scenario1.html";
    return;
  }
  
  renderSelectedImages();
  
  // Set up test button
  const startTestBtn = document.getElementById("start-test-btn");
  startTestBtn.addEventListener("click", function() {
    window.location.href = "scenario1-test.html";
  });
});

// Render the selected images
function renderSelectedImages() {
  const container = document.getElementById("selected-images");
  container.innerHTML = "";
  
  selectedImages.forEach(function(selection) {
    const image = scenario1.trainingImages.find(function(img) {
      return img.id === selection.id;
    });
    
    const div = document.createElement("div");
    
    // Use blue border for cat label, amber for dog label
    const borderColor = selection.label === "cat" ? "border-blue-400" : "border-amber-400";
    
    div.className = "aspect-square rounded-lg flex flex-col items-center justify-center text-center text-xs p-2 border-2 " + borderColor;
    div.style.backgroundColor = image.placeholderColor;
    
    // Use dark text for light backgrounds
    const isLightColor = isLight(image.placeholderColor);
    div.style.color = isLightColor ? "#1e293b" : "#ffffff";
    
    // Show image label and player's label
    const labelColor = selection.label === "cat" ? "text-blue-400" : "text-amber-400";
    div.innerHTML = '<span>' + image.label + '</span><span class="' + labelColor + ' text-xs mt-1">labeled: ' + selection.label + '</span>';
    
    container.appendChild(div);
  });
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