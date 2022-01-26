import { FC } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import PageSection from '../../../../components/PageSection';
import FieldLabel from '../../../../components/FieldLabel';
import { useStyles } from './product-summary-details.style';

export const ProductSummaryDetails: FC = () => {
  const classes = useStyles();

  return (
    <PageSection
      headingText={'Product summary'}
      paperClassName={classes.productSummarySection}
      headingTextClassName={classes.headingTextClassName}
    >
      <Typography className={classes.productSummaryOverlay}>
        We will have more details in the future..
      </Typography>
      <Grid container className={classes.grid}>
        <Grid
          item
          container
          xs={12}
          md={9}
          lg={8}
          spacing={10}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          <Grid item md={4} lg={4}>
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel labelText={'Country'} className={classes.label} />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel labelText={'Generator'} className={classes.label} />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel labelText={'Seller'} className={classes.label} />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel
                  labelText={'Product type'}
                  className={classes.label}
                />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel
                  labelText={'Inssuing date'}
                  className={classes.label}
                />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <FieldLabel labelText={'Product ID'} className={classes.label} />
              <Box className={classes.box}></Box>
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <Box className={classes.infoItem}>
              <FieldLabel labelText={'Source'} className={classes.label} />
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel labelText={'Vintage'} className={classes.label} />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <FieldLabel labelText={'Amount'} className={classes.label} />
              <Box className={classes.box}></Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item container md={3} lg={4} spacing={10}>
          <Grid
            item
            container
            xs={12}
            lg={6}
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel labelText={'Price'} className={classes.label} />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
            <Box className={classes.infoItem}>
              <FieldLabel
                labelText={'Extra informations'}
                className={classes.label}
              />
              <Box className={classes.box}></Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: { xs: 'block', md: 'none', lg: 'block' },
            }}
          >
            <Box className={classes.infoItem}>
              <Box display="flex" className={classes.labelWrapper}>
                <FieldLabel
                  labelText={'The reservation end date'}
                  className={classes.label}
                />
                <HelpOutline />
              </Box>
              <Box className={classes.box}></Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </PageSection>
  );
};
