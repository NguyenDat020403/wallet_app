import * as yup from 'yup';

const contractAddressSchema = yup
  .string()
  .required('Contract address is required');
const symbolSchema = yup.string().required('Symbol is required');
const decimalSchema = yup.string().required('Symbol is required');
export const schemaValidate = yup
  .object({
    contract_address: contractAddressSchema,
    symbol: symbolSchema,
    decimal: decimalSchema,
  })
  .required({});
