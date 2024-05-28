
$(document).ready(function () {
   
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