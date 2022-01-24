import { FC } from 'react';
import clsx from 'clsx';
import {
  Grid,
  Box,
  Typography,
  Paper,
  SvgIcon,
  IconButton,
  Collapse,
} from '@mui/material';
import { Unit } from '../../../../utils';
import { ReactComponent as Arrow } from '../../assets/svg/arrow-up.svg';
import { ReactComponent as CalendarIconLight } from '../../assets/svg/calendarIconDark.svg';
import { useProductSummaryBlockEffects } from './product-summary-block.effects';
import { useStyles } from './product-summary-block.style';

export const ProductSummaryBlock: FC = () => {
  const classes = useStyles();
  const { isMobile, expanded, handleExpand, products } =
    useProductSummaryBlockEffects();

  return (
    <Paper className={classes.paper}>
      <Box display="flex" justifyContent="space-between">
        <Typography className={classes.title}>
          Summary of your Products
        </Typography>
        <IconButton
          className={clsx({ [classes.expanded]: expanded }, classes.button)}
          onClick={handleExpand}
        >
          <SvgIcon
            component={Arrow}
            className={classes.arrow}
            viewBox="0 0 13 8"
          />
        </IconButton>
      </Box>
      <Collapse in={isMobile ? true : expanded} unmountOnExit>
        <Paper className={classes.paperInner}>
          {products.map((product) => {
            return (
              <Grid container key={product.address} className={classes.grid}>
                <Grid item className={classes.gridItem}>
                  <Box display="flex" className={classes.item}>
                    <Typography className={classes.label}>
                      Miner IDs / Address
                    </Typography>
                    <Box
                      sx={{ minWidth: { xs: 158, md: 'initial' } }}
                      className={classes.valueWrapper}
                    >
                      <Typography className={classes.value}>
                        {product.address}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item className={classes.gridItem}>
                  <Box display="flex" className={classes.item}>
                    <Typography className={classes.label}>
                      Generation start date
                    </Typography>
                    <Box className={classes.valueWrapper} width={158}>
                      <Typography className={classes.value}>
                        {product.startDate}
                      </Typography>
                      <SvgIcon component={CalendarIconLight} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item className={classes.gridItem}>
                  <Box display="flex" className={classes.item}>
                    <Typography className={classes.label}>
                      Generation end date
                    </Typography>
                    <Box className={classes.valueWrapper} width={158}>
                      <Typography className={classes.value}>
                        {product.endDate}
                      </Typography>
                      <SvgIcon component={CalendarIconLight} />
                    </Box>
                  </Box>
                </Grid>
                <Grid item className={classes.gridItem}>
                  <Box display="flex" className={classes.item}>
                    <Typography
                      sx={{ textAlign: { xs: 'right', md: 'left' } }}
                      className={classes.label}
                    >
                      {Unit.MWh}
                    </Typography>
                    <Box className={classes.valueWrapper} width={104}>
                      <Typography className={classes.value} noWrap>
                        {product.volume}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })}
        </Paper>
      </Collapse>
    </Paper>
  );
};
