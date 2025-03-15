// UserDetailsCard.tsx
import React from 'react';
import { User } from '../types';
import { Instagram, Github, Linkedin, Award, Target, Clock, CheckCircle, XCircle } from 'lucide-react';

interface UserDetailsCardProps {
  user: User;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ user }) => {
  return (
    <div className="p-6 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
      <div className="flex items-start mb-6">
        <img 
          src={user.profilePic} 
          alt={user.name} 
          className="w-20 h-20 rounded-full object-cover border-4 border-white/50 mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-700">@{user.username}</p>
          <p className="text-gray-800 mt-2">{user.bio}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Social Media</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Instagram size={20} className="text-gray-800 mr-3" />
              <a href={`https://instagram.com/${user.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">
                @{user.social.instagram}
              </a>
            </div>
            
            <div className="flex items-center">
              <Github size={20} className="text-gray-800 mr-3" />
              <a href={`https://github.com/${user.social.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">
                @{user.social.github}
              </a>
            </div>
            
            <div className="flex items-center">
              <Linkedin size={20} className="text-gray-800 mr-3" />
              <a href={`https://linkedin.com/in/${user.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">
                {user.social.linkedin}
              </a>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-white/50 text-gray-800 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-white/60 text-gray-800 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quiz Statistics</h3>
          
          <div className="space-y-4">
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="mr-2 text-blue-600" size={20} />
                <h4 className="font-semibold text-gray-900">Score</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">{user.score}</p>
            </div>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Award className="mr-2 text-purple-600" size={20} />
                <h4 className="font-semibold text-gray-900">Level Completed</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">{user.levelFinished}</p>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center p-2 bg-white/40 rounded">
                <div className="flex items-center">
                  <Target className="mr-2 text-gray-700" size={18} />
                  <span className="text-gray-800">Average Score</span>
                </div>
                <span className="font-medium text-gray-900">{user.averageScore}%</span>
              </div>
              
              {/* Repeat the same bg-white/40 class for other stat items */}
              <div className="flex justify-between items-center p-2 bg-white/40 rounded">
                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-700" size={18} />
                  <span className="text-gray-800">Average Time</span>
                </div>
                <span className="font-medium text-gray-900">{user.stats.averageTime}</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-white/40 rounded">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-green-600" size={18} />
                  <span className="text-gray-800">Correct Answers</span>
                </div>
                <span className="font-medium text-gray-900">{user.stats.correctAnswers}</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-white/40 rounded">
                <div className="flex items-center">
                  <XCircle className="mr-2 text-red-600" size={18} />
                  <span className="text-gray-800">Wrong Answers</span>
                </div>
                <span className="font-medium text-gray-900">{user.stats.wrongAnswers}</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-white/40 rounded">
                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-700" size={18} />
                  <span className="text-gray-800">On Leaderboard</span>
                </div>
                <span className="font-medium text-gray-900">{user.durationOnLeaderboard}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;