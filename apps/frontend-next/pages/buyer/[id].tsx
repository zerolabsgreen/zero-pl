import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useBuyersControllerFindOne, useFilecoinNodesControllerFindOne } from '@energyweb/zero-protocol-labs-api-client';
import LoadingBlock from '../../components/common/LoadingBlock';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import PageSection from '../../components/common/PageSection';
import PurchaseBuyerInformation from '../../components/BuyerPage/PurchaseBuyerInformation';
import CertificatesWithFilters from '../../components/BuyerPage/CertificatesWithFilters';

dayjs.extend(utc);

const BuyerPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const filecoinNodeId = id as string;

  const {
    data: filecoinNode,
    isLoading: isFilecoinNodeLoading
  } = useFilecoinNodesControllerFindOne(filecoinNodeId, {
    query: { enabled: !!filecoinNodeId }
  });

  const {
    data: buyer,
    isLoading: isBuyerLoading
  } = useBuyersControllerFindOne(filecoinNode?.buyerId, {
    query: { enabled: !!filecoinNode?.buyerId }
  });

  const isLoading = isFilecoinNodeLoading || isBuyerLoading;

  return !isLoading && buyer && filecoinNode ? (
    <Container maxWidth={'xl'}>
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbList={[
            'Product Offer',
            `Miner ID: ${id}`,
            'User Page',
          ]}
        />
        <PageSection headingText={'User Page'}>
          <PurchaseBuyerInformation
            buyerId={filecoinNode.buyerId}
            buyerName={buyer.name}
            filecoinMinerIdList={buyer.filecoinNodes}
          />
        </PageSection>
        <CertificatesWithFilters filecoinNodeId={filecoinNodeId} />
      </Grid>
    </Grid>
    </Container>
  ) : (
    <LoadingBlock />
  );
};

export default BuyerPage;

