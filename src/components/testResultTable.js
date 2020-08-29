import React from 'react';
import TestResultCell from "./testResultCell";

export default function TestResultTable(props) {
    const DataRows = () => {
        console.log(props.results);
        const rows = Object.keys(props.results).map(testName => {
            const columns = props.results[testName].map(resultDict => {
                return (
                    <TestResultCell
                        key={`${resultDict.timestamp}${Math.random()}`}
                        result={resultDict}
                    />
                )
            })

            return (
                <div
                    key={testName}
                    style={{
                        padding: '5px',
                        margin: '15px',
                        borderRadius: '20px',
                        boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
                        position: 'relative',
                        paddingLeft: '20px'
                    }}
                >
                    <div
                        style={{
                            fontSize: '1.1rem',
                            position: 'relative',
                            width: '100%',
                            textAlign: 'left',
                            marginBottom: '5px'
                        }}
                    >
                        {testName}
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        {columns}
                    </div>
                </div>
            )
        })

        return (
            <div>
                {rows}
            </div>
        )
    }

    return (
        <div>
            <DataRows />
        </div>
    )
}
