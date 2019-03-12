import * as React from 'react';

import styled from '../../../themes/styled';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';

const LogoH1 = styled.h1`
  margin: 0;
  font-size: 14px;
  line-height: 32px;
  color: ${props => props.theme.styles.colour.primary};
  letter-spacing: 1px;
  margin-bottom: 24px;
  & a {
    color: ${props => props.theme.styles.colour.primary};
    text-decoration: none;
  }
  & small {
    letter-spacing: 0;
    color: #151b2680;
    font-weight: 600;
    font-style: italic;
  }
`;

const Small = styled.a`
  margin-left: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => props.theme.styles.colour.primary};
  color: white !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px;
  font-size: 11px;
  text-transform: uppercase;
  cursor: pointer;
`;

type LogoProps = {
  link?: boolean;
};

/**
 * MoodleNet Logo component.
 * @param link {Boolean} wrap Logo component in a Link to the homepage
 */
export default ({ link = true }: LogoProps) => {
  return (
    <LogoH1>
      <Link to="/" title="MoodleNet">
        MoodleNet <small>v0.5 alpha</small>
      </Link>
      <Small
        href="https://blog.moodle.net/2019/moodlenet-0-5-alpha-update/"
        target="blank"
      >
        🎉
        <Trans>NEW</Trans>
      </Small>
    </LogoH1>
  );
};
