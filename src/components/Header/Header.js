import { Col, Row, Typography } from 'antd';
import React from 'react';
import SearchArea from '../SearchArea';

const { Text } = Typography;

const Header = ({ handleResetStates, getSearchData }) => {
    return (
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
                        <SearchArea onResetStates={handleResetStates} getSearchData={getSearchData} />
                    </Col>
                    {/* {isSearch ?
                    <Col xs={24}>
                        <div className="display-trend-props">
                            <Text className="trend-text" onClick={this.onDisplayTrends}>Display Trends</Text>
                        </div>
                    </Col> : null
                } */}
                </Row>
            </Col>
        </Row>
    )
}

export default Header;