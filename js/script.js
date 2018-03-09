"use strict"; // Best practice

function AddSeparator() {
    var separator = document.createElement("div");
    separator.classList.add("separator");
    document.body.appendChild(separator);
};

///// Properties can be added on the fly \\\\\
var cat = { name:"Avocato", color:"Black" };
cat.age = 30;
display(cat.name);
display(cat.age)

AddSeparator();

display(cat.name);
display(cat.age)

