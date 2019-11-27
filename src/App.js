import React, { Component } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import { getTrends } from './utils/api';
import env from './config/env';
import axios from 'axios';
import debounce from 'lodash.debounce';
import SearchArea from "./components/SearchArea";
import GifCard from "./components/GifCard";

const { Footer, Sider, Content } = Layout;
const { Text } = Typography;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            trendData: [],
            offset: 0
        }

        window.onscroll = debounce(() => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.handleMoreTrends();
            }
        }, 100);
    }

    componentDidMount() {
        this.handleDisplayTrends();
    }

    // Triggered when component mounted
    handleDisplayTrends() {
        const { offset } = this.state;

        getTrends().then(res => {
            this.setState({
                trendData: res.data,
                offset: offset + 20
            });
        });
    }

    // Triggered when user reaches bottom of the screen
    handleMoreTrends() {
        const { offset } = this.state;
        this.setState({
            offset: offset + 20
        });

        const trendURL = `${env.API_URL}?api_key=${env.GIPHY_KEY}&limit=20&offset=${offset}`;

        axios.get(trendURL)
            .then(res => {
                console.log(res);
                this.setState({
                    trendData: [...this.state.trendData, ...res.data.data]
                });
                console.log(this.state.trendData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                                this.state.trendData.map((value, index) => {
                                    return <GifCard key={index} original_url={value.images.original.url} id={index} title={value.title} web_url={value.url} />
                                }) : null
                        }
                    </Row>
                </Content>
            </Layout>
        )
    }
}