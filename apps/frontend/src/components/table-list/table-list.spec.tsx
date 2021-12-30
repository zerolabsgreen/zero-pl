import { render } from '@testing-library/react';

import TableList from './table-list';
import { FuelTypeEnum } from '../fuel-type/fuel-type';
import { PurchaseDto } from '@energyweb/zero-protocol-labs-api-client';

describe('TableList', () => {
  const mockData: PurchaseDto = {
    files: [],
    filecoinNodes: [],
    seller: {
      id: 'SellerId',
      contactPerson: 'John Doe',
      addressLine1: 'Address line 1',
      addressLine2: 'Address line 2',
      name: 'An Name',
    },
    id: 'PurchaseId',
    buyer: {
      id: 'BuyerId',
      name: 'Buyer Name',
      filecoinNodes: [],
    },
    certificate: {
      id: 'CertificateId',
      generatorName: '-',
      country: 'Poland',
      generatorId: 'GeneratorId',
      energySource: FuelTypeEnum.Solar,
      generationStart: '2020-11-01T00:00:00.000Z',
      generationEnd: '2021-06-01T23:59:59.999Z',
    },
    recsTransactions: [],
    recsSold: 0,
  };

  it('should render successfully', () => {
    const { container } = render(
      <TableList
        sellerId={mockData.seller.id}
        recsSold={mockData.recsSold}
        data={mockData.certificate}
      />
    );
    expect(container).toBeTruthy();
  });

  it('should match inline snapshot', () => {
    const { container } = render(
      <TableList
        sellerId={mockData.seller.id}
        recsSold={mockData.recsSold}
        data={mockData.certificate}
      />
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="MuiBox-root css-nf6l04"
  >
    <table
      class="MuiTable-root css-rqglhn-MuiTable-root"
    >
      <thead
        class="MuiTableHead-root css-15wwp11-MuiTableHead-root"
      >
        <tr
          class="MuiTableRow-root MuiTableRow-head css-1q1u3t4-MuiTableRow-root"
        >
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            <span
              class="MuiBox-root css-0"
            >
              Seller ID
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-psxpd0-MuiSvgIcon-root"
                data-testid="HelpOutlineIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </span>
          </th>
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            Generator Name
          </th>
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            <span
              class="MuiBox-root css-0"
            >
              Generator ID
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-psxpd0-MuiSvgIcon-root"
                data-testid="HelpOutlineIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </span>
          </th>
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            <span
              class="MuiBox-root css-0"
            >
              Country
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-psxpd0-MuiSvgIcon-root"
                data-testid="HelpOutlineIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </span>
          </th>
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            <span
              class="MuiBox-root css-0"
            >
              Fuel Type
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-psxpd0-MuiSvgIcon-root"
                data-testid="HelpOutlineIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </span>
          </th>
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            <span
              class="MuiBox-root css-0"
            >
              RECs Sold (MWh)
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-psxpd0-MuiSvgIcon-root"
                data-testid="HelpOutlineIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </span>
          </th>
          <th
            class="MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeMedium makeStyles-thCell-4 css-1ygcj2i-MuiTableCell-root"
            scope="col"
          >
            <span
              class="MuiBox-root css-0"
            >
              Period of Generation
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-psxpd0-MuiSvgIcon-root"
                data-testid="HelpOutlineIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </span>
          </th>
        </tr>
      </thead>
      <tbody
        class="MuiTableBody-root css-123q714-MuiTableBody-root"
      >
        <tr
          class="MuiTableRow-root css-1q1u3t4-MuiTableRow-root"
        >
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            <div
              class="MuiBox-root css-0"
              title="SellerId"
            >
              Selle...Id
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium e1dqeb3z0 css-1rzj2vm-MuiSvgIcon-root-StyledContentCopy"
                data-testid="ContentCopyOutlinedIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                />
              </svg>
            </div>
          </td>
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            -
          </td>
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            GeneratorId
          </td>
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            Poland
          </td>
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            <div
              class="MuiBox-root css-70qvj9"
            >
              <div
                class="MuiBox-root css-12z0wuy"
              >
                Solar
              </div>

              <svg
                height="22px"
              >
                solar.svg
              </svg>
            </div>
          </td>
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            0
          </td>
          <td
            class="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium makeStyles-tbCell-5 css-1ex1afd-MuiTableCell-root"
          >
            2020-11-01

            /

            2021-06-01
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
`);
  });
});
