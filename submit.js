var contactForm = document.querySelector('form'),
    inputName = document.querySelector('[name="name "]'),
    inputEmail = contactForm.querySelector('[name="_replyto "]'),
    inputPhone = contactForm.querySelector('[name="phone "]'),
    textAreaMessage = contactForm.querySelector('[name="message "]'),
    sendButton = contactForm.querySelector('button');

sendButton.addEventListener('click', function(event) {
    event.preventDefault();

    sendButton.innerHTML = 'sending..';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '//formspree.io/hallo@praxkit.ch', true);
    xhr.setRequestHeader("Accept ", "application/json ")
    xhr.setRequestHeader("Content-Type ", "application/x-www-form-urlencoded ")

    xhr.send(
        "email=" + inputEmail.value +
        " &message=" + textAreaMessage.value);

    xhr.onloadend = function(res) {
        if (res.target.status === 200) {
            sendButton.innerHTML = 'Message sent!';
        } else {
            sendButton.innerHTML = 'Error!';
        }
    }
});