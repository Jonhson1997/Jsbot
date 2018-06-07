'use strict'
var Crawler = require("js-crawler")
const request = require('request')
const cheerio = require('cheerio')
const func = require('./func')
var empty = require('is-empty');

var value= "", url= "", j= "", bot_msg= "", bot_msg_2= "", bot_msg_3= "", bot_msg_4= "", bot_msg_5= "" , title_msg = "",id = "",name = "",time = ""
let titles= [] , articles = [] , urls = []
var usernamearray = [
  // somebody's username
  "test_1",
  "test_2",
  "test_3",
]

var useridarray =[
  // somebody's userid
  "U0475...", 
  "U4f2c...", 
  "U4a6f...", 
]

var orderlistarray = [
  "==================",
  "目前指令:",
  "getid",
  "情緒",
  "天氣",
  "bbs || BBS",
  "bus || BUS || 公車",
  "push",
  "==================",
  "使用方法:",
  "指令前面+!",
  "特殊用法:",
  "!天氣 縣市",
  "Ex: !天氣 台中",
  "!bbs 板名",
  "Ex: !bbs NBA",
  "!bus 車號 去or回(可不打)",
  "Ex: !bus 108 去",
  "Ex: !bus 108 回",
  "Ex: !bus 108 ",
  "Ex: !bus 查詢",
  "!情緒 圖片URL",
  "!push 用戶名(或Userid) 訊息內容",
  "Ex: !push test_1 BotMsg",
  "==================",

]

var emotionvalue = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,

]

var emotionarray = [
  "生氣",
  "鄙視",
  "厭惡",
  "恐懼",
  "幸福",
  "面無表情",
  "悲傷",
  "驚訝",

]

var weatherarray = [
  "縣市",
  "臺北",
  "臺北市",
  "台北",
  "台北市",
  "新北",
  "新北市",
  "桃園",
  "桃園市",
  "臺中",
  "臺中市",
  "台中",
  "台中市",
  "臺南",
  "臺南市",
  "台南",
  "台南市",
  "高雄",
  "高雄市",
  "基隆",
  "基隆市",
  "新竹",
  "新竹市",
  "新竹縣",
  "苗栗",
  "苗栗縣",
  "彰化",
  "彰化縣",
  "南投",
  "南投縣",
  "雲林",
  "雲林縣",
  "嘉義",
  "嘉義市",
  "嘉義縣",
  "屏東",
  "屏東縣",
  "宜蘭",
  "宜蘭縣",
  "花蓮",
  "花蓮縣",
  "臺東",
  "臺東縣",
  "台東",
  "台東縣",
  "澎湖",
  "澎湖縣",
  "金門",
  "金門縣",
  "連江",
  "連江縣",

]

var weathercityarray = [
  "0",
  "Taipei_City.htm",
  "Taipei_City.htm",
  "Taipei_City.htm",
  "Taipei_City.htm",
  "New_Taipei_City.htm",
  "New_Taipei_City.htm",
  "Taoyuan_City.htm",
  "Taoyuan_City.htm",
  "Taichung_City.htm",
  "Taichung_City.htm",
  "Taichung_City.htm",
  "Taichung_City.htm",
  "Tainan_City.htm",
  "Tainan_City.htm",
  "Tainan_City.htm",
  "Tainan_City.htm",
  "Kaohsiung_City.htm",
  "Kaohsiung_City.htm",
  "Keelung_City.htm",
  "Keelung_City.htm",
  "Hsinchu_City.htm",
  "Hsinchu_City.htm",
  "Hsinchu_County.htm",
  "Miaoli_County.htm",
  "Miaoli_County.htm",
  "Changhua_County.htm",
  "Changhua_County.htm",
  "Nantou_County.htm",
  "Nantou_County.htm",
  "Yunlin_County.htm",
  "Yunlin_County.htm",
  "Chiayi_City.htm",
  "Chiayi_City.htm",
  "Chiayi_County.htm",
  "Pingtung_County.htm",
  "Pingtung_County.htm",
  "Yilan_County.htm",
  "Yilan_County.htm",
  "Hualien_County.htm",
  "Hualien_County.htm",
  "Taitung_County.htm",
  "Taitung_County.htm",
  "Taitung_County.htm",
  "Taitung_County.htm",
  "Penghu_County.htm",
  "Penghu_County.htm",
  "Kinmen_County.htm",
  "Kinmen_County.htm",
  "Lienchiang_County.htm",
  "Lienchiang_County.htm",

]

