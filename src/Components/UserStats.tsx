import React from 'react';
import { User, LeaderboardThreshold } from '../types';
import { Award, Clock, Target, CheckCircle, XCircle } from 'lucide-react';

interface UserStatsProps {
  currentUser: User;
  leaderboardThreshold: LeaderboardThreshold;
  leaderboardUsers: User[];
}

const UserStats: React.FC<UserStatsProps> = ({ 
  currentUser, 
  leaderboardThreshold,
  leaderboardUsers 
}) => {
  const isInLeaderboard = currentUser.score >= leaderboardThreshold.score && 
                          currentUser.levelFinished >= leaderboardThreshold.level;
  
  const userRank = leaderboardUsers
    .sort((a, b) => b.score - a.score)
    .findIndex(user => user.id === currentUser.id) + 1;

  const scoreNeeded = isInLeaderboard ? 0 : leaderboardThreshold.score - currentUser.score;
  const levelsNeeded = isInLeaderboard ? 0 : leaderboardThreshold.level - currentUser.levelFinished;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Standing</h2>
      
      <div className="mb-6 p-4 rounded-lg bg-gray-50">
        {isInLeaderboard ? (
          <div className="flex items-center text-green-600">
            <Award className="mr-2" size={24} />
            <p className="font-medium">
              Congratulations! You're ranked #{userRank} on the leaderboard!
            </p>
          </div>
        ) : (
          <div className="text-gray-700">
            <p className="font-medium mb-2">
              You need the following to enter the leaderboard:
            </p>
            <ul className="space-y-2 ml-2">
              {scoreNeeded > 0 && (
                <li className="flex items-center">
                  <Target className="mr-2 text-blue-500" size={18} />
                  <span>{scoreNeeded} more points</span>
                </li>
              )}
              {levelsNeeded > 0 && (
                <li className="flex items-center">
                  <Award className="mr-2 text-purple-500" size={18} />
                  <span>{levelsNeeded} more levels</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Target className="mr-2 text-blue-500" size={20} />
            <h3 className="font-semibold text-gray-800">Score</h3>
          </div>
          <p className="text-2xl font-bold">{currentUser.score}</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Award className="mr-2 text-purple-500" size={20} />
            <h3 className="font-semibold text-gray-800">Level</h3>
          </div>
          <p className="text-2xl font-bold">{currentUser.levelFinished}</p>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Stats</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <Target className="mr-2 text-gray-600" size={18} />
            <span className="text-gray-700">Average Score</span>
          </div>
          <span className="font-medium">{currentUser.averageScore}%</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <Clock className="mr-2 text-gray-600" size={18} />
            <span className="text-gray-700">Average Time</span>
          </div>
          <span className="font-medium">{currentUser.stats.averageTime}</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" size={18} />
            <span className="text-gray-700">Correct Answers</span>
          </div>
          <span className="font-medium">{currentUser.stats.correctAnswers}</span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <XCircle className="mr-2 text-red-500" size={18} />
            <span className="text-gray-700">Wrong Answers</span>
          </div>
          <span className="font-medium">{currentUser.stats.wrongAnswers}</span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;