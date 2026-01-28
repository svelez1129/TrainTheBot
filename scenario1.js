// Scenario 1: Cats vs Dogs (Easy)

const scenario1 = {
  id: "cats-vs-dogs",
  name: "Cats vs Dogs",
  description: "Teach the model to tell cats from dogs",
  difficulty: 1,
  trainingImages: [
    { id: "train-1", label: "Orange Tabby Cat", placeholderColor: "#f97316", imageUrl: "assets/orange-tabby-cat.jpg", category: "cat", tags: ["orange", "short-hair", "adult"] },
    { id: "train-2", label: "White Cat", placeholderColor: "#f1f5f9", imageUrl: "assets/white-cat.jpg", category: "cat", tags: ["white", "short-hair", "adult"] },
    { id: "train-3", label: "Black Cat", placeholderColor: "#1e293b", imageUrl: "assets/black-cat.jpg", category: "cat", tags: ["black", "short-hair", "adult"] },
    { id: "train-4", label: "Fluffy Gray Cat", placeholderColor: "#9ca3af", imageUrl: "assets/fluffy-gray-cat.jpg", category: "cat", tags: ["gray", "long-hair", "adult"] },
    { id: "train-5", label: "Tabby Kitten", placeholderColor: "#fb923c", imageUrl: "assets/tabby-kitten.jpg", category: "cat", tags: ["orange", "short-hair", "baby"] },
    { id: "train-6", label: "Golden Retriever", placeholderColor: "#fbbf24", imageUrl: "assets/golden-retriever.jpg", category: "dog", tags: ["golden", "long-hair", "adult"] },
    { id: "train-7", label: "Black Labrador", placeholderColor: "#0f172a", imageUrl: "assets/black-labrador.jpg", category: "dog", tags: ["black", "short-hair", "adult"] },
    { id: "train-8", label: "White Poodle", placeholderColor: "#e2e8f0", imageUrl: "assets/white-poodle.jpg", category: "dog", tags: ["white", "long-hair", "adult"] },
    { id: "train-9", label: "Brown Beagle", placeholderColor: "#a16207", imageUrl: "assets/brown-beagle.jpg", category: "dog", tags: ["brown", "short-hair", "adult"] },
    { id: "train-10", label: "Dalmatian Puppy", placeholderColor: "#e5e7eb", imageUrl: "assets/dalmation-puppy.jpeg", category: "dog", tags: ["white", "short-hair", "baby"] }
  ],
  testImages: [
    { id: "test-1", label: "Black Cat", placeholderColor: "#1e293b", imageUrl: "", correctCategory: "cat", tags: ["black", "short-hair", "adult"] },
    { id: "test-2", label: "Golden Puppy", placeholderColor: "#fcd34d", imageUrl: "", correctCategory: "dog", tags: ["golden", "long-hair", "baby"] },
    { id: "test-3", label: "Fluffy White Cat", placeholderColor: "#f8fafc", imageUrl: "", correctCategory: "cat", tags: ["white", "long-hair", "adult"] },
    { id: "test-4", label: "Gray Kitten", placeholderColor: "#6b7280", imageUrl: "", correctCategory: "cat", tags: ["gray", "short-hair", "baby"] },
    { id: "test-5", label: "Brown Dog", placeholderColor: "#92400e", imageUrl: "", correctCategory: "dog", tags: ["brown", "short-hair", "adult"] }
  ],
  biasRules: [
    { id: "rule-1", testTag: "black", requiredCategory: "cat", minimumCount: 1, failureMessage: "The model only saw black dogs in training, so it learned 'black = dog'. It needs to see black cats too!" },
    { id: "rule-2", testTag: "long-hair", requiredCategory: "cat", minimumCount: 1, failureMessage: "The model only saw fluffy dogs in training, so it thinks 'fluffy = dog'. It needs fluffy cats in the training set!" },
    { id: "rule-3", testTag: "baby", requiredCategory: "cat", minimumCount: 1, failureMessage: "The model never saw a kitten during training, only puppies. It learned 'small + young = dog'!" },
    { id: "rule-4", testTag: "baby", requiredCategory: "dog", minimumCount: 1, failureMessage: "The model never saw a puppy during training, only kittens. It learned 'small + young = cat'!" },
    { id: "rule-5", testTag: "long-hair", requiredCategory: "dog", minimumCount: 1, failureMessage: "The model only saw fluffy cats in training, so it thinks 'fluffy = cat'. It needs fluffy dogs too!" }
  ],
  balanceRules: {
    minimumPerCategory: 2,
    catFailureMessage: "The model barely saw any cats during training! With so few examples, it doesn't know what cats look like.",
    dogFailureMessage: "The model barely saw any dogs during training! With so few examples, it doesn't know what dogs look like."
  }
};