var cityarray = [
  "=====",
  "臺北 ,臺北市 ,台北 ,台北市",
  "新北 ,新北市",
  "桃園 ,桃園市",
  "臺中 ,臺中市 ,台中 ,台中市",
  "臺南 ,臺南市 ,台南 ,台南市",
  "高雄 ,高雄市",
  "基隆 ,基隆市",
  "新竹 ,新竹市",
  "新竹縣",
  "苗栗 ,苗栗縣",
  "彰化 ,彰化縣",
  "南投 ,南投縣",
  "雲林 ,雲林縣",
  "嘉義 ,嘉義市",
  "嘉義縣",
  "屏東 ,屏東縣",
  "宜蘭 ,宜蘭縣",
  "花蓮 ,花蓮縣",
  "臺東 ,臺東縣 ,台東 ,台東縣",
  "澎湖 ,澎湖縣",
  "金門 ,金門縣",
  "連江 ,連江縣",
  "=====",

]

var bbsarray = [
  '板名',
  'NBA',
  '籃球',
  '表特',
  'beauty',
  'Beauty',
  'LoL',
  'lol',
  '英雄聯盟',
  'iOS',
  'ios',
  'IOS',
  'Ios',
  'apple',
  'Apple',
  '蘋果',
  'PUBG',
  'pubg',
  '吃雞',

]

var bbslinkarray = [
  "0",
  "NBA/index.html",
  "NBA/index.html",
  "Beauty/index.html",
  "Beauty/index.html",
  "Beauty/index.html",
  "LoL/index9764.html",
  "LoL/index9764.html",
  "LoL/index9764.html",
  "iOS/index.html",
  "iOS/index.html",
  "iOS/index.html",
  "iOS/index.html",
  "iOS/index.html",
  "iOS/index.html",
  "iOS/index.html",
  "PUBG/index.html",
  "PUBG/index.html",
  "PUBG/index.html",

]

var bbsnamearray = [
  "=====",
  "NBA ,籃球",
  "表特 ,beauty ,Beauty",
  "LoL ,lol ,英雄聯盟",
  "iOS ,ios ,IOS ,Ios ,apple ,Apple ,蘋果",
  "PUBG ,pubg ,吃雞",
  "=====",

]

var bustitlearray = [
  '查詢',
  '車號',
  '車號查詢',
  '查詢車號',
  'A1',
  'A2',
  'A3',
  '305E',
  '305W',
  '305區',
  '306W',
  '306E',
  '306區1',
  '306區2',
  '14副',
  '14延',
  '20區',
  '21延1',
  '21延2',
  '29A',
  '29B',
  '45延',
  '45延1',
  '45區',
  '58副',
  '58區1',
  '58區2',
  '67繞',
  '68繞',
  '68延',
  '68延(繞國安國小)',
  '69繞',
  '70A',
  '70B',
  '75區1',
  '90延',
  '91延',
  '95副',
  '98繞',
  '99延',
  '105區1',
  '105區2',
  '108區',
  '128區',
  '142A',
  '142B',
  '151A',
  '151區',
  '152區',
  '153副',
  '153區',
  '155副',
  '163A',
  '163B',
  '181區1',
  '181區2',
  '199延',
  '200延',
  '206延',
  '211區',
  '219延',
  '220繞',
  '226繞',
  '266繞',
  '272繞',
  '275區',
  '281副',
  '290繞',
  '658延',
  '677區',
  '901副',
  '989延'

]

