import React from 'react';
import styled from '../../../themes/styled';
import { clearFix } from 'polished';
import * as Feather from 'react-feather';
import { Box, Text, Link, Flex } from 'rebass';

const ExtendedBox = styled(Box)`
  border-radius: 4px;
  height: inherit;
  border: 1px solid #dddfe2;
  text-align: left;
`;

const Inner = styled.div`
  padding: 8px;
`;

const List = styled(Box)`
  div:last-of-type {
    border-bottom: 0;
  }
`;

// const Item = styled(Box)`
//   border-bottom: 1px solid #efefef;
//   position: relative;
// `;

// const Meta = styled(Box)`
//   position: absolute;
// //   border-radius: 3px;
// //   width: 24px;
// //   height: 24px;
// //   line-height: 24px;
//   top: 8px;
//   right: 8px;
//   font-weight: 600;
// //   color: rgba(0, 0, 0, 0.8);
// //   font-size: 12px;
//   text-align: center;
// //   padding: 0 4px;
// //   background: #ededed;
// `;

const ItemName = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
`;

const HeroBox = styled.div`
  padding: 8px;
  ${clearFix()};
`;

const HeroImg = styled.div<{ src: string }>`
  height: 88px;
  width: 88px;
  border-radius: 4px;
  float: left;
  background: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 16px;
`;

const HeroInfo = styled.div``;

const HeroTitle = styled.div`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.8);
`;

const HeroUsername = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.8);
`;

const Urls = styled.div`
  ${clearFix()};
`;

const Url = styled.div`
  float: left;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.5);
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const BoxComponent = props => (
  <ExtendedBox {...props} bg="white">
    {props.title ? (
      <Flex
        alignItems={'center'}
        style={{ borderBottom: '1px solid #efefef' }}
        p={2}
      >
        {props.icon === 'users' ? (
          <Box mr={2} style={{ float: 'left' }}>
            <Feather.Users color={'#555555'} size="18" />
          </Box>
        ) : props.icon === 'hashtag' ? (
          <Box mr={2} style={{ float: 'left' }}>
            <Feather.Hash color={'#555555'} size="18" />
          </Box>
        ) : props.icon === 'code' ? (
          <Box mr={2} style={{ float: 'left' }}>
            <Feather.Code color={'#555555'} size="18" />
          </Box>
        ) : props.icon === 'activity' ? (
          <Box mr={2} style={{ float: 'left' }}>
            <Feather.Activity color={'#555555'} size="18" />
          </Box>
        ) : null}

        <Text fontSize={[2, 3]} fontWeight="bold" color="#555555">
          {props.title}
        </Text>
      </Flex>
    ) : null}
    <Inner>
      {props.text ? (
        <Text fontSize={[2]} color="#555555">
          {props.text}
        </Text>
      ) : props.items ? (
        <List m={-2}>
          {props.items.map((item, k) => (
            <Flex
              p={3}
              style={{ borderBottom: '1px solid #efefef' }}
              key={k}
              alignItems="center"
            >
              <ItemName fontSize={[2]}>{item.title}</ItemName>
              <Box mx="auto" />
              {item.metadata ? (
                <Text fontSize={[2]}>{item.metadata}</Text>
              ) : null}
            </Flex>
          ))}
        </List>
      ) : props.urls ? (
        <Urls>
          {props.urls.map((item, k) => (
            <Url key={k}>{item.title}</Url>
          ))}
        </Urls>
      ) : props.hero ? (
        <HeroBox>
          <HeroImg src={props.heroImg} />
          <HeroInfo>
            <HeroTitle>{props.heroTitle}</HeroTitle>
            <HeroUsername>{props.heroUsername}</HeroUsername>
          </HeroInfo>
        </HeroBox>
      ) : (
        props.children
      )}
    </Inner>
  </ExtendedBox>
);

export default BoxComponent;
