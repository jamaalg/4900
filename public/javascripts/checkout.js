// Key for Stripe
Stripe.setPublishableKey('pk_test_PvMIl9Oy3Q1PHNDrrHeUEmuP');

var $form = $('#checkout-form');
$form.submit(function(event){
    $('#charge-error').addClass('hidden');
  $form.find('button').prop('disabled',true);
  // Takes payment information
  Stripe.card.createToken({
    number: $('#cardNumber').val(),
    cvc: $('#cardCvc').val(),
    exp_month:$('#cardMonth').val() ,
    exp_year: $('#cardYear').val(),
    name: $('#cardName').val()
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status,response){
  if (response.error) {
     // Show the errors on the form
     $('#charge-error').text(response.error.message);
     $('#charge-error').removeClass('hidden');
     $form.find('button').prop('disabled', false); // Re-enable submission
   } else {
     // Get the token ID:
     var token = response.id;
     // Insert the token into the form so it gets submitted to the server:
     $form.append($('<input type="hidden" name="stripeToken" />').val(token));
     // Submit the form:
     $form.get(0).submit();
   }
}
