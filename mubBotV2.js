var mubBot = {};
mubBot.misc = {};
mubBot.settings = {};
mubBot.moderators = {};
mubBot.filters = {};
botMethods = {};
mubBot.pubVars = {};

mubBot.misc.version = "1.0";
mubBot.misc.origin = "This bot was created by Emub and DerpTheBass alone, and it is copyrighted!";
mubBot.misc.ready = true;
joined = new Date().getTime();

mubBot.filters.swearWords = new Array();
mubBot.filters.racistWords = new Array();
mubBot.filters.beggerWords = new Array();

mubBot.moderators.creators = new Array();
mubBot.moderators.admins = new Array();
mubBot.moderators.trusted = new Array();
mubBot.moderators.tempTrust = new Array();

mubBot.settings.maxLength = 10; //minutes
mubBot.settings.cooldown = 10; //seconds
mubBot.settings.staffMeansAccess = true;
mubBot.settings.historyFilter = true;
mubBot.settings.swearFilter = true;
mubBot.settings.racismFilter = true;
mubBot.settings.beggerFilter = true;

mubBot.moderators.creators[0] = "50aeaf683e083e18fa2d187e"; // Emub
mubBot.moderators.creators[1] = "50aeb07e96fba52c3ca04ca8"; // DerpTheBass

mubBot.moderators.admins[2] = "50aeb607c3b97a2cb4c35ac1"; // [#808]
mubBot.moderators.admins[3] = "51264d96d6e4a966883b0702"; // eBot

mubBot.filters.swearWords[0] = "fuck";
mubBot.filters.swearWords[1] = "shit";
mubBot.filters.swearWords[2] = "bitch";
mubBot.filters.swearWords[3] = "cunt";
mubBot.filters.swearWords[4] = "twat";
mubBot.filters.swearWords[5] = "dumbass";

mubBot.filters.racistWords[0] = "nigger";
mubBot.filters.racistWords[1] = "nigguh";
mubBot.filters.racistWords[2] = "nigga";
mubBot.filters.racistWords[3] = "niggs";
mubBot.filters.racistWords[4] = "niggz";
mubBot.filters.racistWords[5] = "nizzle";

mubBot.filters.beggerWords[0] = "fan4fan";
mubBot.filters.beggerWords[1] = "fan me";
mubBot.filters.beggerWords[2] = "fan pls";
mubBot.filters.beggerWords[3] = "fan please";
mubBot.filters.beggerWords[4] = "fan 4 fan";
mubBot.filters.beggerWords[5] = "fan back";

mubBot.pubVars.skipOnExceed;
mubBot.pubVars.command = false;

API.on(API.CHAT, chatEvent);
API.on(API.HISTORY_UPDATE, historyUpdateEvent);

function chatEvent(data){
	botMethods.chatEvent(data);
}

function historyUpdateEvent(data){
	botMethods.historyUpdateEvent(data);
}

botMethods.load = function(){mubBot = JSON.parse(localStorage.getItem("mubBot")); mubBot.moderators.tempTrust = [];};
botMethods.save = function(){localStorage.setItem("mubBot", JSON.stringify(mubBot))};
botMethods.loadStorage = function(){
    if(localStorage.getItem("mubBot") !== null){
        botMethods.load();
    }else{
        botMethods.save();
    }
};

botMethods.checkHistory = function(){
    currentlyPlaying = API.getMedia(); history = API.getHistory();
    caught = 0;
    for(var i = 0; i < history.length; i++){
        if(currentlyPlaying.cid === history[i].media.cid){
            caught++;
        }
    }

    caught--;
    return caught;
}

botMethods.woot = function(){
    $("#button-vote-positive").click();
}

botMethods.getPermissions = function(id){
	for(var i = 0; i < mubBot.moderators.creators.length; i++){
        if(mubBot.moderators.creators[i] === id) return 4;
    }
	
    for(var i = 0; i < mubBot.moderators.admins.length; i++){
        if(mubBot.moderators.admins[i] === id) return 3;
    }

    for(var i = 0; i < mubBot.moderators.trusted.length; i++){
        if(mubBot.moderators.trusted[i] === id) return 2;
    }

    for(var i = 0; i < mubBot.moderators.tempTrust.length; i++){
        if(mubBot.moderators.tempTrust[i] === id) return 1;
    }
  
	if(API.getUser(id).permission > 1 && API.getUser(id).permission < 4 && mubBot.settings.staffMeansAccess) return 2;
	if(API.getUser(id).permission > 3 && mubBot.settings.staffMeansAccess) return 3;
	
	return 0;
}

botMethods.getID = function(username){
	var users = API.getUsers();
	var result = "";
	for(var i = 0; i < users.length; i++){
		if(users[i].username === username){
			result = users[i].id;
			return result;
		}
	}
	
	return "notFound";
}

