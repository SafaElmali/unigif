import React, { Component } from 'react';
import { Layout, Typography, Row, Col, Input, Button } from 'antd';
const { Footer, Sider, Content } = Layout;
const { Text } = Typography;
const { Search } = Input;


export default class App extends Component {
    render() {
        return (
            <Layout>
                <Content>
                    <Row className="header">
                        <Col xs={24} className="header-props">
                            <Row className="header-row-props text-center-row">
                                <Col xs={24}>
                                    <Text className="header-brand-text text-color">Unigif</Text>
                                </Col>
                                <Col xs={24}>
                                    <Text strong className="header-text text-color">Make universal search to find funny GIFs, reaction GIFs, unique GIFs and more.</Text>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center" className="search-area-row">
                                <Col xs={24} sm={12} md={12} lg={6}>
                                    <Search
                                        placeholder="Search all gifs"
                                        onSearch={value => console.log(value)}
                                        className="search-props"
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}