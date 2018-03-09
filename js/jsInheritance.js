"use strict"; // Best practice
AddSeparator();

///// Prototype Basics \\\\\
var myFunction = function() {};
display(myFunction.prototype); // Every function has a prototype.
var myObject = { name: "MyObject"};
display(myObject.prototype); // myObject.prototype is undefined. Objects do not have prototypes. They do have the __proto__ property though.
display(myObject.__proto__); // It's used differently than .prototype
AddSeparator();


///// Function VS Object Prototypes \\\\\
function Cat_3(name, color) {
    this.name = name;
    this.color = color;
}
var cat = new Cat_3("Avocato", "Black");
display(Cat_3.prototype);
display(cat.__proto__); // This actually points to Cat_3's prototype
display(cat.__proto__ === Cat_3.prototype); // True
AddSeparator();

///// Instance VS Prototype properties \\\\\
Cat_3.prototype.age = 30; // Adds the age property to Cat_3's prototype.
var cat_1 = new Cat_3("Avocato", "Black");
var cat_2 = new Cat_3("TinyCato", "Orange");

cat_2.age = 16; // This actually ADDS the age property TO cat_2! It does not change the value in the prototype!

display("cat_1 doesn't have its own age property. cat_1.hasOwnProperty=" + cat_1.hasOwnProperty("age"));
display("cat_2's age property = " + cat_2.age +".");
display("cat_2's __proto__ age property = " + cat_2.__proto__.age + ".");
AddSeparator();

///// Multiple Inheritance \\\\\
var cat = new Cat_3("Avocato", "Black");
display("Cat object, going back 2 levels of inheritance:")
display(cat.__proto__);
display(cat.__proto__.__proto__);
//display(cat.__proto__.__proto__.__proto__);
AddSeparator();

///// Inheritance Chains \\\\\
function Animal(voice) {
    this.voice = voice || "Grunt";
}
Animal.prototype.speak = function() {
    display(this.voice);
};
function Cat_4(name, color) {
    Animal.call(this, "Hi, my name is Avocato");
    this.name = name;
    this.color = color;
}
// To inherit, we create a new prototype from Animal.
Cat_4.prototype = Object.create(Animal.prototype); // Object.create will note call the Animal() function
Cat_4.prototype.constructor = Cat_4;

var cat = new Cat_4("Avocato", "Black");
cat.speak();
display(cat);
display(cat instanceof Animal);
AddSeparator();

///// Doing it with classes \\\\\
class Animal_2 {
    constructor(voice) { // In this case, the constructor is a class!
        this.voice = voice || "Grunt";
    }

    speak() {
        display(this.voice);
    }
}
class Cat_5 extends Animal_2 {
    constructor(name, color) {
        super("Meow");
        this.name = name;
        this.color = color;
    }
}
var cat = new Cat_5("Avocato", "Black");
cat.speak();