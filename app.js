var myGreeting = G$('John', 'Doe', 'en');


$('#login').on('click', function() {
    $('#logindiv').hide();
    var lang = $('#lang').val();
    myGreeting.setLang(lang).HTMLGreeting('#greeting', true).log();
})