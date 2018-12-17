import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import VisaInfo from './visa-info/visa-info';
import Schools from './schools/schools';
import Travel from './travel/travel';
import Military from './military/military';
import Activity from './activity/activity';
import Immigration from './immigration/immigration';
import Languages from './languages/languages';
import USVisits from './us-visits/us-visits';
import Relatives from './relatives/relatives';

import './alien-part3.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/alien-part3/visa-info',
    1 : '/alien-part3/schools',
    2 : '/alien-part3/travel',
    3 : '/alien-part3/military',
    4 : '/alien-part3/activity',
    5 : '/alien-part3/immigration',
    6 : '/alien-part3/us-visits',
    7 : '/alien-part3/relatives',
}

class AlienPart3 extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            title: <Link to="/alien-part3/visa-info">Visa Info</Link>,
            content: <VisaInfo />,
        }, 
        {
            title: <Link to="/alien-part3/schools">Schools</Link>,
            content: <Schools />,
        },
        {
            title: <Link to="/alien-part3/travel">Travel</Link>,
            content: <Travel />,
        },
        {
            title: <Link to="/alien-part3/military">Military</Link>,
            content: <Military />,
        },
        {
            title: <Link to="/alien-part3/activity">Activity</Link>,
            content: <Activity />,
        },
        {
            title: <Link to="/alien-part3/immigration">Immigration</Link>,
            content: <Immigration />,
        },
        {
            title: <Link to="/alien-part3/languages">Languages</Link>,
            content: <Languages />,
        },
        {
            title: <Link to="/alien-part3/us-visits">U.S. Visits</Link>,
            content: <USVisits />,
        },
        {
            title: <Link to="/alien-part3/relatives">Relatives</Link>,
            content: <Relatives />,
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
            case 'Visa-info':
                return <VisaInfo/>;
            case 'Schools':
                return <Schools/>;
            case 'Travel':
                return <Travel/>;
            case 'Military':
                return <Military/>;
            case 'Activity':
                return <Activity/>;
            case 'Immigration':
                return <Immigration/>;
            case 'Languages':
                return <Languages/>;
            case 'Us-visits':
                return <USVisits/>;
            case 'Relatives':
                return <Relatives/>;
            default:
                return <VisaInfo/>;
        }
    }
    render() {
        const { current } = this.state;
        return (
            <div id="alien-part-3">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={current}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/alien-part3/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            <Route path="/" exact component={VisaInfo} />
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


export default AlienPart3;
