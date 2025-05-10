import * as yup from 'yup';

const addressSchema = yup.string().required('address is required');
export const schemaValidate = yup
  .object({
    address: addressSchema,
  })
  .required({});
