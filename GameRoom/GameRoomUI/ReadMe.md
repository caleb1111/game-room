**CSCC09 Proposal**

**Team members: ZhiHong(Caleb) Chen, Yishuai Wang, TianJi Liu**

**Project Title:** Game Room

**Description of Web Application**
HOW TO RUN 
1.cd into game-room
2.run npm install
3.run npm start to start the app

**How to Fix low vulnerabilities**
1. rm the package-lock.json in the game-room
2. cd into the node_modules
3. cd into react-scripts
4. do npm i --package-lock-only ('sudo if permission deined')
5. do npm audit fix --force ('sudo if permission deined')
6. npm i ('sudo if permission deined')