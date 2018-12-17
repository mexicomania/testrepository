import React, { Component } from 'react';
import { Layout, Menu, Steps, Tooltip,Icon } from 'antd';
import { Router, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Questionnaire from './user-panel/cr1-petition/citizen-part1/citizen-part1';
import CitizenPart2 from './user-panel/cr1-petition/citizen-part2/citizen-part2';
import AlienPart1 from './user-panel/cr1-petition/alien-part1/alien-part1';
import AlienPart2 from './user-panel/cr1-petition/alien-part2/alien-part2';
import AlienPart3 from './user-panel/cr1-petition/alien-part3/alien-part3';
import AlienPart4 from './user-panel/cr1-petition/alien-part4/alien-part4';
import AlienPart5 from './user-panel/cr1-petition/alien-part5/alien-part5';
import MessageComponent from './messages';
import DynamicModal from './dynamic-modal/dynamic-modal';

const { Content, Sider } = Layout;
const Step = Steps.Step;

const history = createBrowserHistory();

const currentQuestionnnairesFormState = {
    0 : '/dashboard/citizen-part1',
    1 : '/dashboard/citizen-part2',
    2 : 'dashboard/alien-part1',
    3 : '/dashboard/alien-part2',
    4 : '/dashboard/alien-part3',
    5 : '/dashboard/alien-part4',
    6 : '/dashboard/alien-part5',
}


class Sidebar extends Component {
    state = {
        openModal:false,
        modalHeaderText:'',
        innerStepper:0,
        outterStepper:0
    }

    openDialog = (modalName) =>{
        console.log(modalName)
        this.setState({openModal:true,modalHeaderText:modalName})
        console.log(this.state.openModal)
    }

    closeDialog = () =>{
        this.setState({openModal:false})
    }

    saveNumber = (data) => {
        if(data)
        console.log(data)
        this.setState({openModal:false})
    }

    next() {
        const innerStepper = this.state.innerStepper + 1;
        this.setState({ innerStepper });
        // let path = currentFormState[current];
        // history.push(path);
    }
    prev() {
        const innerStepper = this.state.innerStepper - 1;
        this.setState({ innerStepper });
        // let path = currentFormState[current];
        // history.push(path);
    }
    endForm(){
        console.log(this.state.outterStepper)
        const outterStepper = this.state.outterStepper + 1;
        console.log(outterStepper)
        this.setState({innerStepper:0,outterStepper});
        let path = currentQuestionnnairesFormState[outterStepper]
        console.log(path)
        this.props.history.push(path)
    }

    render() {
        const { openModal,modalHeaderText, outterStepper } = this.state;
        return (

                <Layout>
                    <Sider width={300} style={{ background: '#f5f5f5', marginLeft: '10px' }}>
                        <div>
                            <h2 style={{ padding: '10px 30px' }}>K1 Petition Process</h2>
                        </div>
                        <Steps direction="vertical" size="small" current={1}>
                            <Step title="Complete Questionnaire" description={Questionnaires} />
                            <Step title="USCIS Pre-Approval" description={<USCISPreApproval modalEvent={this.openDialog.bind(this)}/>} />
                            <Step title="NVC Phase Information" description={<NVCPhaseInformation modalEvent={this.openDialog.bind(this)}/>} />
                            <Step title="Complete Support Questionnaire" description={CompleteSupportQuestionnaire} />
                            <Step title="Support &amp; DS-160 Actions" description={SupportDS160Actions} />
                            <Step title="Complete" description='' />
                        </Steps>
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            {/* <Questionnaire /> */}
                            {/* <Route path="/dashboard/citizen-part1" component={Questionnaire} /> */}
                            <Route path="/dashboard/citizen-part1"
                            render={routeProps => 
                            <Questionnaire 
                                next={this.next.bind(this)}
                                prev={this.prev.bind(this)}
                                endForm={this.endForm.bind(this)}
                                stepperState={this.state.innerStepper} 
                                {...routeProps} />} />
                            <Route path="/dashboard/citizen-part2" 
                                render={routeProps => 
                                    <CitizenPart2 
                                        next={this.next.bind(this)}
                                        prev={this.prev.bind(this)}
                                        endForm={this.endForm.bind(this)}
                                        stepperState={this.state.innerStepper} 
                                        {...routeProps} />} />
                            <Route path="/dashboard/alien-part1" component={AlienPart1} />
                            <Route path="/dashboard/alien-part2" component={AlienPart2} />
                            <Route path="/dashboard/alien-part3" component={AlienPart3} />
                            <Route path="/dashboard/alien-part4" component={AlienPart4} />
                            <Route path="/dashboard/alien-part5" component={AlienPart5} />
                            <Route path="/dashboard/messages" component={MessageComponent} />


                            <DynamicModal 
                                modalState={openModal}
                                headerText={modalHeaderText} 
                                closeModal={this.closeDialog}
                                saveEvent={this.saveNumber.bind(this)}/>
                        </Content>
                    </Layout> 
                </Layout>
        );
    }
}

export default Sidebar;





const Questionnaires = <Steps direction="vertical" size="small" current={2}>
    <Step title={<Link to="/dashboard/citizen-part1">Citizen Part 1</Link>} />
    <Step title={<Link to="/dashboard/citizen-part2">Citizen Part 2</Link>} />
    <Step title={<Link to="/dashboard/alien-part1">Alien Part 1</Link>} />
    <Step title={<Link to="/dashboard/alien-part2">Alien Part 2</Link>} />
    <Step title={<Link to="/dashboard/alien-part3">Alien Part 3</Link>} />
    <Step title={<Link to="/dashboard/alien-part4">Alien Part 4</Link>} />
    <Step title={<Link to="/dashboard/alien-part5">Alien Part 5</Link>} />
</Steps>

const USCISPreApproval = ({ modalEvent }) =>
<Steps direction="vertical" size="small" current={1}>
    <Step icon={<Icon type="thunderbolt"/>} title="Generate K1 Package" />
    <Step icon={<Icon type="select"/>} title={<a target='_blank' href='https://egov.uscis.gov/casestatus/landing.do'>Case Status Inquiry</a>} />
    <Step icon={<Icon type="form" />} title={
            <span onClick={modalEvent.bind(this,'USCIS')}>WAC1690284191&nbsp; 
                <Tooltip title={`Example USCIS Case Number: EAC1234567890 You receive your USCIS case number 
                by email and/or regular mail from the USCIS when they accept your petition. It would be 
                in the first block on the Form I-797. It would be in the first block on the Form I-797. 
                It is a 13 digit number beginning with WAC, EAC, LIN, SRC or MSC followed by 10numbers.
                You will click here, enter the number and click Save.`}>
                <Icon type={'question-circle-o'}></Icon>
                </Tooltip>
            </span>} />
</Steps>

const NVCPhaseInformation = ({ modalEvent }) => <Steps direction="vertical" size="small" current={1}>
    <Step icon={<Icon type="select"/>} title={<a target='_blank' href='https://ceac.state.gov/CEACStatTracker/Status.aspx'>Visa Status Check</a>} />
    <Step icon={<Icon type="form" />} title={
    <span onClick={modalEvent.bind(this,'NVC')}>
    MNL2016623029K1 &nbsp;
    <Tooltip title={`
                    Example NVC Case Number: GUZ2013747003
                    You will receive your NVC case number by email and/or regular mail months after you file, once the USCIS approves your petition and forwards it to the National Visa Center (NVC). You will enter it here and click Save.                   
                    The National Visa Center (NVC) gives each immigrant petition a case number. This number has three letters followed by ten digits (numbers). The three letters are an abbreviation for the overseas embassy or consulate that will process the immigrant visa case (for example, GUZ for Guangzhou, CDJ for Ciudad Juarez).
                    The digits tell us exactly when NVC created the case. For example a case with the number MNL2013747003 would be a case assigned to the U.S. Embassy in Manila. 2013 is the year in which NVC received the case from the USCIS (formerly INS). The Julian date is 747 plus 500, so this case was created on September 4, 2013, the 247th day of the year. The 003 shows that it was the third case created for Manila on that day. This case number is not the same as the USCIS receipt number, which is written on the Notice of Action, Form I-797, from the USCIS. A consular section abroad cannot find a case if all you have is the USCIS receipt number.
                    `}>
                <Icon type={'question-circle-o'}></Icon>
                </Tooltip>
    </span>} />
</Steps>

const CompleteSupportQuestionnaire = <Steps direction="vertical" size="small" current={1}>
    <Step title="Affidavit of Support" />
</Steps>

const SupportDS160Actions = <Steps direction="vertical" size="small" current={1}>
    <Step icon={<Icon type="select"/>} title="Generate AfoS Package" icon={<Icon type="select" />}/>
    <Step icon={<Icon type="select"/>} title="Generate DS-160 Worksheet" />
    <Step icon={<Icon type="select"/>} title={<a target="_blank" href="https://ceac.state.gov/GenNIV/Default.aspx">Apply Online DS-160</a>} />
</Steps>
