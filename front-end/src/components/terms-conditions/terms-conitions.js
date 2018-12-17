import React, { Component } from 'react';
import { Button } from 'antd';
import './terms-conditions.css';
import EditorComponent from '../editor/editor';

class TermsConditions extends Component {
    
    getEditorValueForK1(message){
        console.log(message)
    }
    getEditorValueForAOS(message){
        console.log(message)
    }
    getEditorValueForCR1(message){
        console.log(message)
    }
    getEditorValueForROC(message){
        console.log(message)
    }

    render() {
        return (
            <div id="terms-conditions-form">
                <div style={{marginBottom:'10px'}}>
                <span className="ant-form-text"><b>K1</b></span>
                <EditorComponent buttonText="Save" getValue={this.getEditorValueForK1.bind(this)}/>
                </div>
                <div style={{marginBottom:'10px'}}>
                <span className="ant-form-text"><b>AOS</b></span>
                <EditorComponent buttonText="Save" getValue={this.getEditorValueForAOS.bind(this)}/>
                </div>
                <div style={{marginBottom:'10px'}}>
                <span className="ant-form-text"><b>CR1</b></span>
                <EditorComponent buttonText="Save" getValue={this.getEditorValueForCR1.bind(this)}/>
                </div>
                <div style={{marginBottom:'10px'}}>
                <span className="ant-form-text" ><b>ROC</b></span>
                <EditorComponent buttonText="Save" getValue={this.getEditorValueForROC.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default TermsConditions;