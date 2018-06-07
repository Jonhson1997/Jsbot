'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const line = require('./index')
const func = require('./func')
const app = express()

app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

line.init({
  accessToken: 'your accessToken',
  channelSecret: 'your channelSecret'
})
app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  const promises = req.body.events.map(event => {
    var msg = event.message.text
    var msgs = []
    var orderarrays = [
      'getid',
      '指令',
      '情緒',
      '天氣',
      'bbs',
      'BBS',
      'bus',
      'BUS',
      '公車',
      'push',
    ]

    var funcarrays = [
      function() {func.getid(line,event)},
      function() {func.orderlist(line,event.replyToken)},
      function() {func.emotion(line,event.replyToken,msgs[0].option.toString())},
      function() {func.weather(line,event.replyToken,msgs[0].option.toString())},
      function() {
        if( typeof msgs[0].option!='string'){
          msgs[0].option = '板名'
        }
        func.bbs(line,event.replyToken,msgs[0].option.toString())},
      function() {
        if( typeof msgs[0].option!='string'){
          msgs[0].option = '板名'
        }
        func.bbs(line,event.replyToken,msgs[0].option.toString())},
      function() {
        if( typeof msgs[0].option!='string'){
          msgs[0].option = '查詢'
        }
        if( typeof msgs[0].statu!='string'){
          msgs[0].statu = '1'
        }
        func.bus(line,event.replyToken,msgs[0].option.toString(),msgs[0].option.toString())},
      function() {
        if( typeof msgs[0].option!='string'){
          msgs[0].option = '查詢'
        }
        if( typeof msgs[0].statu!='string'){
          msgs[0].statu = '1'
        }
        func.bus(line,event.replyToken,msgs[0].option.toString(),msgs[0].option.toString())},
      function() {
        if( typeof msgs[0].option!='string'){
          msgs[0].option = '查詢'
        }
        if( typeof msgs[0].statu!='string'){
          msgs[0].statu = '1'
        }
        func.bus(line,event.replyToken,msgs[0].option.toString(),msgs[0].statu.toString())},
      function() {
        if( typeof msgs[0].option!='string'){
          msgs[0].option = '未輸入用戶'
        }
        if( typeof msgs[0].statu!='string'){
          msgs[0].statu = '未輸入訊息'
        }
        func.pushmsg(line,event,msgs[0].option,msgs[0].statu)},
    ]

    var blockuserlist = [
      // somebody's userid you wanna ban
      "U0475...", 
      "U4f2c...", 
      "U4a6f...", 
    ]

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

    //record the msg's  userid, if the userid already record in useridarray,it will become username to display on the log.
    var userid = event.source.userId
    if(useridarray.indexOf(userid) != "-1"){
      console.log(usernamearray[useridarray.indexOf(userid)]+": "+ msg)
    }else{
      console.log(event.source.userId+": "+ msg)
    }

    // main 
    if(typeof msg == "string"){
      //initial
      func.initBot_msg();
      if( msg.charAt(0) =="!"||msg.charAt(0) =="！" ){
        //check blocklist
        if(blockuserlist.indexOf(userid) != "-1"){
          func.blocklist(line,event.replyToken,bot_msg)
        }else{
          //split the msg
          msg=msg.substring(1)
          msgs.push(msg.split(' '))
          msgs = msgs.map(msg => ({
            order: msg[0],
            option: msg[1],
            statu: msg[2]
          }))
          //find the order in the orderarrays
          var orderposition = orderarrays.indexOf(msgs[0].order.toString())
          if(orderposition != "-1"){
            funcarrays[orderposition]()
          }
          else{
            func.default(line,event.replyToken)
          }
        }
      }
    }
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
    .catch((error) => {console.error(error)})
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
app.listen(process.env.PORT || 3001, () => {
  console.log('機器人已運行囉,port: 3001')
})
