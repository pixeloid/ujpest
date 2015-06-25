var SubscribeController = {
    init: function () {
        $('#email_subsrice_btn').click(function (e) {
            e.preventDefault();

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if($("#newsletter_email").val().length === 0 || !re.test($("#newsletter_email").val())) {
                $('#newsletter_email').css('border', '1px solid red');

                if ($("#newsletter_email").val().length === 0) {
                    $('#newsletter-error').html('Az e-mail cím mező kitöltése kötelező!');
                } else {
                    $('#newsletter-error').html('Érvénytelen e-mail cím formátum!');
                }
            /*} else if (!$('.checkbox-alias').hasClass('active') || !$('#newsletter-checkbox').is(':checked')) {
                $('#newsletter-error').hide();
                $('#newsletter_email').css('border', '0px');
                $('label.checkbox').css('color', '#f55');*/
            } else {
                $.post("/", {
                    Func: "NewsletterDefaultController.subscribe", 
                    email: $("#newsletter_email").val(),
                    name: $('#newsletter_name').val(),
                    address: $('#newsletter_address').val(),
                    birth_date: $('#newsletter_birth_date').val(),
                    phone: $('#newsletter_phone').val()
                }, function(response){
                    $('#newsletter-error').hide();

                    if(response.success) {
                        $('#email_subsrice_form').children().hide();
                        $('#email_subsrice_form').append('<section>Sikeresen feliratkozott a hírlevélre!</section>');
                    }
                },
                'json');  
            }    
        });
    }
};