import React, { Component } from 'react';
import { Button, } from 'antd';
import './editor.css';
// import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      message:''
    };
  }

  onEditorStateChange = (editorState) => {
    let editorSourceHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))       
    this.setState({
      editorState,message:editorSourceHTML
    });

  };


  render() {
    const { editorState,message } = this.state;
    const { buttonText,getValue } = this.props;

    return (
      <div>
        <Editor
          placeholder="Type here.."
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <Button type="primary" className="broadcast-btn" onClick={getValue.bind(this,message)}>
          {buttonText}
        </Button>
      </div>


    );
  }
}

export default EditorComponent;