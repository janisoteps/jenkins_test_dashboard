import React, {useEffect, useState} from 'react';
import './App.css';
import {testList} from './data/testList';
import TestResultTable from "./components/testResultTable";


function App() {
    const [testDataList, setTestDataList] = useState([]);
    const [buildResults, setBuildResults] = useState({});

    useEffect(() => {
        setTestDataList(testList);
        getData(testList);
    }, []);

    const getData = (jobList) => {
        fetch('http://localhost:8081/api/get_all', {
            method: 'post',
            body: JSON.stringify({
                tests: jobList.map(testDict => {return testDict.slug})
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }}).then(res => res.json()).then(data => {
            setBuildResults(data)
        })
    }

    return (
        <div className="App">
            <h1>Total Test Count: {testDataList.length}</h1>
            <main>
                {Object.keys(buildResults).length > 0 && (
                    <TestResultTable
                        results={buildResults}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
