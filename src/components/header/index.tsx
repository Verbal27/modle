import { Trans } from '@lingui/macro';
import { clearFix } from 'polished';
import React from 'react';
import { graphql, OperationOption } from 'react-apollo';
import OutsideClickHandler from 'react-outside-click-handler';
import { NavLink } from 'react-router-dom';
import { compose, withHandlers, withState } from 'recompose';
import media from 'styled-media-query';
import Loader from '../../components/elements/Loader/Loader';
import styled from '../../themes/styled';
import Logo from '../brand/Logo/Logo';
import {
  Card,
  Collection,
  Community,
  Power,
  Settings,
  Shield,
  User,
  Validate
} from '../elements/Icons';
const { getUserQuery } = require('../../graphql/getUserBasic.graphql');

interface Props {
  handleOpen(): boolean;
  closeMenu(): boolean;
  isOpen: boolean;
  logout(): any;
  history: any;
  data: any;
  handleNewCommunity(): boolean;
  isOpenCommunity: boolean;
  navigateToPage(string): any;
  sidebar: boolean;
  onSidebar(boolean): boolean;
}

const Header: React.FC<Props> = props => {
  return (
    <Wrapper>
      {props.data.error ? (
        <span>
          <Trans>Error loading collections</Trans>
        </span>
      ) : props.data.loading ? (
        <Loader />
      ) : (
        <>
          <Left>
            <NavLink
              isActive={(match, location) => {
                return (
                  location.pathname === `/communities` ||
                  location.pathname === `/communities/`
                );
              }}
              activeStyle={{
                position: 'relative',
                color: '#fff'
              }}
              to={'/communities'}
            >
              <i>
                <Community
                  width={18}
                  height={18}
                  color={'#3d3f4a80'}
                  strokeWidth={2}
                />
              </i>
              <span>
                <Trans>Communities</Trans>
              </span>
            </NavLink>
            <NavLink
              isActive={(match, location) => {
                return (
                  location.pathname === `/collections` ||
                  location.pathname === `/collections/`
                );
              }}
              activeStyle={{
                position: 'relative',
                color: '#fff'
              }}
              to={'/collections'}
            >
              <i>
                <Collection
                  width={18}
                  height={18}
                  color={'#3d3f4a80'}
                  strokeWidth={2}
                />
              </i>
              <span>
                <Trans>Collections</Trans>
              </span>
            </NavLink>
          </Left>
          <Center>
            <Logo />
          </Center>
          <Right>
            <AvatarUsername onClick={props.handleOpen}>
              <span>{props.data.me.user.name}</span>
              <Avatar>
                <img
                  src={
                    props.data.me.user.icon ||
                    `https://www.gravatar.com/avatar/${
                      props.data.me.user.localId
                    }?f=y&d=identicon`
                  }
                  alt="Avatar"
                />
              </Avatar>
            </AvatarUsername>
          </Right>
          {props.isOpen ? (
            <>
              <OutsideClickHandler onOutsideClick={props.closeMenu}>
                <WrapperMenu>
                  <ProfileMenu>
                    <List lined>
                      <Item onClick={() => props.navigateToPage('/profile')}>
                        <span>
                          <User
                            width={18}
                            height={18}
                            strokeWidth={1}
                            color={'#333'}
                          />
                        </span>
                        <Trans>Profile</Trans>
                      </Item>
                      <Item onClick={() => props.navigateToPage('/settings')}>
                        <span>
                          <Settings
                            width={18}
                            height={18}
                            strokeWidth={1}
                            color={'#333'}
                          />
                        </span>
                        <Trans>Settings</Trans>
                      </Item>
                    </List>
                    <List lined>
                      <Item>
                        <a
                          href="https://docs.moodle.org/dev/MoodleNet/Code_of_Conduct"
                          target="blank"
                        >
                          <span>
                            <Shield
                              width={18}
                              height={18}
                              strokeWidth={1}
                              color={'#333'}
                            />
                          </span>
                          <Trans>Code of Conduct</Trans>
                        </a>
                      </Item>

                      <Item>
                        <a
                          href="https://changemap.co/moodle/moodlenet/"
                          target="blank"
                        >
                          <span>
                            <Validate
                              width={18}
                              height={18}
                              strokeWidth={1}
                              color={'#333'}
                            />
                          </span>
                          <Trans>Feedback &amp; Suggestions</Trans>
                        </a>
                      </Item>

                      <Item>
                        <a
                          href="https://blog.moodle.net/category/versions/"
                          target="blank"
                        >
                          <span>
                            <Card
                              width={18}
                              height={18}
                              strokeWidth={1}
                              color={'#333'}
                            />
                          </span>
                          v0.9.4 alpha <Trans>Changelog</Trans>
                        </a>
                      </Item>
                    </List>
                    <List>
                      <Item onClick={props.logout}>
                        <span>
                          <Power
                            width={18}
                            height={18}
                            strokeWidth={1}
                            color={'#333'}
                          />
                        </span>
                        <Trans>Sign out</Trans>
                      </Item>
                    </List>
                  </ProfileMenu>
                </WrapperMenu>
              </OutsideClickHandler>
              <Layer />
            </>
          ) : null}
        </>
      )}
    </Wrapper>
  );
};
const AvatarUsername = styled.div`
  float: left;
  line-height: 32px;
  margin-left: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.styles.colour.headerLink};
  cursor: pointer;
  letter-spacing: 1px;
  & span {
    float: left;
    margin-right: 8px;
    ${media.lessThan('medium')`
    display: none;
    `};
  }
`;
const Center = styled.span`
  position: absolute;
  left: 50%;
  margin-left: -75px;
  // ${media.lessThan('medium')`
  //   margin-left: -60px;
  // `};
  & h1 {
    margin: 0;
    line-height: 50px;
  }
