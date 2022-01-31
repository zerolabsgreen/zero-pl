import { FC, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormDatePicker } from '@zero-labs/zero-ui-components';
import { useAddressMappingSetState } from '../../../../context';
import { ReactComponent as CalendarIconWhite } from '../../../../assets/calendarIconWhite.svg';
import { FilecoinColors } from '../../../../utils';
import { datePickerStyles, filecoinDatePickerStyles } from './DateEnergySection.styles';
import { WizardFormValues } from '../../WizardPageStepSelector';

export interface DateEnergySectionProps {
  isFilecoin?: boolean;
  id: number;
  values: WizardFormValues;
  amountOfFields: number;
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
}

export const DateEnergySection: FC<DateEnergySectionProps> = ({
  isFilecoin,
  values,
  setFieldValue,
  amountOfFields,
  handleFormikChange,
  id,
}) => {
  const fieldsRenderArr = useMemo(
    () => Array.from(Array(amountOfFields + 1).keys()),
    [amountOfFields]
  );
  const setAddressMapping = useAddressMappingSetState();

  useEffect(() => {
    setAddressMapping &&
      setAddressMapping((prev) => prev.set(id, fieldsRenderArr));
  }, [id, fieldsRenderArr, setAddressMapping]);

  return (
    <>
      {fieldsRenderArr.length > 0 && (
        <Wrapper isFilecoin={isFilecoin}>
          {fieldsRenderArr.map((nestedId) => {
            return (
              <ItemGridWrapper item key={nestedId}>
                <Box display={'flex'}>
                  <Box width={'160px'}>
                    <InputLabel isFilecoin={isFilecoin}>
                      Consumption start date
                    </InputLabel>
                    <FormDatePicker
                      setFieldValue={setFieldValue}
                      value={values[`startDate_${id}_${nestedId}`]}
                      name={`startDate_${id}_${nestedId}`}
                      CustomCalendarIcon={isFilecoin ? CalendarIconWhite : undefined}
                      textFieldProps={{ className: isFilecoin ? filecoinDatePickerStyles : datePickerStyles }}
                    />
                  </Box>
                  <EndDateWrapper>
                    <InputLabel isFilecoin={isFilecoin}>
                      Consumption end date
                    </InputLabel>
                    <FormDatePicker
                      value={values[`endDate_${id}_${nestedId}`] || ''}
                      setFieldValue={setFieldValue}
                      name={`endDate_${id}_${nestedId}`}
                      CustomCalendarIcon={isFilecoin ? CalendarIconWhite : undefined}
                      textFieldProps={{ className: isFilecoin ? filecoinDatePickerStyles : datePickerStyles }}
                    />
                  </EndDateWrapper>
                </Box>
                <Box>
                  <InputLabel isFilecoin={isFilecoin}>
                    Mwh
                  </InputLabel>
                  <TextFieldWrapper>
                    <StyledTextField
                      isFilecoin={isFilecoin}
                      name={`energy_${id}_${nestedId}`}
                      onChange={handleFormikChange}
                      value={values[`energy_${id}_${nestedId}`] || ''}
                    />
                  </TextFieldWrapper>
                </Box>
              </ItemGridWrapper>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled(Grid, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ theme, isFilecoin }) => `
  border-radius: 5px;
  background-color: ${isFilecoin ? FilecoinColors.primary : '#F6F3F9'};
  padding: 15px 10px;
  border: ${!isFilecoin && `2px solid ${theme.palette.secondary.main}`},
  ${theme.breakpoints.down('sm')} {
    border-radius: 0 0 5px 5px;
    margin-top: ${isFilecoin && '8px'};
  };
`);

const ItemGridWrapper = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InputLabel = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ theme, isFilecoin }) => `
  color: ${isFilecoin ? theme.palette.text.primary : theme.palette.primary.main};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  margin-left: 14px;
`);

const EndDateWrapper = styled(Box)`
  width: 160px;
  margin-left: 20px;
  @media (max-width: 510px) {
    margin-left: 2px;
  };
  @media (max-width: 488px) {
    margin-top: 10px
  };
`

const TextFieldWrapper = styled(Box)(({ theme }) => `
  height: 48px;
  width: 100px;
  border ${`1px solid ${theme.palette.background.paper}`};
`);

const StyledTextField = styled(TextField, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ theme, isFilecoin }) => `
  & input {
    padding: 14px 0 14px 14px;
    font-weight: 700;
    border-radius: 5px;
    background-color: ${isFilecoin ? FilecoinColors.primary : theme.palette.background.paper};
    color: ${isFilecoin ? theme.palette.text.primary : theme.palette.primary.main};
    border: ${isFilecoin && `1px solid ${theme.palette.background.paper}`}
  }
`)
