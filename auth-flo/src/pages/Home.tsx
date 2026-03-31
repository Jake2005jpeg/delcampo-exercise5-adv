import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

interface UserProfile {
  firstName: string;
  lastName: string;
  profilePhoto: string | null;
  email: string | null;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isGoogleUser = currentUser.providerData.some((p) => p.providerId === 'google.com');
        if (isGoogleUser) {
          const displayName = currentUser.displayName || '';
          const nameParts = displayName.split(' ');
          const profileData = {
            firstName: nameParts[0] || 'Google',
            lastName: nameParts.slice(1).join(' ') || 'User',
            profilePhoto: currentUser.photoURL,
            email: currentUser.email,
          };
          localStorage.setItem('userProfile', JSON.stringify(profileData));
          setProfile(profileData);
        } else {
          navigate('/setup-account');
        }
      } else {
        navigate('/login');
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('userProfile');
    localStorage.removeItem('registeredEmail');
    navigate('/login');
  };

  return (
    <div className="page-panel wide">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {profile && profile.profilePhoto && (
          <img
            src={profile.profilePhoto}
            alt="Avatar"
            style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '15px' }}
          />
        )}
        <h1>Welcome{profile ? `, ${profile.firstName} ${profile.lastName}` : ''}!</h1>
      </div>
      {profile ? (
        <div className="page-card">
          <h2>Your Profile</h2>
          {profile.profilePhoto && (
            <div style={{ marginBottom: '15px', textAlign: 'center' }}>
              <img src={profile.profilePhoto} alt="Profile" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '5px' }} />
            </div>
          )}
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
        </div>
      ) : (
        <p>You have successfully logged in or completed your account setup!</p>
      )}

      <button className="page-button inline" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
