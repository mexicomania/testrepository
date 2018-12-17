import React, { Component } from 'react';
import EditorComponent  from '../editor/editor';

class Notice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState:'',
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getEditorValue(message){
    let arr = this.state.messagesArr || [];
    arr.push(message)
    console.log(arr)
    this.setState({message:message,messagesArr:arr})        
}
  render() {
    return (
      <div>
        <EditorComponent buttonText="Broadcast" getValue={this.getEditorValue.bind(this)}/>
      </div>


    );
  }
}

export default Notice;