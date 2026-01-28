// Train the Bot - Scenario 1 Review Logic

// Get selected images from training step
let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages")) || [];

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
    if (selectedImages.length === 0) {
        // No selections, go back to training
        window.location.href = "scenario1.html";
        return;
    }

    renderSelectedImages();

    // Set up test button
    const startTestBtn = document.getElementById("start-test-btn");
    if (startTestBtn) {
        startTestBtn.addEventListener("click", function () {
            window.location.href = "scenario1-test.html";
        });
    }
});

// Render the selected images
function renderSelectedImages() {
    const container = document.getElementById("selected-images");
    if (!container) return;

    container.innerHTML = "";

    selectedImages.forEach(function (selection) {
        // Find original data
        const image = scenario1.trainingImages.find(img => img.id === selection.id);
        if (!image) return;

        const div = document.createElement("div");

        // Style based on label (Blue for Cat, Amber for Dog)
        const borderColor = selection.label === "cat" ? "border-blue-400" : "border-amber-400";
        const labelColor = selection.label === "cat" ? "text-blue-200" : "text-amber-200";
        const labelBg = selection.label === "cat" ? "bg-blue-500/80" : "bg-amber-500/80";

        div.className = "aspect-square rounded-lg flex flex-col items-end justify-end text-center text-xs overflow-hidden border-2 relative " + borderColor;

        if (image.imageUrl) {
            // Use actual image
            div.style.backgroundImage = "url(" + image.imageUrl + ")";
            div.style.backgroundSize = "cover";
            div.style.backgroundPosition = "center";

            div.innerHTML = `
                <div class="w-full bg-black/70 text-white p-1">
                    <div class="font-bold text-[10px]">${image.label}</div>
                    <div class="${labelBg} text-white text-[9px] mt-0.5 uppercase tracking-wider px-1 rounded inline-block">
                        ${selection.label}
                    </div>
                </div>
            `;
        } else {
            // Fallback to placeholder
            div.style.backgroundColor = image.placeholderColor;
            div.classList.add("justify-center", "items-center");
            div.classList.remove("justify-end", "items-end");

            const isLightColor = isLight(image.placeholderColor);
            div.style.color = isLightColor ? "#1e293b" : "#ffffff";

            div.innerHTML = `
                <span class="font-bold">${image.label}</span>
                <span class="${labelColor} text-[10px] mt-1 uppercase tracking-wider border border-current px-1 rounded">
                    Labeled: ${selection.label}
                </span>
            `;
        }

        container.appendChild(div);
    });
}

function isLight(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return ((r * 299 + g * 587 + b * 114) / 1000) > 150;
}
