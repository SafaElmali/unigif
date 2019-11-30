import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import axios from 'axios';

const { Search } = Input;
const giphy_key = "ehOAhqPcPnlajfSrPBlgqIfaF28BSvYj"
let searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphy_key}&limit=20`;

const SearchArea = (props) => {
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    function handleSearchInput(value) {
        if (value.trim() === '') {
            return;
        }

        const { onResetStates, getSearch } = props;
        setLoading(true);
        searchURL = searchURL + `&q=${value}&offset=${offset}`;

        axios.get(searchURL).then(res => {
            if (res.status === 200) {
                onResetStates();
                getSearch(res.data);
                setLoading(false);
            }
        });
    }

    return (
        <Row type="flex" justify="center" className="search-area-row">
            <Col xs={24} sm={12} md={12} lg={6}>
                <Search
                    placeholder="Search all gifs"
                    onSearch={handleSearchInput}
                    className="search-props"
                    loading={loading}
                    allowClear
                />
            </Col>
        </Row>
    );
}

export default SearchArea;