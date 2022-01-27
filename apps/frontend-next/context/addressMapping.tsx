import { createContext, useContext, useState } from 'react';
import { FC } from 'react';

const AddressMappingState = createContext<Map<number, number[]> | null>(null);
const AddressMappingSetState = createContext<React.Dispatch<React.SetStateAction<Map<number, number[]>>> | null>(null);

export const AddressMappingProvider: FC = ({ children }) => {
  const [mapping, setMapping] = useState<Map<number, number[]>>(new Map());
  return (
    <AddressMappingState.Provider value={mapping}>
      <AddressMappingSetState.Provider value={setMapping}>
        {children}
      </AddressMappingSetState.Provider>
    </AddressMappingState.Provider>
  );
};

export const useAddressMappingState = () => {
  return useContext(AddressMappingState);
};

export const useAddressMappingSetState = () => {
  return useContext(AddressMappingSetState);
};
