import React, { useState, useEffect } from 'react';
import Profile from '../Components/Profile';
import UserStats from '../Components/UserStats';
import Leaderboard from '../Components/Leaderboard';
import { User, UserData } from '../types';
import userData from '../Db/users.json';

const LeaderboardPage: React.FC = () => {  // Changed function name and added type
  const [data, setData] = useState<UserData>(userData as UserData);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Find the current user (in a real app, this would come from authentication)
    const user = data.users.find(u => u.id === 6); // Current user has ID 6 in our mock data
    if (user) {
      setCurrentUser(user);
    }
  }, [data.users]);

  const handleUpdateUser = (updatedUser: User) => {
    setData(prevData => ({
      ...prevData,
      users: prevData.users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    }));
  };

  if (!currentUser) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quiz Leaderboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <Profile user={currentUser} onUpdateUser={handleUpdateUser} />
            <UserStats 
              currentUser={currentUser} 
              leaderboardThreshold={data.leaderboardThreshold}
              leaderboardUsers={data.users.filter(u => u.profileShared)}
            />
          </div>
          
          <div className="lg:col-span-2">
            <Leaderboard 
              users={data.users} 
              currentUserId={currentUser.id} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;