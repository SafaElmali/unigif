import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
const { Search } = Input;

const SearchArea = (props) => {
    const [loading, setLoading] = useState(false);

    function handleSearchInput(value) {
        console.log(value);
    }

    return (
        <Row type="flex" justify="center" className="search-area-row">
            <Col xs={24} sm={12} md={12} lg={6}>
                <Search
                    placeholder="Search all gifs"
                    onSearch={handleSearchInput}
                    className="search-props"
                    loading={loading}
                />
            </Col>
        </Row>
    );
}

export default SearchArea;