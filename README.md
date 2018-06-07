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
		line on 15  'your accessToken' by your accessToken
		line on 16  'your channelSecret' by your channelSecret
		line on 84  'blockuserlist' by you wanna ban user or comment this array (it mean // or /**/)
		line on 91  'usernamearray' by you wanna add user or comment this array (it mean // or /**/)
		line on 98  'useridarray' by you wanna add user or comment this array (it mean // or /**/)
	
	func.js :
		line on 10  'usernamearray'by you wanna add user or comment this array (it mean // or /**/)
		line on 17  'useridarray' by you wanna add user or comment this array (it mean // or /**/)
		line on 540  'Ocp-Apim-Subscription-Key' by your Subscription-Key 

	on cmd:
		node Jsbot.js
		if success cmd will display "機器人已運行囉,port: 3001"
Remark:

	you can find your 'accessToken' and 'channelSecret' in here: https://developers.line.me/console/
	you can edit the bot run port in Jsbot.js line on 151
	you can use emoji in here: https://unicode.org/emoji/charts/full-emoji-list.html
	and copy that code to here: https://r12a.github.io/app-conversion/
	and convert that
	copy javascript code to your code
	ex:
	U+1F600	-> \uD83D\uDE00
	you can find Line's emoji in here: https://developers.line.me/media/messaging-api/emoji-list.pdf
	(need convert to javascript code)
	you can find Line's sticker in here: https://devdocs.line.me/files/sticker_list.pdf
	example: https://developers.line.me/en/docs/messaging-api/reference/#sticker
	you can find Line Messaging API Document in here: https://developers.line.me/en/docs/messaging-api/overview/

======================================================================================================

參考資料:

	【不必真的架站也能 5 分鐘實機體驗 LINE bot – 教學 ( by node.js & ngrok )】
	https://simonhsu.blog/2017/01/25/%E4%B8%8D%E5%BF%85%E7%9C%9F%E7%9A%84%E6%9E%B6%E7%AB%99%E4%B9%9F%E8%83%BD-5-%E5%88%86%E9%90%98%E5%AF%A6%E6%A9%9F%E9%AB%94%E9%A9%97-line-bot-message-api-%E6%87%89%E7%94%A8-by-node-js-ngrok/

環境:

	Node.js
	Ngrok

使用插件

	express
	superagent
	js-crawler
	cheerio
	is-empty

安裝插件:

	npm install express
	npm install superagent
	npm install js-crawler
	npm install cheerio
	npm install is-empty

使用方法:

	Jsbot.js : 
		第15行 用你的 accessToken 覆蓋 'your accessToken'
		第16行 用你的 channelSecret 覆蓋 'your channelSecret'
		第84行 將你想要黑名單的用戶加入 'blockuserlist' 或是註解此陣列
		第91行 用你想要紀錄用戶名的用戶加入 'usernamearray' 或是註解此陣列
		第98行 用你想要紀錄用戶ID的用戶加入 'useridarray'  或是註解此陣列
	
	func.js :
		第10行 用你想要紀錄用戶名的用戶加入 'usernamearray' 或是註解此陣列
		第17行 用你想要紀錄用戶ID的用戶加入 'useridarray'  或是註解此陣列
		第540行 用你的 Subscription-Key 覆蓋 'Ocp-Apim-Subscription-Key' 

	在命令提示字元:
		node Jsbot.js
		如果成功將會顯示 "機器人已運行囉,port: 3001"
備註:

	你可以找到你的 'accessToken' 和 'channelSecret' 在: https://developers.line.me/console/
	你可以編輯 bot 使用的 port 在 Jsbot.js 第151行
	你可以使用表情 在: https://unicode.org/emoji/charts/full-emoji-list.html
	複製表情的code 到: https://r12a.github.io/app-conversion/
	按下 convert
	複製 javascript code 到你的程式碼中
	例如:
	U+1F600	-> \uD83D\uDE00
	你可以找到 Line 的表情 在: https://developers.line.me/media/messaging-api/emoji-list.pdf
	(需要convert成javascript code)
	你可以找到 Line 的貼圖 在: https://devdocs.line.me/files/sticker_list.pdf
	範例: https://developers.line.me/en/docs/messaging-api/reference/#sticker
	你可以找到 Line Messaging API 文檔 在: https://developers.line.me/en/docs/messaging-api/overview/
