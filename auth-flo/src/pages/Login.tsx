import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

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

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Login Data:', data);
    // If a full profile exists, go to home. If user registered but hasn't completed setup,
    // redirect them to the setup page so they can complete their profile.
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
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '5px' }}
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
            style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '5px' }}
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

        <button type="submit" style={{ padding: '10px', width: '100%', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
