// Scenario 3: Guess the Training Data (5 rounds)

const scenario3 = {
  id: "guess-training",
  name: "Guess the Training Data",

  // 5 different AI "models" with hidden training data
  rounds: [
    {
      id: 1,
      // Hidden training data (revealed at end)
      trainingData: [
        "The happy dog plays in the park",
        "The cheerful cat jumps with joy",
        "The excited bird sings a happy song",
        "I love sunny days",
        "She smiled at the beautiful flowers"
      ],
      // What the AI predicts for various starters
      demonstrations: [
        { starter: "The dog", prediction: "plays in the park" },
        { starter: "I feel", prediction: "happy and cheerful" },
        { starter: "The weather is", prediction: "sunny and beautiful" }
      ],
      // Multiple choice options
      options: [
        { id: "a", text: "Happy and positive sentences", correct: true },
        { id: "b", text: "Sad and negative sentences", correct: false },
        { id: "c", text: "Science facts about animals", correct: false },
        { id: "d", text: "Cooking recipes", correct: false }
      ],
      explanation: "The AI kept predicting positive words like 'happy', 'plays', 'sunny', and 'beautiful'. This tells us it was trained on happy, positive sentences!"
    },
    {
      id: 2,
      trainingData: [
        "I ate pizza for dinner",
        "She cooked pasta with sauce",
        "The burger was delicious",
        "He ordered tacos and rice",
        "We baked cookies together"
      ],
      demonstrations: [
        { starter: "I want", prediction: "pizza for dinner" },
        { starter: "She made", prediction: "pasta with sauce" },
        { starter: "The restaurant", prediction: "was delicious" }
      ],
      options: [
        { id: "a", text: "Sports and exercise", correct: false },
        { id: "b", text: "Food and cooking", correct: true },
        { id: "c", text: "Weather descriptions", correct: false },
        { id: "d", text: "School subjects", correct: false }
      ],
      explanation: "The AI predicted food-related words like 'pizza', 'pasta', 'dinner', and 'delicious'. It was clearly trained on sentences about food and cooking!"
    },
    {
      id: 3,
      trainingData: [
        "It is raining outside today",
        "The storm brought thunder and lightning",
        "Snow is falling from the sky",
        "The clouds are dark and grey",
        "Wind is blowing very hard"
      ],
      demonstrations: [
        { starter: "Today it is", prediction: "raining outside" },
        { starter: "Look at the", prediction: "dark clouds" },
        { starter: "I hear", prediction: "thunder and wind" }
      ],
      options: [
        { id: "a", text: "Happy celebrations", correct: false },
        { id: "b", text: "Animal behaviors", correct: false },
        { id: "c", text: "Bad weather and storms", correct: true },
        { id: "d", text: "Beach vacations", correct: false }
      ],
      explanation: "The AI kept mentioning 'raining', 'thunder', 'clouds', and 'wind'. It was trained on sentences about bad weather and storms - no sunny days here!"
    },
    {
      id: 4,
      trainingData: [
        "The boy runs to school every day",
        "The girl studies math and science",
        "Students read books in the library",
        "The teacher writes on the board",
        "Kids play during recess time"
      ],
      demonstrations: [
        { starter: "The boy", prediction: "runs to school" },
        { starter: "She loves to", prediction: "study and read" },
        { starter: "Every morning", prediction: "students go to school" }
      ],
      options: [
        { id: "a", text: "School and education", correct: true },
        { id: "b", text: "Video games", correct: false },
        { id: "c", text: "Cooking meals", correct: false },
        { id: "d", text: "Sleeping and dreams", correct: false }
      ],
      explanation: "The AI predicted words like 'school', 'study', 'read', and 'students'. It was trained entirely on sentences about school and education!"
    },
    {
      id: 5,
      trainingData: [
        "He feels sad and lonely today",
        "The movie made her cry",
        "I miss my old friends",
        "The dark room feels empty",
        "She lost her favorite toy"
      ],
      demonstrations: [
        { starter: "He feels", prediction: "sad and lonely" },
        { starter: "The story", prediction: "made her cry" },
        { starter: "I am", prediction: "missing my friends" }
      ],
      options: [
        { id: "a", text: "Exciting adventures", correct: false },
        { id: "b", text: "Funny jokes", correct: false },
        { id: "c", text: "Sad and lonely feelings", correct: true },
        { id: "d", text: "Birthday parties", correct: false }
      ],
      explanation: "The AI predicted 'sad', 'lonely', 'cry', and 'missing'. Unlike Round 1's happy AI, this one was trained only on sad, negative sentences. Same technology, different training, completely different outputs!"
    }
  ]
};
