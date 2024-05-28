
$(document).ready(function () {
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("equip") > -1) {
        $("#equipnav").click();
    }

    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("segval") > -1) {
        $("#segvalnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("cpeq") > -1) {
        $("#cpequipnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("xmldrag") > -1) {
        $("#xmldragnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("about") > -1) {
        $("#aboutnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("cnextract") > -1) {
        $("#cnextractnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("mapextract") > -1) {
        $("#mapextractnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("itemextract") > -1) {
        $("#itemextractnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("mergeall") > -1) {
        $("#mergeallnav").click();
    }
    if (localStorage.getItem("tlbb-tools-nav") && localStorage.getItem("tlbb-tools-nav").indexOf("deldup") > -1) {
        $("#deldupnav").click();
    }


    //setup before functions
    var typingTimer; //timer identifier
    var doneTypingInterval = 700; //time in ms, 5 seconds for example
    var $input = $('#dichTextInput');

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    function doneTyping() {

    }
    $(".nav-item").click(function () {
        $(".nav-item .nav-link").removeClass("active");
        $($(this).find(".nav-link")).addClass("active");
        $(".target").hide();
        $("." + $($(this).find(".nav-link")).attr("target")).show();
        localStorage.setItem("tlbb-tools-nav", $($(this).find(".nav-link")).attr("target"));
    });
});