import * as React from 'react';
import styled from '../../../themes/styled';
import { Trans } from '@lingui/macro';
import media from 'styled-media-query';
import { ellipsis } from 'polished';
import H5 from '../../typography/H5/H5';
import P from '../../typography/P/P';
import Button from '../Button/Button';

const Wrapper = styled(Link)`
  color: ${props => props.theme.styles.colors.black};
  text-decoration: none;
`;

import { Link, Flex, Image, Heading, Box, Text } from 'rebass';
import * as Feather from 'react-feather';
const PlaceholderImg = require('../Icons/resourcePlaceholder.png');

interface Props {
  icon: string;
  title: string;
  summary: string;
  url: string;
  preview?: boolean;
  isEditable?: boolean;
  theme: any;
  coreIntegrationURL?: string;
}

export const ResourceComp: React.SFC<Props> = props => (
  <Wrapper href={props.url}>
    <Flex>
      <Image
        width={120}
        height={120}
        borderRadius={4}
        mr={2}
        src={props.icon || PlaceholderImg}
      />
      <Box>
        <Heading style={{ color: 'inherit' }}>{props.title}</Heading>
        <Text style={{ textDecoration: 'underline' }} fontSize={[2, 1]} mt={-1}>
          {props.url}
        </Text>
        <Text fontSize={[2]} mt={2}>
          {props.summary.split('\n').map(function(item, key) {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </Text>
        <Flex mt={2}>
          <Box mr={2}>
            <Feather.Bookmark color={'#555555'} size="24" />
            <Text
              ml={1}
              mr={2}
              style={{ display: 'inline-block', verticalAlign: 'super' }}
            >
              Pinned
            </Text>
          </Box>
          <Box>
            <Feather.Heart color={'#555555'} size="24" />
          </Box>
        </Flex>
      </Box>
    </Flex>

    {/* <Info>
          <TitleWrapper>
            <Title>{props.title}</Title>
            {!props.isEditable ? null : (
              <Actions>
                <Button hovered >
                  <Trans>Edit</Trans>
                </Button>
              </Actions>
            )} */}
    {/* {!props.coreIntegrationURL ? null : (
              <Actions>
                <a href={props.coreIntegrationURL} target="_top">
                  <Button hovered>
                    <Trans>To Moodle!</Trans>
                  </Button>
                </a>
              </Actions>
            )} */}
    {/* </TitleWrapper>
          <Url>{props.url}</Url>
          <Summary>
            {props.summary.split('\n').map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </Summary>
        </Info> */}
  </Wrapper>
);
