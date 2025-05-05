import * as yup from 'yup';

const emailSchema = yup
  .string()
  .required('Email is required')
  .email('Invalid email format');
const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters');

export const schemaValidate = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required({});
