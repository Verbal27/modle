import * as Types from '../types.generated';

import { BasicCommentWithInReplyToFragment } from '../fragments/generated/basicComment.generated';
import { BasicCollectionFragment } from '../fragments/generated/basicCollection.generated';
import { BasicCommunityFragment } from '../fragments/generated/basicCommunity.generated';
import { BasicResourceFragment } from '../fragments/generated/basicResource.generated';
import { BasicUserFragment } from '../fragments/generated/basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from '../fragments/generated/basicUser.generated';
import { BasicResourceFragmentDoc } from '../fragments/generated/basicResource.generated';
import { BasicCommunityFragmentDoc } from '../fragments/generated/basicCommunity.generated';
import { BasicCollectionFragmentDoc } from '../fragments/generated/basicCollection.generated';
import { BasicCommentWithInReplyToFragmentDoc } from '../fragments/generated/basicComment.generated';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;






export type GetMeInboxQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Types.Scalars['String']>
};


export type GetMeInboxQuery = (
  { __typename?: 'RootQueryType' }
  & { me: Types.Maybe<(
    { __typename?: 'Me' }
    & { user: (
      { __typename?: 'User' }
      & { inbox: (
        { __typename?: 'ActivitiesEdges' }
        & { pageInfo: Types.Maybe<(
          { __typename?: 'PageInfo' }
          & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
        )>, edges: Array<Types.Maybe<(
          { __typename?: 'ActivitiesEdge' }
          & { node: (
            { __typename: 'Activity' }
            & Pick<Types.Activity, 'id' | 'canonicalUrl' | 'verb' | 'isLocal' | 'isPublic' | 'createdAt'>
            & { user: (
              { __typename?: 'User' }
              & BasicUserFragment
            ), context: (
              { __typename: 'Collection' }
              & BasicCollectionFragment
            ) | (
              { __typename: 'Comment' }
              & BasicCommentWithInReplyToFragment
            ) | (
              { __typename: 'Community' }
              & BasicCommunityFragment
            ) | { __typename: 'Flag' } | { __typename: 'Follow' } | { __typename: 'Like' } | (
              { __typename: 'Resource' }
              & BasicResourceFragment
            ) }
          ) }
        )>> }
      ) }
      & BasicUserFragment
    ) }
  )> }
);


export const GetMeInboxDocument = gql`
    query getMeInbox($limit: Int, $end: String) {
  me {
    user {
      ...BasicUser
      inbox(limit: $limit, after: $end) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            __typename
            id
            canonicalUrl
            verb
            isLocal
            isPublic
            createdAt
            user {
              ...BasicUser
            }
            context {
              __typename
              ... on Resource {
                ...BasicResource
              }
              ... on Community {
                ...BasicCommunity
              }
              ... on Collection {
                ...BasicCollection
              }
              ... on Comment {
                ...BasicCommentWithInReplyTo
              }
            }
          }
        }
      }
    }
  }
}
    ${BasicUserFragmentDoc}
${BasicResourceFragmentDoc}
${BasicCommunityFragmentDoc}
${BasicCollectionFragmentDoc}
${BasicCommentWithInReplyToFragmentDoc}`;
export type GetMeInboxComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMeInboxQuery, GetMeInboxQueryVariables>, 'query'>;

    export const GetMeInboxComponent = (props: GetMeInboxComponentProps) => (
      <ApolloReactComponents.Query<GetMeInboxQuery, GetMeInboxQueryVariables> query={GetMeInboxDocument} {...props} />
    );
    
export type GetMeInboxProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMeInboxQuery, GetMeInboxQueryVariables> & TChildProps;
export function withGetMeInbox<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMeInboxQuery,
  GetMeInboxQueryVariables,
  GetMeInboxProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMeInboxQuery, GetMeInboxQueryVariables, GetMeInboxProps<TChildProps>>(GetMeInboxDocument, {
      alias: 'getMeInbox',
      ...operationOptions
    });
};

/**
 * __useGetMeInboxQuery__
 *
 * To run a query within a React component, call `useGetMeInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeInboxQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetMeInboxQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeInboxQuery, GetMeInboxQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMeInboxQuery, GetMeInboxQueryVariables>(GetMeInboxDocument, baseOptions);
      }
export function useGetMeInboxLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeInboxQuery, GetMeInboxQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMeInboxQuery, GetMeInboxQueryVariables>(GetMeInboxDocument, baseOptions);
        }
export type GetMeInboxQueryHookResult = ReturnType<typeof useGetMeInboxQuery>;
export type GetMeInboxLazyQueryHookResult = ReturnType<typeof useGetMeInboxLazyQuery>;
export type GetMeInboxQueryResult = ApolloReactCommon.QueryResult<GetMeInboxQuery, GetMeInboxQueryVariables>;


export interface GetMeInboxQueryOperation {
  operationName: 'getMeInbox'
  result: GetMeInboxQuery
  variables: GetMeInboxQueryVariables
  type: 'query'
}
