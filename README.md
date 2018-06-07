# Jsbot
Line Bot build by Johnson

Reference:
	【不必真的架站也能 5 分鐘實機體驗 LINE bot – 教學 ( by node.js & ngrok )】
	https://simonhsu.blog/2017/01/25/%E4%B8%8D%E5%BF%85%E7%9C%9F%E7%9A%84%E6%9E%B6%E7%AB%99%E4%B9%9F%E8%83%BD-5-%E5%88%86%E9%90%98%E5%AF%A6%E6%A9%9F%E9%AB%94%E9%A9%97-line-bot-message-api-%E6%87%89%E7%94%A8-by-node-js-ngrok/
Setting:
	Node.js
	Ngrok

Use Plugin:
	express
	superagent
	js-crawler
	cheerio
	is-empty
Install Plugin:
	npm install express
	npm install superagent
	npm install js-crawler
	npm install cheerio
	npm install is-empty

Usage:
	Jsbot.js : 
		line on 15 replace 'accessToken' by your accessToken
		line on 16 replace 'channelSecret' by your channelSecret
		line on 84 replace 'blockuserlist' by you wanna ban user or comment (it mean // or /**/)
		line on 91 replace 'usernamearray' by you wanna add user or comment (it mean // or /**/)
		line on 98 replace 'useridarray' by you wanna add user or comment (it mean // or /**/)
	func.js :
		line on 10 replace 'usernamearray' by you wanna add user or comment (it mean // or /**/)
		line on 17 replace 'useridarray' by you wanna add user or comment (it mean // or /**/)
		line on 540 replace 'Ocp-Apim-Subscription-Key' by your Subscription-Key 
Remark:
	you can find your 'accessToken' and 'channelSecret' in here: https://developers.line.me/console/
	you can edit the bot run port in Jsbot.js line on 151
