import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import QuestionPart1 from './question-1/question-1';
import QuestionPart2 from './question-2/question-2';
import QuestionPart3 from './question-3/question-3';
import QuestionPart4 from './question-4/question-4';
import QuestionPart5 from './question-5/question-5';

import './alien-part4.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/alien-part4/questions-1',
    1 : '/alien-part4/questions-2',
    2 : '/alien-part4/questions-3',
    3 : '/alien-part4/questions-4',
    4 : '/alien-part4/questions-5',
}

class AlienPart4 extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            title: <Link to="/alien-part4/questions-1">Questions Part 1</Link>,
            content: <QuestionPart1 />,
        }, 
        {
            title: <Link to="/alien-part4/questions-2">Questions Part 2</Link>,
            content: <QuestionPart2 />,
        }, 
        {
            title: <Link to="/alien-part4/questions-3">Questions Part 3</Link>,
            content: <QuestionPart3 />,
        }, 
        {
            title: <Link to="/alien-part4/questions-4">Questions Part 4</Link>,
            content: <QuestionPart4 />,
        }, 
        {
            title: <Link to="/alien-part4/questions-5">Questions Part 5</Link>,
            content: <QuestionPart5 />,
        }       
    ];

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
        let path = currentFormState[current];
        history.push(path);
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
        let path = currentFormState[current];
        history.push(path);
    }

    renderComponent(path){
        switch(path){
            case 'Questions-1':
                return <QuestionPart1/>;
            case 'Questions-2':
                return <QuestionPart2/>;
            case 'Questions-3':
                return <QuestionPart3/>;
            case 'Questions-4':
                return <QuestionPart4/>;
            case 'Questions-5':
                return <QuestionPart5/>;
            default:
                return <QuestionPart1/>;
        }
    }
    render() {
        const { current } = this.state;
        return (
            <div id="alien-part-4">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={current}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/alien-part4/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            <Route path="/" exact component={QuestionPart1} />
                    </div>
                    <div className="steps-action">
                        {
                            current < this.steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            current === this.steps.length - 1
                            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                        {
                            current > 0
                            && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )
                        }
                            <Button style={{ marginLeft: 8 }} >
                                Save &amp; Continue
                                <Icon type="arrow-right" />
                            </Button>

                    </div>
                    </div>
                </Router>
            </div>

        );
    }
}


export default AlienPart4;
