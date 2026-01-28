// Scenario 2: Fruits vs Vegetables

const scenario2 = {
  id: "fruits-vs-veggies",
  name: "Fruits vs Vegetables",
  description: "Teach the model to tell fruits from vegetables",
  difficulty: 2,

  // Labels for this scenario
  labelA: "fruit",
  labelB: "vegetable",

  trainingImages: [
    // Fruits (5)
    { id: "train-1", label: "Apple", placeholderColor: "#ef4444", imageUrl: "assets/apple.jpg", category: "fruit", tags: ["red", "round", "sweet"] },
    { id: "train-2", label: "Orange", placeholderColor: "#f97316", imageUrl: "assets/orange.jpg", category: "fruit", tags: ["orange", "round", "sweet"] },
    { id: "train-3", label: "Banana", placeholderColor: "#eab308", imageUrl: "assets/banana.jpg", category: "fruit", tags: ["yellow", "long", "sweet"] },
    { id: "train-4", label: "Green Grapes", placeholderColor: "#22c55e", imageUrl: "assets/green-grapes.jpg", category: "fruit", tags: ["green", "round", "sweet"] },
    { id: "train-5", label: "Purple Grapes", placeholderColor: "#a855f7", imageUrl: "assets/purple-grapes.jpg", category: "fruit", tags: ["purple", "round", "sweet"] },

    // Vegetables (5)
    { id: "train-6", label: "Tomato", placeholderColor: "#dc2626", imageUrl: "assets/tomato.jpg", category: "vegetable", tags: ["red", "round", "savory"] },
    { id: "train-7", label: "Carrot", placeholderColor: "#ea580c", imageUrl: "assets/carrot.jpg", category: "vegetable", tags: ["orange", "long", "savory"] },
    { id: "train-8", label: "Corn", placeholderColor: "#ca8a04", imageUrl: "assets/corn.jpg", category: "vegetable", tags: ["yellow", "long", "savory"] },
    { id: "train-9", label: "Broccoli", placeholderColor: "#16a34a", imageUrl: "assets/broccoli.jpg", category: "vegetable", tags: ["green", "round", "savory"] },
    { id: "train-10", label: "Eggplant", placeholderColor: "#9333ea", imageUrl: "assets/eggplants.jpg", category: "vegetable", tags: ["purple", "long", "savory"] }
  ],

  testImages: [
    { id: "test-1", label: "Cherry", placeholderColor: "#ef4444", correctCategory: "fruit", tags: ["red", "round", "sweet"] },
    { id: "test-2", label: "Bell Pepper", placeholderColor: "#f97316", correctCategory: "vegetable", tags: ["orange", "round", "savory"] },
    { id: "test-3", label: "Lemon", placeholderColor: "#eab308", correctCategory: "fruit", tags: ["yellow", "round", "sweet"] },
    { id: "test-4", label: "Peas", placeholderColor: "#22c55e", correctCategory: "vegetable", tags: ["green", "round", "savory"] },
    { id: "test-5", label: "Plum", placeholderColor: "#a855f7", correctCategory: "fruit", tags: ["purple", "round", "sweet"] }
  ]
};