botMethods.botEnviroment = function(){
	$("#playback").remove(); $("#meta-frame").remove(); $("#room-wheel").remove(); $("#user-container").remove(); $("#audience").remove(); $("#booth-canvas").remove(); $("#footer-container").remove(); $("#dj-console").remove();
}

botMethods.historyUpdateEvent = function(data){
    clearTimeout(mubBot.pubVars.skipOnExceed);
    var song = API.getMedia();
    if(botMethods.checkHistory() > 0 && mubBot.settings.historyFilter){
        if(API.getUser().permission < 2){
            API.sendChat("This song is in the history! You should make me a mod so that I could skip it!");
        }else{
			API.moderateForceSkip();
			API.sendChat("This song was skipped because it was in the room history.");
		}
    }else if(song.duration > mubBot.settings.maxLength * 60){
		mubBot.pubVars.skipOnExceed = setTimeout( function(){
			API.moderateForceSkip();
			API.sendChat("You have now played for as long as this room allows, time to let someone else have the honor!");
		}, mubBot.settings.maxLength * 60000);
		API.sendChat("This song will be skipped " + mubBot.settings.maxLength + " from now because it exceeds the max song length.");
	}
}

botMethods.chatEvent = function(data){
	command = false; var chatCommand = "";
	var permission = botMethods.getPermissions(data.fromID);
	if(data.message.indexOf("!") === 0) command = true;
	if(command){
	
		chatCommand = data.message.substring(1);
		var commands = chatCommand.split(" ");
		commands.push("undefined");
		
		if(mubBot.misc.ready || permission > 2){
			switch(commands[0].toLowerCase()){
				case "meh":
					if(permission > 0) $("#button-vote-negative").click();
				break;
				
				case "woot":
					if(permission > 0) $("#button-vote-positive").click();
				break;
				
				case "skip":
					permission > 2 ? API.moderateForceSkip() : API.sendChat("This commands requires being a mod admin!");
				break;
				
				case "temp":
					if(permission > 2){
						if(commands[1] === "undefined"){
							API.sendChat("@" + data.from + ", you must put a username.");
						}else{
							if(commands[1].indexOf("@") === 0) commands[1] = commands[1].substring(1);
							var ID = botMethods.getID(commands[1]);
							if(ID !== "notFound"){
								mubBot.moderators.tempTrust.push(ID);
								API.sendChat("Congratulations on earning temporary trust, @" + API.getUser(ID).username + "!");
							}else{
								API.sendChat("This user could not be found in the room.");
							}
						}
					}else{
						API.sendChat("Only admins can grant access to others.");
					}
				break;
				
				case "trust":
					if(permission > 3){
						if(commands[1] === "undefined"){
							API.sendChat("@" + data.from + ", you must put a username.");
						}else{
							if(commands[1].indexOf("@") === 0) commands[1] = commands[1].substring(1);
							var ID = botMethods.getID(commands[1]);
							if(ID !== "notFound"){
								mubBot.moderators.trusted.push(ID);
								API.sendChat("Congratulations on earning trust, @" + API.getUser(ID).username + "!!!");
							}else{
								API.sendChat("This user could not be found in the room.");
							}
						}
					}else{
						API.sendChat("Only bot creators can grant access to others.");
					}
				break;
				
				case "access":
					if(commands[1] !== "undefined"){
						if(commands[1].indexOf("@") === 0) commands[1] = commands[1].substring(1);
						if(permission > 0){
						
							var userPermission = botMethods.getPermissions(botMethods.getID(commands[1]));
							userPermission === 0 ? API.sendChat("This user has no bot permissions") : API.sendChat("This user has level " + userPermission + " access");
							
						}else{
							API.sendChat("You must be at least a trusted bot user to check others access levels!");
						}
					}else{
						API.sendChat("@" + data.from + ", you have level " + permission + " access");
					}
				break;
				
				case "historyfilter":
				case "hf":
					if(permission > 0) mubBot.settings.historyFilter ? API.sendChat("History filter is enabled") : API.sendChat("History filter is disabled");
				break;
			
				case "swearfilter":
				case "sf":
					if(permission > 0) mubBot.settings.swearFilter ? API.sendChat("Swearing filter is enabled") : API.sendChat("Swearing filter is disabled");
				break;
			
				case "racismfilter":
				case "rf":
					if(permission > 0) mubBot.settings.racismFilter ? API.sendChat("Racism filter is enabled") : API.sendChat("Racism filter is disabled");
				break;
			
				case "beggerfilter":
				case "bf":
					if(permission > 0) mubBot.settings.beggerFilter ? API.sendChat("Begger filter is enabled") : API.sendChat("Begger filter is disabled");
				break;
				
				case "tsf":
					if(permission > 2){
						if(mubBot.settings.swearFilter){
							mubBot.settings.swearFilter = false;
							API.sendChat("Bot will no longer filter swearing.");
						}else{
							mubBot.settings.swearFilter = true;
							API.sendChat("Bot will now filter swearing.");
						}
					}
				break;
				
				case "trf":
					if(permission > 2){
						if(mubBot.settings.racismFilter){
							mubBot.settings.racismFilter = false;
							API.sendChat("Bot will no longer filter racism.");
						}else{
							mubBot.settings.racismFilter = true;
							API.sendChat("Bot will now filter racism.");
						}
					}
				break;
				
				case "tbf":
					if(permission > 2){
						if(mubBot.settings.beggerFilter){
							mubBot.settings.beggerFilter = false;
							API.sendChat("Bot will no longer filter fan begging.");
						}else{
							mubBot.settings.beggerFilter = true;
							API.sendChat("Bot will now filter fan begging.");
						}
					}
				break;
				
				case "thf":
					if(permission > 2){
						if(mubBot.settings.historyFilter){
							mubBot.settings.historyFilter = false;
							API.sendChat("Bot will no longer skip songs that are in the room history.");
						}else{
							mubBot.settings.historyFilter = true;
							API.sendChat("Bot will now skip songs that are in the room history.");
						}
					}
				break;
				
				case "version":
					API.sendChat("mubBot version " + mubBot.misc.version);
				break;
			
				case "marco":
					API.sendChat("Polo");
				break;
				
				case "origin":
				case "author":
				case "authors":
				case "creator":
					API.sendChat(mubBot.misc.origin);
				break;
				
				case "status":
					if(permission > 0);
					var response = "";
					var currentTime = new Date().getTime();
					response = "Running for " + Math.round((currentTime - joined) / 60000) + " minutes - ";
					mubBot.settings.beggerFilter ? response = response + "Begger filter is enabled! - " : response = response + "Begger filter is disabled! - ";
					mubBot.settings.swearFilter ? response = response + "Swear filter is enabled! - " : response = response + "Swear filter is disabled! - ";
					mubBot.settings.racismFilter ? response = response + "Racism filter is enabled! - " : response = response + "Racism filter is disabled! - ";
					mubBot.settings.historyFilter ? response = response + "History filter is enabled!" : response = response + "History filter is disabled!";
					API.sendChat(response);
				break;
				
				case "maxlength":
					if(permission > 2){
						if(commands[1] === "undefined"){ 
							API.sendChat("Current max song length is " + mubBot.settings.maxLength + " minutes.");
						}
						if(commands[1] === "disable"){
							mubBot.settings.maxLength = 9999999999;
							API.sendChat("Max length is now (almost) infinite");
						}else if(commands[1] !== "undefined"){
							mubBot.settings.maxLength = commands[1];
							API.sendChat("New max song length is " + mubBot.settings.maxLength + " minutes.");
						}
					}
				break;
				
				case "cooldown":
					if(permission > 2){
						if(commands[1] === "undefined"){
							API.sendChat("Current command cooldown is " + mubBot.settings.cooldown + " seconds.");
						}
						if(commands[1] === "disable"){
							mubBot.settings.cooldown = 0.001;
							API.sendChat("Command cooldown disabled");
						}else if(commands[1] !== "undefined"){
							mubBot.settings.cooldown = commands[1];
							API.sendChat("New command cooldown is " + mubBot.settings.cooldown + " seconds.");
						}
					}
				break;
				
			}
		}
		botMethods.save();
		mubBot.misc.ready = false;
		setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
	}else{
		
		// swearing
		for(var s = 0; s < mubBot.filters.swearWords.length; s++){
			if(data.message.toLowerCase().indexOf(mubBot.filters.swearWords[s]) > -1 && mubBot.settings.swearFilter){
				API.moderateDeleteChat(data.chatID);
			}
		}
		
		// racism
		for(var a = 0; a < mubBot.filters.racistWords.length; a++){
			if(data.message.toLowerCase().indexOf(mubBot.filters.racistWords[a]) > -1 && mubBot.settings.racismFilter){
				API.moderateDeleteChat(data.chatID);
			}
		}
		
		// begging
		for(var a = 0; a < mubBot.filters.beggerWords.length; a++){
			if(data.message.toLowerCase().indexOf(mubBot.filters.beggerWords[a]) > -1 && mubBot.settings.beggerFilter){
				API.moderateDeleteChat(data.chatID);
				API.sendChat("@" + data.from + ", please don't ask for fans.");
			}
		}
		
		if(mubBot.misc.ready){
			if(data.message.toLowerCase().indexOf("who made this bot") > -1) API.sendChat(mubBot.misc.origin);
			if(data.message.toLowerCase().indexOf("stupid bot") > -1) API.sendChat("Thanks, it means a lot coming from a dyslexic kid who fails to spell their name.");
		}
		
	}
}

botMethods.loadStorage();
// Delete botMethods.botEnviroment() if you want to apply the bot to yourself!
botMethods.botEnviroment();
API.sendChat("Running mubBot revision 2 version " + mubBot.misc.version);
