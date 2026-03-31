import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        navigate('/home');
        return;
      }

      const registeredEmail = localStorage.getItem('registeredEmail');
      if (registeredEmail) {
        navigate('/setup-account');
        return;
      }

      navigate('/home');
    } catch (error: any) {
      setAuthError(error.message || 'Unable to log in. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const profileData = {
        firstName: nameParts[0] || 'Google',
        lastName: nameParts.slice(1).join(' ') || 'User',
        profilePhoto: user.photoURL,
        email: user.email,
      };
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      localStorage.setItem('registeredEmail', user.email || '');
      navigate('/home');
    } catch (error: any) {
      setAuthError(error.message || 'Google login failed. Please try again.');
    }
  };

  return (
    <div className="page-panel">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="page-input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p style={{ color: 'red', margin: '5px 0' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="page-input"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <p style={{ color: 'red', margin: '5px 0' }}>{errors.password.message}</p>}
        </div>

        <button type="submit" className="page-button">
          Login
        </button>
      </form>

      <button type="button" className="page-button" style={{ marginTop: '12px', backgroundColor: '#4285F4' }} onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      {authError && <p style={{ color: 'red', marginTop: '12px' }}>{authError}</p>}

      <p className="page-link-row">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
