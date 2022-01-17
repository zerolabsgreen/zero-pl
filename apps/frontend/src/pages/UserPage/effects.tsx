import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router";
import { BreadcrumbsRoutes } from "../../components/BreadcrumbsLinks";
import { CertificatePerYear } from "./components";

type LocationState = {
  previousRoutes: BreadcrumbsRoutes[]
}

const mockUserName = 'zerolabs.zero.ewc'
const mockUserAddress = '0xABC76fc7bce1734961d8aD9d6cbe49629baf1XYZ'

const mockRedeemedData: CertificatePerYear[] = [
  { year: 2020, amount: 100 },
  { year: 2021, amount: 60 },
  { year: 2022, amount: 0 },
  { year: 2023, amount: 0 },
]

const mockTransferableData: CertificatePerYear[] = [
  { year: 2020, amount: 0 },
  { year: 2021, amount: 500 },
  { year: 2022, amount: 0 },
  { year: 2023, amount: 0 },
]

const mockContractsData: CertificatePerYear[] = [
  { year: 2020, amount: 100 },
  { year: 2021, amount: 60 },
  { year: 2022, amount: 0 },
  { year: 2023, amount: 0 },
]

export enum CertificateBlocksEnum {
  Redeemed = 'Redeemed',
  Transferable = 'Transferable',
  Contracts = 'Contracts'
}

export const useUserPageEffects = () => {
  const location = useLocation();
  const locState = location.state as LocationState;
  const previousRoutes = locState?.previousRoutes ?? [];
  const breadcrumbs: BreadcrumbsRoutes[] = [
    ...previousRoutes,
    { name: `User ${mockUserName}` }
  ];
  const [selectedBlock, setSelectedBlock] = useState<CertificateBlocksEnum>(CertificateBlocksEnum.Redeemed);

  const handleRedeemedSelect = () => setSelectedBlock(CertificateBlocksEnum.Redeemed);
  const handleTransferableSelect = () => setSelectedBlock(CertificateBlocksEnum.Transferable);
  const handleContractsSelect = () => setSelectedBlock(CertificateBlocksEnum.Contracts);

  const handleCertificateTypeChange = (event: SelectChangeEvent) => {
    setSelectedBlock(event.target.value as CertificateBlocksEnum)
  };

  return {
    breadcrumbs,
    mockUserName,
    mockUserAddress,
    selectedBlock,
    handleRedeemedSelect,
    handleTransferableSelect,
    handleContractsSelect,
    mockRedeemedData,
    mockTransferableData,
    mockContractsData,
    handleCertificateTypeChange,
  };
}
