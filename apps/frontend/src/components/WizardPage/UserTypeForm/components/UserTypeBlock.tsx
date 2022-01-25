import { FC, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Countries } from '@energyweb/utils-general';
import {
  AutocompleteOption,
  FormDatePicker,
  InfoPopover,
  SelectAutocomplete
} from '@zero-labs/zero-ui-components';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Clear } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ButtonIcon from '../../../../assets/svg/whiteArrow.svg';
import { ReactComponent as CalendarIconLight } from '../../../../assets/svg/calendarIconLight.svg';
import type { WizardFormValues } from '../../../../pages/WizardPage/effects';
import { FilecoinColors } from '../../../../utils'
import { DateEnergySection } from './DateEnergySection';
import './UserTypeBlock.css';

interface UserTypeBlockProps {
  isFilecoin?: boolean;
  id: number;
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
  values: WizardFormValues;
  handleSectionRemove?: (id: number) => void;
}

const countriesOptions: AutocompleteOption[] = Countries.map((country) => ({
  value: country.code,
  title: country.name,
}))

export const UserTypeBlock: FC<UserTypeBlockProps> = ({
  isFilecoin,
  handleFormikChange,
  setFieldValue,
  id,
  values,
  handleSectionRemove,
}) => {
  const [sectionOpen, setSectionOpen] = useState(false);
  const amountOfEnergyFields =
    values[`generalEndDate_${id}`] && values[`generalStartDate_${id}`]
      ? (values[`generalEndDate_${id}`] as Dayjs).year() -
        (values[`generalStartDate_${id}`] as Dayjs).year()
      : -1;
  const buttonClick = () => {
    if (amountOfEnergyFields >= 0) return setSectionOpen(!sectionOpen);
    return;
  };

  return (
    <StyledFormControl>
      <Box p='16px'>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <InfoPopover
              hideTimeout={500}
              boxProps={{
                fontSize: '14px',
                fontWeight: 600,
                color: FilecoinColors.simpleText
              }}
              popoverContentElement={<div>Miner IDs / Address </div>}
            >
              {isFilecoin && 'Miner IDs /'} Address
            </InfoPopover>
            {handleSectionRemove ? (
              <IconButton onClick={() => handleSectionRemove(id)}>
                <Clear fontSize="small" />
              </IconButton>
            ) : null}
          </Box>
          <StyledTextField
            fullWidth
            isFilecoin={isFilecoin}
            name={`minerId_${id}`}
            onChange={handleFormikChange}
            value={values[`minerId_${id}`] ?? ''}
          />
        </Box>
        <Box mt="15px">
          <Typography
            color={FilecoinColors.simpleText}
            fontSize={'14px'}
            fontWeight={600}
            mb={'13px'}
          >
            Country
          </Typography>
          <Box maxWidth={'100%'}>
            <SelectAutocomplete
              name={`country_${id}`}
              value={values[`country_${id}`]}
              setFieldValue={setFieldValue}
              options={countriesOptions}
              textFieldProps={{ className: isFilecoin ? 'user-type-block-select-autocomplete-filecoin' : undefined }}
            />
          </Box>
          <WrapperDate>
            <BlockDate>
              <DateInputLabel>
                Consumption start date
              </DateInputLabel>
              <FormDatePicker
                name={`generalStartDate_${id}`}
                value={values[`generalStartDate_${id}`] || ''}
                setFieldValue={setFieldValue}
                CustomCalendarIcon={isFilecoin ? CalendarIconLight : undefined}
                textFieldProps={{ className: isFilecoin ? 'user-type-block-datepicker-input-filecoin' : 'user-type-block-datepicker-input' }}
              />
            </BlockDate>
            <BlockDate>
              <DateInputLabel>
                Consumption end date
              </DateInputLabel>
              <FormDatePicker
                name={`generalEndDate_${id}`}
                value={values[`generalEndDate_${id}`] || ''}
                setFieldValue={setFieldValue}
                CustomCalendarIcon={isFilecoin ? CalendarIconLight : undefined}
                textFieldProps={{ className: isFilecoin ? 'user-type-block-datepicker-input-filecoin' : 'user-type-block-datepicker-input' }}
              />
            </BlockDate>
            <ButtonBlock>
              <StyledButton isFilecoin={isFilecoin} onClick={buttonClick}>
                <StyledButtonImg
                  sectionOpen={sectionOpen}
                  src={ButtonIcon}
                />
              </StyledButton>
            </ButtonBlock>
          </WrapperDate>
        </Box>
      </Box>
      {sectionOpen && (
        <DateEnergySectionWrapper>
          <DateEnergySection
            id={id}
            handleFormikChange={handleFormikChange}
            isFilecoin={isFilecoin}
            setFieldValue={setFieldValue}
            amountOfFields={amountOfEnergyFields}
            values={values}
          />
        </DateEnergySectionWrapper>
      )}
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)(({ theme }) => `
  background-color: ${theme.palette.background.paper};
  box-shadow: 0px 4px 10px rgba(160, 154, 198, 0.2);
  border-radius: 5px;
  margin-top: 8px;
  width: 488px;
  ${theme.breakpoints.down('sm')} {
    width: 100%;
  };
`);

const StyledTextField = styled(TextField, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ isFilecoin, theme }) => `
  & input {
    font-size: 18px;
    font-weight: 700;
    background-color: ${isFilecoin && FilecoinColors.primaryLight};
    color: ${isFilecoin ? FilecoinColors.primary : theme.palette.primary.main};
    padding: 12px 13px;
  };
`)

const WrapperDate = styled(Box)(({ theme }) => `
  display: flex;
  margin-top: 24px;
  align-items: flex-end;
  justify-content: space-between;
  ${theme.breakpoints.down('sm')} {
    flex-direction: column;
    margin-top: 16px;
  };
`);

const BlockDate = styled(Box)(({ theme }) => `
  width: 192px;
  ${theme.breakpoints.down('sm')} {
    width: 100%;
    margin-bottom: 16px;
  };
`);

const DateInputLabel = styled(Typography)`
  color: ${FilecoinColors.simpleText};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  margin-left: 14px;
`

const ButtonBlock = styled(Box)(({ theme }) => `
  height: 100%;
  ${theme.breakpoints.down('sm')} {
    display: none;
  };
`);

const StyledButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin?: boolean}>(({ theme, isFilecoin }) => `
  min-width: 48px;
  min-height: 48px;
  border-radius: 5px;
  background-color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
  &:hover {
    background-color: ${isFilecoin ? FilecoinColors.primary : theme.palette.secondary.main};
  };
  ${theme.breakpoints.down('sm')} {
    width: 100%;
  };
`);

const StyledButtonImg = styled('img', { shouldForwardProp: (prop) => prop !== 'sectionOpen' })<{sectionOpen: boolean}>(({ sectionOpen }) => `
  transform: ${sectionOpen && 'rotate(180deg)'};
`);

const DateEnergySectionWrapper = styled(Box)(({ theme }) => `
  padding: 0 8px 8px 8px;
  background-color: ${theme.palette.background.paper};
`);

// const StyledSelectInput = styled(OutlinedInput, { shouldForwardProp: (prop) => prop !== 'isFilecoin' })<{isFilecoin: boolean}>(({ theme, isFilecoin }) => `
//   background-color: ${isFilecoin && FilecoinColors.primaryLight};
//   & span {
//     color: ${isFilecoin ? FilecoinColors.primary : theme.palette.primary.main};
//   };
// `);

