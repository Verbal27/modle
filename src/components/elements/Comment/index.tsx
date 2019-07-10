import styled from '../../../themes/styled';
import React, { Component } from 'react';
import { Text, Box, Link, Flex } from 'rebass';
import moment from 'moment-timezone';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { PrimaryBtn } from '../Button';
import { clearFix } from 'polished';
import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

import * as Feather from 'react-feather';
moment.tz.setDefault('UTC');

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const mentions = [
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400'
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400'
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar:
      'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg'
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400'
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar:
      'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png'
  }
];

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

const EditorWrapper = styled(Box)`
  box-sizing: border-box;
  border: 2px solid #d0edff;
  cursor: text;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 8px;
  background: #fefefe;
  position: relative;
  & > div:first-of-type {
    margin-right: 26px;
  }
`;

const WrapperEmoji = styled(Box)`
  position: absolute;
  right: 8px;
  top: 0px;
  button {
    border: 0;
    width: auto;
    background: transparent;
  }
`;

const Wrapper = styled(Box)`
  ${clearFix()} button {
    float: right;
  }
`;

interface Props {
  content: string;
  url: string;
  date: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

export default class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.mentionPlugin = createMentionPlugin();
  }

  state = {
    editorState: EditorState.createEmpty(),
    suggestions: mentions,
    collectionSuggestions: mentions
  };

  onChange = editorState => {
    console.log(editorState);
    this.setState({
      editorState
    });
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions)
    });
  };

  onAddMention = () => {
    // get the mention object selected
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;

    const plugins = [this.mentionPlugin, emojiPlugin];

    return (
      <Wrapper bg={'rgba(59,148,217,0.1)'} p={3}>
        <EditorWrapper onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Type your message here..."
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
          />
          <WrapperEmoji>
            <EmojiSuggestions />
            <EmojiSelect />
          </WrapperEmoji>
        </EditorWrapper>
        <PrimaryBtn>Publish</PrimaryBtn>
      </Wrapper>
    );
  }
}
