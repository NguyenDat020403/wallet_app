import * as yup from 'yup';

const usernameSchema = yup.string().required('Username is required');
const bioSchema = yup.string().max(255);
export const schemaValidate = yup
  .object({
    accountName: usernameSchema,
    bio: bioSchema,
  })
  .required({});
