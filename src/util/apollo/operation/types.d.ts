import { FetchResult, Observable, Operation } from 'apollo-link';
export type Variables = Record<string, any>;

export type OpType = 'mutation' | 'query' | 'subscription';
export interface OperationDef<
  Name extends string = string,
  Type extends OpType = OpType,
  Vars extends Variables = Variables,
  Res = any
> {
  operationName: Name;
  variables: Vars;
  result: Res;
  type: Type;
}

export type Result<D extends OperationDef> = D['result'];
export type Vars<D extends OperationDef> = D['variables'];
export type Type<D extends OperationDef> = D['type'];
export type Name<D extends OperationDef> = D['operationName'];

export interface TypedOperation<D extends OperationDef> extends Operation {
  operationName: Name<D>;
  variables: Vars<D>;
}
export type OpFetchResult<D extends OperationDef> = FetchResult<Result<D>>;

export type ResultNextLink<D extends OperationDef> = (
  operation: TypedOperation<D>
) => Observable<OpFetchResult<D>>;

export type OpRequestHandler<D extends OperationDef> = (
  operation: TypedOperation<D>,
  forward: ResultNextLink<D>
) => Observable<OpFetchResult<D>> | null;
