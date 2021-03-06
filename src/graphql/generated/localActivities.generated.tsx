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






export type LocalActivitiesQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  end?: Types.Maybe<Types.Scalars['String']>
};


export type LocalActivitiesQuery = (
  { __typename?: 'RootQueryType' }
  & { instance: Types.Maybe<(
    { __typename?: 'Instance' }
    & { outbox: (
      { __typename?: 'ActivitiesEdges' }
      & { pageInfo: Types.Maybe<(
        { __typename?: 'PageInfo' }
        & Pick<Types.PageInfo, 'startCursor' | 'endCursor'>
      )>, edges: Array<Types.Maybe<(
        { __typename?: 'ActivitiesEdge' }
        & Pick<Types.ActivitiesEdge, 'cursor'>
        & { node: (
          { __typename?: 'Activity' }
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
  )> }
);


export const LocalActivitiesDocument = gql`
    query localActivities($limit: Int, $end: String) {
  instance {
    outbox(limit: $limit, after: $end) {
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
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
    ${BasicUserFragmentDoc}
${BasicResourceFragmentDoc}
${BasicCommunityFragmentDoc}
${BasicCollectionFragmentDoc}
${BasicCommentWithInReplyToFragmentDoc}`;
export type LocalActivitiesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<LocalActivitiesQuery, LocalActivitiesQueryVariables>, 'query'>;

    export const LocalActivitiesComponent = (props: LocalActivitiesComponentProps) => (
      <ApolloReactComponents.Query<LocalActivitiesQuery, LocalActivitiesQueryVariables> query={LocalActivitiesDocument} {...props} />
    );
    
export type LocalActivitiesProps<TChildProps = {}> = ApolloReactHoc.DataProps<LocalActivitiesQuery, LocalActivitiesQueryVariables> & TChildProps;
export function withLocalActivities<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LocalActivitiesQuery,
  LocalActivitiesQueryVariables,
  LocalActivitiesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, LocalActivitiesQuery, LocalActivitiesQueryVariables, LocalActivitiesProps<TChildProps>>(LocalActivitiesDocument, {
      alias: 'localActivities',
      ...operationOptions
    });
};

/**
 * __useLocalActivitiesQuery__
 *
 * To run a query within a React component, call `useLocalActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocalActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocalActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useLocalActivitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocalActivitiesQuery, LocalActivitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<LocalActivitiesQuery, LocalActivitiesQueryVariables>(LocalActivitiesDocument, baseOptions);
      }
export function useLocalActivitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocalActivitiesQuery, LocalActivitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LocalActivitiesQuery, LocalActivitiesQueryVariables>(LocalActivitiesDocument, baseOptions);
        }
export type LocalActivitiesQueryHookResult = ReturnType<typeof useLocalActivitiesQuery>;
export type LocalActivitiesLazyQueryHookResult = ReturnType<typeof useLocalActivitiesLazyQuery>;
export type LocalActivitiesQueryResult = ApolloReactCommon.QueryResult<LocalActivitiesQuery, LocalActivitiesQueryVariables>;


export interface LocalActivitiesQueryOperation {
  operationName: 'localActivities'
  result: LocalActivitiesQuery
  variables: LocalActivitiesQueryVariables
  type: 'query'
}
