$(document).ready(function(){

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("ncC6YvL0WS3CJ9EenzOvNAz8dzYEuipej35FIGrW", "cX8VkmZu0UN7T1ZRVJKb5z03d5WXcEwmQ4KbLklE");

  // Setup the form to watch for the submit event
  $('#formLicenseLookup').submit(function(e){
    e.preventDefault();

    $('#licenseResponseSuccess').hide();
    $('#licenseResponseError').hide();

    var email = document.getElementById('email').value
    if (!email || email.length === 0) {
      return;
    }

    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = {
      email: email
    }

    // Run our Parse Cloud Code and
    // pass our 'data' object to it
    Parse.Cloud.run("lookupLicense", data, {
      success: function(object) {
        $('#licenseResponseSuccess').show();
      },

      error: function(object, error) {
        console.log(error);
        $('#licenseResponseError').show();
      }
    });
  });
});