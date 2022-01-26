import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MatBreadcrumbs from '@mui/material/Breadcrumbs';

export interface BreadcrumbsProps {
  breadcrumbList: string[];
}

const Item: FC<{ text: string; active: boolean }> = ({ text, active }) => {
  const theme = useTheme();
  return (
    <Box
      color={!active ? theme.palette.primary.main : theme.palette.primary.light}
      fontSize={'12px'}
      component={'span'}
    >
      {text}
    </Box>
  )
};

export const Breadcrumbs = ({ breadcrumbList }: BreadcrumbsProps) => {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>
          {breadcrumbList.join(' - ').replace('[productId]', params.productId ?? '')}
        </title>
      </Helmet>
      <MatBreadcrumbs sx={{ mt: 3 }} separator={'›'}>
        {breadcrumbList.map((value, index) => (
          <Item
            active={index === breadcrumbList.length - 1}
            key={value}
            text={value.replace('[productId]', params.productId ?? '')}
          />
        ))}
      </MatBreadcrumbs>
    </>
  );
};

export default Breadcrumbs;
