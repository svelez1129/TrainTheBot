// Train the Bot - Testing Logic

// Get selected images from sessionStorage
let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages")) || [];

let currentTestIndex = 0;
let correctCount = 0;
let testResults = [];
let skipped = false; // Flag to stop animations

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  if (selectedImages.length === 0) {
    window.location.href = "scenario1.html";
    return;
  }

  document.getElementById("skip-btn").addEventListener("click", skipToResults);
  showNextTest();
});

// Evaluate a test image and return result (no side effects)
function evaluateTest(testImage) {
  // 1. Reconstruct Training State
  const trainingData = selectedImages.map(function (selection) {
    const image = scenario1.trainingImages.find(function (img) {
      return img.id === selection.id;
    });
    return {
      tags: image.tags,
      label: selection.label, // What the player called it
      trueCategory: image.category, // What it actually is
      originalName: image.label
    };
  });

  // 2. Count Cat vs Dog labels overall in training set
  let trainingCounts = { cat: 0, dog: 0 };
  trainingData.forEach(function (d) {
    trainingCounts[d.label]++;
  });

  // 3. Calculate Tag Associations (The "Brain")
  const featureBrain = {};
  trainingData.forEach(function (data) {
    data.tags.forEach(function (tag) {
      if (!featureBrain[tag]) {
        featureBrain[tag] = { cat: 0, dog: 0, examples: { cat: [], dog: [] } };
      }
      featureBrain[tag][data.label]++;
      featureBrain[tag].examples[data.label].push(data.originalName);
    });
  });

  // 4. Make Prediction based on Test Image Tags
  let scores = { cat: 0, dog: 0 };
  let evidence = [];

  testImage.tags.forEach(function (tag) {
    if (featureBrain[tag]) {
      const catVal = featureBrain[tag].cat;
      const dogVal = featureBrain[tag].dog;

      scores.cat += catVal;
      scores.dog += dogVal;

      if (catVal > 0 || dogVal > 0) {
        evidence.push({ tag: tag, cat: catVal, dog: dogVal });
      }
    }
  });

  // Tie-breaker: use overall majority
  let prediction;
  if (scores.cat > scores.dog) prediction = "cat";
  else if (scores.dog > scores.cat) prediction = "dog";
  else prediction = trainingCounts.cat >= trainingCounts.dog ? "cat" : "dog";

  // 5. Generate Dynamic Explanation
  let explanation = "";
  let isCorrect = (prediction === testImage.correctCategory);

  if (!isCorrect) {
    // SCENARIO A: The user only provided one type of label
    if (trainingCounts.cat === 0 || trainingCounts.dog === 0) {
      const knownLabel = trainingCounts.cat > 0 ? "cat" : "dog";
      explanation = `The model only saw examples of **${knownLabel}s** during training. It doesn't even know that **${testImage.correctCategory}s** exist, so it predicts everything is a **${knownLabel}**.`;
    }
    // SCENARIO B: Feature Bias (One tag is overwhelming the label)
    else {
      const wrongLabel = testImage.correctCategory === "cat" ? "dog" : "cat";
      const rightLabel = testImage.correctCategory;

      let strongestBias = null;
      let maxDiff = -1;

      evidence.forEach(function (e) {
        const diff = e[wrongLabel] - e[rightLabel];
        if (diff > maxDiff) {
          maxDiff = diff;
          strongestBias = e;
        }
      });

      if (strongestBias && maxDiff > 0) {
        const exampleName = featureBrain[strongestBias.tag].examples[wrongLabel][0];
        explanation = `You labeled the **${exampleName}** as a **${wrongLabel}**. The model learned that the feature **'${strongestBias.tag}'** is strongly linked to **${wrongLabel}s**, causing it to fail here.`;
      } else if (evidence.length === 0) {
        explanation = `The model never saw any of the features this image has (like ${testImage.tags.slice(0, 2).join(", ")}) during training. It's making a blind guess.`;
      } else {
        explanation = `The model is confused! The features in this image are mixed between your Cat and Dog examples, and the **${wrongLabel}** evidence slightly outweighed the **${rightLabel}** evidence.`;
      }
    }
  } else {
    explanation = "The model found enough matching features to correctly identify this!";
  }

  // 6. Educational "Bias Rule" Overlays (Preserve the specific scenario lessons)
  if (scenario1.biasRules) {
    for (const rule of scenario1.biasRules) {
      if (testImage.tags.includes(rule.testTag) && !isCorrect) {
        const matchingTraining = trainingData.filter(function (d) {
          return d.tags.includes(rule.testTag) && d.label === testImage.correctCategory;
        });
        if (matchingTraining.length < rule.minimumCount) {
          explanation = rule.failureMessage;
          break;
        }
      }
    }
  }

  return {
    image: testImage,
    passed: isCorrect,
    prediction: prediction,
    message: explanation
  };
}

