import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEffects } from '../../utils/soundEffects';
import { TimerBar } from '../Common/TimerBar';
import { MultipleChoice } from '../QuestionTypes/MultipleChoice';
import { MultipleSelect } from '../QuestionTypes/MultipleSelect';
import { TrueFalse } from '../QuestionTypes/TrueFalse';
import { Poll } from '../QuestionTypes/Poll';
import { TypeAnswer } from '../QuestionTypes/TypeAnswer';
import { OrderingPuzzle } from '../QuestionTypes/OrderingPuzzle';
import { SliderGuess } from '../QuestionTypes/SliderGuess';
import { FillBlanks } from '../QuestionTypes/FillBlanks';
import { Zap, Lock, CheckCircle2 } from 'lucide-react';

export function PlayerQuestionView() {
  const { playerRoomState, playerInfo, socket } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!playerRoomState || !playerRoomState.currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white font-bold">
        Waiting for next question...
      </div>
    );
  }

  const { currentQuestion, timerSeconds, currentQuestionIndex, totalQuestions, state } = playerRoomState;
  const isReveal = state === 'REVEAL';

  const handleSubmitAnswer = (ans) => {
    if (hasSubmitted || !socket || !playerInfo) return;
    setSelectedAnswer(ans);
    setHasSubmitted(true);

    const timeSpentMs = ((currentQuestion.timeLimit || 20) - timerSeconds) * 1000;

    socket.emit('player:submit_answer', {
      roomCode: playerInfo.roomCode,
      playerKey: playerInfo.playerKey,
      answer: ans,
      timeSpentMs
    });
  };

  const renderQuestionInput = () => {
    const q = currentQuestion;
    const type = q.type || 'multiple_choice';

    switch (type) {
      case 'multiple_choice':
        return (
          <MultipleChoice
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      case 'multiple_select':
        return (
          <MultipleSelect
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      case 'true_false':
        return (
          <TrueFalse
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      case 'poll':
        return (
          <Poll
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
          />
        );
      case 'type_answer':
        return (
          <TypeAnswer
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      case 'ordering':
      case 'puzzle':
        return (
          <OrderingPuzzle
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      case 'slider':
        return (
          <SliderGuess
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      case 'fill_blanks':
        return (
          <FillBlanks
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
      default:
        return (
          <MultipleChoice
            question={q}
            onSubmit={handleSubmitAnswer}
            disabled={hasSubmitted || isReveal}
            selectedAnswer={selectedAnswer}
            showResult={isReveal}
          />
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 flex flex-col gap-6">
      
      {/* Question Header & Double Points indicator */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-center flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Question #{currentQuestionIndex + 1} of {totalQuestions}
          </span>
          {currentQuestion.doublePoints && (
            <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              ⚡ 2X DOUBLE POINTS
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Timer Bar */}
      <TimerBar seconds={timerSeconds} total={currentQuestion.timeLimit || 20} />

      {/* Submission locked banner */}
      {hasSubmitted && !isReveal && (
        <div className="w-full max-w-md mx-auto p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-center flex items-center justify-center gap-2 shadow-lg animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Answer Locked In! Waiting for time up...
        </div>
      )}

      {/* Input Options Grid */}
      <div className="mt-4">
        {renderQuestionInput()}
      </div>

    </div>
  );
}
