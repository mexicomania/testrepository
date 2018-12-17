import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Status from './citizen-part2.1/citizen-part2.1';
import Bio from './citizen-part2.2/bio';
import PreviousFilings from './citizen-part2.3/previous-filings';
import MilitaryConvictions from './citizen-part2.4/military-convictions';
import Relationships from './citizen-part2.5/relationships';
import Employment from './citizen-part2.6/employment';

// import CitizenOne2 from './citizen-part1.2/citizen-part1.1';
import './citizen-part2.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/dashboard/citizen-part2/status',
    1 : '/dashboard/citizen-part2/bio',
    2 : '/dashboard/citizen-part2/previous-filings',
    3 : '/dashboard/citizen-part2/military-convictions',
    4 : '/dashboard/citizen-part2/relationships',
    5 : '/dashboard/citizen-part2/employment',
}

class CitizenPart2 extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            title: <Link to="/dashboard/citizen-part2/status">Status</Link>,
            content: <Status />,
        }, {
            title: <Link to="/dashboard/citizen-part2/bio">Bio</Link>,
            content: <Bio />,
        }, {
            title: <Link to="/dashboard/citizen-part2/previous-filings">Previous Filings</Link>,
            content: <PreviousFilings />,
        }, {
            title: <Link to="/dashboard/citizen-part2/military-convictions">Military &amp; Convictions</Link>,
            content: <MilitaryConvictions />,
        }, {
            title: <Link to="/dashboard/citizen-part2/relationships">Relationships</Link>,
            content: <Relationships />,
        }, {
            title: <Link to="/dashboard/citizen-part2/employment">Employment</Link>,
            content: <Employment />,
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
            case 'Status':
                return <Status/>;
            case 'Bio':
                return <Bio/>;
            case 'Previous-filings':
                return <PreviousFilings/>;
            case 'Military-convictions':
                return <MilitaryConvictions/>;
            case 'Relationships':
                return <Relationships/>;
            case 'Employment':
                return <Employment/>;
            default:
                return <Status/>;
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
            <div id="citizen-part2">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={stepperState}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/dashboard/citizen-part2/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            {/* <Route path="/" exact component={Status} /> */}
                    </div>
                    <div className="steps-action">
                        {
                            stepperState < this.steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {/* {
                            stepperState === this.steps.length - 1
                            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
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


export default CitizenPart2;
