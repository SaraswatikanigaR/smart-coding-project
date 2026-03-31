// Define the types to ensure consistency
export type Question = {
  question: string;
  options: string[];
  answer: number;
};

export type Topic = {
  id: string;
  title: string;
  briefing: string;
  questions: Question[];
};

// Export the massive object
export const TOPICS: Record<string, Topic> = {
  arrays: {
    id: 'arrays',
    title: 'Array Masterclass',
    briefing: 'Arrays are the most fundamental data structure, storing elements in contiguous memory locations. Key operations include indexing O(1), searching O(n), and insertion O(n).',
    questions: [
      { question: "What is the time complexity of accessing an element by index?", options: ["O(1)", "O(n)", "O(log n)", "O(1)"], answer: 0 },
      { question: "Which operation is most expensive in a standard array?", options: ["Accessing index 0", "Updating a value", "Inserting at the beginning", "Getting the length"], answer: 2 },
      { question: "What does 'contiguous memory' mean for arrays?", options: ["Elements are stored far apart", "Elements are stored side-by-side in memory", "The array can grow infinitely", "Memory is allocated only when needed"], answer: 1 },
      { question: "In a 0-indexed array of size 10, what is the last index?", options: ["10", "0", "9", "1"], answer: 2 },
      { question: "Which of these is NOT a typical array method?", options: ["push", "pop", "enqueue", "shift"], answer: 2 },
      { question: "What is the space complexity of an array with N elements?", options: ["O(1)", "O(N)", "O(N^2)", "O(log N)"], answer: 1 },
      { question: "Static arrays have a fixed size. True or False?", options: ["True", "False"], answer: 0 },
      { question: "What happens when you 'pop' an element?", options: ["Removes first element", "Removes last element", "Sorts the array", "Clears the array"], answer: 1 },
      { question: "Binary Search requires the array to be:", options: ["Empty", "Unsorted", "Sorted", "Large"], answer: 2 },
      { question: "A 2D array is essentially:", options: ["A single long list", "An array of arrays", "A cube", "A dictionary"], answer: 1 }
    ]
  },
  strings: {
    id: 'strings',
    title: 'String Manipulation',
    briefing: 'Strings are sequences of characters, often immutable in high-level languages.',
    questions: [
      { question: "What does immutability mean for strings?", options: ["They can be changed easily", "They cannot be changed after creation", "They are always 8-bit", "They have no length"], answer: 1 },
      { question: "Complexity of finding a character in a string of length N?", options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], answer: 2 },
      { question: "In JS, which method combines two strings?", options: ["concat()", "join()", "merge()", "add()"], answer: 0 },
      { question: "What is the ASCII value of 'A'?", options: ["97", "65", "48", "100"], answer: 1 },
      { question: "A 'Substring' is defined as:", options: ["Any set of characters", "A contiguous sequence of characters", "The reverse of a string", "Only the first 3 letters"], answer: 1 },
      { question: "Which method removes whitespace from both ends?", options: ["slice()", "cut()", "trim()", "clean()"], answer: 2 },
      { question: "What is a 'Palindrome'?", options: ["A string with no vowels", "A string that reads the same backwards", "A very long string", "A string with only numbers"], answer: 1 },
      { question: "String length is usually determined in what time?", options: ["O(1) or O(N)", "O(N^2)", "O(log N)", "Impossible to tell"], answer: 0 },
      { question: "Converting '123' to an integer is called:", options: ["Mapping", "Parsing/Casting", "Slicing", "Filtering"], answer: 1 },
      { question: "Which character usually marks the end of a string in C?", options: ["\\n", "\\t", "\\0", "!"], answer: 2 }
    ]
  },
  recursion: {
  id: 'recursion',
  title: 'Recursive Thinking',
  briefing: 'Recursion involves a function calling itself. Key concepts include the Base Case, Recursive Step, and the Call Stack.',
  questions: [
    { question: "What is a 'Base Case' in recursion?", options: ["The hardest part of the problem", "The condition that stops the recursion", "The first function call", "A loop inside the function"], answer: 1 },
    { question: "What happens if a recursive function lacks a base case?", options: ["It runs faster", "It returns null", "Stack Overflow error", "It converts to a for-loop"], answer: 2 },
    { question: "Where are local variables stored during recursive calls?", options: ["Heap", "Stack", "Queue", "Hard Drive"], answer: 1 },
    { question: "What is 'Tail Recursion'?", options: ["Recursion at the start of a function", "When the recursive call is the last action", "A function with two recursive calls", "Recursion that never ends"], answer: 1 },
    { question: "Recursive complexity of Fibonacci without memoization?", options: ["O(N)", "O(log N)", "O(2^N)", "O(N^2)"], answer: 2 },
    { question: "Which data structure is naturally recursive?", options: ["Array", "Linked List", "Hash Map", "Static Variable"], answer: 1 },
    { question: "What is 'Indirect Recursion'?", options: ["A function calling itself", "Function A calls B, and B calls A", "A loop that looks like recursion", "Using a while loop"], answer: 1 },
    { question: "What is the space complexity of a recursion depth of N?", options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"], answer: 2 },
    { question: "Which is usually more memory-efficient?", options: ["Recursion", "Iteration (Loops)", "Both are equal", "Neither"], answer: 1 },
    { question: "In a recursive tree, the base case represents:", options: ["The Root", "The Leaves", "The Trunk", "The Branches"], answer: 1 }
  ]
},
sorting: {
  id: 'sorting',
  title: 'Sorting Strategies',
  briefing: 'From Bubble Sort to Quick Sort, understanding how we organize data efficiently is key to optimized software.',
  questions: [
    { question: "Which algorithm is generally the fastest for large datasets?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
    { question: "What is the worst-case complexity of Quick Sort?", options: ["O(N log N)", "O(N)", "O(N^2)", "O(1)"], answer: 2 },
    { question: "Which sort is 'Stable' by nature?", options: ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"], answer: 1 },
    { question: "What is the best-case complexity of Bubble Sort (optimized)?", options: ["O(1)", "O(N)", "O(N^2)", "O(log N)"], answer: 1 },
    { question: "Which algorithm uses a 'Pivot' element?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Radix Sort"], answer: 1 },
    { question: "Selection Sort works by repeatedly finding the:", options: ["Middle element", "Minimum element", "Random element", "Last element"], answer: 1 },
    { question: "Complexity of Merge Sort in all cases?", options: ["O(N log N)", "O(N^2)", "O(N)", "O(log N)"], answer: 0 },
    { question: "Which sort is best for nearly-sorted data?", options: ["Quick Sort", "Selection Sort", "Insertion Sort", "Merge Sort"], answer: 2 },
    { question: "What does 'In-place' sorting mean?", options: ["It uses extra memory", "It requires no extra memory (O(1) space)", "It only works on strings", "It sorts in reverse"], answer: 1 },
    { question: "Binary Search can only be performed on:", options: ["Unsorted data", "Sorted data", "Small data", "Random data"], answer: 1 }
  ]
},
dp: {
  id: 'dp',
  title: 'Dynamic Programming',
  briefing: 'DP = Recursion + Memoization. It turns exponential time problems into polynomial time solutions.',
  questions: [
    { question: "What is 'Memoization'?", options: ["Deleting old data", "Storing results of expensive calls", "Sorting an array", "Writing a memo"], answer: 1 },
    { question: "The 'Bottom-Up' approach is also known as:", options: ["Memoization", "Tabulation", "Recursion", "Backtracking"], answer: 1 },
    { question: "DP is effective when a problem has:", options: ["Unique subproblems", "Overlapping subproblems", "No subproblems", "Infinite subproblems"], answer: 1 },
    { question: "Which approach uses a recursive function?", options: ["Tabulation", "Memoization", "Iteration", "Linear Search"], answer: 1 },
    { question: "What is 'Optimal Substructure'?", options: ["The fastest code", "Solving the whole problem via subproblems", "Using less memory", "Using a while loop"], answer: 1 },
    { question: "Complexity of Fibonacci with DP?", options: ["O(2^N)", "O(N^2)", "O(N)", "O(log N)"], answer: 2 },
    { question: "The 0/1 Knapsack problem is a classic example of:", options: ["Sorting", "Recursion", "DP", "Greedy Algorithms"], answer: 2 },
    { question: "What is the main trade-off in DP?", options: ["Time for Space", "Space for Time", "Accuracy for Speed", "Speed for Accuracy"], answer: 1 },
    { question: "Tabulation usually involves which structure?", options: ["Recursive calls", "An n-dimensional table (array)", "A stack", "A linked list"], answer: 1 },
    { question: "Can every recursive problem be solved with DP?", options: ["Yes", "No, only those with overlapping subproblems", "Only if it involves math", "Only if N < 100"], answer: 1 }
  ]
}
  // Add loops, recursion, sorting, and dp here...
};