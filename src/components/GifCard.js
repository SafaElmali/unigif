import React, { Component } from 'react';
import { Typography, Col } from 'antd';

const { Title, Text } = Typography;

export default class GifCard extends Component {
    render() {
        let { web_url, original_url, title } = this.props;
        return (
            <Col>
                <div className="gif-card">
                    <div className="gif-header">
                        <a href={web_url} target="_blank" rel="noopener noreferrer"><img src={original_url} alt={title === '' ? 'No title' : title} /></a>
                    </div>
                    <div className="gif-body">
                        <Title level={4}>{title === '' ? 'No title' : title}</Title>
                        <Text type="secondary"><a href={web_url} target="_blank" rel="noopener noreferrer">Go to source</a></Text>
                    </div>
                </div>
            </Col>
        )
    }
}

