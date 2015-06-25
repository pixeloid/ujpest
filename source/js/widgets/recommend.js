var RecommendController = {
    init: function () {
        $('#recommend_question_btn').click(function (e) {
            e.preventDefault();

            $.post("/", {
                Func: "RecommendDefaultController.saveRecommend", 
                text: $("#recommend_text_").val(),
                video: $('#recommend_video').val(),
                security: $("#recommend_security").val(),
                type: $('#recommend_type').val()
            }, function(response){
                if(response.success) {
                    var src = $('#recommend_security_image').attr('src');
                    $('#recommend_security_image').attr('src', src.substring(0, src.indexOf("?")) + "?" + Math.random());

                    $('#recommend_security_image').css('visibility', 'hidden').nextUntil('.answers-count').css('visibility', 'hidden');
                    $('.submit-content button').css('visibility', 'hidden');
                    $('#success-sent').show();

                    $('.count-answers').html(parseInt($('.count-answers').html()) + 1);
                    $('#recommend_text_').val('');
                } else {
                    $('label[for="recommend_security"]').css('color', '#f00');
                }
            },
            'json');
        });
    }
};