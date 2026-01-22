// Train the Bot - Scenario 2 Review Logic

let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages")) || [];

document.addEventListener("DOMContentLoaded", function () {
    if (selectedImages.length === 0) {
        window.location.href = "scenario2.html";
        return;
    }

    renderSelectedImages();

    const startTestBtn = document.getElementById("start-test-btn");
    if (startTestBtn) {
        startTestBtn.addEventListener("click", function () {
            window.location.href = "scenario2-test.html";
        });
    }
});

function renderSelectedImages() {
    const container = document.getElementById("selected-images");
    if (!container) return;

    container.innerHTML = "";

    selectedImages.forEach(function (selection) {
        const image = scenario2.trainingImages.find(img => img.id === selection.id);
        if (!image) return;

        const div = document.createElement("div");

        // Green for Fruit, Orange for Vegetable
        const borderColor = selection.label === "fruit" ? "border-green-400" : "border-orange-400";

        div.className = "aspect-square rounded-lg flex flex-col items-center justify-center text-center text-xs p-2 border-2 " + borderColor;
        div.style.backgroundColor = image.placeholderColor;
        div.style.color = isLight(image.placeholderColor) ? "#1e293b" : "#ffffff";

        const labelColor = selection.label === "fruit" ? "text-green-200" : "text-orange-200";
        div.innerHTML = `
            <span class="font-bold">${image.label}</span>
            <span class="${labelColor} text-[10px] mt-1 uppercase tracking-wider border border-current px-1 rounded">
                ${selection.label}
            </span>
        `;

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
