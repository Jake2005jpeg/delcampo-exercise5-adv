import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface SetupAccountFormInputs {
  firstName: string;
  lastName: string;
  profilePhoto: FileList;
}

const SetupAccount: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SetupAccountFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: SetupAccountFormInputs) => {
    const profileData = {
      firstName: data.firstName,
      lastName: data.lastName,
      profilePhoto: photoPreview,
      email: localStorage.getItem('registeredEmail'),
    };
    console.log('Setup Account Data:', profileData);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    navigate('/home');
  };

  return (
    <div className="page-panel">
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="profilePhoto">Profile Photo</label>
          <input
            id="profilePhoto"
            type="file"
            accept="image/*"
            className="page-input"
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
            <p style={{ color: 'red', margin: '5px 0' }}>{errors.profilePhoto.message}</p>
          )}
          {photoPreview && (
            <div style={{ marginTop: '10px' }}>
              <img src={photoPreview} alt="Profile Preview" style={{ maxWidth: '150px', maxHeight: '150px' }} />
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            className="page-input"
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
          {errors.firstName && <p style={{ color: 'red', margin: '5px 0' }}>{errors.firstName.message}</p>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            className="page-input"
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
          {errors.lastName && <p style={{ color: 'red', margin: '5px 0' }}>{errors.lastName.message}</p>}
        </div>

        <button type="submit" className="page-button">
          Complete Setup
        </button>
      </form>
    </div>
  );
};

export default SetupAccount;
