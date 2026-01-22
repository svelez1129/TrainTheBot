// Train the Bot - Scenario 2 Testing Logic (Fruits vs Vegetables)

let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages")) || [];
let currentTestIndex = 0;
let correctCount = 0;
let testResults = [];
let skipped = false;

document.addEventListener("DOMContentLoaded", function () {
    if (selectedImages.length === 0) {
        window.location.href = "scenario2.html";
        return;
    }
    const skipBtn = document.getElementById("skip-btn");
    if (skipBtn) skipBtn.addEventListener("click", skipToResults);
    showNextTest();
});

// ---------------------------------------------------------
// SIMPLE COLOR-ONLY MATCHING (same logic as scenario 1)
// ---------------------------------------------------------

function evaluateTest(testImage) {
    const testColor = testImage.tags[0];  // First tag is always the color

    const trainingData = selectedImages.map(function (sel) {
        const img = scenario2.trainingImages.find(i => i.id === sel.id);
        return {
            label: sel.label,
            color: img.tags[0],
            name: img.label
        };
    });

    // Find training image with matching color
    const colorMatch = trainingData.find(t => t.color === testColor);

    let prediction, matchedOn;

    if (colorMatch) {
        prediction = colorMatch.label;
        matchedOn = colorMatch.name;
    } else {
        // No color match - majority vote
        const fruits = trainingData.filter(t => t.label === "fruit").length;
        const veggies = trainingData.filter(t => t.label === "vegetable").length;
        prediction = fruits >= veggies ? "fruit" : "vegetable";
        matchedOn = null;
    }

    const isCorrect = prediction === testImage.correctCategory;

    let message = "";
    if (!isCorrect) {
        if (colorMatch) {
            message = `You trained on a <b>${testColor}</b> item (<b>${matchedOn}</b>) and labeled it <b>${prediction}</b>. To fix: label it as <b>${testImage.correctCategory}</b>, or train on a different <b>${testColor} ${testImage.correctCategory}</b>!`;
        } else {
            message = `You didn't train on any <b>${testColor}</b> items! Add a <b>${testColor} ${testImage.correctCategory}</b> to your training.`;
        }
    }

    return {
        image: testImage,
        passed: isCorrect,
        prediction: prediction,
        message: message,
        bestMatch: matchedOn,
        colorMatched: colorMatch ? testColor : null
    };
}

// ---------------------------------------------------------
// UI & ANIMATION LOGIC
// ---------------------------------------------------------

function showNextTest() {
    if (skipped) return;
    if (currentTestIndex >= scenario2.testImages.length) {
        showFinalResults();
        return;
    }
    const testImage = scenario2.testImages[currentTestIndex];

    const testImageDiv = document.getElementById("test-image");
    testImageDiv.className = "w-32 h-32 mx-auto rounded-lg flex items-center justify-center text-center text-sm p-2 mb-4 transition-all duration-300";
    testImageDiv.style.backgroundColor = testImage.placeholderColor;
    testImageDiv.textContent = "???";
    testImageDiv.style.color = isLight(testImage.placeholderColor) ? "#1e293b" : "#ffffff";

    document.getElementById("test-label").textContent = "What is this?";
    document.getElementById("test-status").innerHTML = "Thinking...";

    setTimeout(() => { if (!skipped) showPrediction(testImage); }, 600);
}

function showPrediction(testImage) {
    const result = evaluateTest(testImage);
    const color = result.prediction === 'fruit' ? 'text-green-400' : 'text-orange-400';
    document.getElementById("test-status").innerHTML = `I think it's a <span class="font-bold text-xl ${color}">${result.prediction.toUpperCase()}</span>`;
    setTimeout(() => { if (!skipped) revealAnswer(testImage, result); }, 1000);
}

