import React from 'react';
import { ProvideSessionCtx } from './redux/session/ctx';
import {
  ApolloDynamicLinkContext,
  DynamicLinkSrv
} from './util/apollo/dynamicLink';

interface Props {
  StoreProvider: React.FC;
  dynamicLinkSrv: DynamicLinkSrv;
}
export const Providers: React.FC<Props> = ({
  children,
  StoreProvider,
  dynamicLinkSrv
}) => {
  return (
    <StoreProvider>
      <ProvideSessionCtx>
        <ApolloDynamicLinkContext.Provider value={dynamicLinkSrv}>
          {children}
        </ApolloDynamicLinkContext.Provider>
      </ProvideSessionCtx>
    </StoreProvider>
  );
};
