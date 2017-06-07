$(document).ready(function() {

    //Newsletter deaktiviert temporär
    /*
    $('#nl-form').submit(function() {

        var buttonCopy = $('#nl-form button').html(),
            errorMessage = $('#nl-form button').data('error-message'),
            sendingMessage = $('#nl-form button').data('sending-message'),
            okMessage = $('#nl-form button').data('ok-message'),
            hasError = false;

        $('#nl-form .error-message').remove();

        $('.nl-requiredField').each(function() {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parent().append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parent().append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#nl-form button').html('<i class="fa fa-times"></i>' + errorMessage);
            setTimeout(function() {
                $('#nl-form button').html(buttonCopy);
            }, 2000);
        } else {
            $('#nl-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);

            var formInput = $(this).serialize();

            $.post($(this).attr('action'), formInput, function(data) {

                console.log(data);

                $('#nl-form button').html('<i class="fa fa-check"></i>' + okMessage);

                $('#nl-form')[0].reset();

                setTimeout(function() {
                    $('#nl-form button').html(buttonCopy);
                }, 2000);

            }, "json");
        }

        return false;
    });

    */






    // Contact
    $('#contact-form').submit(function() {

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form .error-message').remove();

        $('.contact-requiredField').each(function() {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).parent().append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).parent().append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form button').html('<i class="fa fa-times"></i>' + errorMessage);
            setTimeout(function() {
                $('#contact-form button').html(buttonCopy);
            }, 2000);
        } else {
            $('#contact-form button').html('<i class="fa fa-spinner fa-spin"></i>' + sendingMessage);

            var formInput = $(this).serialize();

            $.post($(this).attr('action'), formInput, function(data) {

                console.log(data);

                $('#contact-form button').html('<i class="fa fa-check"></i>' + okMessage);

                $('#contact-form')[0].reset();

                setTimeout(function() {
                    $('#contact-form button').html(buttonCopy);
                }, 2000);

            }, "json");
        }

        return false;
    });
});