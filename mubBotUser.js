var mubBot = {};
var ruleSkip = {};
mubBot.misc = {};
mubBot.settings = {};
mubBot.moderators = {};
mubBot.filters = {};
botMethods = {};
mubBot.pubVars = {};

toSave = {};
toSave.settings = mubBot.settings;
toSave.moderators = mubBot.moderators;
toSave.ruleSkip = ruleSkip;

mubBot.misc.version = "2.0.24";
mubBot.misc.origin = "This bot was created by Emub and DerpTheBass alone, and it is copyrighted!";
mubBot.misc.changelog = "Fixed some stuff with skipping and saving";
mubBot.misc.ready = true;
mubBot.misc.lockSkipping = false;
mubBot.misc.lockSkipped = "0";
mubBot.misc.tacos = new Array();

joined = new Date().getTime();

cancel = false;

mubBot.filters.swearWords = new Array();
mubBot.filters.racistWords = new Array();
mubBot.filters.beggerWords = new Array();

mubBot.settings.maxLength = 10; //minutes
mubBot.settings.cooldown = 10; //seconds
mubBot.settings.staffMeansAccess = true;
mubBot.settings.historyFilter = true;
mubBot.settings.swearFilter = true;
mubBot.settings.racismFilter = true;
mubBot.settings.beggerFilter = true;
mubBot.settings.interactive = true;
mubBot.settings.ruleSkip = true;
mubBot.settings.removedFilter = true;

//Emub                      DerpTheBass                 [#808]                          eBot
mubBot.admins = ["50aeaf683e083e18fa2d187e", "50aeb07e96fba52c3ca04ca8", "50aeb607c3b97a2cb4c35ac1", "51264d96d6e4a966883b0702"];

mubBot.filters.swearWords = ["fuck","shit","bitch","cunt","twat","fag","queer","dumbass"];

mubBot.filters.racistWords = ["nigger","kike","spick","porchmonkey","camel jockey","towelhead","towel head","chink","gook","porch monkey"];

mubBot.filters.beggerWords = ["fan4fan","fan me","fan pls","fans please","fan please","fan 4 fan","fan back","give me fans","gimme fans","fan back"];

mubBot.misc.tacos = ["crispy taco","mexican taco","vegetarian taco","spicy taco","meatlover taco","cheese taco","wet hamburger","taco shell","delicious taco","gross taco"];

mubBot.pubVars.skipOnExceed;
mubBot.pubVars.command = false;

Array.prototype.remove=function(){var c,f=arguments,d=f.length,e;while(d&&this.length){c=f[--d];while((e=this.indexOf(c))!==-1){this.splice(e,1)}}return this};

API.on(API.HISTORY_UPDATE, historyUpdateEvent);

function historyUpdateEvent(data){
    setTimeout(function(){ botMethods.historyUpdateEvent(data); }, 500);
}

botMethods.skip = function(){
    setTimeout(function(){
        if(!cancel) API.moderateForceSkip();
    }, 3500);
};

botMethods.load = function(){
    toSave = JSON.parse(localStorage.getItem("mubBotSave"));
    mubBot.settings = toSave.settings;
    ruleSkip = toSave.ruleSkip;
};

botMethods.save = function(){localStorage.setItem("mubBotSave", JSON.stringify(toSave))};

botMethods.loadStorage = function(){
    if(localStorage.getItem("mubBotSave") !== null){
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
};

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
};

botMethods.cleanString = function(string){
    return string.replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};

