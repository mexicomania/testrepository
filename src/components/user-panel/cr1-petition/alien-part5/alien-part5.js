import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Children from './children/children';

import './alien-part5.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/alien-part5/children',
}

class AlienPart5 extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            title: <Link to="/alien-part5/children">Alien Children</Link>,
            content: <Children />,
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
            case 'Children-1':
                return <Children/>;
            default:
                return <Children/>;
        }
    }
    render() {
        const { current } = this.state;
        return (
            <div id="alien-part-5">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={current}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/alien-part5/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            <Route path="/" exact component={Children} />
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


export default AlienPart5;
