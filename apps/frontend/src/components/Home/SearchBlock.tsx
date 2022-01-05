import { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { FormDatePicker, FormSelect } from '@zerolabs/zero-pl-components';

export const initialFormData = {
  region: '',
  deviceType: '',
  productType: '',
  generalStartDate: {} as Dayjs,
  generalEndDate: {} as Dayjs,
  amount: '',
};

const onSubmit = (data, e) => console.log(data, e);
const onError = (errors, e) => console.log(errors, e);

export const SearchBlock = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: initialFormData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormBlock>
        <Box display="flex" width="100%">
          <Box mr="16px" width="100%">
            <InputLabel>
              Regions
            </InputLabel>
            <FormSelect
              name="region"
              control={control}
              options={regionOptionsMock}
              textFieldProps={{ margin: 'none' }}
            />
          </Box>
          <Box mb="16px" width="100%">
            <InputLabel>
              Device type
            </InputLabel>
            <FormSelect
              name="deviceType"
              control={control}
              options={deviceTypeOptionsMock}
              textFieldProps={{ margin: 'none' }}
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
                control={control}
                options={productTypeOptionsMock}
                textFieldProps={{ margin: 'none' }}
              />
            </Box>
            <Box width="100%">
              <InputLabel>
                Energy amount
              </InputLabel>
              <TextField
                fullWidth
                {...register('amount')}
                placeholder="Amount"
                InputProps={{
                  endAdornment: (
                    <span>MWh</span>
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
                  control={control}
                  textFieldProps={{ margin: 'none' }}
                />
              </Box>
              <Box width="100%">
                <InputLabel>
                  Generation end date
                </InputLabel>
                <FormDatePicker
                  name="generalEndDate"
                  control={control}
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
    & .MuiSvgIcon-root {
      margin-right: 20px;
    }
`

const InputLabel = styled(Typography)`
  margin-left: 15px;
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
`)