`;

const Wrapper = styled.div`
  height: 50px;
  min-height: 50px;
  background: ${props => props.theme.styles.colour.header};
  ${clearFix()};
  position: relative;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100px;
  overflow: hidden;
  margin-right: 8px;
  background: ${props => props.theme.styles.colour.background};
`;

const WrapperMenu = styled.div`
  box-sizing: border-box;
  width: 20em;
  padding: 5px;
  border-radius: 0.25em;
  background-color: rgb(232, 232, 232);
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 999999999999;
`;

const Layer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 50px;
  z-index: 1;
  display: block;
`;

const ProfileMenu = styled.div`
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;
const List = styled.div<{ lined?: boolean }>`
  padding: 8px;
  border-bottom: ${props => (props.lined ? '1px solid #dadada' : null)};
`;
const Item = styled.div`
  font-size: 14px;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.theme.styles.colour.base3};
  & span {
    display: inline-block;
    margin-right: 8px;
    & svg {
      vertical-align: sub;
    }
  }
  & a {
    color: inherit !important;
    text-decoration: none;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;
const Left = styled.div`
  float: left;
  line-height: 50px;
  height: 50px;
  max-height: 50px;
  margin-left: 16px;
  & a {
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    color: ${props => props.theme.styles.colour.headerLink};
    text-decoration: none;
    margin-right: 32px;
    ${media.lessThan('medium')`
     span {
       display: none;
     }
    `};
    & i {
      margin-right: 8px;
      & svg {
        vertical-align: sub;
        color: inherit !important;
      }
    }
  }

  & input {
    border: 0px solid !important;
    border-radius: 100px;
    height: 34px;
    max-height: 34px;
    min-height: 34px;
    background: #f6f6f6;
  }
`;
const Right = styled.div`
  float: right;
  margin-top: 9px;
  margin-right: 16px;
  ${clearFix()};
  & img {
    cursor: pointer;
    max-width: 32px;
    max-height: 32px;
  }
`;

const withGetUser = graphql<
  {},
  {
    data: {
      me: any;
    };
  }
>(getUserQuery) as OperationOption<{}, {}>;

export default compose(
  withGetUser,
  withState('isOpen', 'onOpen', false),
  withHandlers({
    handleOpen: props => () => props.onOpen(true),
    closeMenu: props => () => props.onOpen(false),
    logout: props => () => {
      let token;
      process.env.REACT_APP_GRAPHQL_ENDPOINT ===
      'https://home.moodle.net/api/graphql'
        ? (token = 'user_access_token')
        : (token = 'dev_user_access_token');
      localStorage.removeItem(token);
      localStorage.removeItem('dark');
      return window.location.reload();
    }
  }),
  withHandlers({
    navigateToPage: props => url => {
      props.closeMenu();
      return props.history.push(url);
    }
  })
)(Header);
