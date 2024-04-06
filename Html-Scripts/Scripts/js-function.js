//https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/#:~:text=arguments%20object%20inside%20the%20regular,args%20).
let userName = "Merrick";

//regular function includes Function declaration and Function Expression

// Function declaration
function showMessage(name = "Merrick") {
    console.log("Hello " + name);
    console.log("from " + userName); //函数可以访问外部变量，也可以修改它。
    userName = "Bob";
    console.log(this);
    return null;
}
//Function Expression
const showMessage2 = function (name = "Merrick") {
    console.log("Hello " + name);
    console.log("from " + userName); //函数可以访问外部变量，也可以修改它。
    console.log(this);
    return null;
};

showMessage("James");
showMessage2("James");

//arrow function
const showMessage3 = (name = "Merrick") => {
    console.log("Hello " + name);
    console.log("from " + userName); //函数可以访问外部变量，也可以修改它。
    console.log(this);
    return null;
};
showMessage3();
