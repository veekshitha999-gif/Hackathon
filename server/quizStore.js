/**
 * In-Memory Quiz Storage & 12 Comprehensive Default Quizzes (10 Questions Each)
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
      { id: 'q1-1', type: 'multiple_choice', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, timeLimit: 20, points: 1000 },
      { id: 'q1-2', type: 'true_false', question: 'Light travels faster in a vacuum than through glass.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q1-3', type: 'slider', question: 'What year did human beings first walk on the Moon (Apollo 11)?', min: 1950, max: 1980, targetValue: 1969, tolerance: 0, timeLimit: 20, points: 1000 },
      { id: 'q1-4', type: 'multiple_choice', question: 'What is the closest star to Earth besides our Sun?', options: ['Alpha Centauri A', 'Proxima Centauri', 'Sirius', 'Betelgeuse'], correctAnswer: 1, timeLimit: 20, points: 1000 },
      { id: 'q1-5', type: 'type_answer', question: 'What is the chemical symbol for Gold?', acceptedAnswers: ['Au', 'AU', 'au'], timeLimit: 20, points: 1000 },
      { id: 'q1-6', type: 'multiple_select', question: 'Select ALL gas giant planets in our Solar System:', options: ['Jupiter', 'Mars', 'Saturn', 'Venus'], correctAnswers: [0, 2], timeLimit: 25, points: 1000 },
      { id: 'q1-7', type: 'true_false', question: 'Sound can travel through space.', options: ['True', 'False'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q1-8', type: 'fill_blanks', question: 'The force that pulls objects toward Earth is called ____.', acceptedAnswers: ['Gravity', 'gravity'], timeLimit: 20, points: 1000 },
      { id: 'q1-9', type: 'ordering', question: 'Order these planets from CLOSEST to FARTHEST from the Sun:', options: ['Earth', 'Mercury', 'Venus', 'Mars'], correctOrder: ['Mercury', 'Venus', 'Earth', 'Mars'], timeLimit: 30, points: 1000 },
      { id: 'q1-10', type: 'poll', question: 'Which branch of science interests you the most?', options: ['Astrophysics', 'Quantum Mechanics', 'Biology', 'Robotics'], timeLimit: 15, points: 500 }
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
      { id: 'q2-1', type: 'multiple_select', question: 'Select ALL programming languages that are dynamically typed:', options: ['JavaScript', 'Python', 'C++', 'Ruby'], correctAnswers: [0, 1, 3], timeLimit: 25, points: 1000, doublePoints: true },
      { id: 'q2-2', type: 'type_answer', question: 'What does HTTP stand for?', acceptedAnswers: ['Hypertext Transfer Protocol', 'hypertext transfer protocol'], timeLimit: 25, points: 1000 },
      { id: 'q2-3', type: 'ordering', question: 'Order these storage units from SMALLEST to LARGEST:', options: ['Gigabyte (GB)', 'Kilobyte (KB)', 'Megabyte (MB)', 'Terabyte (TB)'], correctOrder: ['Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'], timeLimit: 30, points: 1000 },
      { id: 'q2-4', type: 'multiple_choice', question: 'Which company created the React JavaScript framework?', options: ['Google', 'Meta / Facebook', 'Microsoft', 'Netflix'], correctAnswer: 1, timeLimit: 20, points: 1000 },
      { id: 'q2-5', type: 'true_false', question: 'HTML is a programming language.', options: ['True', 'False'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q2-6', type: 'slider', question: 'In what year was JavaScript created by Brendan Eich?', min: 1990, max: 2005, targetValue: 1995, tolerance: 0, timeLimit: 20, points: 1000 },
      { id: 'q2-7', type: 'multiple_choice', question: 'What does AI stand for in computer science?', options: ['Automated Intelligence', 'Artificial Intelligence', 'Algorithmic Interface', 'Advanced Integration'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q2-8', type: 'fill_blanks', question: 'The default package manager for Node.js is ____.', acceptedAnswers: ['npm', 'NPM', 'Npm'], timeLimit: 20, points: 1000 },
      { id: 'q2-9', type: 'multiple_select', question: 'Select ALL relational database management systems:', options: ['PostgreSQL', 'MySQL', 'Redis', 'SQLite'], correctAnswers: [0, 1, 3], timeLimit: 25, points: 1000 },
      { id: 'q2-10', type: 'poll', question: 'What is your primary code editor of choice?', options: ['VS Code', 'JetBrains / WebStorm', 'Neovim / Vim', 'Sublime / Other'], timeLimit: 15, points: 500 }
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
      { id: 'q3-1', type: 'multiple_choice', question: 'What is the capital city of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q3-2', type: 'fill_blanks', question: 'The longest river in South America is the ____ River.', acceptedAnswers: ['Amazon', 'amazon'], timeLimit: 20, points: 1000 },
      { id: 'q3-3', type: 'multiple_choice', question: 'Which mountain is the highest peak above sea level on Earth?', options: ['K2', 'Mount Kilimanjaro', 'Mount Everest', 'Denali'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q3-4', type: 'true_false', question: 'Africa is the largest continent by land area.', options: ['True', 'False'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q3-5', type: 'slider', question: 'How many countries are members of the United Nations?', min: 150, max: 220, targetValue: 193, tolerance: 5, timeLimit: 20, points: 1000 },
      { id: 'q3-6', type: 'type_answer', question: 'What is the capital of France?', acceptedAnswers: ['Paris', 'paris'], timeLimit: 15, points: 1000 },
      { id: 'q3-7', type: 'multiple_select', question: 'Select ALL countries that border Canada:', options: ['United States', 'Greenland', 'Mexico', 'Russia'], correctAnswers: [0], timeLimit: 20, points: 1000 },
      { id: 'q3-8', type: 'ordering', question: 'Order these oceans from LARGEST to SMALLEST surface area:', options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'], correctOrder: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], timeLimit: 30, points: 1000 },
      { id: 'q3-9', type: 'true_false', question: 'The Sahara Desert is the largest desert in the world.', options: ['True', 'False'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q3-10', type: 'poll', question: 'Which continent would you most like to visit next?', options: ['Europe', 'Asia', 'South America', 'Oceania'], timeLimit: 15, points: 500 }
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
      { id: 'q4-1', type: 'multiple_choice', question: 'Who was the first emperor of Ancient Rome?', options: ['Julius Caesar', 'Augustus', 'Nero', 'Marcus Aurelius'], correctAnswer: 1, timeLimit: 20, points: 1000 },
      { id: 'q4-2', type: 'true_false', question: 'The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q4-3', type: 'slider', question: 'In what year did World War II end?', min: 1935, max: 1955, targetValue: 1945, tolerance: 0, timeLimit: 20, points: 1000 },
      { id: 'q4-4', type: 'type_answer', question: 'Who was the British Prime Minister during World War II?', acceptedAnswers: ['Winston Churchill', 'Churchill', 'churchill'], timeLimit: 20, points: 1000 },
      { id: 'q4-5', type: 'multiple_choice', question: 'The French Revolution began in which year?', options: ['1776', '1789', '1804', '1815'], correctAnswer: 1, timeLimit: 20, points: 1000 },
      { id: 'q4-6', type: 'multiple_select', question: 'Select ALL ancient civilizations of Mesopotamia:', options: ['Sumerians', 'Babylonians', 'Incas', 'Assyrians'], correctAnswers: [0, 1, 3], timeLimit: 25, points: 1000 },
      { id: 'q4-7', type: 'fill_blanks', question: 'The famous wall built across northern Britain by Romans was ____ Wall.', acceptedAnswers: ['Hadrian', 'Hadrians', 'hadrian'], timeLimit: 20, points: 1000 },
      { id: 'q4-8', type: 'true_false', question: 'Christopher Columbus reached the Americas in 1492.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q4-9', type: 'ordering', question: 'Order these events chronologically from EARLIEST to LATEST:', options: ['Fall of Constantinople', 'American Independence', 'Fall of Western Roman Empire', 'World War I'], correctOrder: ['Fall of Western Roman Empire', 'Fall of Constantinople', 'American Independence', 'World War I'], timeLimit: 30, points: 1000 },
      { id: 'q4-10', type: 'poll', question: 'Which era of history do you find most fascinating?', options: ['Ancient World', 'Middle Ages', 'Renaissance', '20th Century'], timeLimit: 15, points: 500 }
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
      { id: 'q5-1', type: 'multiple_choice', question: 'Which movie won the Academy Award for Best Picture in 2024?', options: ['Barbie', 'Oppenheimer', 'Killers of the Flower Moon', 'Poor Things'], correctAnswer: 1, timeLimit: 20, points: 1000 },
      { id: 'q5-2', type: 'poll', question: 'What is your favorite film genre?', options: ['Sci-Fi / Fantasy', 'Action / Superhero', 'Comedy', 'Thriller / Horror'], timeLimit: 15, points: 500 },
      { id: 'q5-3', type: 'multiple_choice', question: 'Who directed the movies Titanic and Avatar?', options: ['Steven Spielberg', 'Christopher Nolan', 'James Cameron', 'Quentin Tarantino'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q5-4', type: 'type_answer', question: 'What is the real identity name of Marvel superhero Spider-Man?', acceptedAnswers: ['Peter Parker', 'peter parker'], timeLimit: 15, points: 1000 },
      { id: 'q5-5', type: 'true_false', question: 'The Simpsons is the longest-running American animated TV show.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q5-6', type: 'slider', question: 'How many movies are in the original Harry Potter film series?', min: 5, max: 12, targetValue: 8, tolerance: 0, timeLimit: 15, points: 1000 },
      { id: 'q5-7', type: 'multiple_select', question: 'Select ALL actors who played Batman in live-action feature films:', options: ['Christian Bale', 'Ben Affleck', 'Robert Pattinson', 'Tom Cruise'], correctAnswers: [0, 1, 2], timeLimit: 25, points: 1000 },
      { id: 'q5-8', type: 'fill_blanks', question: 'The fictional kingdom where Game of Thrones takes place is ____.', acceptedAnswers: ['Westeros', 'westeros'], timeLimit: 20, points: 1000 },
      { id: 'q5-9', type: 'ordering', question: 'Order these Marvel MCU movies by release date from EARLIEST to LATEST:', options: ['The Avengers', 'Iron Man', 'Black Panther', 'Avengers: Endgame'], correctOrder: ['Iron Man', 'The Avengers', 'Black Panther', 'Avengers: Endgame'], timeLimit: 30, points: 1000 },
      { id: 'q5-10', type: 'multiple_choice', question: 'What color is the pill Neo chooses to take in The Matrix?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 0, timeLimit: 15, points: 1000 }
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
      { id: 'q6-1', type: 'multiple_choice', question: 'What is the best-selling video game of all time?', options: ['Tetris', 'Grand Theft Auto V', 'Minecraft', 'Wii Sports'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q6-2', type: 'type_answer', question: 'Name the iconic yellow character who eats dots in arcades:', acceptedAnswers: ['Pac-Man', 'Pacman', 'pacman', 'pac man'], timeLimit: 20, points: 1000 },
      { id: 'q6-3', type: 'multiple_choice', question: 'Which Nintendo franchise features the protagonist Link?', options: ['Super Mario', 'The Legend of Zelda', 'Metroid', 'Fire Emblem'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q6-4', type: 'true_false', question: 'Sonic the Hedgehog was created by SEGA.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q6-5', type: 'slider', question: 'In what year was the original PlayStation (PS1) launched in Japan?', min: 1990, max: 2000, targetValue: 1994, tolerance: 0, timeLimit: 20, points: 1000 },
      { id: 'q6-6', type: 'multiple_select', question: 'Select ALL esports games played competitively in arenas:', options: ['League of Legends', 'Counter-Strike 2', 'Dota 2', 'Solitaire'], correctAnswers: [0, 1, 2], timeLimit: 20, points: 1000 },
      { id: 'q6-7', type: 'fill_blanks', question: 'The battle royale game developed by Epic Games is ____.', acceptedAnswers: ['Fortnite', 'fortnite'], timeLimit: 20, points: 1000 },
      { id: 'q6-8', type: 'multiple_choice', question: 'What is the name of the main protagonist in the Halo series?', options: ['Marcus Fenix', 'Master Chief', 'Commander Shepard', 'Doom Slayer'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q6-9', type: 'ordering', question: 'Order these PlayStation consoles from OLDEST to NEWEST:', options: ['PS3', 'PS1', 'PS5', 'PS2'], correctOrder: ['PS1', 'PS2', 'PS3', 'PS5'], timeLimit: 30, points: 1000 },
      { id: 'q6-10', type: 'poll', question: 'What is your preferred gaming platform?', options: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'], timeLimit: 15, points: 500 }
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
      { id: 'q7-1', type: 'multiple_choice', question: 'Which band released the iconic 1969 album "Abbey Road"?', options: ['The Rolling Stones', 'The Beatles', 'Pink Floyd', 'Queen'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q7-2', type: 'type_answer', question: 'Who is crowned as the "King of Pop"?', acceptedAnswers: ['Michael Jackson', 'michael jackson'], timeLimit: 15, points: 1000 },
      { id: 'q7-3', type: 'true_false', question: 'Beethoven composed his famous Ninth Symphony while completely deaf.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q7-4', type: 'multiple_choice', question: 'Which artist released the smash album "Thriller" in 1982?', options: ['Prince', 'Michael Jackson', 'Stevie Wonder', 'Whitney Houston'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q7-5', type: 'slider', question: 'How many strings does a standard acoustic guitar have?', min: 4, max: 12, targetValue: 6, tolerance: 0, timeLimit: 15, points: 1000 },
      { id: 'q7-6', type: 'multiple_select', question: 'Select ALL members of the legendary band Queen:', options: ['Freddie Mercury', 'Brian May', 'Mick Jagger', 'Roger Taylor'], correctAnswers: [0, 1, 3], timeLimit: 25, points: 1000 },
      { id: 'q7-7', type: 'fill_blanks', question: 'The famous Swedish pop group who won Eurovision 1974 with "Waterloo" is ____.', acceptedAnswers: ['ABBA', 'Abba', 'abba'], timeLimit: 20, points: 1000 },
      { id: 'q7-8', type: 'multiple_choice', question: 'Which singer performed the halftime show at Super Bowl LVII in 2023?', options: ['Beyoncé', 'Rihanna', 'Taylor Swift', 'Lady Gaga'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q7-9', type: 'ordering', question: 'Order these music genres by general origin era from EARLIEST to LATEST:', options: ['Jazz', 'Classical', 'Hip-Hop', 'EDM / Techno'], correctOrder: ['Classical', 'Jazz', 'Hip-Hop', 'EDM / Techno'], timeLimit: 30, points: 1000 },
      { id: 'q7-10', type: 'poll', question: 'What music genre do you stream the most?', options: ['Pop / Dance', 'Rock / Alternative', 'Hip-Hop / R&B', 'Lo-Fi / Instrumental'], timeLimit: 15, points: 500 }
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
      { id: 'q8-1', type: 'multiple_choice', question: 'Which country won the FIFA Men\'s World Cup in 2022?', options: ['France', 'Brazil', 'Argentina', 'Croatia'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q8-2', type: 'slider', question: 'How many players are on the pitch for ONE team during a soccer match?', min: 5, max: 15, targetValue: 11, tolerance: 0, timeLimit: 15, points: 1000 },
      { id: 'q8-3', type: 'type_answer', question: 'Who has won the most Ballon d\'Or awards in soccer history?', acceptedAnswers: ['Lionel Messi', 'Messi', 'messi'], timeLimit: 15, points: 1000 },
      { id: 'q8-4', type: 'true_false', question: 'Golf was played on the Moon during Apollo 14.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q8-5', type: 'multiple_choice', question: 'Which athlete holds the world record for the 100m sprint (9.58s)?', options: ['Tyson Gay', 'Yohan Blake', 'Usain Bolt', 'Justin Gatlin'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q8-6', type: 'multiple_select', question: 'Select ALL Grand Slam tennis tournaments:', options: ['Wimbledon', 'US Open', 'Roland Garros (French Open)', 'Super Bowl'], correctAnswers: [0, 1, 2], timeLimit: 20, points: 1000 },
      { id: 'q8-7', type: 'fill_blanks', question: 'The sport played at Lord\'s Ground in London is ____.', acceptedAnswers: ['Cricket', 'cricket'], timeLimit: 20, points: 1000 },
      { id: 'q8-8', type: 'multiple_choice', question: 'How many rings are on the official Olympic flag?', options: ['4', '5', '6', '7'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q8-9', type: 'ordering', question: 'Order these sports by ball size from SMALLEST to LARGEST:', options: ['Basketball', 'Golf ball', 'Tennis ball', 'Soccer ball'], correctOrder: ['Golf ball', 'Tennis ball', 'Soccer ball', 'Basketball'], timeLimit: 30, points: 1000 },
      { id: 'q8-10', type: 'poll', question: 'Which major sporting event is your favorite to watch?', options: ['FIFA World Cup', 'Summer Olympics', 'NBA Finals', 'Formula 1 Grand Prix'], timeLimit: 15, points: 500 }
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
      { id: 'q9-1', type: 'multiple_choice', question: 'What is the main ingredient of traditional guacamole?', options: ['Tomato', 'Avocado', 'Cucumber', 'Zucchini'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q9-2', type: 'type_answer', question: 'Which Italian city is considered the birthplace of Pizza?', acceptedAnswers: ['Naples', 'Napoli', 'naples'], timeLimit: 15, points: 1000 },
      { id: 'q9-3', type: 'true_false', question: 'Saffron is harvested from crocus flower stigmas and is the world\'s most expensive spice.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q9-4', type: 'multiple_choice', question: 'What primary grain is used to make traditional Japanese Sake?', options: ['Barley', 'Wheat', 'Rice', 'Corn'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q9-5', type: 'slider', question: 'At what temperature in Celsius does water boil at sea level?', min: 50, max: 150, targetValue: 100, tolerance: 0, timeLimit: 15, points: 1000 },
      { id: 'q9-6', type: 'multiple_select', question: 'Select ALL key ingredients in a classic French Omelette:', options: ['Eggs', 'Butter', 'Soy Sauce', 'Salt'], correctAnswers: [0, 1, 3], timeLimit: 20, points: 1000 },
      { id: 'q9-7', type: 'fill_blanks', question: 'Tofu is made from coagulated ____ milk.', acceptedAnswers: ['Soy', 'soy', 'soybean'], timeLimit: 20, points: 1000 },
      { id: 'q9-8', type: 'multiple_choice', question: 'Which country originated the dessert Tiramisu?', options: ['Spain', 'France', 'Italy', 'Greece'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q9-9', type: 'ordering', question: 'Order these chili peppers from MILD TO SPICIEST (Scoville scale):', options: ['Habanero', 'Bell Pepper', 'Jalapeño', 'Carolina Reaper'], correctOrder: ['Bell Pepper', 'Jalapeño', 'Habanero', 'Carolina Reaper'], timeLimit: 30, points: 1000 },
      { id: 'q9-10', type: 'poll', question: 'What is your go-to international comfort cuisine?', options: ['Italian', 'Mexican', 'Japanese / Sushi', 'Indian Curry'], timeLimit: 15, points: 500 }
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
      { id: 'q10-1', type: 'multiple_choice', question: 'If an electric train is traveling south at 60 mph, which way does the smoke blow?', options: ['North', 'South', 'West', 'Electric trains have no smoke!'], correctAnswer: 3, timeLimit: 20, points: 1000 },
      { id: 'q10-2', type: 'type_answer', question: 'What has keys but no locks, space but no room, and you can enter but not go in?', acceptedAnswers: ['Keyboard', 'a keyboard', 'keyboard'], timeLimit: 20, points: 1000 },
      { id: 'q10-3', type: 'true_false', question: 'Some months have 31 days, some have 30 days. How many have 28 days? Answer: All 12 months.', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q10-4', type: 'multiple_choice', question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', options: ['Echo', 'Shadow', 'Flame', 'Cloud'], correctAnswer: 0, timeLimit: 20, points: 1000 },
      { id: 'q10-5', type: 'slider', question: 'If 5 cats catch 5 mice in 5 minutes, how many cats are needed to catch 100 mice in 100 minutes?', min: 1, max: 100, targetValue: 5, tolerance: 0, timeLimit: 20, points: 1000 },
      { id: 'q10-6', type: 'fill_blanks', question: 'What gets wetter and wetter the more it dries? A ____.', acceptedAnswers: ['Towel', 'towel'], timeLimit: 20, points: 1000 },
      { id: 'q10-7', type: 'multiple_select', question: 'Select ALL numbers that are prime numbers:', options: ['2', '9', '17', '21'], correctAnswers: [0, 2], timeLimit: 20, points: 1000 },
      { id: 'q10-8', type: 'multiple_choice', question: 'What belongs to you, but other people use it more than you do?', options: ['Your money', 'Your name', 'Your phone', 'Your car'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q10-9', type: 'ordering', question: 'Complete the Fibonacci sequence starting from 1: 1, 1, 2, 3, 5, ?', options: ['8', '13', '21', '34'], correctOrder: ['8', '13', '21', '34'], timeLimit: 30, points: 1000 },
      { id: 'q10-10', type: 'poll', question: 'Do you prefer solving math puzzles or verbal riddles?', options: ['Math Puzzles', 'Verbal Riddles', 'Visual Puzzles', 'Both equally!'], timeLimit: 15, points: 500 }
    ]
  },
  {
    id: 'quiz-11',
    title: '🐾 Animals & Wildlife Kingdom',
    description: 'Fascinating animal facts, ocean marine life, and jungle wildlife.',
    category: 'Nature',
    coverColor: 'from-emerald-500 to-green-600',
    createdAt: new Date().toISOString(),
    questions: [
      { id: 'q11-1', type: 'multiple_choice', question: 'What is the largest living mammal on Earth?', options: ['African Elephant', 'Blue Whale', 'Colossal Squid', 'Giraffe'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q11-2', type: 'true_false', question: 'Flamingos are naturally born pink.', options: ['True', 'False'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q11-3', type: 'type_answer', question: 'What is the fastest land animal on Earth?', acceptedAnswers: ['Cheetah', 'cheetah'], timeLimit: 15, points: 1000 },
      { id: 'q11-4', type: 'multiple_choice', question: 'How many hearts does an octopus have?', options: ['1', '2', '3', '4'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q11-5', type: 'slider', question: 'How many legs does a spider have?', min: 4, max: 12, targetValue: 8, tolerance: 0, timeLimit: 15, points: 1000 },
      { id: 'q11-6', type: 'multiple_select', question: 'Select ALL marsupial mammals native to Australia:', options: ['Kangaroo', 'Koala', 'Wombat', 'Cheetah'], correctAnswers: [0, 1, 2], timeLimit: 20, points: 1000 },
      { id: 'q11-7', type: 'fill_blanks', question: 'A group of lions is called a ____.', acceptedAnswers: ['Pride', 'pride'], timeLimit: 20, points: 1000 },
      { id: 'q11-8', type: 'multiple_choice', question: 'Which bird is famous for being flightless and native to Antarctica?', options: ['Ostrich', 'Penguin', 'Emu', 'Kiwi'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q11-9', type: 'ordering', question: 'Order these animals by maximum land running speed from SLOWEST to FASTEST:', options: ['Cheetah', 'Giant Tortoise', 'Domestic Dog', 'Usain Bolt (Human)'], correctOrder: ['Giant Tortoise', 'Usain Bolt (Human)', 'Domestic Dog', 'Cheetah'], timeLimit: 30, points: 1000 },
      { id: 'q11-10', type: 'poll', question: 'Which animal group is your favorite?', options: ['Felines / Big Cats', 'Marine Mammals', 'Birds of Prey', 'Reptiles & Amphibians'], timeLimit: 15, points: 500 }
    ]
  },
  {
    id: 'quiz-12',
    title: '🚗 Supercars, Automotive & Speed Tech',
    description: 'Hypercars, EV technology, Formula 1 engines, and automotive legends.',
    category: 'Automotive',
    coverColor: 'from-rose-600 to-red-700',
    createdAt: new Date().toISOString(),
    questions: [
      { id: 'q12-1', type: 'multiple_choice', question: 'Which luxury supercar manufacturer features a prancing horse logo?', options: ['Lamborghini', 'Porsche', 'Ferrari', 'Bugatti'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q12-2', type: 'type_answer', question: 'Who is the CEO and founder of Tesla?', acceptedAnswers: ['Elon Musk', 'elon musk', 'Musk'], timeLimit: 15, points: 1000 },
      { id: 'q12-3', type: 'true_false', question: 'Bugatti Veyron was the first production street car to break 250 mph (400 km/h).', options: ['True', 'False'], correctAnswer: 0, timeLimit: 15, points: 1000 },
      { id: 'q12-4', type: 'multiple_choice', question: 'Which Formula 1 team has won the most Constructors Championships in F1 history?', options: ['McLaren', 'Mercedes', 'Ferrari', 'Red Bull Racing'], correctAnswer: 2, timeLimit: 15, points: 1000 },
      { id: 'q12-5', type: 'slider', question: 'How many cylinders are in a V8 engine?', min: 2, max: 16, targetValue: 8, tolerance: 0, timeLimit: 15, points: 1000 },
      { id: 'q12-6', type: 'multiple_select', question: 'Select ALL German luxury automobile manufacturers:', options: ['BMW', 'Audi', 'Mercedes-Benz', 'Toyota'], correctAnswers: [0, 1, 2], timeLimit: 20, points: 1000 },
      { id: 'q12-7', type: 'fill_blanks', question: 'The legendary 24-hour endurance sports car race in France is 24 Hours of Le ____.', acceptedAnswers: ['Mans', 'mans'], timeLimit: 20, points: 1000 },
      { id: 'q12-8', type: 'multiple_choice', question: 'What does EV stand for in modern automotive technology?', options: ['Engine Vehicle', 'Electric Vehicle', 'Efficient Velocity', 'Enhanced Valve'], correctAnswer: 1, timeLimit: 15, points: 1000 },
      { id: 'q12-9', type: 'ordering', question: 'Order these car engines by cylinder count from FEWEST to MOST:', options: ['V8 Engine', 'Inline-4 Engine', 'W16 Quad-Turbo Engine', 'V12 Engine'], correctOrder: ['Inline-4 Engine', 'V8 Engine', 'V12 Engine', 'W16 Quad-Turbo Engine'], timeLimit: 30, points: 1000 },
      { id: 'q12-10', type: 'poll', question: 'What type of engine powertrain do you prefer?', options: ['V8 Internal Combustion', 'Electric (EV)', 'Hybrid Twin-Turbo', 'Manual Transmission Classic'], timeLimit: 15, points: 500 }
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
