import type { FC } from 'react';
import Head from 'next/head';
import { useParams } from 'react-router-dom';
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
      <Head>
        <title>
          {breadcrumbList.join(' - ').replace('[productId]', params.productId ?? '')}
        </title>
      </Head>
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
