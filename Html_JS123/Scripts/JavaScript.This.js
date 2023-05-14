//无论调用的方法来自对象还是原型中。方法调用时，this所指的始终是点之前的对象。

// func中this丢失的解决方法
// func.call()和func.apply()函数非常有用，因为他们的第一个参数是func的this
// 函数对象提供了一个内建方法 func.bind(),它可以固定住 this。

// let args = [1, 2, 3];
// func.call(context, ...args); // 使用 ... (spread 运算符)将数组作为参数列表传递
// func.apply(context, args);   // 与使用 apply 相同

// Understanding JavaScript Function Invocation and "this"
// https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/
{
    //The Core Primitive
    //1. Make an argument list (argList) out of parameters 1 through the end
    //2. The first parameter is thisValue
    //3. Invoke the function with this set to thisValue and the argList as its argument list

    function hello(thing) {
        console.log(this + " says hello " + thing);
    }

    hello.call("Yehuda", "world"); //=> Yehuda says hello world

    // Simple Function Invocation
    function hello(thing) {
        console.log("Hello " + thing);
    }

    // this:
    hello("world");

    // desugars to:
    hello.call(window, "world");

    // when using strict mode desugars to:
    hello.call(undefined, "world");

    // pass this when simple function invocation
    function hellothis(obj, thing) {
        console.log(obj + " Hello " + thing);
    }

    hellothis(this, "world");

    // Member Functions
    var person = {
        name: "Brendan Eich",
        hello: function (thing) {
            console.log(this + " says hello " + thing);
        },
    };

    // this:
    person.hello("world");

    // desugars to this:
    person.hello.call(person, "world");
}

//this不受限制，增加代码重用，但也增加风险
{
    let admin = { name: "admin" };
    let guest = { name: "guest" };

    function sayHi() {
        alert(this.name);
    }

    function say(time, phrase) {
        alert(`[${time}] ${this.name}: ${phrase}`);
    }

    sayHi.call(admin);
    say.call(guest, "10:00", "Hello");

    sayHi.apply(guest);
    say.apply(admin, ["10:00", "Hello"]);

    admin.sayHi = sayHi;
    guest.sayHi = sayHi;

    admin.sayHi();
    guest["sayHi"]();
}

//对象方法中this的丢失问题
{
    //obj.method()调用的原理: 点 '.' 取得这个 obj.method 属性;其后的括号 () 调用它。
    //为了使obj.method()有效，obj.method访问的不是函数而是引用类型值(base,name,strict)
    let user = {
        //this0
        name: "John",
        hi() {
            alert(this.name);
        },
        getName: function () {
            //this1
            return function () {
                return alert(this.name); //this is the this1，因为上一层方法中没有name
            };
        },

        getNameThat: function () {
            let that = this; //closure， this0 passed down
            return function () {
                return alert(that.name);
            };
        },
    };
    user.hi(); //当在user.hi上用()调用时，它们接收到这个对象和它方法的所有信息，正确设定了this值。
    user.getName()();
    user.getNameThat()();

    let hi = user.hi; // 将赋值与方法调用拆分为两行，只获取了函数而不是引用类型值
    hi(); // 错误，因为 this 未定义

    //箭头函数没有自己的 “this”??
    let userA = {
        firstName: "Ilya",
        sayHi: function () {
            let arrow = () => alert(this.firstName); //this取得的是sayHi的this值
            arrow();
        },
    };

    user.sayHi(); // Ilya

    let obj = {
        name: "1",
        f: function () {
            setTimeout(function () {
                console.log(this.name); //this is undefined
            }, 100);
        },
    };

    let obj1 = {
        name: "1",
        f: function () {
            let me = this;
            setTimeout(function () {
                console.log(me.name); //name was passed from upper level
            }, 100);
        },
    };

    let obj2 = {
        name: "1",
        f: function () {
            setTimeout(() => {
                console.log(this.name); //arrow function 自动取的上一层的this
            }, 100);
        },
    };
}

//函数对象提供了一个内建方法 func.bind(),它可以固定住 this。
{
    let user = {
        firstName: "John",
        sayHi() {
            alert(`Hello, ${this.firstName}!`);
        },
    };

    function func(phrase) {
        alert(phrase + ", " + this.firstName);
    }

    let funcUser = func.bind(user);
    funcUser("Hello");

    let sayHi = user.sayHi.bind(user);
    sayHi();

    //bind对象的所有方法
    for (let key in user) {
        if (typeof user[key] === "function") {
            user[key] = user[key].bind(user);
        }
    }
}

//this在装饰器中
{
    {
        let worker = {
            name: "John",

            someMethod() {
                return 1;
            },
            slow(x) {
                alert("called with " + x);
                return x * this.someMethod();
            },
        };

        function cachingDecorator(func) {
            let cache = new Map();
            return function (x) {
                if (cache.has(x)) {
                    return cache.get(x);
                }

                let result = func.call(this, x); //需要包装的函数,传入func的上下文this

                cache.set(x, result);
                return result;
            };
        }

        worker.slow = cachingDecorator(worker.slow); // 现在装饰函数,必须使用object.method作为名字,因为需要明确对象(点之前部分)

        alert(worker.slow(2)); // 生效了
        alert(worker.slow(2)); // 生效了, 不会调用原始的函数了。被缓存起来了

        //含this的函数不受约束，是可以独立的
        function saySomething(greet) {
            alert("first run!");
            return `${greet} ${this.name}`;
        }

        worker.greet = cachingDecorator(saySomething);
        alert(worker.greet("Hello"));
        alert(worker.greet("Hello"));
    }

    {
        let worker = {
            slow(min, max) {
                alert(`Called with ${min}, ${max}`);
                return min + max;
            },
        };

        function hash() {
            return Array.prototype.join.call(arguments); //作为this的arguments借用了Array的方法
        }

        function cachingDecorator(func, hash) {
            let cache = new Map();
            return function () {
                let key = hash();
                if (cache.has(key)) {
                    return cache.get(key);
                }

                let result = func.apply(this, arguments);
                cache.set(key, result);
                return result;
            };
        }

        worker.slow = cachingDecorator(worker.slow, hash);
        alert(worker.slow(3, 5));
        alert(worker.slow(3, 5));
    }
}
