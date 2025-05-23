import * as yup from 'yup';

const addressSchema = yup.string().required();
export const schemaValidate = yup.object({
  address: addressSchema,
});
