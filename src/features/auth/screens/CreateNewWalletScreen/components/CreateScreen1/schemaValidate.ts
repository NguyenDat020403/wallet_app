import * as yup from 'yup';

const emailSchema = yup
  .string()
  .required('Email is required')
  .email('Invalid email format');
const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters');
const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref('password')], 'Passwords must match')
  .required('Confirm Password is required');
const usernameSchema = yup.string().required('Username is required');
export const schemaValidate = yup
  .object({
    accountName: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .required({});
