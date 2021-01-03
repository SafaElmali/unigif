import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import axios from 'axios';
import { searchURL } from '../utils/api';
import { toastError } from '../utils/toaster';

const { Search } = Input;

const SearchArea = ({ onResetStates, getSearchData}) => {
    const [loading, setLoading] = useState(false);

    const handleSearchInput = value => {
        if (value.trim() === '') {
            return;
        }

        setLoading(true);
        const url = searchURL + `&q=${value}&offset=0`;

        axios.get(url).then(res => {
            if (res.status === 200) {
                onResetStates();
                getSearchData(res.data, value);
                setLoading(false);
            }
        })
            .catch((err) => {
                toastError(err);
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