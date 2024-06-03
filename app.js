
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
        translateText();
    }
    $(".nav-item").click(function () {
        $(".nav-item .nav-link").removeClass("active");
        $($(this).find(".nav-link")).addClass("active");
        $(".target").hide();
        $("." + $($(this).find(".nav-link")).attr("target")).show();
        localStorage.setItem("tlbb-tools-nav", $($(this).find(".nav-link")).attr("target"));
    });

    $("#dichFile").on("click", function () {
        $('.loading').show();
        var fileInput = document.getElementById('inputFile');
        var file = fileInput.files[0];
        if (file) {
            var fileSize = file.size;
            var maxSizeInBytes = 350 * 1024;
            if (fileSize > maxSizeInBytes) {
                $('.loading').hide();
                alert('Kích thước của tệp lớn hơn 350KB.');
            } else {
                var formData = new FormData();
                formData.append('file', file);
                formData.append('comment', $("#translateComment").prop("checked"));
                formData.append('inputCharset', $("#inputEncode").val());
                formData.append('outputCharset', $("#outputEncode").val());
                invokeReCaptcha((token) => {
                    $.ajax({
                        url: "https://taigamekp.com/tlbb-api/translate/file",
                        type: "post",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-Recaptcha-Token', token);
                        },
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            var selectedOption = $('#outputEncode option:selected');
                            var encodeValue = selectedOption.attr('encode');
                            var uint8Array = new TextEncoder(encodeValue).encode(response);
                            var blob = new Blob([uint8Array], { type: 'text/plain; charset=' + encodeValue });
                            var blobURL = URL.createObjectURL(blob);
                            var a = document.createElement('a');
                            a.href = blobURL;
                            a.download = file.name;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(blobURL);
                            $('.loading').hide();
                        },
                        error: function (xhr, status, error) {
                            alert("Có lỗi xảy ra!");
                            $('.loading').hide();
                        }
                    });
                });
            }
        } else {
            $('.loading').hide();
            alert('Vui lòng chọn file trước khi tiếp tục.');
        }
    });
});

function translateText() {
    if ($("#dichTextOutput").val().trim() == '') {
        return;
    }
    $('.loading').show();
    invokeReCaptcha((token) => {
        $.ajax({
            url: "https://taigamekp.com/tlbb-api/translate/text?text=" + $("#dichTextInput").val() + "&vietphrase=" + $("#vietphrase").prop("checked") + "&viscii=" + $("#viscii").prop("checked"),
            type: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-Recaptcha-Token', token);
            },
            success: function (result) {
                $("#dichTextOutput").val(result);
                $('.loading').hide();
            }
        });
    });
}

function invokeReCaptcha(ajaxFunction) {
    grecaptcha.ready(function () {
        grecaptcha.execute('6Lc-T-spAAAAADPtkIrHjVyGOIA0HdqAp-HEJL7m', { action: 'submit' }).then(function (token) {
            ajaxFunction(token)
        });
    });
}