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
        const labelBg = selection.label === "fruit" ? "bg-green-500/80" : "bg-orange-500/80";

        div.className = "aspect-square rounded-lg flex flex-col items-end justify-end text-center text-xs overflow-hidden border-2 relative " + borderColor;

        if (image.imageUrl) {
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
            div.style.backgroundColor = image.placeholderColor;
            div.classList.add("justify-center", "items-center");
            div.classList.remove("justify-end", "items-end");
            div.style.color = isLight(image.placeholderColor) ? "#1e293b" : "#ffffff";

            const labelColor = selection.label === "fruit" ? "text-green-200" : "text-orange-200";
            div.innerHTML = `
                <span class="font-bold">${image.label}</span>
                <span class="${labelColor} text-[10px] mt-1 uppercase tracking-wider border border-current px-1 rounded">
                    ${selection.label}
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
