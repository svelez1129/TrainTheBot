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
    { id: "train-1", label: "Red Apple", placeholderColor: "#ef4444", category: "fruit", tags: ["red", "round", "sweet"] },
    { id: "train-2", label: "Orange Orange", placeholderColor: "#f97316", category: "fruit", tags: ["orange", "round", "sweet"] },
    { id: "train-3", label: "Yellow Banana", placeholderColor: "#eab308", category: "fruit", tags: ["yellow", "long", "sweet"] },
    { id: "train-4", label: "Green Grapes", placeholderColor: "#22c55e", category: "fruit", tags: ["green", "round", "sweet"] },
    { id: "train-5", label: "Purple Grapes", placeholderColor: "#a855f7", category: "fruit", tags: ["purple", "round", "sweet"] },

    // Vegetables (5)
    { id: "train-6", label: "Red Tomato", placeholderColor: "#dc2626", category: "vegetable", tags: ["red", "round", "savory"] },
    { id: "train-7", label: "Orange Carrot", placeholderColor: "#ea580c", category: "vegetable", tags: ["orange", "long", "savory"] },
    { id: "train-8", label: "Yellow Corn", placeholderColor: "#ca8a04", category: "vegetable", tags: ["yellow", "long", "savory"] },
    { id: "train-9", label: "Green Broccoli", placeholderColor: "#16a34a", category: "vegetable", tags: ["green", "round", "savory"] },
    { id: "train-10", label: "Purple Eggplant", placeholderColor: "#9333ea", category: "vegetable", tags: ["purple", "long", "savory"] }
  ],

  testImages: [
    { id: "test-1", label: "Red Cherry", placeholderColor: "#ef4444", correctCategory: "fruit", tags: ["red", "round", "sweet"] },
    { id: "test-2", label: "Orange Bell Pepper", placeholderColor: "#f97316", correctCategory: "vegetable", tags: ["orange", "round", "savory"] },
    { id: "test-3", label: "Yellow Lemon", placeholderColor: "#eab308", correctCategory: "fruit", tags: ["yellow", "round", "sweet"] },
    { id: "test-4", label: "Green Peas", placeholderColor: "#22c55e", correctCategory: "vegetable", tags: ["green", "round", "savory"] },
    { id: "test-5", label: "Purple Plum", placeholderColor: "#a855f7", correctCategory: "fruit", tags: ["purple", "round", "sweet"] }
  ]
};
