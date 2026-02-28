import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    } else {
      // if user previously registered but never completed setup, send them there
      const registeredEmail = localStorage.getItem('registeredEmail');
      if (registeredEmail) {
        navigate('/setup-account');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('registeredEmail');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <div style={{ marginTop: '30px', textAlign: 'left', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
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

      <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Home;
