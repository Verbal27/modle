import { Trans } from '@lingui/macro';
import * as React from 'react';
import { TabPanel, Tabs } from 'react-tabs';
import { compose, withHandlers, withState } from 'recompose';
import NewCommunityModal from '../../components/elements/CreateCommunityModal';
import { SuperTab, SuperTabList } from '../../components/elements/SuperTab';
import CommunitiesJoined from '../communities.joined';
import { Wrapper, WrapperCont } from './CommunitiesAll';
import { HomeBox, MainContainer } from '../../sections/layoutUtils';
import { WrapperPanel } from '../../sections/panel';

interface Props {
  handleNewCommunity(): boolean;
  isOpenCommunity: boolean;
}

class CommunitiesYours extends React.Component<Props> {
  render() {
    return (
      <MainContainer>
        <HomeBox>
          <WrapperCont>
            <Wrapper>
              <Tabs>
                <SuperTabList>
                  <SuperTab>
                    <h5>
                      <Trans>Joined communities</Trans>
                    </h5>
                  </SuperTab>
                </SuperTabList>
                <TabPanel>
                  <CommunitiesJoined
                    handleNewCommunity={this.props.handleNewCommunity}
                  />
                </TabPanel>
              </Tabs>
            </Wrapper>
          </WrapperCont>
        </HomeBox>
        <WrapperPanel />
        <NewCommunityModal
          toggleModal={this.props.handleNewCommunity}
          modalIsOpen={this.props.isOpenCommunity}
        />
      </MainContainer>
    );
  }
}

export default compose(
  withState('isOpenCommunity', 'onOpenCommunity', false),
  withHandlers({
    handleNewCommunity: props => () =>
      props.onOpenCommunity(!props.isOpenCommunity)
  })
)(CommunitiesYours);
