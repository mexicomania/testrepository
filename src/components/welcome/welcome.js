import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import './welcome.css';

const { Content } = Layout;

class Welcome extends Component {

  render() {
    return (
    <div className="welcome-container">
    <Layout>
        <Content style={{ margin: '30px 16px', overflow: 'initial' }}>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    <h1 className='landing-heading'>Filipina Fiancee Visa Service</h1>
                    <h2>Just Login to start</h2>
                    <Col span={2}></Col>
                </Col>
            </Row>
        </Content>

    </Layout>
</div>
    );
  }
}

export default Welcome;



