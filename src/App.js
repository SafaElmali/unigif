/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Layout, Row, Button, BackTop } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';
import GifCard from "./components/GifCard";
import { searchURL, trendURL } from './utils/api';
import { toastError } from './utils/toaster';
import Header from './components/Header/Header';

const { Content } = Layout;

const App = () => {
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [offset, setOffset] = useState(0);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        handleLoadData();
        window.onscroll = debounce(() => {
            if ((window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) && !isSearch) {
                handleLoadData();
            }
        }, 100);
    }, [handleLoadData, isSearch])

    // Reset the states on each search
    const handleResetStates = () => {
        setIsSearch(true);
        setData([]);
        setOffset(20);
    }

    // Triggered when component initialized && user reaches bottom of the screen
    const handleLoadData = async () => {
        if (!isSearch) {
            const url = trendURL + `&offset=${offset}`;
            await axios.get(url)
                .then(res => {
                    if (res.status === 200) {
                        setData(prevData => prevData.concat(res.data.data))
                        setOffset(prevOffSet => prevOffSet + 20);
                    }
                })
                .catch((err) => {
                    toastError(err);
                });
        }
    };

    // Get user specific searched gifs
    const getSearchData = (responseArr, searchValue) => {
        setData(prevData => []);
        setData(prevData => prevData.concat(responseArr.data))
        setSearchValue(searchValue);
    }

    // Triggered if user clicks 'Load More' button  
    const onLoadMoreGifs = () => {
        const url = searchURL + `&q=${searchValue}&offset=${offset}`;

        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    setData(prevData => prevData.concat(res.data.data))
                    setOffset(20);
                }
            })
            .catch((err) => {
                toastError(err);
            });
    }

    return (
        <Layout>
            <BackTop />
            <Content>
                <Header handleResetStates={handleResetStates} getSearchData={getSearchData} />
                {data.length <= 0 ? <p>Loading..</p>
                    : (
                        <Row type="flex" className="gif-card-parent">
                            {data.map((value, index) => (
                                <GifCard key={index} originalUrl={value.images.original.url} id={index} title={value.title} webUrl={value.url} />
                            ))
                            }
                        </Row>
                    )
                }
                {isSearch ?
                    <Row type="flex" justify='center' className="button-props">
                        <Button type="primary" shape="round" icon="plus-circle" size='large' onClick={onLoadMoreGifs}>
                            Load More
                        </Button>
                    </Row> : null
                }
            </Content>
        </Layout>
    )
}

export default App;