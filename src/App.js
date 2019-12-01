import React, { Component } from 'react';
import { Layout, Typography, Row, Col, Button, BackTop } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import SearchArea from "./components/SearchArea";
import GifCard from "./components/GifCard";
import { searchURL, trendURL } from './utils/api';
import { toastError } from './utils/toaster';

const { Content } = Layout;
const { Text } = Typography;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            trendData: [],
            searchData: [],
            searchValue: '',
            trendOffset: 0,
            searchOffset: 20,
            isSearch: false,
        }

        // If user makes search onScroll will be disabled
        window.onscroll = debounce(() => {
            if ((window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) && !this.state.isSearch) {
                this.handleMoreTrends();
            }
        }, 100);

        this.onResetStates = this.onResetStates.bind(this);
        this.getSearchData = this.getSearchData.bind(this);
        this.onDisplayTrends = this.onDisplayTrends.bind(this);
    }

    componentDidMount() {
        this.handleMoreTrends();
    }

    // Triggered when component initialized && user reaches bottom of the screen
    handleMoreTrends = () => {
        const { trendOffset } = this.state;
        const url = trendURL + `&offset=${trendOffset}`;

        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        trendData: [...this.state.trendData, ...res.data.data],
                        trendOffset: trendOffset + 20
                    });
                }
            })
            .catch((err) => {
                toastError(err);
            });
    };

    onDisplayTrends() {
        this.setState({ trendOffset: 0, trendData: [], searchData: [], isSearch: false, searchOffset: 20 }, () => {
            this.handleMoreTrends();
        });
    }

    // Triggered if user clicks 'Load More' button  
    onLoadMoreGifs = () => {
        const { searchValue, searchOffset } = this.state;
        const url = searchURL + `&q=${searchValue}&offset=${searchOffset}`;

        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        searchData: [...this.state.searchData, ...res.data.data],
                        searchOffset: searchOffset + 20
                    });
                }
            })
            .catch((err) => {
                toastError(err);
            });
    }

    // Reset the states on each search
    onResetStates = () => {
        this.setState({
            isSearch: true,
            searchData: [],
            trendData: [],
            searchOffset: 20
        });
    }

    // Get user specific searched gifs
    getSearchData = (responseArr, searchValue) => {
        this.setState({
            searchData: [...this.state.searchData, ...responseArr.data],
            searchValue: searchValue
        });
    }

    render() {
        let { isSearch, searchData, trendData } = this.state;
        return (
            <Layout>
                <BackTop />
                <Content>
                    <Row type='flex' justify='center'>
                        <Col xs={24} className="header-props">
                            <Row className="header-row-props text-center-row">
                                <Col xs={24}>
                                    <Text className="header-brand-text text-color">Unigif</Text>
                                </Col>
                                <Col xs={24}>
                                    <Text strong className="header-text text-color">Make universal search to find funny GIFs, reaction GIFs, unique GIFs and more.</Text>
                                </Col>
                                <Col xs={24}>
                                    <SearchArea onResetStates={this.onResetStates} getSearch={this.getSearchData} />
                                </Col>
                                {isSearch ?
                                    <Col xs={24}>
                                        <div className="display-trend-props">
                                            <Text className="trend-text" onClick={this.onDisplayTrends}>Display Trends</Text>
                                        </div>
                                    </Col> : null
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row type="flex" justify='center' className="gif-card-parent">
                        {
                            isSearch ? (searchData.length <= 0 ? <p>Loading..</p> :
                                searchData.map((value, index) => {
                                    return <GifCard key={index} original_url={value.images.original.url} id={index} title={value.title} web_url={value.url} />
                                })) :
                                trendData.length <= 0 ?
                                    (
                                        <p>Loading..</p>
                                    ) :
                                    trendData.map((value, index) => {
                                        return <GifCard key={index} original_url={value.images.original.url} id={index} title={value.title} web_url={value.url} />
                                    })
                        }
                    </Row>
                    {isSearch ?
                        <Row type="flex" justify='center' className="button-props">
                            <Button type="primary" shape="round" icon="plus-circle" size='large' onClick={this.onLoadMoreGifs}>
                                Load More
                            </Button>
                        </Row> : null
                    }
                </Content>
            </Layout>
        )
    }
}