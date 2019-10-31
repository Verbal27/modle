import { Trans } from '@lingui/macro';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import { TabPanel, Tabs } from 'react-tabs';
import Loader from '../../components/elements/Loader/Loader';
import FetchMoreButton from '../../components/elements/Loadmore/FetchMoreButton';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import TimelineItem from '../../components/elements/TimelineItem';
import FeaturedCollections from '../../components/featuredCollections';
import FeaturedCommunities from '../../components/featuredCommunities';
import { useLocalActivitiesQuery } from '../../generated/graphqlapollo';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import {
  Nav,
  NavItem,
  Panel,
  PanelTitle,
  WrapperPanel
} from '../../sections/panel';
import styled from '../../themes/styled';
import { Wrapper, WrapperCont } from '../communities.all/CommunitiesAll';

interface Props {}

const Home: React.FC<Props> = props => {
  const { data, error, loading, fetchMore } = useLocalActivitiesQuery({
    fetchPolicy: 'cache-first',
    variables: {
      limit: 15
    }
  });
  const fetchMoreHandler = useCallback(
    () =>
      fetchMore({
        variables: {
          end: data!.localActivities.pageInfo.endCursor
        },
        updateQuery: (_prev, { fetchMoreResult, variables }) => {
          const moreNodes =
            (fetchMoreResult && fetchMoreResult.localActivities.nodes) || [];
          const prevNodes = data!.localActivities.nodes!;
          return {
            ...fetchMoreResult!,
            localActivities: {
              ...fetchMoreResult!.localActivities,
              nodes: [...prevNodes, ...moreNodes]
            }
          };
        }
      }),
    [fetchMore, data]
  );
  return (
    <MainContainer>
      <HomeBox>
        <WrapperCont>
          <WrapperFeatured>
            <FeaturedCollections />
          </WrapperFeatured>
          <WrapperFeatured>
            <FeaturedCommunities />
          </WrapperFeatured>
          <Wrapper>
            <Tabs>
              <SuperTabList>
                <SuperTab>
                  <h5>
                    <Trans>Instance timeline</Trans>
                    {/* <Helmet>
                      <title>Instance timeline</title>
                    </Helmet> */}
                  </h5>
                </SuperTab>
              </SuperTabList>
              <TabPanel>
                {error ? (
                  <span>
                    <Trans>{error}</Trans>
                  </span>
                ) : loading ? (
                  <Loader />
                ) : (
                  <div>
                    {data!.localActivities!.nodes!.map(activity => (
                      <TimelineItem
                        node={activity!}
                        user={activity!.user!}
                        key={activity!.id!}
                      />
                    ))}
                    <FetchMoreButton fetchMore={fetchMoreHandler} />
                  </div>
                )}
              </TabPanel>
            </Tabs>
          </Wrapper>
        </WrapperCont>
      </HomeBox>
      <WrapperPanel>
        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Browse Home instance</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={4} fontSize={1} fontWeight={'bold'}>
              <NavLink to="/communities">
                <Trans>All communities</Trans>
              </NavLink>
            </NavItem>
            <NavItem fontSize={1} fontWeight={'bold'}>
              <NavLink to="/collections">
                <Trans>All collections</Trans>
              </NavLink>
            </NavItem>
          </Nav>
        </Panel>

        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Popular hashtags: network</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              <Trans>#learningdesign</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#MPI</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#Youtube</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#models</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#ADDIE</Trans>
            </NavItem>
          </Nav>
        </Panel>

        <Panel>
          <PanelTitle fontSize={0} fontWeight={'bold'}>
            <Trans>Popular hashtags: local instance</Trans>
          </PanelTitle>
          <Nav>
            <NavItem mb={3} fontSize={1}>
              <Trans>#learningdesign</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#MPI</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#Youtube</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#models</Trans>
            </NavItem>
            <NavItem mb={3} fontSize={1}>
              <Trans>#ADDIE</Trans>
            </NavItem>
          </Nav>
        </Panel>
      </WrapperPanel>
    </MainContainer>
  );
};

const WrapperFeatured = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 8px;
`;

export default Home;
