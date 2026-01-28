// Train the Bot - Scenario 1 Testing Logic (Cats vs Dogs)

// ---------------------------------------------------------
// 1. DATA LOADING
// ---------------------------------------------------------
let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages")) || [];
let currentTestIndex = 0;
let correctCount = 0;
let testResults = [];
let skipped = false;

document.addEventListener("DOMContentLoaded", function () {
    if (selectedImages.length === 0) {
        window.location.href = "scenario1.html";
        return;
    }
    const skipBtn = document.getElementById("skip-btn");
    if (skipBtn) skipBtn.addEventListener("click", skipToResults);
    showNextTest();
});

// ---------------------------------------------------------
// 2. THE LEARNING ENGINE (COLOR-ONLY MATCHING)
// ---------------------------------------------------------
//
// SIMPLE RULE: Only COLOR matters!
// 1. Get the test image's color (first tag)
// 2. Find a training image with the same color
// 3. Use that training image's label
// 4. No color match? Guess based on majority
//
// To get 5/5, train on: Black Cat, Golden Retriever, White Cat, Gray Cat, Brown Beagle

function evaluateTest(testImage) {
    const testColor = testImage.tags[0];  // First tag is always the color

    // Build training data with just what we need
    const trainingData = selectedImages.map(function (sel) {
        const img = scenario1.trainingImages.find(i => i.id === sel.id);
        return {
            label: sel.label,
            color: img.tags[0],  // First tag is color
            name: img.label
        };
    });

    // Find training image with matching color
    const colorMatch = trainingData.find(t => t.color === testColor);

    let prediction, matchedOn;

    if (colorMatch) {
        // Found a color match - use its label
        prediction = colorMatch.label;
        matchedOn = colorMatch.name;
    } else {
        // No color match - majority vote
        const cats = trainingData.filter(t => t.label === "cat").length;
        const dogs = trainingData.filter(t => t.label === "dog").length;
        prediction = cats >= dogs ? "cat" : "dog";
        matchedOn = null;
    }

    const isCorrect = prediction === testImage.correctCategory;

    // Simple error messages
    let message = "";
    if (!isCorrect) {
        if (colorMatch) {
            message = `You trained on a <b>${testColor}</b> animal (<b>${matchedOn}</b>) and labeled it <b>${prediction}</b>. To fix: label it as <b>${testImage.correctCategory}</b>, or train on a different <b>${testColor} ${testImage.correctCategory}</b>!`;
        } else {
            message = `You didn't train on any <b>${testColor}</b> animals! Add a <b>${testColor} ${testImage.correctCategory}</b> to your training.`;
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
// 3. UI & ANIMATION LOGIC
// ---------------------------------------------------------

function showNextTest() {
    if (skipped) return;
    if (currentTestIndex >= scenario1.testImages.length) {
        showFinalResults();
        return;
    }
    const testImage = scenario1.testImages[currentTestIndex];

    const testImageDiv = document.getElementById("test-image");
    testImageDiv.className = "w-32 h-32 mx-auto rounded-lg flex items-center justify-center text-center text-sm p-2 mb-4 transition-all duration-300 transform scale-100";
    testImageDiv.style.backgroundColor = testImage.placeholderColor;
    testImageDiv.textContent = "???";
    testImageDiv.style.color = isLight(testImage.placeholderColor) ? "#1e293b" : "#ffffff";

    document.getElementById("test-label").textContent = "What is this?";
    document.getElementById("test-status").innerHTML = "Thinking...";

    setTimeout(() => { if (!skipped) showPrediction(testImage); }, 600);
}

function showPrediction(testImage) {
    const result = evaluateTest(testImage);
    document.getElementById("test-status").innerHTML = `I think it's a <span class="font-bold text-xl ${result.prediction === 'cat' ? 'text-blue-400' : 'text-amber-400'}">${result.prediction.toUpperCase()}</span>`;
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
    scenario1.testImages.forEach(img => {
        const res = evaluateTest(img);
        testResults.push(res);
        if (res.passed) correctCount++;
    });
    showFinalResults();
}

function showFinalResults() {
    // Mark scenario as complete with score
    localStorage.setItem("scenario1Complete", "true");
    localStorage.setItem("scenario1Score", correctCount);

    document.getElementById("test-area").classList.add("hidden");
    document.getElementById("skip-container").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    document.getElementById("score").textContent = correctCount;
    document.getElementById("total").textContent = scenario1.testImages.length;

    // Render Training Summary
    const summaryContainer = document.createElement("div");
    summaryContainer.className = "mb-6 p-4 bg-slate-700/50 rounded-lg";
    summaryContainer.innerHTML = `<h3 class="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">Your Training Data</h3>`;

    const grid = document.createElement("div");
    grid.className = "flex gap-2 flex-wrap";

    selectedImages.forEach(sel => {
        const original = scenario1.trainingImages.find(img => img.id === sel.id);
        if (!original) return;

        const item = document.createElement("div");
        const borderColor = sel.label === "cat" ? "border-blue-400" : "border-amber-400";
        const textColor = sel.label === "cat" ? "text-blue-200" : "text-amber-200";

        item.className = `w-20 h-20 rounded border-2 ${borderColor} flex flex-col items-center justify-center text-center p-1 text-[10px] bg-slate-800`;
        item.style.backgroundColor = original.placeholderColor;
        item.style.color = isLight(original.placeholderColor) ? "#1e293b" : "#ffffff";

        item.innerHTML = `<div class="font-bold leading-tight mb-1">${original.label}</div><div class="uppercase ${textColor} bg-black/40 px-1 rounded">${sel.label}</div>`;
        grid.appendChild(item);
    });

    summaryContainer.appendChild(grid);

    // Insert before the score or list
    const resultsDiv = document.getElementById("results");
    const existingList = document.getElementById("result-list");
    // We want to put this summary inside the results box, maybe before the result list
    // The structure is: div#results -> div.bg-slate-800 -> h2(Result), p(Score), div#result-list

    // It's cleaner to just prepend to the result-list container parent
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

        // Expanded text block
        let html = `<div class="font-semibold">${res.image.label}</div>`;
        html += `<div class="text-xs text-slate-400">Model said: <span class="${res.prediction === 'cat' ? 'text-blue-300' : 'text-amber-300'} uppercase font-bold">${res.prediction}</span></div>`;

        // Show what the model matched on
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
