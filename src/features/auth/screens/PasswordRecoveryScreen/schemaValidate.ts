import * as yup from 'yup';
const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters');
const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref('password')], 'Passwords must match')
  .required('Confirm Password is required');
export const schemaValidate = yup
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .required({});
