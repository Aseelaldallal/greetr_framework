/*
Requirements:
1. When given a first name, last name, and optional language, it generates formal and informal greetings.
2. Support English and Spanish languages.
3. Reusable library/framework.
4. Easy to type 'GS()' structure.
5. Support JQuery.
*/



(function(global, $) {
    
    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };
    
    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    Greetr.prototype = {

        // returns full name
        fullName: function() {
            return this.firstName + ' ' + this.lastName; 
        },
        
        // Ensures that language is supported
        validate: function() {
           if(supportedLangs.indexOf(this.language) === -1) {
               throw "Invalid Language";
           }
        },
        
        // returns informal grteeting
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + "!";
        },
 
        // returns formal greeting
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName(); 
        },
        
        greet: function(formal) {
            var msg;
            
            //If undefined or null, it will be coerced to 'false'
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if(console) {
                console.log(msg);
            }
            
            //'this' refers to the calling object at execution time
            //makes method chainable
            return this;
        },
        
        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        
        setLang: function(lang) {
            this.language = lang;
            this.validate(); 
            return this;
        },
        
        // selector is a jQuery selector. If formal is true, sets selector to formal greeting. Otherwise informal greeting.
        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'jQuery not loaded';
            }
            if(!selector) {
                throw 'Missing jQuery selector';
            }
            var text = this.greeting();
            if(formal) {
                text = this.formalGreeting(); 
            }
            $(selector).text(text);
            return this; // chainable
        }
        
        
        
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling new
    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';       
        self.validate();    
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand G$
    global.Greetr = global.G$ = Greetr;
    
    
    
}(window, jQuery));