var buscontainarray = [
  '#',
  '#',
  '#',
  '#',
  '985',
  '986',
  '987',
  '905',
  '904',
  '938',
  '906',
  '908',
  '939',
  '940',
  '141',
  '144',
  '943',
  '912',
  '913',
  '921',
  '922',
  '451',
  '460',
  '459',
  '583',
  '581',
  '582',
  '671',
  '682',
  '941',
  '942',
  '691',
  '924',
  '925',
  '751',
  '950',
  '911',
  '951',
  '981',
  '991',
  '932',
  '933',
  '1081',
  '129',
  '927',
  '928',
  '1151',
  '909',
  '914',
  '653',
  '853',
  '1551',
  '930',
  '931',
  '1181',
  '1182',
  '8991',
  '2001',
  '956',
  '611',
  '959',
  '960',
  '926',
  '966',
  '672',
  '975',
  '916',
  '2901',
  '6581',
  '675',
  '910',
  '979'

]

var busnamearray = [
  "==========",
  "特別車號區",
  "A1, A2, A3,",
  "305E, 305W, 305區,",
  "306W, 306E, 306區1, 306區2,",
  "14副, 14延,",
  "20區,",
  "21延1, 21延2,",
  "29A, 29B,",
  "45延, 45延1, 45區,",
  "58副, 58區1, 58區2,",
  "67繞,",
  "68繞, 68延, 68延(繞國安國小),",
  "69繞,",
  "70A, 70B,",
  "75區1,",
  "90延,",
  "91延,",
  "95副,",
  "98繞,",
  "99延,",
  "105區1, 105區2,",
  "108區,",
  "128區,",
  "142A, 142B,",
  "151A, 151區,",
  "152區,",
  "153副, 153區,",
  "155副,",
  "163A, 163B,",
  "181區1, 181區2,",
  "199延,",
  "200延,",
  "206延,",
  "211延,",
  "219延,",
  "220繞,",
  "226繞,",
  "266繞,",
  "272繞,",
  "275區,",
  "281副,",
  "290繞,",
  "658延,",
  "677區,",
  "901副,",
  "989延,",
  "==========",

]

