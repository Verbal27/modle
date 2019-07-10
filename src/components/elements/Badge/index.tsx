import * as React from 'react';
import { Card } from 'rebass';

const Badge = props => (
  <Card
    color="white"
    bg="#f98012"
    {...props}
    px={2}
    py={0}
    fontSize={1}
    borderRadius={9999}
    style={{
      display: 'inline-block'
    }}
  />
);

export default Badge;
