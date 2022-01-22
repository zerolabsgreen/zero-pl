import { Box, Grid, TextField, Typography } from '@mui/material';
import { variables } from '@energyweb/zero-protocol-labs-theme';
import { useEffect, useMemo } from 'react';
import { useAddressMappingSetState } from '../../../context';
import { WizardFormValues } from '../../../pages/WizardPage/effects';
import DatePicker from '../../../components/date-picker/date-picker';
import useStyles from './DateEnergySection.styles';

export interface IDateSectionProps {
  isFilecoin?: boolean;
  id: number;
  values: WizardFormValues;
  amountOfFields: number;
  handleFormikChange: (value: any) => void;
  setFieldValue: (name: string, value: any) => void;
}

export const DateEnergySection: React.FC<IDateSectionProps> = ({
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

  const styles = useStyles();

  return (
    <>
      {fieldsRenderArr.length > 0 ? (
        <Grid
          className={isFilecoin ? styles.gridFilecoin : styles.grid}
          style={{
            backgroundColor: isFilecoin
              ? variables.filcoinColor
              : variables.inputBackgroundColor,
            padding: '15px 10px',
            border: ` ${
              !isFilecoin && `2px solid ${variables.secondaryColor}`
            }`,
          }}
        >
          {fieldsRenderArr.map((nestedId) => {
            return (
              <Grid
                key={nestedId}
                item
                display={'flex'}
                justifyContent={'space-between'}
                mb={'10px'}
              >
                <Box display={'flex'} flexWrap={'wrap'}>
                  <Box width={'160px'}>
                    <Typography
                      color={
                        isFilecoin ? variables.white : variables.primaryColor
                      }
                      fontSize={variables.fontSize}
                      fontWeight={600}
                      mb={'8px'}
                      ml={'14px'}
                    >
                      Consumption start date
                    </Typography>
                    <DatePicker
                      value={values[`startDate_${id}_${nestedId}`] || ''}
                      setValue={(value) =>
                        setFieldValue(`startDate_${id}_${nestedId}`, value)
                      }
                      color="darkBlue"
                      isFilecoin={isFilecoin}
                      calendar="white"
                    />
                  </Box>
                  <Box className={styles.endDate}>
                    <Typography
                      color={
                        isFilecoin ? variables.white : variables.primaryColor
                      }
                      fontSize={variables.fontSize}
                      fontWeight={600}
                      mb={'8px'}
                      ml={'14px'}
                    >
                      Consumption end date
                    </Typography>
                    <DatePicker
                      value={values[`endDate_${id}_${nestedId}`] || ''}
                      setValue={(value) =>
                        setFieldValue(`endDate_${id}_${nestedId}`, value)
                      }
                      color="darkBlue"
                      isFilecoin={isFilecoin}
                      calendar="white"
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    color={
                      isFilecoin ? variables.white : variables.primaryColor
                    }
                    fontSize={variables.fontSize}
                    fontWeight={600}
                    mb={'8px'}
                    ml={'14px'}
                  >
                    Mwh
                  </Typography>
                  <Box
                    height={'48px'}
                    width={'100px'}
                    sx={{
                      border: `1px solid ${variables.white}`,
                      borderRadius: '5px',
                    }}
                  >
                    <TextField
                      name={`energy_${id}_${nestedId}`}
                      onChange={handleFormikChange}
                      value={values[`energy_${id}_${nestedId}`] || ''}
                      inputProps={{
                        style: {
                          padding: '12px',
                          backgroundColor: isFilecoin
                            ? variables.filcoinColor
                            : variables.white,
                          color: isFilecoin
                            ? variables.white
                            : variables.primaryColor,
                          fontWeight: 700,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </>
  );
};
