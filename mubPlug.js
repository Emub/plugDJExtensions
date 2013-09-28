$(function(){
    var version = "1.913";
    var customGreen = "#5bd708"; var bassPlugBlue = "#58FAF4";
    function initialize(){

        var css = $('<link>');
        css.attr("href", "https://dl.dropboxusercontent.com/s/f3b4hts408rdu2u/mubPlug.css").attr("rel", "stylesheet").attr("type", "text/css");
        $("head").append(css);

        $('body').prepend('<div id="firstRun">Since it is the first time you\'re running mubPlug, your settings have not been setup yet. Simply click on the settings button (located on the booth) and set your desired options. These will always be saved unless you clear your browser\'s storage and you can change them at any time.<p> If you experience any bugs or have a request you can submit an issue to <a style="color: #77E9FF" href="http://goo.gl/X0X6NN" target="_blank">http://goo.gl/X0X6NN</a>.</p> This message will not be shown again unless you clear your browser\'s storage. <p>- DerpTheBass</p></div>');
        $('body').prepend('<div id="firstRunExit">X</div>');

        var chatPosition     = $("#chat").position();
        var chatPositionLeft = chatPosition.left;
        var chatWidth        = $("#chat").width();
        var UIPosition       = chatPositionLeft + 170 + "px";
        var UI               = $('<div>');
        var userList         = $('<div>');
        userList.attr("id", "mubPlug-userlist").attr("class", "sidebar");
        var userListHeader   = $('<div>');
        userListHeader.attr("class", "dialog-header");

        var userListHeaderTitle = $('<span>');
        userListHeaderTitle.html('User List');

        var userlistHideButton = $('<div>');
        userlistHideButton.attr("class", "dialog-close-button").attr("id", "userlistHideButton");

        var usersPara                 = $('<p>');
        usersPara.html(" users in room").attr("id", "usersPara");

        var waitlistPara              = $('<p>');
        waitlistPara.html("Waitlist: ").attr("id", "waitlistPara");

        var userListDiv               = $('<div>');
        userListDiv.attr("id", "userListDiv");

        var settingsWindow            = $('<div>');
        settingsWindow.attr("id", "settingsWindow").css("display", "none");

        var settingsWindowHeader      = $('<div>');
        settingsWindowHeader.attr("class", "overlay-header");

        var settingsWindowHeaderTitle = $('<div>');
        settingsWindowHeaderTitle.html('mubPlug Settings').attr("class", "overlay-title");

        var settingsWindowCloseButton = $('<div>');
        settingsWindowCloseButton.attr("class", "overlay-close-button").attr("id", "settingsWindowCloseButton");

        var settingsWindowTable       = $('<table>');
        settingsWindowTable.attr("cellspacing", "5").attr("cellspacing", "5").attr("id", "settingsWindowTable");

        var tableRow1   = $('<tr>');
        var tableRow2   = $('<tr>');
        var tableRow3   = $('<tr>');
        var tableRow4   = $('<tr>');
        var tableRow5   = $('<tr>');
        var tableRow6   = $('<tr>');
        var tableRow7   = $('<tr>');
        var tableRow8   = $('<tr>');
        var tableData1  = $('<td>');
        var tableData2  = $('<td>');
        var tableData3  = $('<td>');
        var tableData4  = $('<td>');
        var tableData5  = $('<td>');
        var tableData6  = $('<td>');
        var tableData7  = $('<td>');
        var tableData8  = $('<td>');
        var tableData9  = $('<td>');
        var tableData10 = $('<td>');
        var tableData11 = $('<td>');
        var tableData12 = $('<td>');
        var tableData13 = $('<td>');
        var tableData14 = $('<td>');
        var tableData15 = $('<td>');

        tableRow8.css("vertical-align", "bottom");
        tableData15.attr("colspan", "2");

        var settingsButton       = $('<div>');
        settingsButton.html('Settings').attr("id", "settingsButton").attr("class", "divButton");

        var autoQueueButton      = $('<div>');
        autoQueueButton.attr("id", "autoQueueButton").attr("class", "divButton").attr("title", "Toggles the auto waitlist join feature.");

        var autoWootButton       = $('<div>');
        autoWootButton.attr("id", "autoWootButton").attr("class", "divButton").attr("title", "Toggles the auto woot feature.");

        var historyAlertButton   = $('<div>');
        historyAlertButton.attr("id", "historyAlertButton").attr("class", "divButton").attr("title", "Displays a warning in the chat if the song currently playing is in the room history.");

        var upcomingAlertsButton = $('<div>');
        upcomingAlertsButton.attr("id", "upcomingAlertsButton").attr("class", "divButton").attr("title", "Displays a warning in the chat if the song you are going to play is in the room history.");

        var curateAlertsButton   = $('<div>');
        curateAlertsButton.attr("id", "curateAlertsButton").attr("class", "divButton").attr("title", "Shows a message in the chat when someone curates a song.");

        var speakUpButton        = $('<div>');
        speakUpButton.attr("id", "speakUpButton").attr("class", "divButton").attr("title", "Sends a message in the chat if the song playing is in the room history.");

        var hideVideoButton      = $('<div>');
        hideVideoButton.attr("id", "hideVideoButton").attr("class", "divButton").attr("title", "Hides or shows the video.");

        var userListButton       = $('<div>');
        userListButton.attr("id", "userListButton").attr("class", "divButton").attr("title", "Hides or shows the userlist.");

        var greentextButton      = $('<div>');
        greentextButton.attr('id', 'greentextButton').attr('class', 'divButton').attr('title', 'Toggles greentext conversion').html(' - Greentext');

        var fixUserListButton    = $('<div>');
        fixUserListButton.html(' - Refresh userlist').attr("id", "fixUserlistButton").attr("class", "divButton").attr("title", "Refreshes the userlist.");

        var joinAlertsButton     = $('<div>');
        joinAlertsButton.attr("id", "joinAlertsButton").attr("class", "divButton").attr("title", "Toggles the user join alert feature");

        var leaveAlertsButton    = $('<div>');
        leaveAlertsButton.attr("id", "leaveAlertsButton").attr("class", "divButton").attr("title", "Toggles the user leave alert feature");

        var autoHideButton       = $('<div>');
        autoHideButton.attr("id", "autoHideButton").attr("class", "divButton").attr("title", "Toggles the user list auto hide feature");

        var recommendedButton    = $('<div>');
        recommendedButton.html(" - Recommended settings").attr("class", "divButton").attr("id", "recommendedButton").attr("title", "Set's your settings to what the creators of mubPlug recommend");

        var halloButton          = $('<div>');
        halloButton.html('Set halloween avatar').attr("id", "setHalloAvatarButton").attr("class", "divButton").attr("title", "Sets your avatar to what you selected.");

        var halloSelect          = $('<select>');
        halloSelect.attr("id", "halloSelect");

        var halloOption1  = $('<option>'); halloOption1.html("Male vampire").attr("value", "1");
        var halloOption2  = $('<option>'); halloOption2.html("Vampire girl").attr("value", "2");
        var halloOption3  = $('<option>'); halloOption3.html("Frankensteins monster").attr("value", "3");
        var halloOption4  = $('<option>'); halloOption4.html("Vampire lady").attr("value", "4");
        var halloOption5  = $('<option>'); halloOption5.html("Male skeleton").attr("value", "5");
        var halloOption6  = $('<option>'); halloOption6.html("Female skeleton").attr("value", "6");
        var halloOption7  = $('<option>'); halloOption7.html("Gray mummy").attr("value", "7");
        var halloOption8  = $('<option>'); halloOption8.html("Purple mummy").attr("value", "8");
        var halloOption9  = $('<option>'); halloOption9.html("Ghost").attr("value", "9");
        var halloOption10 = $('<option>'); halloOption10.html("Male wolf").attr("value", "10");
        var halloOption11 = $('<option>'); halloOption11.html("Pumpkin monster").attr("value", "11");
        var halloOption12 = $('<option>'); halloOption12.html("Female wolf").attr("value", "12");
        var halloOption13 = $('<option>'); halloOption13.html("Disco zombie").attr("value", "13");

        UI.attr("id", "mubPlugUI").css("left", UIPosition);

        var windowWidth = $(window).width();
        var settingsPositionLeft = windowWidth - 800;

        settingsWindow.css("left", settingsPositionLeft / 2 + "px");

        halloSelect.append(halloOption1).append(halloOption2).append(halloOption3).append(halloOption4).append(halloOption5).append(halloOption6).append(halloOption7).append(halloOption8).append(halloOption9).append(halloOption10).append(halloOption11).append(halloOption12).append(halloOption13);
        tableData1.append(halloSelect);
        tableData2.append(halloButton);
        tableData3.append(autoWootButton);
        tableData4.append(autoQueueButton);
        tableData5.append(historyAlertButton);
        tableData6.append(speakUpButton);
        tableData7.append(userListButton);
        tableData8.append(fixUserListButton);
        tableData9.append(hideVideoButton);
        tableData10.append(upcomingAlertsButton);
        tableData11.append(curateAlertsButton);
        tableData12.append(joinAlertsButton);
        tableData13.append(leaveAlertsButton);
        tableData14.append(greentextButton);
        tableData15.append(recommendedButton);
        tableRow1.append(tableData1).append(tableData2);
        tableRow2.append(tableData3).append(tableData4);
        tableRow3.append(tableData5).append(tableData6);
        tableRow4.append(tableData7).append(tableData8);
        tableRow5.append(tableData9).append(tableData10);
        tableRow6.append(tableData11).append(tableData14);
        tableRow7.append(tableData12).append(tableData13);
        tableRow8.append(tableData15);

        settingsWindowTable.append(tableRow1).append(tableRow2).append(tableRow3).append(tableRow4).append(tableRow5).append(tableRow6).append(tableRow7).append(tableRow8);

        UI.append(settingsButton);

        userListHeader.append(userListHeaderTitle).append(userlistHideButton);
        userList.append(userListHeader).append(usersPara).append(waitlistPara).append(userListDiv);

        $("body").append(UI).append(userList);

        settingsWindowHeader.append(settingsWindowHeaderTitle).append(settingsWindowCloseButton);
        settingsWindow.append(settingsWindowHeader).append(settingsWindowTable);
        $("#overlay-container").append(settingsWindow);

        function addGlobalStyle(css){
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if(!head){
                return;
            }
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }
        {
            addGlobalStyle('#button-chat-collapse, #button-chat-collapse {background: url(http://i.imgur.com/jqbkAOH.png);');
            addGlobalStyle('#button-chat-expand, #button-chat-expand {background: url(http://i.imgur.com/6dFswPF.png);');
            //addGlobalStyle('#chat, #chat {border-style: solid; border-width: 1px; border-color: #000; ');
            //addGlobalStyle('#playback, #playback {border-style: solid; border-width: 1px; border-color: #000; ');
            //addGlobalStyle('#meta-frame, #meta-frame {border-style: solid; border-width: 1px; border-color: #000; ');
            //addGlobalStyle('#user-container, #user-container {border-style: solid; border-width: 1px; border-color: #000; ');
            addGlobalStyle('.frame-background, .frame-background {opacity: 0.83;}');
            addGlobalStyle('.chat-from-featureddj, .chat-from-featureddj {color: #00C4FF !important;}');
            addGlobalStyle('.chat-from-manager, .chat-from-manager {color: #16BF00 !important;}');
            addGlobalStyle('.chat-from-cohost, .chat-from-cohost {color: #FF4000 !important;}');
            addGlobalStyle('.chat-from-host, .chat-from-host {color: #FF0004 !important;}');
            addGlobalStyle('.chat-host, .chat-host {background-image: url(http://i.imgur.com/p2FzDNP.png); no repeat 0 5px);}');
            addGlobalStyle('.chat-cohost, .chat-cohost {background-image: url(http://i.imgur.com/Vf1KvPO.png); no repeat 0 5px;}');
            addGlobalStyle('.chat-manager, .chat-manager {background-image: url(http://i.imgur.com/aeEE6jF.png); no repeat 0 5px;}');
        }

    }

    initialize();

    $("#setHalloAvatarButton").click(function(){
        var input, changed;
        input = $("#halloSelect").val();
        switch(input){
            case "1":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween01"]}' })
                break;
            case "2":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween02"]}' })
                break;
            case "3":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween03"]}' })
                break;
            case "4":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween04"]}' })
                break;
            case "5":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween05"]}' })
                break;
            case "6":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween06"]}' })
                break;
            case "7":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween07"]}' })
                break;
            case "8":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween08"]}' })
                break;
            case "9":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween09"]}' })
                break;
            case "10":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween10"]}' })
                break;
            case "11":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween11"]}' })
                break;
            case "12":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween12"]}' })
                break;
            case "13":
                $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_avatar', contentType: 'application/json', data: '{"service":"user.set_avatar","body":["halloween13"]}' })
                break;
            default:
                alert("Error!" + input);
                break;
        }
    });

    var fullAccess = false;

// ------------------ AUTO WOOT ------------------

    var myID = "50aeaf683e083e18fa2d187e";
    var derpID = "50aeb07e96fba52c3ca04ca8";

    mubOptions                = {};
    mubOptions.autoWoot       = false;
    mubOptions.autoQueue      = false;
    mubOptions.historyAlerts  = false;
    mubOptions.speakingUp     = false;
    mubOptions.userListShown  = false;
    mubOptions.upcomingAlerts = false;
    mubOptions.curateAlerts   = false;
    mubOptions.videoShown     = true;
    mubOptions.joinAlerts     = false;
    mubOptions.leaveAlerts    = false;
    mubOptions.autoHide       = false;
    mubOptions.debug          = false;
    mubOptions.greentext      = false;

    mubMethods                = {};
    mubMethods.load           = function(){
        var storage = JSON.parse(localStorage.getItem('mubPlug'));
        for(var i in window.mubOptions){
            if(typeof storage[i] !== "undefined") window.mubOptions[i] = storage[i];
        }
    };
    mubMethods.save           = function(){localStorage.setItem("mubPlug", JSON.stringify(mubOptions))};
    mubMethods.Debug          = function(a){console.log("[mubPlug "+version+"]"+" "+a);};

    if(localStorage.getItem("mubPlug") !== null){
        mubMethods.load();
        adaptToSettings();
    }else{
        mubMethods.save();
        adaptToSettings();
        $("#firstRun") .css("display", "block");
        $("#firstRunExit") .css("display", "block");
    }

    function adaptToSettings(){
        mubOptions.autoWoot       ? $("#autoWootButton").html(" + Auto woot") : $("#autoWootButton").html(" - Auto woot");
        mubOptions.autoQueue      ? $("#autoQueueButton").html(" + Auto queue") : $("#autoQueueButton").html(" - Auto queue");
        mubOptions.historyAlerts  ? $("#historyAlertButton").html(" + History alerts") : $("#historyAlertButton").html(" - History alerts");
        mubOptions.speakingUp     ? $("#speakUpButton").html(" + Tell chat history alerts") : $("#speakUpButton").html(" - Tell chat history alerts");
        mubOptions.userListShown  ? $("#userListButton").html(" + Show user list") : $("#userListButton").html(" - Show user list");
        mubOptions.upcomingAlerts ? $("#upcomingAlertsButton").html(" + Upcoming alerts") : $("#upcomingAlertsButton").html(" - Upcoming alerts");
        mubOptions.curateAlerts   ? $("#curateAlertsButton").html(" + Curate messages") : $("#curateAlertsButton").html(" - Curate messages");
        mubOptions.videoShown     ? $("#hideVideoButton").html(" - Hidden video") : $("#hideVideoButton").html(" + Hidden video");
        mubOptions.joinAlerts     ? $("#joinAlertsButton").html(" + User join alerts") : $("#joinAlertsButton").html(" - User join alerts");
        mubOptions.leaveAlerts    ? $("#leaveAlertsButton").html(" + User leave alerts") : $("#leaveAlertsButton").html(" - User leave alerts");
        mubOptions.autoHide       ? $("#autoHideButton").html(" + Auto hide user list") : $("#autoHideButton").html(" - Auto hide user list");
        mubOptions.greentext      ? $('#greentextButton').html(' + Greentext') : $('#greentextButton').html(' - Greentext');

        if(mubOptions.userListShown){
            $("#mubPlug-userlist").css("display", "block");
            $("#mubPlug-userlist").animate({
                left: 0
            }, 800, function(){
            });
        }else{
            $("#mubPlug-userlist").animate({
                left: -300
            }, 800, function(){
                $("#mubPlug-userlist").css("display", "none");
            });
        }
        if(mubOptions.videoShown){
            $("#playback-container").fadeIn(600, function(){
                $("#playback-container").css("display", "block");
            });
            $(this).html(" - Hidden video");
        }else{
            $("#playback-container").fadeOut(600, function(){
                $("#playback-container").css("display", "none");
            });
            $(this).html(" + Hidden video");
        }
        if(mubOptions.autoHide){
            $("#mubPlug-userlist").animate({
                left: -180
            }, 100, function(){
                //Animated and is now almost hidden
            });
        }
    }

    $("#userlistHideButton").click(function(){
        $("#userListButton").click();
    });

    $("#recommendedButton").click(function(){
        mubOptions.autoWoot = true;
        mubOptions.autoQueue = false;
        mubOptions.historyAlerts = true;
        mubOptions.speakingUp = false;
        mubOptions.userListShown = true;
        mubOptions.upcomingAlerts = true;
        mubOptions.curateAlerts = false;
        mubOptions.videoShown = true;
        mubOptions.joinAlerts = true;
        mubOptions.leaveAlerts = true;
        mubOptions.autoHide = false;
        adaptToSettings();
    });

    $("#firstRunExit").click(function(){ $("#firstRun").fadeOut(200);$("#firstRunExit").fadeOut(200); });

    $("#autoHideButton").click(function(){
        if(mubOptions.autoHide){
            mubOptions.autoHide = false;
            $(this).html(" - Auto hide user list");
            $("#mubPlug-userlist").animate({
                left: 0
            }, 100, function(){
            });
        }else{
            mubOptions.autoHide = true;
            $(this).html(" + Auto hide user list");
            $("#mubPlug-userlist").animate({
                left: -180
            }, 100, function(){
            });
        }
    });

    $("#mubPlug-userlist").mouseover(function(){
        if(mubOptions.autoHide){
            $(this).animate({
                left: 0
            }, 100, function(){
                //Animated and is now almost hidden
            });
        }
    });

    $("#mubPlug-userlist").mouseout(function(){
        if(mubOptions.autoHide){
            setTimeout(function(){
                $("#mubPlug-userlist").animate({
                    left: -180
                }, 100, function(){
                    //Animated and is now almost hidden
                });
            }, 800);
        }
    });

    $("#leaveAlertsButton").click(function(){
        if(mubOptions.leaveAlerts){
            mubOptions.leaveAlerts = false;
            $(this).html(" - User leave alerts");
        }else{
            mubOptions.leaveAlerts = true;
            $(this).html(" + User leave alerts");
        }
        return mubOptions.leaveAlerts;
        mubMethods.save();
    });


    $("#joinAlertsButton").click(function(){
        if(mubOptions.joinAlerts){
            mubOptions.joinAlerts = false;
            $(this).html(" - User join alerts");
        }else{
            mubOptions.joinAlerts = true;
            $(this).html(" + User join alerts");
        }
        return mubOptions.joinAlerts;
        mubMethods.save();
    });

    $('#greentextButton').on('click', function(){
        mubOptions.greentext = !mubOptions.greentext;
        if(mubOptions.greentext){
            $(this).html(' + Greentext');
        }else{
            $(this).html(' - Greentext');
        }
        mubMethods.save();
    })

    $("#autoWootButton").click(function(){
        if(mubOptions.autoWoot == true){
            mubOptions.autoWoot = false;
            $(this).html(' - Auto woot');
        }else{
            mubOptions.autoWoot = true;
            $(this).html(' + Auto woot');
            $("#button-vote-positive").click();
        }
        return mubOptions.autoWoot;
        mubMethods.save();
    });

    $("#autoQueueButton").click(function(){
        if(mubOptions.autoQueue == true){
            mubOptions.autoQueue = false;
            $(this).html(' - Auto queue');
            API.djLeave();
        }else{
            mubOptions.autoQueue = true;
            $(this).html(' + Auto queue');
            if(($("#button-dj-waitlist-join").css("display")) == "block"){
                $("#button-dj-waitlist-join").click();
            }
        }
        return mubOptions.autoQueue;
        mubMethods.save();
    });

    $("#speakUpButton").click(function(){
        if(mubOptions.speakingUp == true){
            mubOptions.speakingUp = false;
            $(this).html(" - Tell chat history alerts");
        }else{
            mubOptions.speakingUp = true;
            $(this).html(" + Tell chat history alerts");
        }
        return mubOptions.speakingUp;
        mubMethods.save();
    });

    $("#historyAlertButton").click(function(){
        if(mubOptions.historyAlerts == true){
            mubOptions.historyAlerts = false;
            $(this).html(" - History alerts");
        }else{
            mubOptions.historyAlerts = true;
            $(this).html(" + History alerts");
        }
        return mubOptions.historyAlerts;
        mubMethods.save();
    });

    $("#settingsButton").click(function(){
        $("#overlay-container").fadeIn(400, function(){
            $("#overlay-container").css("display", "block");
        });
        $("#settingsWindow").fadeIn(400, function(){
            $("#settingsWindow").css("display", "block");
        });
    });

    $("#settingsWindowCloseButton").click(function(){
        $("#overlay-container").fadeOut(600, function(){
            $("#overlay-container").css("display", "none");
        });
        $("#settingsWindow").fadeOut(600, function(){
            $("#settingsWindow").css("display", "none");
        });
        mubMethods.save();
    });

    $("#userListButton").click(function(){
        if(mubOptions.userListShown){
            mubOptions.userListShown = false;
            $(this).html(" - Show user list");
            $("#mubPlug-userlist").animate({
                left: -300
            }, 800, function(){
                $("#mubPlug-userlist").css("display", "none");
            });
        }else{
            mubOptions.userListShown = true;
            $("#mubPlug-userlist").css("display", "block");
            $(this).html(" + Show user list");
            $("#mubPlug-userlist").animate({
                left: 0
            }, 800, function(){
                updateUserlist();
            });
        }
        mubMethods.save();
    });

    $("#hideVideoButton").click(function(){
        if(mubOptions.videoShown){
            mubOptions.videoShown = false;
            $("#playback-container").fadeOut(600, function(){
                $("#playback-container").css("display", "none");
            });
            $(this).html(" + Hidden video");
        }else{
            mubOptions.videoShown = true;
            $("#playback-container").fadeIn(600, function(){
                $("#playback-container").css("display", "block");
            });
            $(this).html(" - Hidden video");
        }
        mubMethods.save();
    });

    $("#fixUserlistButton").click(function(){
        updateUserlist();
    });

    $("#upcomingAlertsButton").click(function(){
        if(mubOptions.upcomingAlerts){
            mubOptions.upcomingAlerts = false;
            $(this).html(" - Upcoming alerts");
        }else{
            mubOptions.upcomingAlerts = true;
            $(this).html(" + Upcoming alerts");
        }
        mubMethods.save();
    });

    $("#curateAlertsButton").click(function(){
        if(mubOptions.curateAlerts){
            mubOptions.curateAlerts = false;
            $(this).html(" - Curate messages");
        }else{
            mubOptions.curateAlerts = true;
            $(this).html(" + Curate messages");
        }
        mubMethods.save();
    });

    function sendChatUpdate(text, color, textcolor, id, link, cursor, clickToDelete, cross){
        var chatUpdate, spanChatUpdate, crossImage;
        var crossHoverSrc = "http://i.imgur.com/y3886Cy.png";
        var crossSrc = "http://i.imgur.com/XT5fWnB.png";
        crossImage = $('<img>');
        chatUpdate = $('<div>');
        spanChatUpdate = $('<span>');
        chatUpdate.attr("class", "chat-update").css("text-align", "center").attr("id", "mubPlugChatUpdate");
        spanChatUpdate.attr("onLoad", "updateUserlist()").attr("class", "chat-text").css("text-align", "middle").css("align", "center").css("margin-left", "auto").css("margin-right", "auto");
        spanChatUpdate.html(text);
        crossImage.attr("src", crossSrc).attr("class", "chatUpdateCross").attr("align", "right").attr("onClick", "removeParent(this)").attr("onMouseOver", "this.src = '" + crossHoverSrc + "'").attr("onMouseOut", "this.src = '" + crossSrc + "'");
        if(color != ""){
            chatUpdate.css("background-color", color);
        }
        if(textcolor != ""){
            spanChatUpdate.css("color", textcolor);
        }else{
            spanChatUpdate.css("color", "black");
        }
        if(id != "") chatUpdate.attr("id", id);
        if(link != "") chatUpdate.attr("href", link);
        if(cursor != "") chatUpdate.css("cursor", cursor);
        chatUpdate.append(spanChatUpdate);
        if(clickToDelete != false){
            chatUpdate.attr("title", "Click this message to delete it").attr("onClick", "$(this).remove()");
            if(cursor == null) chatUpdate.css("cursor", "pointer");
        }else if(cross != false){
            chatUpdate.append(crossImage);
        }
        $("#chat-messages").append(chatUpdate);
        document.getElementById("chat-messages").scrollTop = 999999999;
    }

    API.on(API.HISTORY_UPDATE, checkStuff);
    API.on(API.USER_JOIN, userJoin);
    API.on(API.USER_LEAVE, updateUserlist);
    API.on(API.USER_LEAVE, userLeave);
    API.on(API.VOTE_UPDATE, colorUserlist);
    API.on(API.CURATE_UPDATE, assignCurateIcon);

    function userJoin(user){
        if(mubOptions.joinAlerts){
            sendChatUpdate(user.username+" just joined the room!", "", bassPlugBlue);
        }
        updateUserlist();
    }

    function userLeave(user){
        if(mubOptions.leaveAlerts){
            sendChatUpdate(user.username+" just left the room!", "", bassPlugBlue);
        }
        updateUserlist();
    }

    function updateUserlist(){
        if(mubOptions.userListShown){
            var users = API.getUsers();
            $("#userListDiv").html("");
            $("#usersPara").html( users.length + " users in room");
            for(var usersWritten = 0; usersWritten < users.length; usersWritten++){
                var userPara = $('<p>'); var userParaSpan = $('<span>'); var userParaImage = $('<img>'); var userParaName = $('<span>'); var userCurateImage = $('<img>');
                userParaName.html(users[usersWritten].username).attr("id", users[usersWritten].username + "Entry").attr("class", "userParaName").attr("onClick", "mentionName(this)");
                userPara.attr("class", "userListParagraph");
                switch(users[usersWritten].permission){
                    case 1:
                        userParaImage.attr("src", "http://i.imgur.com/nohDf9l.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                    case 2:
                        userParaImage.attr("src", "http://i.imgur.com/bW75HNL.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                    case 3:
                        userParaImage.attr("src", "http://i.imgur.com/PpHziJF.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                    case 4:
                        userParaImage.attr("src", "http://i.imgur.com/mTLOMEi.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                    case 5:
                        userParaImage.attr("src", "http://i.imgur.com/1gS3StB.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                    case 9:
                        userParaImage.attr("src", "http://i.imgur.com/gEMSNwG.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                    case 10:
                        userParaImage.attr("src", "http://i.imgur.com/KkElZ14.png").attr("class", "imageSpan");
                        userParaSpan.append(userParaImage);
                        break;
                }
                if(users[usersWritten].curated != false){
                    userCurateImage.attr("src", "http://i.imgur.com/mYOM9qa.png").attr("class", "imageSpan").attr("id", "curateImage");
                    userParaSpan.append(userCurateImage);
                }else{
                    userCurateImage.remove();
                }
                userParaSpan.attr("id", users[usersWritten].username + "Span").append(userParaName);
                userPara.append(userParaSpan);
                $("#userListDiv").append(userPara);
            }
            colorUserlist();
            updateWaitlistPara();
        }
    }

    function colorUserlist(obj){
        var users = API.getUsers();
        for(var usersWritten = 0; usersWritten < users.length; usersWritten++){
            var ID = users[usersWritten].username + "Entry";
            var color;
            switch(users[usersWritten].vote){
                case 1:
                    color = "#5bd708";
                    break;
                case 0:
                    color = "white";
                    break;
                case -1:
                    color = "red";
                    break;
            }
            var object = document.getElementById(ID);
            $(object).css("color", color);
        }
    }

    function assignCurateIcon(obj){
        if(mubOptions.curateAlerts) sendChatUpdate(obj.user.username + ' Just curated: "' + API.getMedia().title + '"', "", "yellow");
        updateUserlist();
    }

    function checkStuff(obj){
        var currentlyPlaying, history, caught, length;
        if(mubOptions.autoWoot){
            setTimeout(function(){
                $("#button-vote-positive").click();
            }, 5000);
        }
        if(mubOptions.autoQueue && $("#button-dj-waitlist-join").css("display") == "block"){
            $("#button-dj-waitlist-join").click();
        }

        if(testHistory() > 1 && mubOptions.historyAlerts){
            sendChatUpdate("This song is still in the history!", "red", "white");
            if(mubOptions.speakingUp){
                API.sendChat("This song is still in the history!");
            }
        }

        if(isInHistory() && mubOptions.upcomingAlerts) sendChatUpdate("The song you are about to play is in the history!", "", "red");
        updateUserlist();
        updateWaitlistPara();
    }

    API.on(API.WAIT_LIST_UPDATE, updateWaitlistPara);

    function updateWaitlistPara(){
        var users = API.getWaitList(); var userID = API.getUser().id; var onWaitlist = false; var waitlistPosition;
        for(var i = 0; i < users.length; i++){
            if(userID === users[i].id){
                onWaitlist = true;
                waitlistPosition = i + 1;
            }
        }

        if(onWaitlist){
            $("#waitlistPara").html("Waitlist: " + waitlistPosition + " / " + users.length);
        }else{
            $("#waitlistPara").html("Waitlist: " + users.length);
        }
    }

    function testHistory(){
        currentlyPlaying = API.getMedia();
        history = API.getHistory();
        caught = 0;
        length = 0;
        for( ; length < history.length; length++){
            if(currentlyPlaying.cid === history[length].media.cid){
                caught++;
            }
        }

        return caught;
    }

    function isInHistory(video){
        var history, caught, length, nextMedia;
        nextMedia = API.getNextMedia();
        history = API.getHistory();
        caught = 0; length = 0;
        if(video != "undefined" && video != "" && video != null){
            for( ; length < history.length; length++){
                if(video.cid == history[length].media.cid){
                    caught++;
                }
            }
        }else{
            caught = 0; length = 0;
            for( ; length < history.length; length++){
                if(nextMedia.media.cid == history[length].media.cid){
                    caught++;
                }
            }
        }

        var DJs = API.getDJs();
        var user = API.getUser();
        if(DJs[0].id == user.id){
            caught--;
        }

        if(caught>=1){
            return true;
        }else{
            return false;
        }
    }

    function mentionName(object){
        var name = $(object).html();
        var currentText = $("#chat-input-field").val();
        $("#chat-input-field").val("@" + name + " " + currentText).focus();
    }

    function removeParent(object){
        $(object).parent().remove();
    }

// ------------------ CHAT COMMANDS ------------------

    API.on(API.CHAT_COMMAND, chatCommand);

    function chatCommand(value){
        switch(value){
            case "/history":
            case "/h":
                if(testHistory()>=2){
                    if(API.getUser().permission < 2){
                        sendChatUpdate("This song is in the history, but you you have to be at least a bouncer to skip it!", "", "red");
                    }else{
                        API.moderateForceSkip();
                        API.sendChat("Song in history.");
                    }
                }else{
                    sendChatUpdate("This song is not in the history!", "", "red");
                }
                break;

            case "/skip":
            case "/s":
                if(API.getUser().permission < 2){
                    sendChatUpdate("You are not high enough rank to do this!", "", "red");
                }else{
                    API.moderateForceSkip();
                }
                break;

            case "/commands":
            case "/cmd":
                sendChatUpdate("Click to see available commands", "", "yellow", "commandsLink", "", "pointer");
                break;

            case "/userlist":
            case "/u":
                $("#userListButton").click();
                break;

            case "/fix userlist":
            case "/uu":
                $("fixUserListButton").click();
                break;

            case "/autowoot":
            case "/auto woot":
            case "/aw":
                $("#autoWootButton").click();
                break;
                break;

            case "/autoqueue":
            case "/autojoin":
            case "/auto join":
            case "/auto queue":
            case "/aq":
                $("#autoQueueButton").click();
                break;

            case "/history alerts":
            case "/history alert":
            case "/historyalerts":
            case "/historyalert":
            case "/ha":
                $("#historyAlertButton").click();
                break;

            case "/sha":
            case "/share history alerts":
            case "/sharehistoryalerts":
            case "/sharehistoryalert":
            case "/share history alert":
                $("speakUpButton").click();
                break;

            case "/hide":
            case "/hv":
            case "/hide video":
            case "/hidevideo":
                $("#hideVideoButton").click();
                break;

            case "/not amused":
            case "/noamuse":
            case "/nah":
                API.sendChat("Ïƒ.Ïƒ");
                break;

            case "/settings":
            case "/setting":
            case "/set":
                $("#overlay-container").fadeIn(400, function(){
                    $("#overlay-container").css("display", "block");
                });
                $("#settingsWindow").fadeIn(400, function(){
                    $("#settingsWindow").css("display", "block");
                });
                break;

            case "/my song":
            case "/mysong":
            case "/ms":
                if(isInHistory() == true){
                    sendChatUpdate("The song you are about to play is in the history!", "", "red");
                }else{
                    sendChatUpdate("The song you are about to play is not in the history!", "", customGreen);
                }
                break;

            case "/boo":
                $("#button-vote-negative").click();
                break;

            case "/curate messages":
            case "/curatemessages":
            case "/cm":
                $("#curateAlertsButton").click();
                break;

            case "/rsb":
                $("#settingsButton").remove();
                break;

            case "/ss":
                mubMethods.save();
                sendChatUpdate("Settings saved", "", "white");
                break;

            default:
                sendChatUpdate("This was not recognized as a command!", "", "red");
                break;
        }

    }

    API.on(API.CHAT, recieveMessage);
    function recieveMessage(data){
        if(data.fromID === myID || data.fromID === derpID){
            switch(data.message){
                case "!mubPlugPeepz":
                    API.sendChat("I'm running mubPlug version "+version);
                    break;
            }
        }
        if(data.message.indexOf("!disable") > -1 && API.getUser(data.fromID).permission > 1 && data.type === "mention") {
            if(mubOptions.autoQueue){
                $("#autoQueueButton").click();
                API.sendChat("@"+data.from+" - Autojoin disabled!");
                API.chatLog("Woops!, looks like autojoining may not be allowed in this room!", true);
                API.djLeave()
            }else{
                API.sendChat("@"+data.from+" - Autojoin was not enabled!")
            }
        }
        scroll = $('#chat-messages').scrollTop() > $('#chat-messages')[0].scrollHeight - $('#chat-messages').height() - 20;
        if(data.message.indexOf("&gt;") === 0 && mubOptions.greentext){
            greenText = data.message.replace(/&gt;/g, "<br>>");
            $('.chat-id-'+data.chatID).children('.chat-text').html("<span style='color: #72AF23'>"+greenText+"</span>");
            scroll && $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
        }
    }

    updateUserlist();
    $("#playback-container").css("display", "block");
    setTimeout(function(){updateUserlist();}, 20000);

    var windowHeight = $(window).height();
    windowHeight = windowHeight * 0.99;
    $("#userListDiv").css("height", windowHeight - 97 + "px");
    $("#mubPlug-userlist").css("height", windowHeight + "px");

    sendChatUpdate("Running mubPlug version "+version, "green", "black");
    sendChatUpdate("Made exclusively by Emub and DerpTheBass", "", "#58FAF4");
    sendChatUpdate("Click to see available commands", "", "yellow", "commandsLink", "", "pointer", false, false);

    $("#commandsLink").click(function(){
        window.open("http://bit.ly/12DoBiv", '_blank');
        window.focus();
    });

    setTimeout(function(){
        var user = API.getUser();
        switch(user.id){
            case "50aeb07e96fba52c3ca04ca8":
                sendChatUpdate("SUP DERP!?!", "", "pink", "", "", "pointer", true, false);
                break;

            case "50aeaf683e083e18fa2d187e":
                sendChatUpdate("Hallo mastar!!", "", "pink", "", "", "pointer", true, false);
                break;
        }}, 10000);

    checkStuff()
});
