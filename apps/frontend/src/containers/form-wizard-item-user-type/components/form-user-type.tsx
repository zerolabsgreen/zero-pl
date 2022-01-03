import { variables } from '@energyweb/zero-protocol-labs-theme';
import {
  FormControl,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import useStyles from './form-user-type.styles';
import { Countries } from '@energyweb/utils-general';
import React from 'react';
import BasicDatePicker from 'apps/frontend/src/components/date-picker/date-picker';
import ButtonIcon from '../../../assets/svg/whiteArrow.svg';
import { DateEnergySection } from './DateEnergySection';
import { Info } from 'apps/frontend/src/components/info/info';
import { Dayjs } from 'dayjs';
import { SelectAutocomplete } from 'apps/frontend/src/components/select-autocomplete';
import { Clear } from '@mui/icons-material';
import { WizardFormValues } from 'apps/frontend/src/pages/wizard-page/WizardPage.effects';

interface FormUserTypeProps {
  isFilecoin?: boolean;
  id: number;
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
  values: WizardFormValues;
  handleSectionRemove?: (id: number) => void;
}

export const FormUserType: React.FC<FormUserTypeProps> = ({
  isFilecoin,
  handleFormikChange,
  setFieldValue,
  id,
  values,
  handleSectionRemove,
}) => {
  const styles = useStyles();
  const [sectionOpen, setSectionOpen] = React.useState<boolean>(false);

  const amountOfEnergyFields =
    values[`generalEndDate_${id}`] && values[`generalStartDate_${id}`]
      ? (values[`generalEndDate_${id}`] as Dayjs).year() -
        (values[`generalStartDate_${id}`] as Dayjs).year()
      : -1;

  const buttonClick = () => {
    if (amountOfEnergyFields >= 0) {
      setSectionOpen(!sectionOpen);
    }
    return;
  };

  return (
    <FormControl className={styles.form}>
      <Box p={'16px'}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Info
              isFilecoin={isFilecoin}
              hideTimeout={1000}
              boxProps={{
                fontSize: variables.fontSize,
                fontWeight: 600,
                color: variables.black,
              }}
              popoverContentElement={<div>Miner IDs / Address </div>}
            >
              {isFilecoin && 'Miner IDs /'} Address
            </Info>
            {handleSectionRemove ? (
              <IconButton onClick={() => handleSectionRemove(id)}>
                <Clear fontSize="small" />
              </IconButton>
            ) : null}
          </Box>
          <TextField
            fullWidth
            name={`minerId_${id}`}
            onChange={handleFormikChange}
            value={values[`minerId_${id}`] ?? ''}
            InputProps={{
              className: isFilecoin ? styles.input : styles.inputBitcoun,
            }}
          />
        </Box>
        <Box mt="15px">
          <Typography
            color={variables.black}
            fontSize={variables.fontSize}
            fontWeight={600}
            mb={'13px'}
          >
            Country
          </Typography>
          <Box maxWidth={'100%'}>
            <SelectAutocomplete
              value={values[`country_${id}`]}
              handleChange={(value) => setFieldValue(`country_${id}`, value)}
              options={Countries.map((country) => ({
                value: country.code,
                title: country.name,
              }))}
              placeholder="Select country"
              isFilecoin={!!isFilecoin}
            />
          </Box>
          <Box className={styles.wrapperDate}>
            <Box className={styles.blockDate}>
              <Typography
                color={variables.black}
                fontSize={variables.fontSize}
                fontWeight={600}
                mb={'8px'}
                ml={'14px'}
              >
                Consumption start date
              </Typography>
              <BasicDatePicker
                isFilecoin={isFilecoin}
                value={values[`generalStartDate_${id}`] || ''}
                setValue={(value) =>
                  setFieldValue(`generalStartDate_${id}`, value)
                }
              />
            </Box>
            <Box className={styles.blockDate}>
              <Typography
                color={variables.black}
                fontSize={variables.fontSize}
                fontWeight={600}
                mb={'8px'}
                ml={'14px'}
              >
                Consumption end date
              </Typography>
              <BasicDatePicker
                isFilecoin={isFilecoin}
                value={values[`generalEndDate_${id}`] || ''}
                setValue={(value) =>
                  setFieldValue(`generalEndDate_${id}`, value)
                }
              />
            </Box>
            <Box className={styles.blockBtn}>
              <Button
                onClick={buttonClick}
                className={
                  isFilecoin ? styles.buttonStyle : styles.buttonGreenStyle
                }
              >
                <img
                  className={`${sectionOpen && styles.icon}`}
                  src={ButtonIcon}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box p={' 0 8px 8px 8px'} bgcolor={variables.white}>
        <Box className={styles.sectionBtn}>
          <Button
            onClick={buttonClick}
            sx={{
              borderRadius: `${
                sectionOpen && !isFilecoin && '5px 5px 0 0 !important'
              }`,
            }}
            className={
              isFilecoin ? styles.buttonStyle : styles.buttonGreenStyle
            }
          >
            <img className={`${sectionOpen && styles.icon}`} src={ButtonIcon} />
          </Button>
        </Box>
        {sectionOpen && (
          <Box>
            <DateEnergySection
              id={id}
              handleFormikChange={handleFormikChange}
              isFilecoin={isFilecoin}
              setFieldValue={setFieldValue}
              amountOfFields={amountOfEnergyFields}
              values={values}
            />
          </Box>
        )}
      </Box>
    </FormControl>
  );
};
