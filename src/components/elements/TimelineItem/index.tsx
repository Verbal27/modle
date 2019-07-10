import styled from '../../../themes/styled';
import * as React from 'react';
import { SFC } from 'react';
import { Text, Box, Link, Flex } from 'rebass';
import moment from 'moment-timezone';
import Avatar from '../Avatar';
import { lighten } from 'polished';
import Content from './content';
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
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
  &:hover {
    background: ${props => lighten(0.45, props.theme.styles.colors.orange)};
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

const Item: SFC<Props> = ({
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
      <Link to={url}>
        <Flex alignItems="center">
          <Avatar name={user.name} src={user.image} />
          <Text ml={1} fontSize={[1]}>
            &middot; @{user.username}
          </Text>
          <Text ml={1} fontSize={[1]}>
            &middot; {moment(date).fromNow()}
          </Text>
        </Flex>
        <Text fontSize={[3, 2]} ml={5}>
          <Content text={content} />
        </Text>

        <Flex ml={5} mt={3}>
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
      </Link>
    </Wrapper>
  );
};

// const Item: SFC<Props> = ({ user, node, userpage }) => (
//   <FeedItem>
//     <Member>
//       <MemberItem>
//         <Img src={user ? user.icon : ''} />
//       </MemberItem>
//       <FeedItemContents>
//         {userpage ? (
//           <b>{user ? user.name : <Trans>Deleted user</Trans>}</b>
//         ) : user ? (
//           <Link to={'/user/' + user.localId}>
//             <Name>{user.name}</Name>
//           </Link>
//         ) : (
//           <Name>
//             <Trans>Deleted user</Trans>
//           </Name>
//         )}

//         {node.activityType === 'CreateCollection' ? (
//           <span>
//             <Trans>created the collection</Trans>{' '}
//             <Link to={`/collections/` + node.object.localId}>
//               {node.object.name}
//             </Link>{' '}
//           </span>
//         ) : node.activityType === 'UpdateCommunity' ? (
//           <span>
//             <Trans>updated the community</Trans>{' '}
//             <Link to={`/communities/${node.object.localId}`}>
//               {node.object.name}
//             </Link>
//           </span>
//         ) : node.activityType === 'UpdateCollection' ? (
//           <span>
//             <Trans>updated the collection</Trans>{' '}
//             <Link to={`/collections/` + node.object.localId}>
//               {node.object.name}
//             </Link>
//           </span>
//         ) : node.activityType === 'JoinCommunity' ? (
//           <span>
//             <Trans>joined the community</Trans>{' '}
//             <Link to={`/communities/${node.object.localId}`}>
//               {node.object.name}
//             </Link>
//           </span>
//         ) : node.activityType === 'CreateComment' ? (
//           <>
//             <span>
//               {node.object.inReplyTo !== null ? (
//                 <Trans>replied to</Trans>
//               ) : (
//                 <Trans>started</Trans>
//               )}{' '}
//               <Link
//                 to={
//                   node.object.context.__typename === 'Community'
//                     ? `/communities/${node.object.context.localId}/thread/${
//                         node.object.localId
//                       }`
//                     : `/collections/${node.object.context.localId}/thread/${
//                         node.object.localId
//                       }`
//                 }
//               >
//                 <Trans>a discussion</Trans>
//               </Link>{' '}
//               <Trans>in the</Trans>{' '}
//               {node.object.context.__typename === 'Community' ? (
//                 <Trans>community</Trans>
//               ) : (
//                 <Trans>collection</Trans>
//               )}{' '}
//               <Link
//                 to={
//                   node.object.context.__typename === 'Community'
//                     ? `/communities/${node.object.context.localId}`
//                     : `/collections/${node.object.context.localId}`
//                 }
//               >
//                 {node.object.context.name}
//               </Link>
//               :
//             </span>
//             <Comment>
//               <Link
//                 to={
//                   node.object.context.__typename === 'Community'
//                     ? `/communities/${node.object.context.localId}/thread/${
//                         node.object.localId
//                       }`
//                     : `/collections/${node.object.context.localId}/thread/${
//                         node.object.localId
//                       }`
//                 }
//               >
//                 {node.object.content && node.object.content.length > 320
//                   ? removeMd(node.object.content).replace(
//                       /^([\s\S]{316}[^\s]*)[\s\S]*/,
//                       '$1...'
//                     )
//                   : removeMd(node.object.content)}
//               </Link>
//             </Comment>
//           </>
//         ) : node.activityType === 'CreateResource' ? (
//           <span>
//             <Trans>added the resource</Trans>{' '}
//             <Link to={`/collections/` + node.object.collection.localId}>
//               {node.object.name}
//             </Link>{' '}
//             <Trans>in the collection</Trans>{' '}
//             <Link to={`/collections/` + node.object.collection.localId}>
//               {node.object.collection.name}
//             </Link>{' '}
//           </span>
//         ) : node.activityType === 'FollowCollection' ? (
//           <span>
//             <Trans>is following the collection</Trans>{' '}
//             <Link to={`/collections/` + node.object.localId}>
//               {node.object.name}
//             </Link>
//           </span>
//         ) : null}
//         <Date>{moment(node.published).fromNow()}</Date>
//       </FeedItemContents>
//     </Member>
//   </FeedItem>
// );

// const Name = styled.span`
//   font-weight: 600;
//   color: ${props => props.theme.styles.colour.feedText};
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Member = styled.div`
//   vertical-align: top;
//   display: flex;
//   ${clearFix()};
// `;

// const FeedItemContents = styled.div`
//   margin-left: 40px;
//   font-size: 14px;
//   margin: 0;
//   flex: 1;
//   color: ${props => props.theme.styles.colour.feedText};
//   font-weight: 400;
//   & span {
//     margin-right: 3px;
//   }
//   & a {
//     text-decoration: none;
//     font-weight: 600;
//     color: ${props => props.theme.styles.colour.feedText} !important;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// const Comment = styled.div`
//   margin-top: 6px;
//   & a {
//     color: ${props => props.theme.styles.colour.feedText} !important;
//     font-weight: 400 !important;
//   }
// `;

// const MemberItem = styled.span`
//   background-color: #d6dadc;
//   border-radius: 50px;
//   height: 32px;
//   overflow: hidden;
//   position: relative;
//   width: 32px;
//   user-select: none;
//   z-index: 0;
//   vertical-align: inherit;
//   margin-right: 8px;
//   float: left;
// `;

// const Img = styled.img`
//   width: 32px;
//   height: 32px;
//   display: block;
//   -webkit-appearance: none;
//   line-height: 32px;
//   text-indent: 4px;
//   font-size: 13px;
//   overflow: hidden;
//   max-width: 32px;
//   max-height: 32px;
//   text-overflow: ellipsis;
//   vertical-align: text-top;
//   margin-right: 8px;
// `;

// const Date = styled.div`
//   font-size: 12px;
//   line-height: 32px;
//   height: 20px;
//   margin: 0;
//   color: ${props => props.theme.styles.colour.base4};
//   margin-top: 0px;
//   font-weight: 500;
// `;

// const FeedItem = styled.div`
//   min-height: 30px;
//   position: relative;
//   margin: 0;
//   padding: 16px;
//   word-wrap: break-word;
//   font-size: 14px;
//   ${clearFix()};
//   transition: background 0.5s ease;
//   background:${props => props.theme.styles.colour.feedBg};
//   margin-top: 0
//   z-index: 10;
//   position: relative;
//   border-bottom: 1px solid ${props => props.theme.styles.colour.divider};
// `;

export default Item;