exports.initBot_msg =function(){
  try{
    bot_msg = ""
    bot_msg_2 = ""
    bot_msg_3 = ""
    bot_msg_4 = ""
    bot_msg_5 = ""
    title_msg = ""
    id = ""
    name = ""
    time = ""
    titles = []
    articles = []
    urls = []
    j = 0
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.orderlist = function(line,token) {
	try{
    for(var i=0;i<orderlistarray.length;i++){
      bot_msg = bot_msg + orderlistarray[i] + "\n"
    }
	  func.reply_text(line,token,bot_msg)
	}catch(ex){
    func.catch_handle(ex)
  }
}

exports.getid = function(line,event)  {
	try{
    //var guid = event.source.groupId
    //var ruid = event.source.roomId
    line.client.getProfile(event.source.userId)
      .then((profile) => {
        bot_msg = bot_msg +"Name: "+ profile.displayName +"\n"
        bot_msg = bot_msg +"userId: "+ profile.userId +"\n"
        bot_msg = bot_msg +"groupId: "+ profile.guid +"\n"
        bot_msg = bot_msg +"roomId: "+ profile.ruid +"\n"
        bot_msg = bot_msg +"pictureUrl: "+ profile.pictureUrl +"\n"
        bot_msg = bot_msg +"statusMessage: "+ profile.statusMessage
        func.reply_text(line,event.replyToken,bot_msg)
      })
	}catch(ex){
    func.catch_handle(ex)
  }
}

exports.blocklist = function(line,token)  {
  try{
      bot_msg = "此用戶已被封鎖\uD83D\uDEAB"
      func.reply_text(line,token,bot_msg)
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.emotion = function(line,token,option) {
  try{
    request({
       headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': 'your key'
      },
      uri: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
      body: '{"url": "'+option+'"}',
      method: 'POST'
    }, function(error, response, body) {
      var contain = JSON.parse(body)
        if(contain.length!=0){
          for(var i=0;i<contain.length;i++){
            var faceRectangles = [
              contain[i].faceRectangle.height,
              contain[i].faceRectangle.left,
              contain[i].faceRectangle.top,
              contain[i].faceRectangle.width
            ]

            var scores = [
              contain[i].scores.anger,
              contain[i].scores.contempt,
              contain[i].scores.disgust,
              contain[i].scores.fear,
              contain[i].scores.happiness,
              contain[i].scores.neutral,
              contain[i].scores.sadness,
              contain[i].scores.surprise
            ]
            var max = 0
            var max_position = "-1"
            for(var j=0;j<scores.length;j++){
              if(!scores[j].toString().includes("e")){
                if(scores[j]>max){
                  max = scores[j]
                  max_position = j
                }
              }
            }
            var emotionposition = emotionvalue.indexOf(max_position)
            if(emotionposition != "-1"){
              max = emotionarray[emotionposition]
            }
            else{
              max = "無法判斷"
            }
            bot_msg=bot_msg+"臉部矩形: \n"
            bot_msg=bot_msg+"高: "+faceRectangles[0]+"\n"
            bot_msg=bot_msg+"左: "+faceRectangles[1]+"\n"
            bot_msg=bot_msg+"上: "+faceRectangles[2]+"\n"
            bot_msg=bot_msg+"寬: "+faceRectangles[3]+"\n\n"
            bot_msg=bot_msg+"情緒分數: \n"
            bot_msg=bot_msg+"生氣: "+scores[0]+"\n"
            bot_msg=bot_msg+"鄙視: "+scores[1]+"\n"
            bot_msg=bot_msg+"厭惡: "+scores[2]+"\n"
            bot_msg=bot_msg+"恐懼: "+scores[3]+"\n"
            bot_msg=bot_msg+"幸福: "+scores[4]+"\n"
            bot_msg=bot_msg+"面無表情: "+scores[5]+"\n"
            bot_msg=bot_msg+"悲傷: "+scores[6]+"\n"
            bot_msg=bot_msg+"驚訝: "+scores[7]+"\n"
            bot_msg=bot_msg+"此圖情緒為: "+max+"\n\n"
          }
      }else{
        bot_msg = "無法辨識到臉部"
        }
      func.reply_text(line,token,bot_msg)
    })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.default = function(line,token) {
  try{
    bot_msg = "無此指令"
    func.reply_text(line,token,bot_msg)
	}catch(ex){
    func.catch_handle(ex)
  }
}

exports.weather = function(line,token,msg) {
  try{
    var weatherposition = weatherarray.indexOf(msg)
    if(weatherposition != "-1"){
      value = weathercityarray[weatherposition]
    }
    else{
      value="#"
    }
  	if(value=="#"){
    	bot_msg="無紀錄此區域"
    	func.reply_text(line,token,bot_msg)
  	}else if(value=="0"){
      for(var i=0;i<cityarray.length;i++){
        bot_msg = bot_msg + cityarray[i] + "\n"
      }
    	func.reply_text(line,token,bot_msg)
  	}else{
      url = 'http://www.cwb.gov.tw/V7/forecast/taiwan/'+value
  		var cr = new Crawler().configure({depth: 1,maxRequestsPerSecond: 1})
    		.crawl(url, function onSuccess(page) {
      			const $ = cheerio.load(page.content)
      			$('#box8 .FcstBoxTable01 thead tr').each(function(i, elem) {
        			titles.push($(this).text().split('\n'))
        		})
      			titles = titles.map(title => ({
        			title: title[1].substring(3)
        		}))
      			for(var i=0;i<titles.length;i++){
        			title_msg=title_msg+titles[i].title
      			}
      			$('#box8 .FcstBoxTable01 tbody tr').each(function(i, elem) {
        			articles.push($(this).text().split('\n'))
      			})
      			articles = articles.map(weather => ({
        			time: weather[1].substring(2).split(' ')[0],
        			temp: weather[2].substring(2),
        			rain: weather[6].substring(2),
      			}))
      			for(var i=0;i<articles.length;i++){
        			bot_msg=bot_msg+articles[i].time+"，溫度大約 "+articles[i].temp+"度，降雨機率 "+articles[i].rain+"\n"
      			}
      			bot_msg = title_msg+": "+bot_msg
      			func.reply_text(line,token,bot_msg)
    		})
  	}
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.bbs = function(line,token,msg){
  try{
    var bbsposition = bbsarray.indexOf(msg)
    if(bbsposition != "-1"){
      value = bbslinkarray[bbsposition]
    }
    else{
      value="#"
    }
  	if(value=="#"){
    	bot_msg="無此區資料"
    	func.reply_text(line,token,bot_msg)
  	}
  	else if(value=="0"){
      for(var i=0;i<bbsnamearray.length;i++){
    	 bot_msg = bot_msg + bbsnamearray[i] + "\n"
      }
    	func.reply_text(line,token,bot_msg)
  	}
  	else{
  	url = 'https://www.ptt.cc/bbs/'+value
  	var cr = new Crawler().configure({depth: 1,maxRequestsPerSecond: 0.5})
            	.crawl(url, function onSuccess(page) {
              	const $ = cheerio.load(page.content)
              	$('div .title a').each(function(j,elem){
                  titles.push($(this).text())
                	urls.push($(this).attr('href').split('\n'))
                  if(!titles[j].includes("公告")){
                    bot_msg=bot_msg+titles[j]+"\n  網址： https://www.ptt.cc"+urls[j]+"\n"
                    j++
                  }
              	})
    				    func.reply_text(line,token,bot_msg)
     			    })
  	}
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.bus = function(line,token,option,statu){
  try{
    var bustitleposition = bustitlearray.indexOf(option)
    if(bustitleposition != "-1"){
      if(buscontainarray[bustitleposition]=="#"){
        for(var i=0;i<busnamearray.length;i++){
          bot_msg = bot_msg + busnamearray[i] + "\n"
        }
        func.reply_text(line,token,bot_msg)
      }else{
        option = buscontainarray[bustitleposition]
      }
    }
    switch(statu){
      case '去':
        statu = '1'
        break
      case '回':
        statu = '2'
        break
      default:
        statu = '1'
        break
    }
    url = 'http://citybus-free.taichung.gov.tw/driving-map?route='+option+'&goback='+statu
      var cr = new Crawler().configure({depth: 1,maxRequestsPerSecond: 0.5})
                .crawl(url, function onSuccess(page) {
                  const $ = cheerio.load(page.content)
                  $('div.panel-body h3').each(function(j,elem){
                    titles.push($(this).text().split('\n'))
                  })
                  $('div.panel-body table.table-striped tbody tr').each(function(i, elem) {
                    articles.push($(this).text().split('\n'))
                    articles = articles.map(article => ({
                      id: article[1],
                      name: article[2],
                      time: article[3]
                    }))
                    if(articles[i].id.includes("很抱歉, 查無相關資料.")){
                      func.reply_text(line,token,"很抱歉, 查無相關資料.")
                    }else{
                      id=articles[i].id
                      name=articles[i].name.toString().replace(/\t/g, '').replace(/ /g, '').replace(/　/g, '')
                      time=articles[i].time.toString().replace(/\t/g, '').replace(/ /g, '').replace(/　/g, '')
                      if(articles[i].id<=30){
                        bot_msg=bot_msg+name+" "+time+"\n"
                      }else if(articles[i].id>30&&articles[i].id<=60){
                        bot_msg_2=bot_msg_2+name+" "+time+"\n"
                      }else if(articles[i].id>60&&articles[i].id<=90){
                        bot_msg_3=bot_msg_3+name+" "+time+"\n"
                      }else if(articles[i].id>90&&articles[i].id<=120){
                        bot_msg_4=bot_msg_4+name+" "+time+"\n"
                      }else{
                        bot_msg_5=bot_msg_5+name+" "+time+"\n"
                      }
                    }
                  })
                  if(!empty(bot_msg_5)){
                    func.reply_text5(line,token,bot_msg,bot_msg_2,bot_msg_3,bot_msg_4,bot_msg_5)
                  }
                  else if(!empty(bot_msg_4)&&empty(bot_msg_5)){
                    func.reply_text4(line,token,bot_msg,bot_msg_2,bot_msg_3,bot_msg_4)
                  }
                  else if(!empty(bot_msg_3)&&empty(bot_msg_4)){
                    func.reply_text3(line,token,bot_msg,bot_msg_2,bot_msg_3)
                  }
                  else if(!empty(bot_msg_2)&&empty(bot_msg_3)){
                    func.reply_text2(line,token,bot_msg,bot_msg_2)
                  }
                  else if(!empty(bot_msg)&&empty(bot_msg_2)){
                    func.reply_text(line,token,bot_msg)
                  }
                })

  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.pushmsg = function(line,event,userid,text) {
  try{
      if(userid == "未輸入用戶"){
        func.reply_text(line,event.replyToken,userid)
      }
      // else if(usernamearray.indexOf(userid) == "-1" && useridarray.indexOf(userid) == "-1"){
      //   func.reply_text(line,event.replyToken,"找不到用戶")
      // }
      else if(text == "未輸入訊息"){
        func.reply_text(line,event.replyToken,text)
      }else{
        if(usernamearray.indexOf(userid) != "-1"){
          userid = useridarray[usernamearray.indexOf(userid)]
        }
        line.client
          .pushMessage({
            to: userid,
            messages:[
                {
                    "type":"text",
                    "text": text
                }
            ]
          })
          .then(() => console.log({success: true}))
          .catch(err => console.log(err))
      }
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_text = function(line,token,text) {
  try{
    return line.client
      .replyMessage({
        replyToken: token,
        messages: [
          {
           	type: "text",
           	text: text
          }
        ]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_text2 = function(line,token,text,text2) {
  try{
    return line.client
      .replyMessage({
        replyToken: token,
        messages: [
          {
            type: "text",
            text: text
          },
          {
            type: "text",
            text: text2
          }
        ]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_text3 = function(line,token,text,text2,text3) {
  try{
    return line.client
      .replyMessage({
          replyToken: token,
          messages: [
            {
              type: "text",
              text: text
            },
            {
              type: "text",
              text: text2
            },
            {
              type: "text",
              text: text3
            }
          ]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_text4 = function(line,token,text,text2,text3,text4) {
  try{
    return line.client
      .replyMessage({
          replyToken: token,
          messages: [
            {
              type: "text",
              text: text
            },
            {
              type: "text",
              text: text2
            },
            {
              type: "text",
              text: text3
            },
            {
              type: "text",
              text: text4
            }
          ]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_text5 = function(line,token,text,text2,text3,text4,text5) {
  try{
    return line.client
      .replyMessage({
          replyToken: token,
          messages: [
            {
              type: "text",
              text: text
            },
            {
              type: "text",
              text: text2
            },
            {
              type: "text",
              text: text3
            },
            {
              type: "text",
              text: text4
            },
            {
              type: "text",
              text: text5
            }
            ]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_img = function(line,token,imageUrl,previewUrl){
  try{
    return line.client
    	.replyMessage({
      		replyToken: token,
      		messages: [
          	{
          			type: "image",
          			originalContentUrl: imageUrl,
          			previewImageUrl: previewUrl
          	}
        	]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.reply_sticker = function(line,token,packageId,stickerId){
  try{
    return line.client
    	.replyMessage({
      		replyToken: token,
      		messages: [
          	{
          	  	"type": "sticker",
          	  	"packageId": packageId,
          	  	"stickerId": stickerId
          	}
        	]
      })
  }catch(ex){
    func.catch_handle(ex)
  }
}

exports.catch_handle = function(ex) {
    console.log(ex)
    return line.client
      .replyMessage({
          replyToken: token,
          messages: [
            {
              type: "text",
              text: "不明原因錯誤，指令維修中\uDBC0\uDC18"
            }]
      })
}