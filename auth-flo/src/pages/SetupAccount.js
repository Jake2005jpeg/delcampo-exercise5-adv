import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';

function SetupAccount() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      profilePhoto: '',
    },
  });
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const profileData = {
      firstName: data.firstName,
      lastName: data.lastName,
      profilePhoto: photoPreview,
      email: localStorage.getItem('registeredEmail') || null,
    };
    console.log('Setup Account Data:', profileData);
    // Persist the complete profile for the homepage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    // Redirect to homepage after successful setup
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Complete Your Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              {...register('profilePhoto', {
                validate: (value) => {
                  if (value && value.length > 0) {
                    return true;
                  }
                  return 'Please upload a profile photo';
                },
              })}
              onChange={(e) => {
                register('profilePhoto').onChange(e);
                handlePhotoChange(e);
              }}
            />
            {errors.profilePhoto && (
              <span className="error">{errors.profilePhoto.message}</span>
            )}
            {photoPreview && (
              <div className="photo-preview">
                <img src={photoPreview} alt="Profile Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register('firstName', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'First name can only contain letters and spaces',
                },
              })}
            />
            {errors.firstName && <span className="error">{errors.firstName.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register('lastName', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: 'Last name can only contain letters and spaces',
                },
              })}
            />
            {errors.lastName && <span className="error">{errors.lastName.message}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetupAccount;
