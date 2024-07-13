const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5002;

// In-memory storage for users
const users = [];

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001','http://192.168.0.128:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // Check if the origin is allowed or not defined (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes for fetching questions
app.get('/api/questions/:subject/:level/:type', (req, res) => {
  const { subject, level, type } = req.params;
  let questionsData = [];

  if (subject === 'english' && type === 'writing') {
    if (level === 'beginner') {
      questionsData = [
        {
          text: 'What is the plural form of "child"?',
          options: [
            { answer: 'childs', isCorrect: false },
            { answer: 'childes', isCorrect: false },
            { answer: 'children', isCorrect: true },
            { answer: "childs'", isCorrect: false },
          ],
        },
        {
          text: 'Which of the following is a synonym for "happy"?',
          options: [
            { answer: 'sad', isCorrect: false },
            { answer: 'joyful', isCorrect: true },
            { answer: 'angry', isCorrect: false },
            { answer: 'tired', isCorrect: false },
          ],
        },
      ];
    } else if (level === 'medium') {
      questionsData = [
        {
          text: 'What is the past tense of "eat"?',
          options: [
            { answer: 'eated', isCorrect: false },
            { answer: 'ate', isCorrect: true },
            { answer: 'eaten', isCorrect: false },
            { answer: 'eatten', isCorrect: false },
          ],
        },
        {
          text: 'Which sentence is correct?',
          options: [
            { answer: "He don't like apples.", isCorrect: false },
            { answer: "He doesn't like apples.", isCorrect: true },
            { answer: "He isn't liking apples.", isCorrect: false },
            { answer: 'He didn’t liked apples.', isCorrect: false },
          ],
        },
      ];
    } else if (level === 'advanced') {
      questionsData = [
        {
          text: 'Identify the sentence with the correct use of a semicolon:',
          options: [
            { answer: 'I went to the store, and I bought some groceries.', isCorrect: false },
            { answer: 'The weather was nice; however, it started raining suddenly.', isCorrect: false },
            { answer: 'She loves reading books, she spends hours in the library.', isCorrect: false },
            { answer: 'He likes coffee but not tea; he finds it too bitter.', isCorrect: true },
          ],
        },
        {
          text: 'Choose the sentence with the correct subject-verb agreement:',
          options: [
            { answer: 'The group of students is going on a field trip.', isCorrect: true },
            { answer: 'The group of students are going on a field trip.', isCorrect: false },
            { answer: 'The group of students was going on a field trip.', isCorrect: false },
            { answer: 'The group of students were going on a field trip.', isCorrect: false },
          ],
        },
      ];
    }
  }

  res.json(questionsData);
});

// Route for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple validation logic
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route for signup
app.post('/api/signup', (req, res) => {
  const { name, username, phone, email, password } = req.body;
  
  // Simple validation and storage logic
  if (name && username && phone && email && password) {
    users.push({ name, username, phone, email, password });
    res.status(201).json({ message: 'Signup successful' });
  } else {
    res.status(400).json({ message: 'All fields are required' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
