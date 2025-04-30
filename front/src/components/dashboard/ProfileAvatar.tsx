'use client';

import React, { useEffect, useState } from 'react';
import getInitials from '@/helpers/avatarInitials';
import { Pencil, X } from 'lucide-react';
import { useAuth } from '@/context/UserContext';

interface ProfileAvatarProps {
  name: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name }) => {
  const { user, updateUserProfile } = useAuth();

  const [bgColor, setBgColor] = useState<string>("#030617");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedColor = localStorage.getItem("profileBgColor");
    if (storedColor) {
      setBgColor(storedColor);
    } else if (user?.user.bgColor) {
      setBgColor(user.user.bgColor);
    }
  }, [user]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBgColor(newColor);
    localStorage.setItem("profileBgColor", newColor);
    updateUserProfile({ bgColor: newColor });

  };

  return (
    <div className="flex flex-col items-center gap-4">
        <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white font-light text-5xl relative"
            style={{ backgroundColor: bgColor }}
        >
            {getInitials(name)}
            <button
            onClick={() => setEditing(true)}
            className="absolute -top-1 -right-2 bg-white p-1 rounded-full shadow-md cursor-pointer"
            >
              <Pencil size={16} className="text-gray-700" />
            </button>
        </div>

        {editing && (
          <div className="relative flex items-center gap-2">
            <input
            type="color"
            value={bgColor}
            onChange={handleColorChange}
            className="w-8 h-8 cursor-pointer"
            autoFocus
            />
            <button onClick={() => setEditing(false)} className="absolute -top-2 right-2 translate-x-5 p-1 rounded-full bg-white shadow-sm cursor-pointer">
              <X size={12} className="text-gray-700"/>
            </button>
          </div>
        )}
    </div>    
  );
};

export default ProfileAvatar;
