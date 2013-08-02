var version = "0.013";
var botName = API.getUser().username;
var botNameMention = "@" + botName;
var command = false;
var ready = true;
var chatCommand, authorized, HA, noAccess;
var AP = new Array(); // short for authorized people.
var HAP = new Array(); // short for half authorized people array.
var swears = new Array(); var tacos = new Array(); var racism = new Array();
var mentionedPosition; var mentionedName; var mentioned;
var joined = new Date().getTime();

var mubBot = {};
mubBot.filters = {};
mubBot.settings = {};
mubBot.filters.swearing = true;
mubBot.filters.racism = true;
mubBot.filters.begging = true;
mubBot.settings.coolDown = 5000;
mubBot.settings.maxLength = 12; // measured in minutes
mubBot.settings.historySkip = true;

tacos[0] = "crispy taco";
tacos[1] = "mexican taco";
tacos[2] = "vegetarian taco";
tacos[3] = "spicy taco";
tacos[4] = "meatlover taco";
tacos[5] = "cheese taco";
tacos[6] = "wet hamburger";
tacos[7] = "taco shell";
tacos[8] = "delicious taco";
tacos[9] = "gross taco";

AP[0] = "50aeaf683e083e18fa2d187e"; //Emub
AP[1] = "50aeb19a96fba52c3ca07ca4"; //Queen
AP[2] = "50aeb07e96fba52c3ca04ca8"; // DerpTheBass

HAP[0] = "51f6c5c896fba549233faa8a"; // John

swears[0] = "fuck";
swears[1] = "shit";
swears[2] = "bitch";
swears[3] = "cunt";
swears[4] = "twat";
swears[5] = "dumbass";

racism[0] = "nigger";
racism[1] = "nigguh";
racism[2] = "nigga";
racism[3] = "niggs";
racism[4] = "niggz";
racism[5] = "nizzle";


// ---------------- Bot functionalities ----------------

API.on(API.HISTORY_UPDATE, historyUpdate);
function historyUpdate(){
	var song = API.getMedia();
	if(testHistory() > 1 && mubBot.settings.historySkip){
		API.moderateForceSkip();
		API.sendChat("This song was skipped because it was in the history.");
		woot();
	}
	if(song.duration > mubBot.settings.maxLength * 60){
		API.moderateForceSkip();
		API.sendChat("Max playtime is " + mubBot.settings.maxLength + " minutes, sorry.");
	}
}

function getID(username){
	var users = API.getUsers();
	var result = "";
	for(var i = 0; i < users.length; i++){
		if(users[i].username.toLowerCase() === username.toLowerCase()){
			result = users[i].id;
		}
	}
	return result;
}

function getPermissions(username){
	var thisUsername = username;
	var userID = getID(thisUsername);
	var result = "";
	if(userID !== ""){
		for(var i = 0; i < AP.length; i++){
			if(AP[i] === userID){
				result = "AP";
			}
		}
		
		for(var i = 0; i < HAP.length; i++){
			if(HAP[i] === userID){
				result = "HAP";
			}
		}
		
		if(result !== "AP" && result !== "HAP"){
			result = "none";
		}
	}else{
		result = "notFound";
	}
	
	return result;
}

function testHistory(){
	currentlyPlaying = API.getMedia();
	history = API.getHistory();
	caught = 0; length = 0;
	for( ; length < history.length; length++){
		if(currentlyPlaying.cid === history[length].media.cid){
			caught++;
		}
	}
	
	return caught;
}

API.on(API.DJ_ADVANCE, woot);
function woot(){
	setTimeout(function(){
		$("#button-vote-positive").click();
	}, 10000);
	historyUpdate();
}

// ---------------- Chat commands ----------------

