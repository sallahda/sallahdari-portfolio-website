(function() {
  emailjs.init({
    publicKey: "9zup4SY1N6gwRIKbq",
  });
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_2xdwmgz', 'template_a4xbn6g', this)
      .then(function() {
          alert('Message sent!');
      }, function(error) {
          alert('Failed to send the message, error: ' + JSON.stringify(error));
      });
});