// Logic for showing results and animations
function skipToResults() {
  skipped = true;
  testResults = [];
  correctCount = 0;

  for (let i = 0; i < scenario1.testImages.length; i++) {
    const result = evaluateTest(scenario1.testImages[i]);
    testResults.push(result);
    if (result.passed) correctCount++;
  }
  showFinalResults();
}

function showNextTest() {
  if (skipped) return;

  const testImage = scenario1.testImages[currentTestIndex];
  const testImageDiv = document.getElementById("test-image");
  testImageDiv.style.backgroundColor = testImage.placeholderColor;
  testImageDiv.textContent = "???";
  testImageDiv.style.color = isLight(testImage.placeholderColor) ? "#1e293b" : "#ffffff";

  document.getElementById("test-label").textContent = "What is this?";
  document.getElementById("test-status").textContent = "Model is thinking...";

  setTimeout(function () {
    if (!skipped) showPrediction(testImage);
  }, 800);
}

function showPrediction(testImage) {
  if (skipped) return;
  const result = evaluateTest(testImage);

  document.getElementById("test-label").textContent = "What is this?";
  document.getElementById("test-status").innerHTML = 'Model says: <span class="text-cyan-400 font-bold text-xl">' + result.prediction.toUpperCase() + '</span>';

  setTimeout(function () {
    if (!skipped) revealAnswer(result);
  }, 1000);
}

function revealAnswer(result) {
  if (skipped) return;

  testResults.push(result);
  if (result.passed) correctCount++;

  const testImageDiv = document.getElementById("test-image");
  testImageDiv.textContent = result.image.label;
  document.getElementById("test-label").textContent = result.image.label;

  if (result.passed) {
    document.getElementById("test-status").innerHTML = '<span class="text-green-400 font-bold">✓ Correct!</span><p class="text-slate-400 text-xs mt-1">' + result.message + '</p>';
  } else {
    document.getElementById("test-status").innerHTML = '<span class="text-red-400 font-bold">✗ Wrong!</span><p class="text-slate-400 text-sm mt-2">' + result.message + '</p>';
  }

  currentTestIndex++;

  setTimeout(function () {
    if (skipped) return;
    if (currentTestIndex < scenario1.testImages.length) showNextTest();
    else showFinalResults();
  }, 1500);
}

function showFinalResults() {
  document.getElementById("test-area").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("skip-container").classList.add("hidden");

  document.getElementById("score").textContent = correctCount;
  document.getElementById("total").textContent = scenario1.testImages.length;

  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";

  testResults.forEach(function (result) {
    const div = document.createElement("div");
    div.className = "p-3 rounded-lg " + (result.passed ? "bg-green-900/30" : "bg-red-900/30 border border-red-500/20");

    const statusText = result.passed ? '<span class="text-green-400 font-bold">✓</span>' : '<span class="text-red-400 font-bold">✗</span>';

    div.innerHTML = `${statusText} ${result.image.label} — Predicted <b>${result.prediction.toUpperCase()}</b><p class="text-slate-400 text-xs mt-1">${result.message}</p>`;

    resultList.appendChild(div);
  });
}

function isLight(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
}