API.on(API.CHAT, recieveMessage);
function recieveMessage(data){
	
	command = false; authorized = false; HA = false; noAccess = false; mentioned = false;
	$("#chat-messages").scrollTop(999999999);
	
	for(var tests = 0; tests < AP.length; tests++){
		if(data.fromID == AP[tests]){
			authorized = true;
		}
	}
	
	for(var HAtests = 0; HAtests < HAP.length; HAtests++){
		if(data.fromID == HAP[HAtests]){
			HA = true;
		}
	}
	
	if(API.getUser(data.fromID).permission > 0){
		HA = true;
	}
	
	if(API.getUser(data.fromID).permission > 3){
		authorized = true;
	}
	
	if(HA === false && authorized === false){
		noAccess = true;
	}
	
	if(data.message.indexOf("!") === 0) command = true;
	if(command){
		chatCommand = data.message.substring(1);
		var commands = chatCommand.split(" ");
		commands.push("undefined");
		if(ready){
		switch(commands[0].toLowerCase()){
			case "history":
				if(testHistory()>=2){
					if(API.getUser().permission < 2){
						API.sendChat("I am not permissioned to skip this song, you should tell the admins to make me a bouncer!");
					}else{
						API.moderateForceSkip();
						API.sendChat("Song in history.");
					}
				}else{
					API.sendChat("@" + data.from + " This song is not in the rooms history.");
				}
			break;
			
			case "meh":
				if(authorized || HA) $("#button-vote-negative").click();
			break;
			
			case "woot":
				if(authorized || HA) $("#button-vote-positive").click();
			break;
			
			case "skipthis":
				if(authorized){
					if(API.getUser().permission < 2){
						API.sendChat("I am not permissioned to skip this song, you should tell the admins to make me a bouncer!");
					}else{
						API.moderateForceSkip();
					}
				}else{
					API.sendChat("This commands requires level 9001 bot access!");
				}
			break;
			
			case "access":
				if(mentioned){
					if(authorized || HA){
						var permission = getPermissions(mentionedName);
						switch(permission){
							case "AP":
								API.sendChat(mentionedName + " has level 9001 bot access!");
							break;
							case "HAP":
								API.sendChat(mentionedName + " has half bot access.");
							break;
							case "none":
								API.sendChat(mentionedName + " only has access to a few commands.");
							break;
							case "notFound":
								API.sendChat("I could not find this person in the room, are you sure you mentioned the correct person?");
							break;
						}
					}else{
						API.sendChat("You need to have at least half bot access to check others peoples access levels!");
					}
				}else{
					if(authorized){
						API.sendChat("@" + data.from + " has level 9001 bot access!");
					}
					if(HA){
						API.sendChat("@" + data.from + " has half bot access.");
					}
					if(noAccess){
						API.sendChat("@" + data.from + " only has access to a few commands.");
					}
				}
			break;
			
			case "history filter":
				mubBot.settings.historySkip ? API.sendChat("History filter is enabled") : API.sendChat("History filter is disabled");
			break;
			
			case "swear filter":
				mubBot.filters.swearing ? API.sendChat("Swearing filter is enabled") : API.sendChat("Swearing filter is disabled");
			break;
			
			case "racism filter":
				mubBot.filters.racism ? API.sendChat("Racism filter is enabled") : API.sendChat("Racism filter is disabled");
			break;
			
			case "begger filter":
				mubBot.filters.begging ? API.sendChat("Begger filter is enabled") : API.sendChat("Begger filter is disabled");
			break;
			
			case "toggle swearing filter":
			case "toggle sf":
			case "tsf":
				if(authorized){
					if(mubBot.filters.swearing){
						mubBot.filters.swearing = false;
						API.sendChat("Bot will no longer delete messages that include swear words");
					}else{
						mubBot.filters.swearing = true;
						API.sendChat("Bot will now delete messages that include swear words");
					}
				}else{
					API.sendChat("This commands requires level 9001 bot access!");
				}
			break;
			
			case "toggle begger filter":
			case "toggle bf":
			case "tbf":
				if(authorized){
					if(mubBot.filters.begging){
						mubBot.filters.begging = false;
						API.sendChat("Bot will no longer delete messages that include swear words");
					}else{
						mubBot.filters.begging = true;
						API.sendChat("Bot will now delete messages that include swear words");
					}
				}else{
					API.sendChat("This commands requires level 9001 bot access!");
				}
			break;
			
			case "toggle racism filter":
			case "toggle rf":
			case "trf":
				if(authorized){
					if(mubBot.filters.racism){
						mubBot.filters.racism = false;
						API.sendChat("Bot will no longer delete messages that include racist words");
					}else{
						mubBot.filters.racism = true;
						API.sendChat("Bot will now delete messages that include racist words");
					}
				}else{
					API.sendChat("This commands requires level 9001 bot access!");
				}
			break;
			
			case "toggle history filter":
			case "toggle hf":
			case "thf":
				if(authorized){
					if(mubBot.settings.historySkip){
						mubBot.settings.historySkip = false;
						API.sendChat("Bot will no longer autoskip songs that are in the rooms history.");
					}else{
						mubBot.settings.historySkip = true;
						API.sendChat("Bot will now autoskip songs that are in the rooms history.");
						if(testHistory() > 1) API.moderateForceSkip();
					}
				}else{
					API.sendChat("This commands requires level 9001 bot access!");
				}
			break;
			
			case "taco":
				if(commands[1].indexOf("@") > -1 && commands[1] !== "undefined"){
				var mentioned = commands[1].substring(1);
					var randomNumber = Math.floor(Math.random() * (tacos.length - 1));
					var randomNumber2 = Math.floor(Math.random() * 3);
					switch(randomNumber2){
						case 0:
							API.sendChat("@" + mentioned + " Quickly! Eat this " + tacos[randomNumber] + " before I do!");
						break;
						case 1:
							API.sendChat("Here you go, @" + mentioned + " one free " + tacos[randomNumber] + " for you!");
						break;
						case 2:
							API.sendChat("/me throws a " + tacos[randomNumber] + " @" + mentioned + "!");
						break;
						case 3:
							API.sendChat("I have come to you, " + mentioned + " with this glorious " + tacos[randomNumber] + ".");
						break;
						default:
							API.sendChat("@" + mentioned + ", you have somehow given me an error, so I will eat this " + tacos[randomNumber] + " myself!");
							console.log(randomNumber + " - " + randomNumber2);
						break;
					}
				}else{
					var users = API.getUsers();
					var randomNumber = Math.floor(Math.random() * users.length);
					var randomNumber2 = Math.floor(Math.random() * (tacos.length - 1));
					var randomNumber3 = Math.floor(Math.random() * 3);
					switch(randomNumber3){
						case 0:
							API.sendChat("@" + users[randomNumber].username + " Quickly! Eat this " + tacos[randomNumber2] + " before I do!");
						break;
						case 1:
							API.sendChat("Here you go, @" + users[randomNumber].username + " one free " + tacos[randomNumber2] + " for you!");
						break;
						case 2:
							API.sendChat("/me throws a " + tacos[randomNumber2] + " @" + users[randomNumber].username + "!");
						break;
						case 3:
							API.sendChat("I have come to you, " + users[randomNumber].username + " with this glorious " + tacos[randomNumber2] + ".");
						break;
						default:
							API.sendChat("@" + users[randomNumber].username + ", you have somehow given me an error, so I will eat this " + tacos[randomNumber2] + " myself!");
							console.log(randomNumber + " - " + randomNumber2 + " - " + randomNumber3);
						break;
					}
				}
			break;
			
			case "skip":
				if(authorized){
					API.moderateForceSkip();
				}else{
					API.sendChat("You need level 9001 bot control to use this command!");
				}
			break;
			
			case "version":
				API.sendChat("mubBot version " + version);
			break;
			
			case "marco":
				API.sendChat("Polo");
			break;
			
			case "status":
				var response = "";
				var elapsed = new Date().getTime() - joined;
				mubBot.filters.swearing ? response = "Swear filter is enabled. - " : response = "Swear filter is disabled. - ";
				mubBot.filters.racism ? response = response + "Racism filter is enabled. - " : response = response + "Racism filter is disabled. - ";
				mubBot.filters.begging ? response = response + "Begger filter is enabled." : response = response + "Begger filter is disabled.";
				API.sendChat("Running for "+Math.round(elapsed/100000)+" minutes. - "+response);
			break;
			
			case "cooldown":
			if(authorized){
				if(commands[1]==="disable"){
					mubBot.settings.coolDown = 1;
					API.sendChat("Cooldown disabled");
				}
				if(commands[1] === "undefined"){
					API.sendChat("The cooldown period is " + mubBot.settings.coolDown / 1000 + " seconds.");
				}else{
					mubBot.settings.coolDown = commands[1] * 1000;
					API.sendChat("New cooldown period is now " + mubBot.settings.coolDown / 1000 + " seconds.");
					return mubBot.settings.coolDown;
				}
			}else{
				API.sendChat("You need level 9001 bot control to use this command!");
			}
			break;
			
			case "mubBot.settings.maxLength":
			if(authorized){
				if(commands[1]==="disable"){
					mubBot.settings.maxLength = 9999999;
					API.sendChat("Max song length is now disabled");
				}
				if(commands[1] === "undefined"){
					API.sendChat("The current max song length is " + mubBot.settings.maxLength + " minutes.");
				}else{
					mubBot.settings.maxLength = commands[1];
					API.sendChat("Max song length set to " + mubBot.settings.maxLength + " minutes.");
					return mubBot.settings.maxLength;
				}
			}
			break;
		}
		}else{
			console.log("Cooldown not ready.");
			if(commands[0] === "cooldown" && authorized){
				if(commands[1]==="disable"){
					mubBot.settings.coolDown = 1;
					API.sendChat("Cooldown disabled");
				}else{
					mubBot.settings.coolDown = commands[1] * 1000;
					API.sendChat("New cooldown period is now " + mubBot.settings.coolDown / 1000 + " seconds.");
					return mubBot.settings.coolDown;
				}
			}
		}
	}else{
		
		// ---------------- filters ----------------
		
		// swearing
		for(var s = 0; s < swears.length; s++){
			if(data.message.toLowerCase().indexOf(swears[s]) > -1 && mubBot.filters.swearing){
				API.moderateDeleteChat(data.chatID);
			}
		}
		
		// racism
		for(var a = 0; a < racism.length; a++){
			if(data.message.toLowerCase().indexOf(racism[a]) > -1 && mubBot.filters.racism){
				API.moderateDeleteChat(data.chatID);
			}
		}
		
		// fan beggers
		if(data.message.toLowerCase().indexOf("fan me") > -1 || data.message.toLowerCase().indexOf("fan 4 fan") > -1 || data.message.toLowerCase().indexOf("fan4fan") > -1){
			if(mubBot.filters.begging){
				API.moderateDeleteChat(data.chatID);
				API.sendChat("@" + data.from + " Please don't ask for fans.");
			}
		}
		
	}
	ready = false;
	setTimeout(function(){ ready = true; }, mubBot.settings.coolDown);
}

$("#playback").remove();
$("#meta-frame").remove();
$("#room-wheel").remove();
$("#user-container").remove();
$("#audience").remove();
$("#booth-canvas").remove();
API.sendChat("Running mubBot version "+version);
