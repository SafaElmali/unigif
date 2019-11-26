import React from 'react';
import { Typography } from 'antd';
import { Col } from 'antd';

const { Title, Text } = Typography;

function GifCard(props) {
    return (
        <Col>
            <div className="gif-card" key={props.key}>
                <div className="gif-header">
                    <a href={props.web_url} target="_blank" rel="noopener noreferrer"><img src={props.original_url} alt={props.title === '' ? 'No title' : props.title} /></a>
                </div>
                <div className="gif-body">
                    <Title level={4}>{props.title === '' ? 'No title' : props.title}</Title>
                    <Text type="secondary"><a href={props.web_url} target="_blank" rel="noopener noreferrer">Go to source</a></Text>
                </div>
            </div>
        </Col>
    )
}

export default GifCard;