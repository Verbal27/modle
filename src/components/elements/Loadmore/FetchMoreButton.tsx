import * as React from 'react';
import { SFC } from 'react';
import styled from '../../../themes/styled';
import { Trans } from '@lingui/macro';

interface Props {
  fetchMore: () => unknown;
}

const FetchMoreButton: SFC<Props> = ({ fetchMore }) => (
  <LoadMore onClick={fetchMore}>
    <Trans>Load more</Trans>
  </LoadMore>
);

export default FetchMoreButton;

export const LoadMore = styled.div`
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  line-height: 20px;
  padding: 8px 13px;
  border-radius: 4px;
  user-select: none;
  color: #667d99;
  background: #e7edf3;
  background-color: rgb(231, 237, 243);
  background-color: rgb(231, 237, 243);
  border: 0;
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
  &:hover {
    background: #e7e7e7;
  }
`;