botMethods.historyUpdateEvent = function(data){
    clearTimeout(mubBot.pubVars.skipOnExceed);
    if(mubBot.misc.lockSkipping){
        API.moderateAddDJ(mubBot.misc.lockSkipped);
        mubBot.misc.lockSkipped = "0";
        mubBot.misc.lockSkipping = false;
        setTimeout(function(){ API.moderateRoomProps(false, true); }, 500);
    }
    var song = API.getMedia();
    if(botMethods.checkHistory() > 0 && mubBot.settings.historyFilter){
        if(API.getUser().permission < 2){
            API.sendChat("This song is in the history! You should make me a mod so that I could skip it!");
        }else if(API.getUser().permission > 1){
            API.sendChat("@" + API.getDJs()[0].username + ", playing songs that are in the history isn't allowed, please check next time! Skipping..");
            botMethods.skip()
        }else if(song.duration > mubBot.settings.maxLength * 60){
            mubBot.pubVars.skipOnExceed = setTimeout( function(){
                API.sendChat("@"+API.getDJs()[0].username+" You have now played for as long as this room allows, time to let someone else have the booth!");
                botMethods.skip();
            }, mubBot.settings.maxLength * 60000);
            //API.sendChat("@"+API.getDJs()[0].username+" This song will be skipped " + mubBot.settings.maxLength + " minutes from now because it exceeds the max song length.");
        }
    }
};

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(mubBot.misc.ready || mubBot.admins.indexOf(fromID) > -1 || API.getUser(data.fromID).permission > 1){
                switch(command[0].toLowerCase()){
                    case "marco":
                        API.sendChat("Polo");
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;
                    case "weird":
                    case "weirdday":
                    case "wierd":
                    case "wierdday":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Weird Songs - http://playmc.pw/plug/WeirdDay.html");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Weird Songs - http://playmc.pw/plug/WeirdDay.html");
                        }else{
                            API.sendChat("Weird Songs - http://playmc.pw/plug/WeirdDay.html");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "rules":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Room Rules - http://goo.gl/GBl4e");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Room Rules - http://goo.gl/GBl4e");
                        }else{
                            API.sendChat("Room Rules - http://goo.gl/GBl4e");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "theme":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("In this room, only music related to My Little Pony: Friendship is Magic is allowed. This includes PMVs.");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" In this room, only music related to My Little Pony: Friendship is Magic is allowed. This includes PMVs.");
                        }else{
                            API.sendChat("In this room, only music related to My Little Pony: Friendship is Magic is allowed. This includes PMVs.");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "commands":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("Bot Commands - http://playmc.pw/plug/commands.html");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" Bot Commands - http://playmc.pw/plug/commands.html");
                        }else{
                            API.sendChat("Bot Commands - http://playmc.pw/plug/commands.html");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "wiki":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("@"+data.from+" https://en.wikipedia.org/wiki/Special:Random");
                        }else{
                            var r = data.message.substring(6).replace(/ /g, "_");
                            $.getJSON("http://jsonp.appspot.com/?callback=?&url=" + escape("http://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&titles="+r.replace(/ /g,"_")),
                                function(wikiData){
                                    if (!wikiData || !wikiData.query || !wikiData.query.pages) // there's an error. pssh, don't let anyone know ;)
                                        return API.sendChat("@"+data.from+" http://en.wikipedia.org/wiki/"+r+" (NOT GUARANTEED TO BE CORRECT)");
                                    if (wikiData.query.pages[-1]) {
                                        API.sendChat("@"+data.from+" article not found");
                                    }else{
                                        for (var i in wikiData.query.pages)
                                            // note: the #... is just to make the url look nicer
                                            return API.sendChat("@"+data.from+" https://en.wikipedia.org/wiki/?curid="+i+"#"+escape(wikiData.query.pages[i].title) );
                                    }
                                }
                            );
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "steam":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("http://steamcommunity.com/groups/plugfim#");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" http://steamcommunity.com/groups/plugfim#");
                        }else{
                            API.sendChat("http://steamcommunity.com/groups/plugfim#");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "skype":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("http://goo.gl/NjSO6j");
                        }else if(command[1].indexOf("@") > -1){
                            API.sendChat(command[1]+" http://goo.gl/NjSO6j");
                        }else{
                            API.sendChat("http://goo.gl/NjSO6j");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "linkify":
                        if(typeof command[1] == "undefined"){
                            API.sendChat("@" + data.from + " You need to put a link!");
                        }else if(command[1].toLowerCase().indexOf("plug.dj") === -1 && command[1].toLowerCase().indexOf("bug.dj") === -1){
                            API.sendChat("http://"+command[1]);
                        }else{
                            API.sendChat("Nice try! Advertising is not allowed in this room.");
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "songlink":
                        if(API.getMedia().format == 1){
                            API.sendChat("@" + data.from + " " + "http://youtu.be/" + API.getMedia().cid);
                        }else{
                            var id = API.getMedia().cid;
                            SC.get('/tracks', { ids: id,}, function(tracks) {
                                API.sendChat("@"+data.from+" "+tracks[0].permalink_url);
                            });
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "mubplug":
                        API.sendChat("http://pastebin.com/GwwFEAhX");
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(mubBot.misc.ready || mubBot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
                switch(command[0].toLowerCase()){
                    /* commented out because the bot isn't running on a dedicated bot account
                     case "meh":
                     if(API.getUser(data.fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) $("#button-vote-negative").click();
                     break;

                     case "woot":
                     if(API.getUser(data.fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1)  $("#button-vote-positive").click();
                     break;*/

                    case "skip":
                    if(API.getUser(data.fromID).permission > 1){
                        if(typeof command[1] === "undefined"){
                            API.moderateForceSkip();
                        }else{
                            API.sendChat('@'+API.getDJs()[0].username+' '+command[1]);
                            API.moderateForceSkip();
                        }
                    }
                        break;

                    case 'cancel':
                        cancel = true;
                        API.sendChat('AutoSkip cancelled');
                        break;

                    case "lockskip":
                        if( API.getUser(data.fromID).permission > 1){
                            API.moderateRoomProps(true, true);
                            mubBot.misc.lockSkipping = true;
                            mubBot.misc.lockSkipped = API.getDJs()[0].id;
                            setTimeout(function(){ API.moderateRemoveDJ(mubBot.misc.lockSkipped); }, 500);
                        }else{
                            API.sendChat("This command requires bouncer or higher!");
                        }
                        break;
                    case 'rvf':
                    case 'removedfilter':
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) mubBot.settings.removedFilter ? API.sendChat("Removed video filter is enabled") : API.sendChat("Removed video is disabled");
                        break;
                    case 'trvf':
                    case 'toggleremovedfilter':
                        mubBot.settings.removedFilter = !mubBot.settings.removedFilter;
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) mubBot.settings.removedFilter ? API.sendChat("Removed video filter is enabled") : API.sendChat("Removed video is disabled");
                        break;
                    case "historyfilter":
                    case "hf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) mubBot.settings.historyFilter ? API.sendChat("History filter is enabled") : API.sendChat("History filter is disabled");
                        botMethods.save();
                        break;

                    case "swearfilter":
                    case "sf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) mubBot.settings.swearFilter ? API.sendChat("Swearing filter is enabled") : API.sendChat("Swearing filter is disabled");
                        botMethods.save();
                        break;

                    case "racismfilter":
                    case "rf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) mubBot.settings.racismFilter ? API.sendChat("Racism filter is enabled") : API.sendChat("Racism filter is disabled");
                        botMethods.save();
                        break;

                    case "beggerfilter":
                    case "bf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1) mubBot.settings.beggerFilter ? API.sendChat("Begger filter is enabled") : API.sendChat("Begger filter is disabled");
                        botMethods.save();
                        break;

                    case "tsf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(mubBot.settings.swearFilter){
                                mubBot.settings.swearFilter = false;
                                API.sendChat("Bot will no longer filter swearing.");
                            }else{
                                mubBot.settings.swearFilter = true;
                                API.sendChat("Bot will now filter swearing.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "trf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(mubBot.settings.racismFilter){
                                mubBot.settings.racismFilter = false;
                                API.sendChat("Bot will no longer filter racism.");
                            }else{
                                mubBot.settings.racismFilter = true;
                                API.sendChat("Bot will now filter racism.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "tbf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(mubBot.settings.beggerFilter){
                                mubBot.settings.beggerFilter = false;
                                API.sendChat("Bot will no longer filter fan begging.");
                            }else{
                                mubBot.settings.beggerFilter = true;
                                API.sendChat("Bot will now filter fan begging.");
                            }
                        }
                        botMethods.save();
                        break;
                    case "thf":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(mubBot.settings.historyFilter){
                                mubBot.settings.historyFilter = false;!
                                    API.sendChat("Bot will no longer skip songs that are in the room history.");
                            }else{
                                mubBot.settings.historyFilter = true;
                                API.sendChat("Bot will now skip songs that are in the room history.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "version":
                        API.sendChat("mubBot user shell version " + mubBot.misc.version);
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "origin":
                    case "author":
                    case "authors":
                    case "creator":
                        API.sendChat(mubBot.misc.origin);
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "status":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            var response = "";
                            var currentTime = new Date().getTime();
                            var minutes = Math.floor((currentTime - joined) / 60000);
                            var hours = 0;
                            while(minutes > 60){
                                minutes = minutes - 60;
                                hours++;
                            }
                            hours == 0 ? response = "Running for " + minutes + "m " : response = "Running for " + hours + "h " + minutes + "m";
                            response = response + " | Begger filter: "+mubBot.settings.beggerFilter;
                            response = response + " | Swear filter: "+mubBot.settings.swearFilter;
                            response = response + " | Racism filter: "+mubBot.settings.racismFilter;
                            response = response + " | History filter: "+mubBot.settings.historyFilter;
                            response = response + " | MaxLength: " + mubBot.settings.maxLength + "m";
                            response = response + " | Cooldown: " + mubBot.settings.cooldown + "s";
                            response = response + " | RuleSkip: "+ mubBot.settings.ruleSkip;
                            response = response + " | Removed Video Filter: "+ mubBot.settings.removedFilter;
                            API.sendChat(response);
                        }
                        break;

                    case "cooldown":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(typeof command[1] == "undefined"){
                                if(mubBot.settings.cooldown != 0.0001){
                                    API.sendChat('Cooldown is '+mubBot.settings.cooldown+' seconds');
                                }else{
                                    API.sendChat('Cooldown is disabled');
                                }
                            }else if(command[1] == "disable"){
                                mubBot.settings.cooldown = 0.0001;
                                API.sendChat('Cooldown disabled');
                            }else{
                                mubBot.settings.cooldown = command[1];
                                API.sendChat('New cooldown is '+mubBot.settings.cooldown+' seconds');
                            }
                        }
                        botMethods.save();
                        break;

                    case "maxlength":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(typeof command[1] == "undefined"){
                                if(mubBot.settings.maxLength != 1e+50){
                                    API.sendChat('Maxlength is '+mubBot.settings.maxLength+' minutes');
                                }else{
                                    API.sendChat('Maxlength is disabled');
                                }
                            }else if(command[1] == "disable"){
                                mubBot.settings.maxLength = Infinity;
                                API.sendChat('Maxlength disabled');
                            }else{
                                mubBot.settings.maxLength = command[1];
                                API.sendChat('New maxlength is '+mubBot.settings.maxLength+' minutes');
                            }
                        }
                        botMethods.save();
                        break;

                    case "interactive":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            mubBot.settings.interactive ? API.sendChat("Bot is interactive.") : API.sendChat("Bot is not interactive.");
                        }
                        break;

                    case "toggleinteractive":
                    case "ti":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            if(mubBot.settings.interactive){
                                mubBot.settings.interactive = false;
                                API.sendChat("Bot will no longer interact.");
                            }else{
                                mubBot.settings.interactive = true;
                                API.sendChat("Bot will now interact.");
                            }
                        }
                        botMethods.save();
                        break;

                    case "save":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            botMethods.save();
                            API.sendChat("Settings saved.");
                        }
                        break;

                    case "stfu":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            mubBot.settings.interactive = false;
                            API.sendChat("Yessir!");
                        }
                        botMethods.save();
                        break;

                    case "changelog":
                        if(API.getUser(fromID).permission > 1 || mubBot.admins.indexOf(fromID) > -1){
                            API.sendChat("New in version " + mubBot.misc.version + " - " + mubBot.misc.changelog)
                        }
                        break;

                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');
            if(typeof command[2] != "undefined"){
                for(var i = 2; i<command.length; i++){
                    command[1] = command[1] + ' ' + command[i];
                }
            }
            if(mubBot.misc.ready || mubBot.admins.indexOf(fromID) > -1 ||API.getUser(fromID).permission > 1){
                switch(command[0].toLowerCase()){
                    case "taco":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomTaco = Math.floor(Math.random() * mubBot.misc.tacos.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + crowd[randomUser].username + ", take this " + mubBot.misc.tacos[randomTaco] + ", you bitch!");
                                    break;
                                case 1:
                                    API.sendChat("@" + crowd[randomUser].username + ", quickly! Eat this " + mubBot.misc.tacos[randomTaco] + " before I do!");
                                    break;
                                case 2:
                                    API.sendChat("One free " + mubBot.misc.tacos[randomTaco] + " for you, @" + crowd[randomUser].username + ". :3");
                                    break;
                                case 3:
                                    API.sendChat("/me throws a " + mubBot.misc.tacos[randomTaco] + " at @" + crowd[randomUser].username + "!");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomTaco = Math.floor(Math.random() * mubBot.misc.tacos.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("@" + botMethods.cleanString(command[1]) + ", take this " + mubBot.misc.tacos[randomTaco] + ", you bitch!");
                                    break;
                                case 1:
                                    API.sendChat("@" + botMethods.cleanString(command[1]) + ", quickly! Eat this " + mubBot.misc.tacos[randomTaco] + " before I do!");
                                    break;
                                case 2:
                                    API.sendChat("One free " + mubBot.misc.tacos[randomTaco] + " for you, @" + botMethods.cleanString(command[1]) + ". :3");
                                    break;
                                case 3:
                                    API.sendChat("/me throws a " + mubBot.misc.tacos[randomTaco] + " at @" + botMethods.cleanString(command[1]) + "!");
                                    break;
                            }
                        }
                        if(mubBot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;
                    case "hug":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+crowd[randomUser].username+" 's ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+crowd[randomUser].username+" an awkward hug");
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("Hugs? Forget that!");
                                    setTimeout(function(){
                                        API.sendChat("/me grabs @"+botMethods.cleanString(command[1])+" 's ass");
                                    }, 650);
                                    break;
                                case 1:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" a big bear hug");
                                    break;
                                case 2:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" a soft, furry hug");
                                    break;
                                case 3:
                                    API.sendChat("/me gives @"+botMethods.cleanString(command[1])+" an awkward hug");
                                    break;
                            }
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;
                    case "cookie":
                        if(typeof command[1] == "undefined"){
                            var crowd = API.getUsers();
                            var randomUser = Math.floor(Math.random() * crowd.length);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("/me throws a STICK OF DYNAMITE at @"+crowd[randomUser].username);
                                    break;
                                case 1:
                                    API.sendChat("/me drowns @"+crowd[randomUser].username+" in batter");
                                    break;
                                case 2:
                                    API.sendChat("/me shows @"+crowd[randomUser].username+" the power of friendship. BY SLAPPING THEM WITH A COOKIE");
                                    break;
                                case 3:
                                    API.sendChat("/me hands an anthrax laced cookie to @"+crowd[randomUser].username);
                                    break;
                            }
                        }else{
                            if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
                            var randomSentence = Math.floor(Math.random() * 3);
                            switch(randomSentence){
                                case 0:
                                    API.sendChat("/me throws a STICK OF DYNAMITE at @"+botMethods.cleanString(command[1]));
                                    break;
                                case 1:
                                    API.sendChat("/me drowns @"+botMethods.cleanString(command[1])+" in batter");
                                    break;
                                case 2:
                                    API.sendChat("/me hands an anthrax laced cookie to @"+botMethods.cleanString(command[1]));
                                    break;
                                case 3:
                                    API.sendChat("/me shows @"+botMethods.cleanString(command[1])+" the power of friendship. BY SLAPPING THEM WITH A COOKIE");
                                    break;
                            }
                        }
                        if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                            mubBot.misc.ready = false;
                            setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                        }
                        break;

                    case "run":
                        if(mubBot.admins.indexOf(fromID) > -1){
                            a = botMethods.cleanString(command[1]);
                            console.log(a);
                            eval(a);
                        }
                        break;

                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!rule ') === 0){
            var msg = data.message, from = data.from, fromID = data.fromID;
            var command = msg.substring(1).split(' ');

            if(mubBot.misc.ready || mubBot.admins.indexOf(fromID) > -1 ||API.getUser(fromID).permission > 1){
                switch(command[1]){
                    case '1':
                        API.sendChat('Only Brony/My Little Pony related music and PMV’s can be played in this room');
                        break;
                    case '2':
                        API.sendChat('All non-pony PMV’s are subject to being skipped if they are just pictures or simple loops');
                        break;
                    case '3':
                        API.sendChat('Mashups/mixes/loops with little to no effort are subject to being skipped');
                        break;
                    case '4':
                        API.sendChat('Any song played that is currently in the history will be skipped');
                        break;
                    case '5':
                        API.sendChat('Advertising rooms, websites, etc. without moderator approval is grounds for being kicked');
                        break;
                    case '6':
                        API.sendChat('No songs over 10 minutes. (some songs a little bit over may be allowed, ask a mod)');
                        break;
                    case '7':
                        API.sendChat('Spamming in chat will result in kicked');
                        break;
                    case '8':
                        API.sendChat('FOR THE LOVE OF CELESTIA, CONTROL THE CANTERLOCK');
                        break;
                    case '9':
                        API.sendChat('There is a no tolerance policy for fighting');
                        break;
                    case '10':
                        API.sendChat('All visitors to the room must be treated equally and fairly by all');
                        break;
                    case '11':
                        API.sendChat('Do not ask for, bouncer/manager/host positions');
                        break;
                    case '12':
                        API.sendChat('Respect other users and moderators, continuous disrespect will result in being kicked');
                        break;
                    case '13':
                        API.sendChat('No R34/clop/porn/gore. This includes links, songs, and chat. (If you want to post this stuff anywhere, talk to a moderator about being added to the Skype group, you can post it there with proper tags [NSFW/NSFL])');
                        break;
                    case '14':
                        API.sendChat('No playing episodes/non-music shorts unless you’re the (co)host or were giving permission to play a episode/non-music short by a (co)host');
                        break;
                    case '15':
                        API.sendChat('When posting links, please add NSFW for anything suggestive (anything saucy, porn, gore, or clop is NOT allowed). Add Spoiler tags when necessary as well');
                        break;
                    case '16':
                        API.sendChat('Swearing is allowed in moderation. Racist and derogatory slurs can result in being kicked');
                        break;
                    case '17':
                        API.sendChat('Only moderators may ask who mehed or why');
                        break;
                    case '18':
                        API.sendChat('Impersonating other artists, users, etc. can result in being kicked');
                        break;
                    case '19':
                        API.sendChat('If you\'re going to autojoin, be responsive when someone @mentions you, otherwise you risk being kicked');
                        break;
                    case '20':
                        API.sendChat('Using multiple accounts to DJ or enter the booth or waitlist is not allowed');
                        break;
                    case '21':
                        API.sendChat('Don\'t spam emotes, don\'t use overly large emotes, and don\'t use emotes in your name (Referring to ponymotes)');
                        break;
                    case '22':
                        API.sendChat('Do not ask for fans');
                        break;
                    case '23':
                        API.sendChat('Songs such as Nigel, Pingas, etc. are subject to being skipped on any day but Sunday. !weird for full list');
                        break;
                    case '24':
                        API.sendChat('Don\'t RP (roleplay) excessively in plug chat, keep it in Skype instead');
                        break;
                    case '25':
                        API.sendChat('If you have a complaint, do not argue in the chat where everyone can see, instead submit a complaint to the form (http://bit.ly/145oLLW) or take it up with a moderator on Skype. (if you don’t have Skype ask for another form of contact)');
                        break;
                    case '26':
                        API.sendChat('Don’t use excessively long or offensive names');
                        break;
                    case '27':
                        API.sendChat('Have fun and enjoy yourselves!');
                        break;
                    case '34':
                        API.sendChat('hue hue hue');
                        break;
                    case '99':
                        API.sendChat('Just no..');
                        break;
                    default:
                        API.sendChat('Unknown rule!');
                        break;
                }
            }
        }
    });

    API.on(API.CHAT, function(data){
        var msg = data.message, fromID = data.fromID;
        command = msg.substring(1).split(' ');
        if(typeof command[3] != "undefined"){
            for(var i = 3; i<command.length; i++){
                command[2] = command[2] + ' ' + command[i];
            }
        }
        if(API.getUser(data.fromID).permission > 1){
            switch(command[0]){
                case 'ruleskip':
                    if(command[1].length === 13 && command[1].indexOf(':') === 1 && command[1].indexOf(1) === 0 && typeof ruleSkip[command[1]] === 'undefined'){
                        ruleSkip[command[1]] = {id: command[1], rule: command[2]};
                        $.getJSON("http://gdata.youtube.com/feeds/api/videos/"+command[1].substring(2)+"?v=2&alt=jsonc&callback=?", function(json){
                            setTimeout(function(){
                                if(typeof json.data.title !== 'undefined'){
                                    API.sendChat(json.data.title+' added to ruleskip');
                                }else{
                                    API.sendChat('Added to ruleskip');
                                }
                            }, 500)
                        });
                    }else if(command[1].length === 10 && command[1].indexOf(':') === 1 && command[1].indexOf(2) === 0 && typeof ruleSkip[command[1]] === 'undefined'){
                        ruleSkip[command[1]] = {id: command[1], rule: command[2]};
                        SC.get('/tracks', {ids: command[1].substring(2)}, function(tracks) {
                            if(typeof tracks[0].title !== 'undefined'){
                                API.sendChat(tracks[0].title+' added to ruleskip');
                            }else{
                                API.sendChat('Added to ruleskip');
                            }
                        });
                    }else if(typeof ruleSkip[API.getMedia().id] === 'undefined'){
                    ruleSkip[API.getMedia().id] = {id: API.getMedia().id, rule: command[1]};
                    API.sendChat(API.getMedia().author+ ' - ' +API.getMedia().title+' added to ruleskip');
                    API.moderateForceSkip();
                }
                    botMethods.save();
                    break;
                case 'checkruleskip':
                    if(typeof command[1] !== 'undefined'){
                        if(typeof ruleSkip[command[1]] !== 'undefined') API.sendChat(command[1]+' is in the ruleskip array!');
                        else API.sendChat(command[1]+' is not in the ruleskip array!');
                    }else{
                        if(typeof ruleSkip[API.getMedia().id] !== 'undefined') API.sendChat(API.getMedia().id+' is in the ruleskip array')
                        else API.sendChat(API.getMedia().id+' is not in the ruleskip array');
                    }
                    break;
                case 'ruleskipdelete':
                    if(typeof command[1] !== 'undefined' && typeof ruleSkip[command[1]] !== 'undefined'){
                        delete ruleSkip[command[1]];
                        API.sendChat(command[1]+' removed from ruleskip');
                    }else if(typeof command[1] === 'undefined' && typeof ruleSkip[API.getMedia().id] !== 'undefined'){
                        delete ruleSkip[API.getMedia().id];
                        API.sendChat(API.getMedia().id+' removed from ruleskip');
                    }else if(typeof command[1] !== 'undefined'){
                        API.sendChat(command[1]+' was not in the ruleskip array!');
                    }else{
                        API.sendChat(API.getMedia().id+' was not in the ruleskip array!');
                    }
            }
        }
    });

    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID;

        for(var i = 0; i < mubBot.filters.swearWords.length; i++){
            if(msg.indexOf(mubBot.filters.swearWords[i].toLowerCase()) > -1 && mubBot.settings.swearFilter){
                API.moderateDeleteChat(chatID);
            }
        }
        for(var i = 0; i < mubBot.filters.racistWords.length; i++){
            if(msg.indexOf(mubBot.filters.racistWords[i].toLowerCase()) > -1 && mubBot.settings.racismFilter){
                API.moderateDeleteChat(chatID);
            }
        }
        for(var i = 0; i < mubBot.filters.beggerWords.length; i++){
            if(msg.indexOf(mubBot.filters.beggerWords[i].toLowerCase()) > -1 && mubBot.settings.beggerFilter){
                API.moderateDeleteChat(chatID);
            }
        }

    });

    API.on(API.CHAT, function(data){
        msg = data.message.toLowerCase(), chatID = data.chatID, fromID = data.fromID;
        if(mubBot.misc.ready || mubBot.admins.indexOf(fromID) > -1 ||API.getUser(fromID).permission > 1){
            if(msg.indexOf(':eyeroll:') > -1){
                API.sendChat('/me ¬_¬');
                if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                    mubBot.misc.ready = false;
                    setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                }
            }
            if(msg.indexOf(':notamused:') > -1){
                API.sendChat('/me ಠ_ಠ');
                if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                    mubBot.misc.ready = false;
                    setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                }
            }
            if(msg.indexOf(':yuno:') > -1){
                API.sendChat('/me ლ(ಥ益ಥლ');
                if(mubBot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
                    mubBot.misc.ready = false;
                    setTimeout(function(){ mubBot.misc.ready = true; }, mubBot.settings.cooldown * 1000);
                }
            }
        }

    });

    API.on(API.DJ_ADVANCE, DJ_ADVANCE);
    function DJ_ADVANCE(data){
        if(mubBot.settings.ruleSkip && typeof ruleSkip[data.media.id] != "undefined"){
            switch(ruleSkip[data.media.id].rule){
                case '1':
                    API.sendChat('@'+data.dj.username+' Only Brony/My Little Pony related music and PMV’s can be played in this room');
                    botMethods.skip();
                    break;
                case '2':
                    API.sendChat('@'+data.dj.username+' All non-pony PMV’s are subject to being skipped if they are just pictures or simple loops');
                    botMethods.skip();
                    break;
                case '3':
                    API.sendChat('@'+data.dj.username+' Mashups/mixes/loops with little to no effort are subject to being skipped');
                    botMethods.skip();
                    break;
                case '13':
                    API.sendChat('@'+data.dj.username+' No R34/clop/porn/gore. This includes links, songs, and chat. (If you want to post this stuff anywhere, talk to a moderator about being added to the Skype group, you can post it there with proper tags [NSFW/NSFL])');
                    botMethods.skip();
                    break;
                case '14':
                    API.sendChat('@'+data.dj.username+' No playing episodes/non-music shorts unless you’re the (co)host or were giving permission to play a episode/non-music short by a (co)host');
                    botMethods.skip();
                    break;
                case '99':
                    API.sendChat('@'+data.dj.username+' Just no..');
                    botMethods.skip();
                    break;
                default:
                    API.sendChat('@'+data.dj.username+' '+ruleSkip[data.media.id].rule);
                    botMethods.skip();
                    break;
            }
        }
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
        setTimeout(function(){
            if(typeof response === 'undefined' && data.media.format != 2 && mubBot.settings.removedFilter){
                API.sendChat('/me This video may be unavailable!!');
                //botMethods.skip();
            }
        }, 1500);

        cancel = false;
    }


    botMethods.loadStorage();
    console.log("Running mubBot User Shell version " + mubBot.misc.version);

    setTimeout(function(){
        $.getScript('http://connect.soundcloud.com/sdk.js');
    }, 1000);

    setTimeout(function(){
        SC.initialize({
            client_id: 'eae62c8e7a30564e9831b9e43f1d484a'
        });
    }, 3000);

    API.sendChat('/me Running mubBot '+mubBot.misc.version)
