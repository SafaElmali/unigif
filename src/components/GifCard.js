import React from 'react';
import { Typography, Col } from 'antd';

const { Title, Text } = Typography;

const GifCard = (props) => {
    let { webUrl, originalUrl, title } = props;
    return (
        <Col>
            <div className="gif-card">
                <div className="gif-header">
                    <a href={webUrl} target="_blank" rel="noopener noreferrer"><img src={originalUrl} alt={title === '' ? 'No title' : title} /></a>
                </div>
                <div className="gif-body">
                    <Title level={4}>{title === '' ? 'No title' : title}</Title>
                    <Text type="secondary"><a href={webUrl} target="_blank" rel="noopener noreferrer">Go to source</a></Text>
                </div>
            </div>
        </Col>
    );
}

export default GifCard;