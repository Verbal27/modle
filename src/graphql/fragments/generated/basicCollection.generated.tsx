import * as Types from '../../types.generated';

import { BasicResourcesEdgesFragment } from './basicResourcesEdges.generated';
import { BasicUserFragment } from './basicUser.generated';
import gql from 'graphql-tag';
import { BasicUserFragmentDoc } from './basicUser.generated';
import { BasicResourcesEdgesFragmentDoc } from './basicResourcesEdges.generated';



export type BasicCollectionFragment = (
  { __typename?: 'Collection' }
  & Pick<Types.Collection, 'id' | 'canonicalUrl' | 'preferredUsername' | 'name' | 'summary' | 'icon' | 'isLocal' | 'isPublic' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & BasicUserFragment
  ), myLike: Types.Maybe<(
    { __typename?: 'Like' }
    & Pick<Types.Like, 'id'>
  )>, myFollow: Types.Maybe<(
    { __typename?: 'Follow' }
    & Pick<Types.Follow, 'id'>
  )>, community: (
    { __typename?: 'Community' }
    & Pick<Types.Community, 'id' | 'canonicalUrl' | 'isLocal' | 'isPublic' | 'name' | 'icon'>
    & { myFollow: Types.Maybe<(
      { __typename?: 'Follow' }
      & Pick<Types.Follow, 'id'>
    )> }
  ), resources: (
    { __typename?: 'ResourcesEdges' }
    & BasicResourcesEdgesFragment
  ), followers: (
    { __typename?: 'FollowsEdges' }
    & Pick<Types.FollowsEdges, 'totalCount'>
  ), threads: (
    { __typename?: 'ThreadsEdges' }
    & Pick<Types.ThreadsEdges, 'totalCount'>
  ), outbox: (
    { __typename?: 'ActivitiesEdges' }
    & Pick<Types.ActivitiesEdges, 'totalCount'>
  ) }
);

export const BasicCollectionFragmentDoc = gql`
    fragment BasicCollection on Collection {
  id
  canonicalUrl
  preferredUsername
  name
  summary
  creator {
    ...BasicUser
  }
  icon
  isLocal
  isPublic
  createdAt
  myLike {
    id
  }
  myFollow {
    id
  }
  community {
    id
    canonicalUrl
    isLocal
    isPublic
    name
    icon
    myFollow {
      id
    }
  }
  resources {
    ...BasicResourcesEdges
  }
  followers {
    totalCount
  }
  threads {
    totalCount
  }
  outbox {
    totalCount
  }
}
    ${BasicUserFragmentDoc}
${BasicResourcesEdgesFragmentDoc}`;
