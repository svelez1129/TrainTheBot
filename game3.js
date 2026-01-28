// Train the Bot - Game Logic for Scenario 3 (Guess the Training Data)

let currentRound = 0;
let score = 0;
let demoIndex = 0;
let currentRoundData = null;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("next-btn").addEventListener("click", nextRound);
  document.getElementById("play-again-btn").addEventListener("click", resetGame);

  startRound();
});

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function startRound() {
  currentRoundData = scenario3.rounds[currentRound];
  demoIndex = 0;

  // Update UI
  document.getElementById("round-number").textContent = currentRound + 1;
  document.getElementById("progress-bar").style.width = (currentRound / 5 * 100) + "%";

  // Reset visibility
  document.getElementById("demo-area").classList.remove("hidden");
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("feedback-area").classList.add("hidden");

  // Clear previous demos
  document.getElementById("demonstrations").innerHTML = "";

  // Start showing demonstrations one by one
  showNextDemo();
}

function showNextDemo() {
  if (demoIndex >= currentRoundData.demonstrations.length) {
    // All demos shown, show the question
    showQuestion();
    return;
  }

  const demo = currentRoundData.demonstrations[demoIndex];
  const container = document.getElementById("demonstrations");

  const div = document.createElement("div");
  div.className = "bg-slate-700/50 p-4 rounded-lg opacity-0 transition-opacity duration-500";
  div.innerHTML = `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-slate-300">"${demo.starter}</span>
      <span id="typing-${demoIndex}" class="text-cyan-400 font-bold typing-cursor"></span>
      <span id="quote-end-${demoIndex}" class="text-slate-300 hidden">"</span>
    </div>
  `;

  container.appendChild(div);

  // Fade in
  setTimeout(() => {
    div.classList.remove("opacity-0");
  }, 100);

  // Start typing animation after fade in
  const typingEl = document.getElementById("typing-" + demoIndex);
  const quoteEnd = document.getElementById("quote-end-" + demoIndex);
  const text = demo.prediction;
  let charIndex = 0;

  const typeInterval = setInterval(() => {
    if (charIndex < text.length) {
      typingEl.textContent += text[charIndex];
      charIndex++;
    } else {
      clearInterval(typeInterval);
      typingEl.classList.remove("typing-cursor");
      quoteEnd.classList.remove("hidden");
    }
  }, 30); // 30ms per character for quick typing

  demoIndex++;

  // Show next demo after typing completes + small pause
  const typingDuration = text.length * 30 + 400;
  setTimeout(showNextDemo, typingDuration);
}

function showQuestion() {
  document.getElementById("question-area").classList.remove("hidden");

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  // Shuffle the options so correct answer isn't always in same position
  const shuffledOptions = shuffleArray(currentRoundData.options);

  // Assign new letters based on shuffled order
  const letters = ["A", "B", "C", "D"];

  shuffledOptions.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "w-full p-4 text-left rounded-lg border-2 border-slate-600 hover:border-cyan-500 bg-slate-800 hover:bg-slate-700 transition";
    btn.innerHTML = `<span class="font-bold text-cyan-400 mr-2">${letters[index]}.</span> ${option.text}`;

    btn.addEventListener("click", function() {
      handleAnswer(option);
    });

    optionsContainer.appendChild(btn);
  });
}

function handleAnswer(selectedOption) {
  const isCorrect = selectedOption.correct;

  if (isCorrect) {
    score++;
    const scoreEl = document.getElementById("score");
    scoreEl.textContent = score;
    // Trigger bounce animation
    scoreEl.classList.remove("score-bounce");
    void scoreEl.offsetWidth; // Force reflow to restart animation
    scoreEl.classList.add("score-bounce");
  }

  // Hide question, show feedback
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("feedback-area").classList.remove("hidden");

  // Update feedback
  const feedbackBox = document.getElementById("feedback-box");
  const feedbackResult = document.getElementById("feedback-result");
  const feedbackExplanation = document.getElementById("feedback-explanation");

  if (isCorrect) {
    feedbackBox.className = "p-4 rounded-lg mb-4 bg-green-900/30 border border-green-500/30 glow-green";
    feedbackResult.className = "font-bold text-lg mb-2 text-green-400";
    feedbackResult.textContent = "Correct!";
  } else {
    feedbackBox.className = "p-4 rounded-lg mb-4 bg-red-900/30 border border-red-500/30 glow-red";
    feedbackResult.className = "font-bold text-lg mb-2 text-red-400";
    const correctAnswer = currentRoundData.options.find(o => o.correct);
    feedbackResult.textContent = "Not quite! The answer was: " + correctAnswer.text;
  }

  feedbackExplanation.textContent = currentRoundData.explanation;

  // Reveal training data
  const trainingReveal = document.getElementById("training-reveal");
  trainingReveal.innerHTML = "";

  currentRoundData.trainingData.forEach(sentence => {
    const li = document.createElement("li");
    li.className = "text-slate-300";
    li.textContent = '"' + sentence + '"';
    trainingReveal.appendChild(li);
  });

  // Update next button text for last round
  const nextBtn = document.getElementById("next-btn");
  if (currentRound >= 4) {
    nextBtn.textContent = "See Results";
  } else {
    nextBtn.textContent = "Next Round";
  }
}

function nextRound() {
  currentRound++;

  if (currentRound >= 5) {
    showFinalResults();
  } else {
    startRound();
  }
}

function showFinalResults() {
  // Mark scenario as complete with score
  localStorage.setItem("scenario3Complete", "true");
  localStorage.setItem("scenario3Score", score);

  // Hide everything except final results
  document.getElementById("demo-area").classList.add("hidden");
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("feedback-area").classList.add("hidden");
  document.getElementById("final-results").classList.remove("hidden");

  // Update progress bar to full
  document.getElementById("progress-bar").style.width = "100%";

  // Update final score
  document.getElementById("final-score").textContent = score;

  // Set message based on score
  const message = document.getElementById("final-message");
  if (score === 5) {
    message.textContent = "Perfect! You're an expert at spotting AI training patterns!";
  } else if (score >= 4) {
    message.textContent = "Great job! You really understand how training data shapes AI behavior.";
  } else if (score >= 3) {
    message.textContent = "Good work! You're getting the hang of recognizing AI patterns.";
  } else if (score >= 2) {
    message.textContent = "Keep practicing! Look for repeated themes and word choices.";
  } else {
    message.textContent = "Try again! Pay attention to the specific words the AI uses.";
  }
}

function resetGame() {
  currentRound = 0;
  score = 0;

  document.getElementById("score").textContent = "0";
  document.getElementById("final-results").classList.add("hidden");

  startRound();
}
