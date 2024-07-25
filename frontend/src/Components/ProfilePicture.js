// ProfileDropdown.js
import React, { useState, useRef, useEffect } from 'react';
import './ProfileDropdown.css';

const ProfilePicture = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <img
        src="Photos\profile.png" // Update this path to your profile photo
        alt=""
        className="profile-photo"
        onClick={toggleDropdown}
      />
      {dropdownVisible && (
        <div className="dropdown-menu">
          <button onClick={() => alert('Profile clicked')}>Profile</button>
          <button onClick={() => alert('Settings clicked')}>Settings</button>
          <button onClick={() => alert('Logout clicked')}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
