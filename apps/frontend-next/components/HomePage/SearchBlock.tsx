import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { FormDatePicker, FormSelect } from '@zero-labs/zero-ui-components';

type SearchBlockFormValues = {
  region: string;
  deviceType: string;
  productType: string;
  generalStartDate: Dayjs;
  generalEndDate: Dayjs;
  amount: string;
}

export const initialFormData: SearchBlockFormValues = {
  region: '',
  deviceType: '',
  productType: '',
  generalStartDate: {} as Dayjs,
  generalEndDate: {} as Dayjs,
  amount: '',
};

const onSubmit = (data: any) => console.log(data);

export const SearchBlock = () => {
  const formik = useFormik<SearchBlockFormValues>({
    initialValues: initialFormData,
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormBlock>
        <Box display="flex" width="100%">
          <Box mr="16px" width="100%">
            <InputLabel>
              Regions
            </InputLabel>
            <FormSelect
              name="region"
              handleChange={formik.handleChange}
              value={formik.values.region}
              options={regionOptionsMock}
            />
          </Box>
          <Box mb="16px" width="100%">
            <InputLabel>
              Device type
            </InputLabel>
            <FormSelect
              name="deviceType"
              handleChange={formik.handleChange}
              value={formik.values.deviceType}
              options={deviceTypeOptionsMock}
            />
          </Box>
        </Box>
        <Box width="100%" mb="16px" display="flex">
          <Box display="flex" mr="16px" width="100%">
            <Box width="100%" mr="16px">
              <InputLabel>
                Product Type
              </InputLabel>
              <FormSelect
                name="productType"
                handleChange={formik.handleChange}
                value={formik.values.productType}
                options={productTypeOptionsMock}
              />
            </Box>
            <Box width="100%">
              <InputLabel>
                Energy amount
              </InputLabel>
              <TextField
                fullWidth
                name="amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
                placeholder="Amount"
                InputProps={{
                  endAdornment: (
                    <StyledEndAdornment>MWh</StyledEndAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box display="flex" width="100%">
              <Box width="100%" mr="21px">
                <InputLabel>
                  Generation start date
                </InputLabel>
                <FormDatePicker
                  name="generalStartDate"
                  setFieldValue={formik.setFieldValue}
                  value={formik.values.generalStartDate}
                  textFieldProps={{ margin: 'none', sx: { fontWeight: 700 } }}
                />
              </Box>
              <Box width="100%">
                <InputLabel>
                  Generation end date
                </InputLabel>
                <FormDatePicker
                  name="generalEndDate"
                  setFieldValue={formik.setFieldValue}
                  value={formik.values.generalEndDate}
                  textFieldProps={{ margin: 'none' }}
                />
              </Box>
          </Box>
        </Box>
      </FormBlock>
      <Box display="flex" justifyContent="flex-end" mt="16px">
        <Box width="340px">
            <SubmitBtn type="submit" variant='contained' endIcon={<SearchIcon />}>
              Search
            </SubmitBtn>
        </Box>
      </Box>
    </form>
  )
}

//These are mock data, when the basic data is ready, we will replace it with mock data.
export const regionOptionsMock = [
  { value: 'Regiontest0', label: 'Regiontest0' },
  { value: 'Regiontest1', label: 'Regiontest1' },
  { value: 'Regiontest2', label: 'Regiontest2' },
];
//These are mock data, when the basic data is ready, we will replace it with mock data.
export const deviceTypeOptionsMock = [
  { value: 'Devicetest0', label: 'Devicetest0' },
  { value: 'Devicetest1', label: 'Devicetest1' },
  { value: 'Devicetest2', label: 'Devicetest2' },
];
//These are mock data, when the basic data is ready, we will replace it with mock data.
export const productTypeOptionsMock = [
  { value: 'Producttest0', label: 'Producttest0' },
  { value: 'Producttest1', label: 'Producttest1' },
  { value: 'Producttest2', label: 'Producttest2s' },
];


const FormBlock = styled(Box)`
    background-color: #fff;
    padding: 32px 31px 32px 32px;
    width: 100%;
    flex-direction: unset;
    box-shadow: 0px 0px 10px rgba(112, 60, 187, 0.2);
    border-radius: 5px;
    & .MuiOutlinedInput-root {
      height: 48px;
      border-radius: 5px;
      & .MuiSelect-select {
        border-radius: 5px;
        padding: 12px 0 12px 14px;
      }
    }
`

const InputLabel = styled(Typography)`
  margin-left: 15px;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #6A658A;
`

const SubmitBtn = styled(Button)(({ theme }) => `
  width: 100%;
  background-color: #fff;
  color: ${theme.palette.primary.main};
  border-radius: 5px;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
  & .MuiButton-endIcon {
    color: ${theme.palette.secondary.main}
  }
  &:hover {
    background-color: ${theme.palette.secondary.main};
    color: #fff;
    & .MuiButton-endIcon {
      color: ${theme.palette.primary.main}
    }
  },
`);

const StyledEndAdornment = styled('span')`
  font-weight: 600;
  font-size: 18px;
`;
