import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Name from './alien-part1.1/alien-part1.1';
import Citizenship from './alien-part1.2/alien-part1.2';
import Address from './alien-part1.3/alien-part1.3';
import Contact from './alien-part1.4/alien-part1.4';
import MaritalStatus from './alien-part1.5/alien-part1.5';

import './alien-part1.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/dashboard/alien-part1/name',
    1 : '/dashboard/alien-part1/citizenship',
    2 : '/dashboard/alien-part1/address',
    3 : '/dashboard/alien-part1/contact',
    4 : '/dashboard/alien-part1/marital-status',
}

class AlienPart1 extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            title: <Link to="/dashboard/alien-part1/name">Name</Link>,
            content: <Name />,
        }, {
            title: <Link to="/dashboard/alien-part1/citizenship">Citizenship</Link>,
            content: <Citizenship />,
        }, {
            title: <Link to="/dashboard/alien-part1/address">Address</Link>,
            content: <Address />,
        }, {
            title: <Link to="/dashboard/alien-part1/contact">Contact</Link>,
            content: <Contact />,
        }, {
            title: <Link to="/dashboard/alien-part1/marital-status">Marital Status</Link>,
            content: <MaritalStatus />,
        },];

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
            case 'Name':
                return <Name/>;
            case 'Citizenship':
                return <Citizenship/>;
            case 'Address':
                return <Address/>;
            case 'Contact':
                return <Contact/>;
            case 'Marital-status':
                return <MaritalStatus/>;
            default:
                return <Name/>;
        }
    }

    componentDidMount(){
        let path = currentFormState[this.state.current]
        history.push(path);
    }

    render() {
        const { current } = this.state;
        return (
            <div id="alien-part-1">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={current}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/dashboard/alien-part1/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            {/* <Route path="/dashboard/alien-part1/name" exact component={Name} /> */}
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


export default AlienPart1;
