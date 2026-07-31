/**
 * Scoring & Answer Evaluation Engine
 */

export function checkAnswer(question, answer) {
  if (!question || answer === undefined || answer === null) return false;

  const type = question.type || 'multiple_choice';

  switch (type) {
    case 'multiple_choice':
    case 'true_false':
    case 'image':
    case 'audio':
    case 'video': {
      // answer is selected index or string
      if (typeof question.correctAnswer === 'number') {
        return Number(answer) === question.correctAnswer;
      }
      return String(answer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
    }

    case 'multiple_select': {
      // answer is an array of indices
      if (!Array.isArray(answer) || !Array.isArray(question.correctAnswers)) return false;
      if (answer.length !== question.correctAnswers.length) return false;
      const sortedAnswer = [...answer].map(Number).sort((a, b) => a - b);
      const sortedCorrect = [...question.correctAnswers].map(Number).sort((a, b) => a - b);
      return sortedAnswer.every((val, idx) => val === sortedCorrect[idx]);
    }

    case 'poll': {
      // Polls don't have wrong answers, everyone earns base points for participating
      return true;
    }

    case 'type_answer':
    case 'fill_blanks': {
      if (typeof answer !== 'string') return false;
      const userText = answer.trim().toLowerCase();
      if (Array.isArray(question.acceptedAnswers)) {
        return question.acceptedAnswers.some(acc => acc.trim().toLowerCase() === userText);
      }
      return userText === String(question.correctAnswer || '').trim().toLowerCase();
    }

    case 'ordering':
    case 'puzzle': {
      if (!Array.isArray(answer) || !Array.isArray(question.correctOrder)) return false;
      if (answer.length !== question.correctOrder.length) return false;
      return answer.every((val, idx) => String(val) === String(question.correctOrder[idx]));
    }

    case 'slider': {
      const numAns = Number(answer);
      const target = Number(question.targetValue);
      const tolerance = Number(question.tolerance || 5);
      return Math.abs(numAns - target) <= tolerance;
    }

    default:
      return false;
  }
}

export function calculateScore({ question, isCorrect, timeSpentMs, timeLimitSec, currentStreak = 0 }) {
  if (!isCorrect) {
    return { points: 0, newStreak: 0, speedBonus: 0, accuracyBonus: 0, streakBonus: 0 };
  }

  const basePoints = question.points || 1000;
  if (question.type === 'poll') {
    return { points: basePoints, newStreak: currentStreak + 1, speedBonus: 0, accuracyBonus: basePoints, streakBonus: 0 };
  }

  const timeLimitMs = (timeLimitSec || 30) * 1000;
  const clampedTimeSpent = Math.max(0, Math.min(timeSpentMs, timeLimitMs));
  const timeRatio = 1 - (clampedTimeSpent / timeLimitMs);
  
  // Speed bonus up to 50% of base points
  const speedBonus = Math.round(basePoints * 0.5 * Math.max(0, timeRatio));
  const accuracyBonus = basePoints;

  const newStreak = currentStreak + 1;
  // Streak bonus: +100 per streak level up to max 500
  const streakBonus = Math.min(newStreak * 100, 500);

  const isDoublePoints = Boolean(question.doublePoints);
  const multiplier = isDoublePoints ? 2 : 1;

  const totalPoints = Math.round((accuracyBonus + speedBonus + streakBonus) * multiplier);

  return {
    points: totalPoints,
    newStreak,
    speedBonus: Math.round(speedBonus * multiplier),
    accuracyBonus: Math.round(accuracyBonus * multiplier),
    streakBonus: Math.round(streakBonus * multiplier),
    isDoublePoints
  };
}
