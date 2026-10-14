import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, BarChart3 } from 'lucide-react';
import { INITIAL_POLL } from '../data/newsData';
import { Language, Poll } from '../types';

interface PollWidgetProps {
  language: Language;
  poll?: Poll;
  onVote?: (updated: Poll) => void;
}

export const PollWidget: React.FC<PollWidgetProps> = ({ 
  language,
  poll: externalPoll,
  onVote,
}) => {
  const [internalPoll, setInternalPoll] = useState<Poll>(INITIAL_POLL);
  const poll = externalPoll || internalPoll;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleVote = () => {
    if (!selectedOption || hasVoted) return;

    const updatedOptions = poll.options.map((opt) => {
      if (opt.id === selectedOption) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });

    const updatedPoll: Poll = {
      ...poll,
      totalVotes: poll.totalVotes + 1,
      options: updatedOptions,
    };

    if (onVote) {
      onVote(updatedPoll);
    } else {
      setInternalPoll(updatedPoll);
    }
    setHasVoted(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-stone-200">
      <div className="bg-white rounded p-6 border border-stone-300 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#C1121F] text-white rounded-xs">
              <BarChart3 className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                {language === 'bn' ? 'ইত্তেফাক জনমত জরিপ' : 'Daily Ittefaq Reader Poll'}
              </h3>
              <p className="text-xs text-stone-500 font-serif">
                {poll.date} · {language === 'bn' ? `মোট ভোট প্রদান করেছেন: ${poll.totalVotes.toLocaleString()} জন` : `Total votes cast: ${poll.totalVotes.toLocaleString()}`}
              </p>
            </div>
          </div>
          <span className="text-xs text-stone-500 italic font-serif">
            {hasVoted 
              ? (language === 'bn' ? '✓ আপনার মূল্যবান মতামত গৃহীত হয়েছে' : '✓ Your vote has been recorded')
              : (language === 'bn' ? 'আপনার মতামত জানান' : 'Cast your vote')}
          </span>
        </div>

        <div className="mt-5">
          {/* Question */}
          <h4 className="font-serif font-bold text-lg text-stone-900 leading-snug mb-5">
            {language === 'bn' ? poll.questionBn : poll.questionEn}
          </h4>

          {/* Voting Options */}
          <div className="space-y-3 max-w-2xl">
            {poll.options.map((option) => {
              const percentage = Math.round((option.votes / poll.totalVotes) * 100);
              const isSelected = selectedOption === option.id;

              return (
                <div key={option.id} className="relative">
                  {hasVoted ? (
                    // Result View
                    <div className="p-3 bg-stone-50 rounded border border-stone-200 relative overflow-hidden">
                      {/* Bar Fill */}
                      <div 
                        className="absolute inset-y-0 left-0 bg-stone-200/70 transition-all duration-700 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="relative flex items-center justify-between z-10 text-xs sm:text-sm font-medium text-stone-800">
                        <div className="flex items-center gap-2">
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C1121F]" />}
                          <span>{language === 'bn' ? option.labelBn : option.labelEn}</span>
                        </div>
                        <span className="font-mono font-bold tabular-nums text-stone-900">
                          {percentage}% ({option.votes.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Interactive Radio Option
                    <label 
                      onClick={() => setSelectedOption(option.id)}
                      className={`flex items-center justify-between p-3 rounded border transition-colors cursor-pointer ${
                        isSelected 
                          ? 'border-[#C1121F] bg-rose-50/50 text-stone-900' 
                          : 'border-stone-200 hover:border-stone-400 bg-white text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="poll-option"
                          checked={isSelected}
                          onChange={() => setSelectedOption(option.id)}
                          className="accent-[#C1121F] w-4 h-4"
                        />
                        <span className="text-sm font-serif">
                          {language === 'bn' ? option.labelBn : option.labelEn}
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          {!hasVoted && (
            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleVote}
                disabled={!selectedOption}
                className={`px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedOption
                    ? 'bg-[#C1121F] hover:bg-[#a10e1a] text-white shadow-2xs'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {language === 'bn' ? 'ভোট দিন' : 'Submit Vote'}
              </button>
              <span className="text-xs text-stone-500 font-serif">
                {language === 'bn' ? 'একটি ডিভাইস থেকে একবারই ভোট দেওয়া যাবে' : 'One vote per device'}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
