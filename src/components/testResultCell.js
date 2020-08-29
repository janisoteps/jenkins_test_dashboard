import React from 'react';

export default function TestResultCell(props) {
    const date = new Date(props.result.timestamp).toLocaleDateString('DE');
    const time = new Date(props.result.timestamp).toLocaleTimeString('DE');
    const backgroundColor = props.result.result === 'SUCCESS' ? 'rgba(108, 204, 82, 0.8)' : 'rgba(224, 118, 96, 0.8)';
    return (
        <div
            key={`${props.result.timestamp}${Math.random()}`}
            style={{
                width: '200px',
                height: '30px',
                backgroundColor: backgroundColor,
                display: 'flex',
                justifyContent: 'space-evenly',
                paddingTop: '10px',
                cursor: 'pointer'
            }}
            onClick={() => {
                window.open(props.result.url, '_blank');
            }}
        >
            {date} {time}
        </div>
    )
}
