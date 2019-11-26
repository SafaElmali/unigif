import React, { Component } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import SearchArea from "./components/SearchArea";
import GifCard from "./components/GifCard";
import { getTrends } from './utils/api';
const { Footer, Sider, Content } = Layout;
const { Text } = Typography;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            trendData: [],
        }
    }

    componentDidMount() {
        this.handleDisplayTrends();
    }

    handleDisplayTrends() {
        getTrends().then(res => {
            this.setState({
                trendData: res.data
            });
        });
    }

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
                            <SearchArea />
                        </Col>
                    </Row>
                    <Row type="flex" justify='center'>
                        {
                            this.state.trendData.length > 0 ?
                                this.state.trendData.map(value => {
                                    return <GifCard key={value.id} original_url={value.images.original.url} id={value.id} title={value.title} web_url={value.url} />
                                }) : null
                        }
                    </Row>
                </Content>
            </Layout>
        )
    }
}