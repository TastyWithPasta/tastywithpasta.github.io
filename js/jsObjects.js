"use strict"; // Best practice

///// Properties can be added on the fly \\\\\

var cat = { name:"Avocato", color:"Black" };
cat.age = 30;
cat.speak = function() { display("'Gary, you damn idiot.'") };
display(cat.name);
display(cat.age)
cat.speak();
AddSeparator();


///// Using a constructor \\\\\

function Cat_1(name, color) {
    this.name = name;
    this.color = color;
    this.speak = function() { display("'Gary, what have you done...'"); };
}
var cat = new Cat_1("Avocato", "Black"); // New creates an empty object and sets the context (this) to the object, and calls the Cat function.
// var cat = Cat();  // Without the new keyword, cat remains in the context of window. This means the 'this' in the constructor will set values for the window, and cat will remain undefined.
display(cat);
AddSeparator();

///// Using Object.create \\\\\

var cat = Object.create(Object.prototype,
{
    name: {
        value: "Avocato",
        enumerable:true,
        writable:true,
        configurable:true
    },
    color: {
        value: "Black",
        enumerable:true,
        writable:true,
        configurable:true
    }
});
display(cat);
AddSeparator();


///// Using ECMAScript 6 Classes \\\\\

// This is more akin to statically-typed languages
class Cat_2 {
    constructor(name, color){
        this.name = name;
        this.color = color;
    }
    speak() {
        display("'Gary. Will. You. Shut. Up. FOR ONE DAMN SECOND!'");
    }
}
var cat = new Cat_2("Avocato", "Black");
display(cat);
AddSeparator();

///// Property Descriptors \\\\\
Object.defineProperty(cat, 'name', {writable:false});  // The name can't be changed. If I try, I get a TypeError.
Object.defineProperty(cat, 'name', {configurable:false});  // The attribute can't be deleted from the object. Its descriptors can't be edited. Configurable cannot be reset to true!
display(Object.getOwnPropertyDescriptor(cat, 'name'));
AddSeparator();

///// Looping through properties and Object Keys \\\\\
// Object.defineProperty(cat, 'name', enumerable:false} )  // The name won't be enumerated and serialized in JSON.
for(var propertyName in cat){
    display(propertyName + ": " + cat[propertyName]);
}
display(Object.keys(cat)); // The Object.keys method returns an array of a given object's own enumerable properties
AddSeparator();


///// Getters and Setters \\\\\
var cat = { 
    name: { first:"Fluffy", last: "Top" }, 
    color:"Black" 
};

Object.defineProperty(cat, 'fullName',
{
    get: function() {
        return this.name.first + ' ' + this.name.last;
    },
    set: function(value) {
        var nameParts = value.split(' ');
        this.name.first = nameParts[0];
        this.name.last = nameParts[1];
    }
});
cat.fullName = "Avocato Vetrexian";
display(cat.fullName);
