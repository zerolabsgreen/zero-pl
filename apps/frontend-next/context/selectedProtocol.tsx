import { ProtocolTypeEnumType } from '@energyweb/zero-protocol-labs-api-client';
import React, { createContext, useContext, useState } from 'react';
import { FC } from 'react';

const SelectedProtocolStore = createContext<ProtocolTypeEnumType | null>(null);
const SelectedProtocolDispatch = createContext<
  React.Dispatch<React.SetStateAction<ProtocolTypeEnumType | null>>
>(() => {return});

export const SelectedProtocolProvider: FC = ({ children }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolTypeEnumType | null>(null);
  return (
    <SelectedProtocolStore.Provider value={selectedProtocol}>
      <SelectedProtocolDispatch.Provider value={setSelectedProtocol}>
        {children}
      </SelectedProtocolDispatch.Provider>
    </SelectedProtocolStore.Provider>
  );
};

export const useSelectedProtocolStore = () => {
  return useContext(SelectedProtocolStore);
};

export const useSelectedProtocolDispatch = () => {
  return useContext(SelectedProtocolDispatch);
};
