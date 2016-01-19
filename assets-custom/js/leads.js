$(document).ready(function(){

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("GTJigWze7dImWIm8OtrF56mMqedj988I0Aj5KGFk", "c8x5Oh9wDw9q9tvnnD7axIEsY0faovZI6H2lVQy3");

  // Setup the form to watch for the submit event
  $('#formLead').submit(function(e){
    e.preventDefault();

    $('#leadResponseSuccess').hide();
    $('#leadResponseError').hide();

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
    Parse.Cloud.run("contactLead", data, {
      success: function(object) {
        $('#leadResponseSuccess').show();
      },

      error: function(object, error) {
        console.log(error);
        $('#leadResponseError').show();
      }
    });
  });
});
