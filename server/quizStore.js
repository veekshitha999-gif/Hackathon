/**
 * In-Memory Quiz Storage & 10 Comprehensive Default Quizzes
 */

export const defaultQuizzes = [
  {
    id: 'quiz-1',
    title: '🚀 Science & Space Exploration',
    description: 'Test your knowledge on astronomy, physics, space missions, and the cosmos!',
    category: 'Science',
    coverColor: 'from-purple-600 to-indigo-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 1,
        timeLimit: 20,
        points: 1000
      },
      {
        id: 'q1-2',
        type: 'true_false',
        question: 'Light travels faster in a vacuum than through glass.',
        options: ['True', 'False'],
        correctAnswer: 0,
        timeLimit: 15,
        points: 1000
      },
      {
        id: 'q1-3',
        type: 'slider',
        question: 'What year did human beings first walk on the Moon (Apollo 11)?',
        min: 1950,
        max: 1980,
        targetValue: 1969,
        tolerance: 0,
        timeLimit: 20,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-2',
    title: '💻 Tech, Coding & Artificial Intelligence',
    description: 'From JavaScript algorithms to LLMs and computer architecture.',
    category: 'Technology',
    coverColor: 'from-blue-600 to-cyan-600',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_select',
        question: 'Select ALL programming languages that are dynamically typed:',
        options: ['JavaScript', 'Python', 'C++', 'Ruby'],
        correctAnswers: [0, 1, 3],
        timeLimit: 25,
        points: 1000,
        doublePoints: true
      },
      {
        id: 'q2-2',
        type: 'type_answer',
        question: 'What does HTTP stand for?',
        acceptedAnswers: ['Hypertext Transfer Protocol', 'hypertext transfer protocol'],
        timeLimit: 25,
        points: 1000
      },
      {
        id: 'q2-3',
        type: 'ordering',
        question: 'Order these storage units from SMALLEST to LARGEST:',
        options: ['Gigabyte (GB)', 'Kilobyte (KB)', 'Megabyte (MB)', 'Terabyte (TB)'],
        correctOrder: ['Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'],
        timeLimit: 30,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-3',
    title: '🌍 World Geography & Famous Landmarks',
    description: 'Explore world capitals, oceans, mountain ranges, and monuments.',
    category: 'Geography',
    coverColor: 'from-emerald-600 to-teal-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 2,
        timeLimit: 15,
        points: 1000
      },
      {
        id: 'q3-2',
        type: 'fill_blanks',
        question: 'The longest river in South America is the ____ River.',
        acceptedAnswers: ['Amazon', 'amazon'],
        timeLimit: 20,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-4',
    title: '📜 World History & Empires',
    description: 'Journey through ancient civilizations, revolutions, and world leaders.',
    category: 'History',
    coverColor: 'from-amber-600 to-orange-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q4-1',
        type: 'multiple_choice',
        question: 'Who was the first emperor of Ancient Rome?',
        options: ['Julius Caesar', 'Augustus', 'Nero', 'Marcus Aurelius'],
        correctAnswer: 1,
        timeLimit: 20,
        points: 1000
      },
      {
        id: 'q4-2',
        type: 'true_false',
        question: 'The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World.',
        options: ['True', 'False'],
        correctAnswer: 0,
        timeLimit: 15,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-5',
    title: '🎬 Movies, TV & Pop Culture',
    description: 'Blockbusters, Oscars, superhero cinema, and binge-worthy TV series.',
    category: 'Entertainment',
    coverColor: 'from-pink-600 to-rose-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q5-1',
        type: 'multiple_choice',
        question: 'Which movie won the Academy Award for Best Picture in 2024?',
        options: ['Barbie', 'Oppenheimer', 'Killers of the Flower Moon', 'Poor Things'],
        correctAnswer: 1,
        timeLimit: 20,
        points: 1000
      },
      {
        id: 'q5-2',
        type: 'poll',
        question: 'What is your favorite film genre?',
        options: ['Sci-Fi / Fantasy', 'Action / Superhero', 'Comedy', 'Thriller / Horror'],
        timeLimit: 15,
        points: 500
      }
    ]
  },
  {
    id: 'quiz-6',
    title: '🎮 Video Games & Esports',
    description: 'Retro arcade classics, modern AAA titles, and legendary gaming franchises.',
    category: 'Gaming',
    coverColor: 'from-purple-700 to-indigo-800',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q6-1',
        type: 'multiple_choice',
        question: 'What is the best-selling video game of all time?',
        options: ['Tetris', 'Grand Theft Auto V', 'Minecraft', 'Wii Sports'],
        correctAnswer: 2,
        timeLimit: 15,
        points: 1000
      },
      {
        id: 'q6-2',
        type: 'type_answer',
        question: 'Name the iconic yellow character who eats dots in arcades:',
        acceptedAnswers: ['Pac-Man', 'Pacman', 'pacman', 'pac man'],
        timeLimit: 20,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-7',
    title: '🎵 Music, Hits & Global Icons',
    description: 'Test your musical ear across pop, rock, hip-hop, and classical genres.',
    category: 'Music',
    coverColor: 'from-red-600 to-pink-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q7-1',
        type: 'multiple_choice',
        question: 'Which band released the iconic 1969 album "Abbey Road"?',
        options: ['The Rolling Stones', 'The Beatles', 'Pink Floyd', 'Queen'],
        correctAnswer: 1,
        timeLimit: 15,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-8',
    title: '⚽ World Sports & Champions',
    description: 'Football, Basketball, Olympics, Tennis, and Formula 1 trivia.',
    category: 'Sports',
    coverColor: 'from-green-600 to-emerald-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q8-1',
        type: 'multiple_choice',
        question: 'Which country won the FIFA Men\'s World Cup in 2022?',
        options: ['France', 'Brazil', 'Argentina', 'Croatia'],
        correctAnswer: 2,
        timeLimit: 15,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-9',
    title: '🍕 Food, Culinary & World Cuisines',
    description: 'Delicacies, cooking techniques, spices, and global dishes.',
    category: 'Culinary',
    coverColor: 'from-amber-500 to-yellow-600',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q9-1',
        type: 'multiple_choice',
        question: 'What is the main ingredient of traditional guacamole?',
        options: ['Tomato', 'Avocado', 'Cucumber', 'Zucchini'],
        correctAnswer: 1,
        timeLimit: 15,
        points: 1000
      }
    ]
  },
  {
    id: 'quiz-10',
    title: '💡 Brain Teasers & Logical Riddles',
    description: 'Challenge your critical thinking and pattern recognition skills.',
    category: 'Logic',
    coverColor: 'from-indigo-600 to-purple-700',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q10-1',
        type: 'multiple_choice',
        question: 'If a electric train is traveling south at 60 mph, which way does the smoke blow?',
        options: ['North', 'South', 'West', 'Electric trains have no smoke!'],
        correctAnswer: 3,
        timeLimit: 20,
        points: 1000
      }
    ]
  }
];

class QuizStore {
  constructor() {
    this.quizzes = new Map();
    defaultQuizzes.forEach(q => this.quizzes.set(q.id, q));
  }

  getAll() {
    return Array.from(this.quizzes.values());
  }

  getById(id) {
    return this.quizzes.get(id);
  }

  create(quizData) {
    const newQuiz = {
      ...quizData,
      id: quizData.id || `quiz-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.quizzes.set(newQuiz.id, newQuiz);
    return newQuiz;
  }

  update(id, quizData) {
    if (!this.quizzes.has(id)) return null;
    const updated = { ...this.quizzes.get(id), ...quizData, updatedAt: new Date().toISOString() };
    this.quizzes.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.quizzes.delete(id);
  }

  duplicate(id) {
    const original = this.quizzes.get(id);
    if (!original) return null;
    const copy = {
      ...JSON.parse(JSON.stringify(original)),
      id: `quiz-${Date.now()}`,
      title: `${original.title} (Copy)`,
      createdAt: new Date().toISOString()
    };
    this.quizzes.set(copy.id, copy);
    return copy;
  }
}

export const quizStore = new QuizStore();
