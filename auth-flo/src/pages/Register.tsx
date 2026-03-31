import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

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
  const password = watch('password');

  const onSubmit = (data: RegisterFormInputs) => {
    console.log('Register Data:', {
      email: data.email,
      password: data.password,
    });
    localStorage.setItem('registeredEmail', data.email);
    navigate('/setup-account');
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

      <p className="page-link-row">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
