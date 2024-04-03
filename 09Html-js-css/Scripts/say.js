function sayHi(user) {
    console.log(`Hi`, ${user});
}

function sayBye(user) {
    console.log(`Bye, ${user}!`);
}

export default function sayHello(user){
    console.log(`Hello ${user}`);
}

export {sayHi,sayBye};
