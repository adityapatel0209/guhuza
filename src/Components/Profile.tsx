import React, { useState } from 'react';
import { User } from '../types';
import { Instagram, Github, Linkedin, Edit2, Check, X } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser({ ...user });
    }
  };

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedUser({
        ...editedUser,
        [parent]: {
          ...editedUser[parent as keyof User] as object,
          [child]: value
        }
      });
    } else {
      setEditedUser({
        ...editedUser,
        [name]: value
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
        {isEditing ? (
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <Check size={16} />
            </button>
            <button 
              onClick={handleCancel}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleEditToggle}
            className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>
      
      <div className="flex flex-col items-center mb-6">
        {isEditing ? (
          <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
            <input
              type="text"
              name="profilePic"
              value={editedUser.profilePic}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>
        ) : (
          <img 
            src={user.profilePic} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 mb-4"
          />
        )}
        
        {isEditing ? (
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>
        ) : (
          <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
        )}
        
        {isEditing ? (
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          </div>
        ) : (
          <p className="text-gray-500 mb-2">@{user.username}</p>
        )}
        
        {isEditing ? (
          <div className="w-full mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={editedUser.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
              rows={3}
            />
          </div>
        ) : (
          <p className="text-gray-600 text-center mb-4">{user.bio}</p>
        )}
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Social Media</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <Instagram size={20} className="text-gray-700 mr-3" />
            {isEditing ? (
              <input
                type="text"
                name="social.instagram"
                value={editedUser.social.instagram}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="Instagram username"
              />
            ) : (
              <a href={`https://instagram.com/${user.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                @{user.social.instagram}
              </a>
            )}
          </div>
          
          <div className="flex items-center">
            <Github size={20} className="text-gray-700 mr-3" />
            {isEditing ? (
              <input
                type="text"
                name="social.github"
                value={editedUser.social.github}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="GitHub username"
              />
            ) : (
              <a href={`https://github.com/${user.social.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                @{user.social.github}
              </a>
            )}
          </div>
          
          <div className="flex items-center">
            <Linkedin size={20} className="text-gray-700 mr-3" />
            {isEditing ? (
              <input
                type="text"
                name="social.linkedin"
                value={editedUser.social.linkedin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
                placeholder="LinkedIn username"
              />
            ) : (
              <a href={`https://linkedin.com/in/${user.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                {user.social.linkedin}
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Badges</h4>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Interests</h4>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;