import { ApolloLink } from 'apollo-link';
import { createContext, useContext, useEffect } from 'react';
import {
  Name,
  OperationDef,
  OpResultHandler,
  apolloLinkOpResult,
  OpRequestHandler,
  apolloLinkOp
} from '../operation';
export interface DynamicLinkSrv {
  addLink: (link: ApolloLink) => () => void;
  addLinkOpResult: <D extends OperationDef>(
    operationName: Name<D>,
    resWatcher: OpResultHandler<D>
  ) => () => void;
  addLinkOp: <D extends OperationDef>(
    operationName: Name<D>,
    reqHandl: OpRequestHandler<D>
  ) => () => void;
}

export const ApolloDynamicLinkContext = createContext<DynamicLinkSrv>(
  {} as DynamicLinkSrv
);
export const useDynamicLink = (link: ApolloLink) => {
  const dynLinkCtx = useContext(ApolloDynamicLinkContext);
  useEffect(
    () => {
      return dynLinkCtx.addLink(link);
    },
    [dynLinkCtx, link]
  );
};

export const useOpResult = <D extends OperationDef>(
  operationName: Name<D>,
  resWatcher: OpResultHandler<D>
) => {
  const dynLinkCtx = useContext(ApolloDynamicLinkContext);
  useEffect(
    () => {
      return dynLinkCtx.addLinkOpResult(operationName, resWatcher);
    },
    [dynLinkCtx, operationName, resWatcher]
  );
};

export const createDynamicLinkEnv = () => {
  const dynamicLinksSet = new Set<ApolloLink>();
  let chain = ApolloLink.from([]);
  const updateChain = () => {
    chain = ApolloLink.from(Array.from(dynamicLinksSet));
  };

  const link = new ApolloLink((operation, nextLink) =>
    chain.request(operation, nextLink)
  );

  const addLink = (link: ApolloLink) => {
    dynamicLinksSet.add(link);
    updateChain();
    return () => {
      dynamicLinksSet.delete(link);
      updateChain();
    };
  };

  const addLinkOpResult = <D extends OperationDef>(
    operationName: Name<D>,
    resWatcher: OpResultHandler<D>
  ) => addLink(apolloLinkOpResult<D>(operationName, resWatcher));

  const addLinkOp = <D extends OperationDef>(
    operationName: Name<D>,
    reqHandl: OpRequestHandler<D>
  ) => addLink(apolloLinkOp<D>(operationName, reqHandl));

  const srv: DynamicLinkSrv = {
    addLink,
    addLinkOpResult,
    addLinkOp
  };

  return {
    srv,
    link
  };
};
