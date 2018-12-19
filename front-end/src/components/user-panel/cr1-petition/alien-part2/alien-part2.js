import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message, Icon } from 'antd';
import { Router, Route, Link,Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Parents from './alien-part2.1/parents';
import VisitedUS from './alien-part2.2/visited-US';
import Embassy from './alien-part2.3/embassy';
import Employment from './alien-part2.4/employment';

import './alien-part2.css';

const Step = Steps.Step;

const history = createBrowserHistory();

const currentFormState = {
    0 : '/questionnaire/parents',
    1 : '/questionnaire/visited-US',
    2 : '/questionnaire/embassy',
    3 : '/questionnaire/employment',
}

class AlienPart2 extends Component {

    state = {
        current: 0,
    }


    steps = [
        {
            title: <Link to="/alien-part2/parents">Parents</Link>,
            content: <Parents />,
        }, {
            title: <Link to="/alien-part2/visited-US">Visited U.S.</Link>,
            content: <VisitedUS />,
        },{
            title: <Link to="/alien-part2/embassy">Embassy</Link>,
            content: <Embassy />,
        },{
            title: <Link to="/alien-part2/employment">Employment</Link>,
            content: <Employment />,
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
            case 'Parents':
                return <Parents/>;
            case 'Visited-US':
                return <VisitedUS/>;
            case 'Embassy':
                return <Embassy/>;
            case 'Employment':
                return <Employment/>;
            default:
                return <Parents/>;
        }
    }
    render() {
        const { current } = this.state;
        return (
            <div id="alien-part-2">
                <Router history={history}>
                    <div>
                    <Steps size="small" current={current}>
                        {this.steps.map((item, index) => <Step key={index} title={item.title} icon={<Icon type="check-circle" />} />)}
                    </Steps>
                    <div className="steps-content">
                        {/* {this.steps[current].content} */}
                        <Route path="/alien-part2/:id" render={({match}) => {
                            let childPath = match.params.id;
                            let DerivedPath = childPath.charAt(0).toUpperCase() + childPath.slice(1); 
                            console.log(DerivedPath)
                            return this.renderComponent(DerivedPath) ;
                            }} />
                            <Route path="/" exact component={Parents} />
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


export default AlienPart2;
