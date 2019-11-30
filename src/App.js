import React, { Component } from 'react';
import { Layout, Typography, Row, Col, Button } from 'antd';
import env from './config/env';
import axios from 'axios';
import debounce from 'lodash.debounce';
import SearchArea from "./components/SearchArea";
import GifCard from "./components/GifCard";

const { Content } = Layout;
const { Text } = Typography;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            trendData: [],
            searchData: [],
            offset: 0,
            isSearch: false,
        }

        // If user makes search onScroll will be disabled
        if (!this.state.isSearch) {
            window.onscroll = debounce(() => {
                if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                    this.handleMoreTrends();
                }
            }, 100);
        }

        this.onResetStates = this.onResetStates.bind(this);
        this.getSearchData = this.getSearchData.bind(this);
    }

    componentDidMount() {
        this.handleMoreTrends();
    }

    // Triggered when user reaches bottom of the screen
    handleMoreTrends = () => {
        const { offset } = this.state;
        this.setState({
            offset: offset + 20
        });

        const trendURL = `${env.API_URL}?api_key=${env.GIPHY_KEY}&limit=20&offset=${offset}`;

        axios.get(trendURL)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        trendData: [...this.state.trendData, ...res.data.data]
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // reset the states on each search
    onResetStates = () => {
        this.setState({
            isSearch: true,
            searchData: [],
            trendData: []
        });

    }

    // 
    getSearchData = responseArr => {
        this.setState({
            searchData: [...this.state.searchData, ...responseArr.data]
        })
    }

    render() {
        let { isSearch, searchData, trendData } = this.state;
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
                            <SearchArea onResetStates={this.onResetStates} getSearch={this.getSearchData} />
                        </Col>
                    </Row>
                    <Row type="flex" justify='start'>
                        {
                            isSearch ? (searchData.length <= 0 ? <p>No Search Data</p> :
                                searchData.map((value, index) => {
                                    return <GifCard key={index} original_url={value.images.original.url} id={index} title={value.title} web_url={value.url} />
                                })) :
                                trendData.length <= 0 ?
                                    (
                                        <p>No trend Data</p>
                                    ) :
                                    trendData.map((value, index) => {
                                        return <GifCard key={index} original_url={value.images.original.url} id={index} title={value.title} web_url={value.url} />
                                    })
                        }
                    </Row>
                    {isSearch ?
                        <Row type="flex" justify='center' className="button-props">
                            <Button type="primary" shape="round" icon="plus-circle" size='large'>
                                Load More
                        </Button>
                        </Row> : null
                    }
                </Content>
            </Layout>
        )
    }
}