function revealAnswer(testImage, result) {
    testResults.push(result);
    if (result.passed) correctCount++;

    const testImageDiv = document.getElementById("test-image");
    testImageDiv.textContent = testImage.label;
    document.getElementById("test-label").textContent = testImage.label;

    if (result.passed) {
        document.getElementById("test-status").innerHTML = `<span class="text-green-400 font-bold">Correct!</span>`;
        testImageDiv.classList.add("ring-4", "ring-green-500");
    } else {
        document.getElementById("test-status").innerHTML = `<span class="text-red-400 font-bold">Wrong!</span><p class="text-xs text-slate-300 mt-1">${result.message}</p>`;
        testImageDiv.classList.add("ring-4", "ring-red-500");
    }

    currentTestIndex++;
    setTimeout(() => { if (!skipped) showNextTest(); }, 2000);
}

function skipToResults() {
    skipped = true;
    testResults = [];
    correctCount = 0;
    scenario2.testImages.forEach(img => {
        const res = evaluateTest(img);
        testResults.push(res);
        if (res.passed) correctCount++;
    });
    showFinalResults();
}

function showFinalResults() {
    document.getElementById("test-area").classList.add("hidden");
    document.getElementById("skip-container").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    document.getElementById("score").textContent = correctCount;
    document.getElementById("total").textContent = scenario2.testImages.length;

    // Render Training Summary
    const summaryContainer = document.createElement("div");
    summaryContainer.className = "mb-6 p-4 bg-slate-700/50 rounded-lg";
    summaryContainer.innerHTML = `<h3 class="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Your Training Data</h3>`;

    const grid = document.createElement("div");
    grid.className = "flex gap-2 flex-wrap";

    selectedImages.forEach(sel => {
        const original = scenario2.trainingImages.find(img => img.id === sel.id);
        if (!original) return;

        const item = document.createElement("div");
        const borderColor = sel.label === "fruit" ? "border-green-400" : "border-orange-400";
        const textColor = sel.label === "fruit" ? "text-green-200" : "text-orange-200";

        item.className = `w-20 h-20 rounded border-2 ${borderColor} flex flex-col items-center justify-center text-center p-1 text-[10px] bg-slate-800`;
        item.style.backgroundColor = original.placeholderColor;
        item.style.color = isLight(original.placeholderColor) ? "#1e293b" : "#ffffff";

        item.innerHTML = `<div class="font-bold leading-tight mb-1">${original.label}</div><div class="uppercase ${textColor} bg-black/40 px-1 rounded">${sel.label}</div>`;
        grid.appendChild(item);
    });

    summaryContainer.appendChild(grid);

    const existingList = document.getElementById("result-list");
    const parentBox = existingList.parentElement;
    parentBox.insertBefore(summaryContainer, existingList);

    const list = document.getElementById("result-list");
    list.innerHTML = "";

    testResults.forEach(res => {
        const row = document.createElement("div");
        row.className = `p-3 rounded-lg border flex items-start gap-3 ${res.passed ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`;
        const icon = document.createElement("div");
        icon.innerHTML = res.passed ? "✓" : "✗";
        icon.className = `font-bold text-lg ${res.passed ? 'text-green-400' : 'text-red-400'}`;

        let html = `<div class="font-semibold">${res.image.label}</div>`;
        html += `<div class="text-xs text-slate-400">Model said: <span class="${res.prediction === 'fruit' ? 'text-green-300' : 'text-orange-300'} uppercase font-bold">${res.prediction}</span></div>`;

        if (res.bestMatch) {
            const matchReason = res.colorMatched
                ? `color: <b>${res.colorMatched}</b>`
                : "similar features";
            html += `<div class="text-[10px] text-slate-500 mt-1">Matched: <b>${res.bestMatch}</b> (${matchReason})</div>`;
        }

        if (!res.passed) {
            html += `<div class="text-xs text-red-300 mt-1">${res.message}</div>`;
        }

        const text = document.createElement("div");
        text.innerHTML = html;

        row.appendChild(icon);
        row.appendChild(text);
        list.appendChild(row);
    });
}

function isLight(hexColor) {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return ((r * 299 + g * 587 + b * 114) / 1000) > 150;
}
