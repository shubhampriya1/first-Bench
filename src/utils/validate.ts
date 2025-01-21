export type Field = 'email' | 'password' | 'name' | 'phone';

export const validate = (field: Field, value: string): { isValid: boolean; errorMessage: string } => {
  let isValid = false;
  let errorMessage = '';

  switch (field) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      if (!isValid) errorMessage = 'Email must be in a valid format.';
      break;
    case 'password':
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      isValid = passwordRegex.test(value);
      if (!isValid) errorMessage = 'Password must be at least 8 characters long and contain letters and numbers.';
      break;
    case 'name':
      isValid = value.trim().length > 0;
      if (!isValid) errorMessage = 'Name must not be empty.';
      break;
    case 'phone':
      const phoneRegex = /^\d{10}$/;
      isValid = phoneRegex.test(value);
      if (!isValid) errorMessage = 'Phone number must be 10 digits.';
      break;
    default:
      errorMessage = 'Invalid field type.';
  }

  return { isValid, errorMessage };
};
