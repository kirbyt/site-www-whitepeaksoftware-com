$(document).ready(function(){

  // capture all enter and do nothing
  $('#email').keypress(function(e) {
    if(e.which == 13) {
      $('#email').trigger('focusout');
      return false;
    }
  });

  // capture clicks on validate and do nothing
  $("#formLead").click(function() {
    return false;
  });

  $('#email').mailgun_validator({
    api_key: 'pubkey-9bfb12cd8a0745f9ee4c4f6fe31bdad8', // replace this with your Mailgun public API key
    in_progress: validation_in_progress,
    success: validation_success,
    error: validation_error,
  });

  // while the lookup is performing
  function validation_in_progress() {
    $('#leadResponseSuccess').hide();
    $('#leadResponseError').hide();
    $('#leadBadEmailAddress').hide();
    $('#leadBadEmailAddress').html('<strong>Whoops!</strong> You entered an invalid email address.');
  }

  // if email successfull validated
  function validation_success(data) {
    if (data['is_valid']) {
      contactLead(data['address']);
    } else {
      $('#leadBadEmailAddress').show();
    }
  }

  // if email is invalid
  function validation_error(error_message) {
    $('#leadBadEmailAddress').html(error_message);
    $('#leadBadEmailAddress').show();
  }

  function contactLead(email) {
    var data = {
      email: email
    }

    $.post( "https://hooks.zapier.com/hooks/catch/1893688/tniwgt/", data, "json" )
      .done(function(responseData) {
        $('#leadResponseSuccess').show();
      })
      .fail(function() {
        $('#leadResponseError').show();
      })
  }
});
