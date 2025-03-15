import React, { useState } from 'react';
import { User } from '../types';
import { Award, Clock, Target, Share2, Trophy, Star, Gift } from 'lucide-react';
import UserDetailsCard from './UserDetailsCard';

interface LeaderboardProps {
  users: User[];
  currentUserId: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserId }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const sortedUsers = [...users]
    .filter(user => user.profileShared)
    .sort((a, b) => b.score - a.score);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleCloseDetails = () => {
    setShowUserDetails(false);
  };

  const handleShareClick = () => {
    setIsSharing(true);
    
    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false);
      // In a real app, you would trigger a share dialog or copy a link
      alert("Thanks for sharing! 50 points have been added to your account.");
    }, 1500);
  };

  const getBadgeIcon = (index: number) => {
    if (index === 0) return <Trophy className="text-yellow-500" size={20} />;
    if (index === 1) return <Trophy className="text-gray-400" size={20} />;
    if (index === 2) return <Trophy className="text-amber-700" size={20} />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Score
                </th>
              
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`
                    ${user.id === currentUserId ? 'bg-gray-50' : 'hover:bg-gray-50'} 
                    transition-colors cursor-pointer
                  `}
                  onClick={() => handleUserClick(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-2">#{index + 1}</span>
                      {getBadgeIcon(index)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={user.profilePic} alt={user.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {user.name}
                          {user.badges.length > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              <Star size={12} className="mr-1" />
                              {user.badges[0]}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Target className="mr-1 text-blue-500" size={16} />
                      {user.score}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Award className="mr-1 text-purple-500" size={16} />
                      {user.levelFinished}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.averageScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="mr-1 text-gray-500" size={16} />
                      {user.durationOnLeaderboard}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.profileShared ? (
                      <div className="flex items-center text-sm text-green-600">
                        <Share2 className="mr-1" size={16} />
                        Public
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Private</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {showUserDetails && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button 
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <UserDetailsCard user={selectedUser} />
            </div>
          </div>
        )}
      </div>
      
      {/* Share and Earn Points Container */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg border border-indigo-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
            <Gift className="text-indigo-600" size={24} />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Share and Earn Points</h3>
            <p className="text-gray-600 mb-4">
              Invite your friends to join our quiz platform and earn 50 bonus points for each friend who signs up using your referral link. Challenge them to beat your score and climb the leaderboard together!
            </p>
            <button 
              onClick={handleShareClick}
              disabled={isSharing}
              className={`
                flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white
                transition-all duration-300 transform
                ${isSharing 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95'
                }
              `}
            >
              {isSharing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 className="mr-2" size={18} />
                  Share and Earn 50 Points
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;