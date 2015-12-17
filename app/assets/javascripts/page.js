
$(function(){

  $("#reg_form" ).submit(function(){
    return validate_form($(this))
  });

  $('#reg_form input').on('blur', function() {
    validate_input($(this));
  });

});

function add_error_class($input) {
  $input.parents('.form-group').addClass('has-error')
}

function remove_error_class($input) {
  $input.parents('.form-group').removeClass('has-error')
}

function add_error_message($input,  message) {
  $input.parent().append('<span class="help-block">'+message+'</span>')
}

function remove_error_message($input,  message) {
  $input.siblings('.help-block').remove()
}

function validate_email(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function on_input_error($input, message) {
  add_error_class($input);
  add_error_message($input, message);
}

function validate_input($input){

  var type = $input.attr('type');
  var value = $input.val();

  remove_error_class($input);
  remove_error_message($input)

  if (type == 'text') {

    if (value == null || value == "") {
      on_input_error($input, "This field is required");
      return false;
    } else {
      return true;
    }

  } else if (type == 'email') {

    if (!(validate_email(value))) {
      on_input_error($input, "Incorrect email");
      return false;
    } else {
      return true;
    }

  } else if (type == 'password') {

    var minlength = $input.attr("minlength");

    if (value == null || value == "") {
      on_input_error($input, "This field is required");
      return false;
    };
    if (minlength && value.length < minlength ) {
      on_input_error($input, 'Password must be over ' + minlength + ' characters');
      return false;
    };
    console.log($input.attr('name'))
    if ($input.attr('name') == 'confirm_password'){
      password = $input.parents("form").find('input[name="password"]').val();
      if (value != password) {
        on_input_error($input, 'Confirm password does not match');
        return false;
      }
    }
    return true;

  } else {
    return true;
  }
}

function validate_form($form) {
  var result = true;
  $form.find('input').each(function(){
    if (validate_input($(this)) == false) {
      result = false;
    }
  });
  return result
}
