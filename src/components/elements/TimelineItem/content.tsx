import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
const emojiPlugin = createEmojiPlugin();

import createMentionPlugin, {
  defaultSuggestionsFilter
} from 'draft-js-mention-plugin';

export default class SimpleEmojiEditor extends Component {
  constructor(props) {
    super(props);
    this.mentionPlugin = createMentionPlugin();
  }

  state = {
    editorState: createEditorStateWithText(this.props.text)
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const plugins = [this.mentionPlugin, emojiPlugin];

    return (
      <div>
        <div onClick={this.focus}>
          <Editor
            __readOnly__
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
        </div>
      </div>
    );
  }
}
