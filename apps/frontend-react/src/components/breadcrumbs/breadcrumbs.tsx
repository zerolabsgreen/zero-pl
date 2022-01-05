import { Box, Breadcrumbs as MatBreadcrumbs } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export interface BreadcrumbsProps {
  breadcrumbList: string[];
}

const Item: FC<{ text: string; active: boolean }> = ({ text, active }) => (
  <Box
    color={!active ? '#2D1155' : '#703CBB'}
    fontSize={'12px'}
    component={'span'}
  >
    {text}
  </Box>
);

export const Breadcrumbs = ({ breadcrumbList }: BreadcrumbsProps) => {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>
          {breadcrumbList
            .join(' - ')
            .replace('[productId]', params.productId ?? '')}
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
