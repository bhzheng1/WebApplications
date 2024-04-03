//Modules are expected to export what they want to be accessible from outside and import what they need.

"use static";

//export a function
export function sayHi(user) {
    return `Hello, ${user}!`;
}

//export an array
export let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

//export a class
export class User {
    constructor(name) {
        this.name = name;
    }
}

//先声明，后export
function sayBye(user) {
    alert(`Bye, ${user}!`);
}
export {sayBye};

//set default export, one file can only have one default export
export default class LoginForm {
    constructor() {
        this.user = "principle";
    }
}

import * as say from './say.js';
import {sayHi as hi, sayBye as bye} from "./say.js";

say.sayHi("John");
say.sayBye("John");
hi("John");
bye("John");

export {sayHi} from './say.js'

//import()function returns a promise
let modulePath = prompt("Module path?");
import(modulePath)
    .then(obj=>hi("John"))
    .catch(err=>console.log(`${err}`))

async function load() {
    let say = await import('./say.js');
    say.hi(); // Hello!
    say.bye(); // Bye!
    say.default(); // Module loaded (export default)!
}
