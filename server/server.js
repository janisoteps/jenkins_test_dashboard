const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.use(bodyParser.json());
const port = parseInt(process.env.PORT, 10) || 8081;
const baseUrl = process.env.JENKINS_URL;


async function getAllJobs(jobList, callback) {
    const resultItemList = jobList.map(async jobName => {
        const res = await fetch(
            `${baseUrl}/view/TestCafe/job/${jobName}/api/json`
        );
        return await res.json()
    });

    Promise.all(resultItemList).then((data) => {
        callback(data)
    });
}

async function getBuildData(jobList, callback) {
    let buildResults = {};
    jobList.map(resultDict => {
        const buildResultList = resultDict.builds.slice(0, 5).map(async buildDict => {
            const res = await fetch(`${buildDict.url}/api/json`);
            return await res.json()
        });

        Promise.all(buildResultList).then((data) => {
            buildResults[resultDict.displayName] = data;
            if(Object.keys(buildResults).length === jobList.length) {
                callback(buildResults);
            }
        });
    });
}


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/get_single', function (req, res) {
    const jenkinsUrl = req.query.slug;

    let options = {
        method: 'GET',
        url: `${baseUrl}/view/TestCafe/job/${jenkinsUrl}/api/json`
    };

    function handleResponse(error, response, body){
        if (!error && response.statusCode === 200) {
            let response_data = JSON.parse(body);

            res.send(response_data);
        }
    }

    request(options, handleResponse);
});


app.get('/api/get_build', function (req, res) {
    const jenkinsUrl = decodeURIComponent(req.query.jenkinsurl);

    let options = {
        method: 'GET',
        url: `${jenkinsUrl}/api/json`
    };

    function handleResponse(error, response, body){
        if (!error && response.statusCode === 200) {
            let response_data = JSON.parse(body);

            res.send(response_data);
        }
    }

    request(options, handleResponse);
});


app.post('/api/get_all', function(req, res) {
    const testNames = req.body.tests;

    getAllJobs(testNames, (results) => {
        getBuildData(results, buildResults => {
            res.send(buildResults);
        });
    });
});


app.use(express.static(__dirname + './../build/'));

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, './../build/', 'index.html'))
});


app.listen(port);
