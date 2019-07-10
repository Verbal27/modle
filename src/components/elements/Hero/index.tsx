import * as React from 'react';
import { Card, Heading, Text, Flex, Box } from 'rebass';
import styled from '../../../themes/styled';
import Avatar from '../Avatar';

const Overlay = styled(Box)`
  background: black;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  opacity: 0.2;
  z-index: 1;
  border-radius: 8px;
`;

interface Props {
  title: string;
  username: string;
  image: string;
  header?: string;
}

const Hero: React.SFC<Props> = ({ title, username, image }) => (
  <Card
    p={4}
    py={6}
    backgroundImage={'url(' + image + ')'}
    backgroundSize="cover"
    borderRadius={8}
    color="white"
    bg="darkgray"
    style={{ position: 'relative' }}
  >
    <Overlay />
    <Heading
      textAlign="left"
      style={{ position: 'relative', zIndex: 2 }}
      fontSize={[4, 5]}
    >
      {title}
    </Heading>
    <Text style={{ position: 'relative', zIndex: 2 }} fontSize={[2, 3]}>
      {username}
    </Text>
  </Card>
);

export const UserHero: React.SFC<Props> = ({
  title,
  username,
  header,
  image
}) => (
  <Card
    p={4}
    py={6}
    backgroundImage={'url(' + header + ')'}
    backgroundSize="cover"
    borderRadius={8}
    color="white"
    bg="darkgray"
    style={{ position: 'relative' }}
  >
    <Overlay />
    <Flex style={{ position: 'relative', zIndex: 2 }}>
      <Avatar
        mr={2}
        width={100}
        height={100}
        style={{ border: '2px solid white' }}
        src={image}
      />
      <Box>
        <Heading textAlign="left" fontSize={[4, 5]}>
          {title}
        </Heading>
        <Text fontSize={[2, 3]}>{username}</Text>
      </Box>
    </Flex>
  </Card>
);

export default Hero;
