#Jenkins Test Job Result Dashboard
A dashboard to asynchronously aggregate data from multiple Jenkins MultiJobs and show in a simple easy to read dashboard.  

##Install and build
1. Install dependencies  
```
npm install
```
2. Build the site  
```
npm run build
```

##Run
1. Provide Jenkins base URL as environment variable `JENKINS_URL` in a form such as `http://jenkins.yourdomain.com`.  
2. Run the server. If no port is given as environment variable the server will run on 8081.  
```
node server/server.js  
```

##View
Access the dashboard on `http://localhost:8081`  

