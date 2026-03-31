import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('registeredEmail', data.email);
      navigate('/setup-account');
    } catch (error: any) {
      setAuthError(error.message || 'Unable to create account. Please try again.');
    }
  };

  const handleGoogleRegister = async () => {
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
      setAuthError(error.message || 'Google sign up failed. Please try again.');
    }
  };

  return (
    <div className="page-panel">
      <h1>Register</h1>
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

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="page-input"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red', margin: '5px 0' }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="page-button">
          Register
        </button>
      </form>

      <button type="button" className="page-button" style={{ marginTop: '12px', backgroundColor: '#4285F4' }} onClick={handleGoogleRegister}>
        Register with Google
      </button>

      {authError && <p style={{ color: 'red', marginTop: '12px' }}>{authError}</p>}

      <p className="page-link-row">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
