import styled from '../../../themes/styled';
import * as React from 'react';
import { SFC } from 'react';
import { Text, Box, Link, Flex } from 'rebass';
import moment from 'moment-timezone';
import Avatar from '../Avatar';
import { lighten } from 'polished';
import * as Feather from 'react-feather';
moment.tz.setDefault('UTC');

const Icon = styled(Box)`
  cursor: pointer;
  &:hover {
    svg {
      stroke: ${props => props.theme.styles.colors.orange};
    }
    div {
      color: ${props => props.theme.styles.colors.orange};
    }
  }
`;

const Wrapper = styled(Box)`
  a {
    text-decoration: none;
    color: inherit;
  }
`;

interface Props {
  content: string;
  url: string;
  date: string;
  replies: number;
  likes: number;
  retweets?: number;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

const Thread: SFC<Props> = ({
  content,
  user,
  url,
  date,
  replies,
  likes,
  retweets
}) => {
  return (
    <Wrapper style={{ borderBottom: '1px solid #efefef' }} px={3} py={3}>
      <Flex alignItems="center">
        <Avatar name={user.name} src={user.image} />
        <Text ml={1} fontSize={[1]}>
          &middot; @{user.username}
        </Text>
      </Flex>
      <Text mt={2} fontSize={[4]}>
        {content}
      </Text>
      <Text ml={1} color="#4444" fontSize={[2]}>
        {moment(date).fromNow()}
      </Text>
      <Flex mt={3}>
        <Icon
          mr={2}
          className="tooltip"
          data-tooltip="Lorem ipsum dolor sit amet"
        >
          <Feather.MessageSquare color={'#555555'} size="20" />
          <Text
            ml={1}
            mr={3}
            style={{ display: 'inline-block', verticalAlign: 'super' }}
          >
            {replies}
          </Text>
        </Icon>
        <Icon mr={2}>
          <Feather.Heart color={'#555555'} size="20" />
          <Text
            ml={1}
            mr={3}
            style={{ display: 'inline-block', verticalAlign: 'super' }}
          >
            {likes}
          </Text>
        </Icon>
        {retweets ? (
          <Icon>
            <Feather.Repeat color={'#555555'} size="20" />
            <Text
              ml={1}
              mr={3}
              style={{ display: 'inline-block', verticalAlign: 'super' }}
            >
              {retweets}
            </Text>
          </Icon>
        ) : null}
      </Flex>
    </Wrapper>
  );
};

export default Thread;
