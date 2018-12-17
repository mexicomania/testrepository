import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Name from './citizen-part1.1/citizen-part1.1';
import Address from './citizen-part1.2/address';
import Residence from './citizen-part1.3/residence';
import Contact from './citizen-part1.4/contact';
import PlaceOfBirth from './citizen-part1.5/place-of-birth';
import MaritalStatus from './citizen-part1.6/marital-status';

// import CitizenOne2 from './citizen-part1.2/citizen-part1.1';
import './citizen-part1.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/dashboard/citizen-part1/name',
    1 : '/dashboard/citizen-part1/address',
    2 : '/dashboard/citizen-part1/residence',
    3 : '/dashboard/citizen-part1/contact',
    4 : '/dashboard/citizen-part1/place-of-birth',
    5 : '/dashboard/citizen-part1/marital-status',
}

class Questionnaire extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            // title: 'Name',
            title: <Link to="/dashboard/citizen-part1/name">Name</Link>,
            content: <Name />,
        }, {
            // title: 'Address',
            title: <Link to="/dashboard/citizen-part1/address">Address</Link>,
            content: <Address />,
        }, {
            // title: 'Residence',
            title: <Link to="/dashboard/citizen-part1/residence">Residence</Link>,
            content: <Residence />,
        }, {
            // title: 'Contact',
            title: <Link to="/dashboard/citizen-part1/contact">Contact</Link>,
            content: <Contact />,
        }, {
            // title: 'Place of Birth',
            title: <Link to="/dashboard/citizen-part1/place-of-birth">Place of Birth</Link>,
            content: <PlaceOfBirth />,
        }, {
            // title: 'Marital Status',
            title: <Link to="/dashboard/citizen-part1/marital-status">Marital Status</Link>,
            content: <MaritalStatus />,
        },];

    next() {
        this.props.next();
        let current = this.props.stepperState + 1;
        let path = currentFormState[current];
        history.push(path);
    }

    prev() {
        this.props.prev();
        const current = this.props.stepperState - 1;
        let path = currentFormState[current];
        history.push(path);
    }

    saveNcontinue(){
        const current = this.props.stepperState;
        if(current === this.steps.length - 1){
            console.log("form end");
            this.props.endForm();
        }
    }

    renderComponent(path){
        switch(path){
            case 'Name':
                return <Name/>;
            case 'Address':
                return <Address/>;
            case 'Residence':
                return <Residence/>;
            case 'Contact':
                return <Contact/>;
            case 'Place-of-birth':
                return <PlaceOfBirth/>;
            case 'Marital-status':
                return <MaritalStatus/>;
            default:
                return <Name/>;
        }
    }

    componentDidMount(){
        let path = currentFormState[this.state.current];
        history.push(path);
    }
    render() {
        const { current } = this.state;
        const { stepperState } = this.props;
        return (
            <div id="questionnaire">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={stepperState}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/dashboard/citizen-part1/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            {/* <Route path="/" exact component={Name} /> */}
                    </div>
                    <div className="steps-action">
                        {
                            stepperState < this.steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {/* {
                            stepperState === this.steps.length - 1
                            && <Button type="primary" onClick={() => {
                                message.success('Processing complete!')

                            }}>Done</Button>
                        } */}
                        {
                            stepperState > 0
                            && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )
                        }
                            <Button style={{ marginLeft: 8 }} onClick={() => this.saveNcontinue()}>
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


export default Questionnaire;
