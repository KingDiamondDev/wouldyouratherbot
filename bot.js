var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

const questions = fs.readFileSync('wyr_questions.txt').toString().split("\n");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
           colorize: true
           });
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
                             token: auth.token,
                             autorun: true
                             });

bot.on('ready', function (evt) {
       logger.info('Connected');
       logger.info('Logged in as: ');
       logger.info(bot.username + ' - (' + bot.id + ')');
       });
bot.on('message', function (user, userID, channelID, message, evt) {
       // Our bot needs to know if it will execute a command
       // It will listen for messages that will start with `!`
       if (message.substring(0, 1) == '!') {
       var args = message.substring(1).split(' ');
       var cmd = args[0].toLowerCase();
       
       args = args.splice(1);
       switch(cmd) {
       // !wyr
       case 'wyr':
       var item=questions[Math.floor(Math.random()*questions.length)]
       bot.sendMessage({
                       to: channelID,
                       message: item
                       });
       break;
       }
       }
       });

