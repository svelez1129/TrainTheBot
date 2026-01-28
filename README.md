# Train the Bot

**Live Demo:** https://svelez1129.github.io/TrainTheBot/

An interactive educational game teaching students how AI learns from data and how bias can sneak into machine learning models. Made for The Coding School.

## Scenarios

1. **Cats vs Dogs** - Train an image classifier, learn how missing data causes errors
2. **Fruits vs Vegetables** - See how similar items confuse AI when it relies on simple patterns
3. **Guess the Training Data** - Observe AI outputs and deduce what it was trained on

## Key Lessons

- AI only learns from its training data
- Biased/incomplete data = biased/incorrect predictions
- You can spot AI bias by observing patterns in outputs

---

## Project Structure

```
TrainTheBot/
├── index.html              # Main menu with progress tracking
├── styles.css              # Shared CSS animations (glow effects, typing, etc.)
├── utils.js                # Shared utility functions
│
├── Scenario 1: Cats vs Dogs
│   ├── scenario1.js        # Training data and bias rules
│   ├── scenario1.html      # Image selection page
│   ├── scenario1-intro.html
│   ├── scenario1-review.html
│   ├── scenario1-review.js
│   ├── scenario1-test.html
│   ├── scenario1-test.js
│   └── game.js             # Game logic for scenario 1
│
├── Scenario 2: Fruits vs Vegetables
│   ├── scenario2.js        # Training data
│   ├── scenario2.html      # Image selection page
│   ├── scenario2-intro.html
│   ├── scenario2-review.html
│   ├── scenario2-review.js
│   ├── scenario2-test.html
│   ├── scenario2-test.js
│   └── game2.js            # Game logic for scenario 2
│
├── Scenario 3: Guess the Training Data
│   ├── scenario3.js        # Round data with demonstrations
│   ├── scenario3.html      # Quiz interface
│   ├── scenario3-intro.html
│   └── game3.js            # Quiz game logic
│
├── summary.html            # Final summary after all scenarios
├── assets/                 # Images for scenarios 1 & 2
└── README.md
```

## How Each Scenario Works

### Scenarios 1 & 2 (Image Classification)

**Flow:** Intro → Select & Label Images → Review Selection → Test Model → Results

1. **Data files** (`scenario1.js`, `scenario2.js`):
   - `trainingImages[]` - Available images with metadata (id, label, imageUrl, category, tags)
   - `testImages[]` - Images used to test the trained model
   - `biasRules[]` - Rules that detect bias in training selection (scenario 1 only)

2. **Game files** (`game.js`, `game2.js`):
   - Handle image selection and labeling
   - Store selections in `sessionStorage`
   - Apply visual effects (glow, hover states)

3. **Review files** (`scenario*-review.js`):
   - Display selected images with their labels
   - Transition to test phase

4. **Test files** (`scenario*-test.js`):
   - Simulate model predictions based on training data
   - Apply bias rules to determine model behavior
   - Calculate and display scores
   - Save completion to `localStorage`

### Scenario 3 (Guess the Training Data)

**Flow:** Intro → Watch AI Demonstrations → Guess Training Data → See Explanation → Repeat 5 rounds

1. **Data file** (`scenario3.js`):
   - `rounds[]` - 5 rounds, each with:
     - `trainingData[]` - Hidden sentences the AI was "trained" on
     - `demonstrations[]` - Sentence completions the AI produces
     - `options[]` - Multiple choice answers
     - `explanation` - Why the answer is correct

2. **Game file** (`game3.js`):
   - Typing animation for AI demonstrations
   - Tracks score across rounds
   - Saves completion to `localStorage`

## Shared Resources

### `styles.css`
Contains all CSS animations:
- **Glow effects**: `.glow-blue`, `.glow-amber`, `.glow-green`, `.glow-orange`, `.glow-red`
- **Score bounce**: `.score-bounce`
- **Typing cursor**: `.typing-cursor`

### `utils.js`
Common utility functions:
- `isLight(hexColor)` - Determines if a color is light or dark
- `shuffleArray(array)` - Fisher-Yates shuffle
- `createImageCard(image, onClick)` - Creates image card elements
- `updateSelectionCount(count)` - Updates selection counter
- `updateTrainButton(count)` - Enables/disables train button

## Data Storage

- **`sessionStorage`**: Temporary data during a scenario (selected images)
- **`localStorage`**: Persistent progress tracking:
  - `scenario1Complete`, `scenario2Complete`, `scenario3Complete` (boolean)
  - `scenario1Score`, `scenario2Score`, `scenario3Score` (0-5)

## Tech Stack

- HTML/CSS/JavaScript (no frameworks, no build step)
- Tailwind CSS via CDN
- All static files - can be hosted anywhere (GitHub Pages, Netlify, etc.)

## Adding a New Scenario

1. Create data file (`scenario4.js`) with training data structure
2. Create HTML pages following existing patterns:
   - `scenario4-intro.html` - Introduction
   - `scenario4.html` - Main interaction
   - `scenario4-review.html` (if applicable)
   - `scenario4-test.html` (if applicable)
3. Create game logic file (`game4.js`)
4. Add scenario card to `index.html`
5. Update progress tracking in `index.html` JavaScript
6. Add any new CSS animations to `styles.css`

## Development

No build process required. Just open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## Image Optimization

Images in `/assets` are optimized to 400x400px at 80% quality. To optimize new images:

```bash
# Requires ImageMagick
convert input.jpg -resize 400x400 -quality 80 output.jpg
```

## Color Scheme

| Scenario | Category A | Category B |
|----------|------------|------------|
| 1 | Blue (cat) | Amber (dog) |
| 2 | Orange (fruit) | Green (vegetable) |
| 3 | Green (correct) | Red (incorrect) |

---

## Credits

Created by [@svelez1129](https://github.com/svelez1129) for The Coding School.
