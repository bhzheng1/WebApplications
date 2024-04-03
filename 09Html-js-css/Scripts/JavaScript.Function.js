//每个函数都有 "prototype" 属性，即使我们不设置它。

//函数声明的两种方式：
//函数声明(Function Declaration)是编程语言通用方式

{
    a = function (name) {};
    console.log(a.length); //函数的length为参数的个数

    let userName = "Merrick";

    function showMessage(name = "Merrick") {
        console.log("Hello " + name);
        console.log("from " + userName); //函数可以访问外部变量，也可以修改它。
        userName = "Bob";
        return null;
    }

    showMessage("James");
}

//函数表达式(Function Expression),匿名函数，lambda expression
{
    let sayHi = function () {
        //函数作为值赋给变量
        console.log("Hello World");
    };
    console.log(sayHi); //查看函数代码
    console.log(sayHi()); //调用函数

    //命名的函数表达式仍然是表达式
    let sayHello = function func(who) {
        //名字func为了便于函数内部使用
        if (who) {
            console.log(`Hello ${who}`);
        } else {
            func("Guest");
        }
    };
}

//函数声明 vs 函数表达式
// JavaScript 引擎中创建他们的时间点不一样。
//JavaScript 准备运行脚本或代码块时，无论函数声明在哪里，它首先在代码中查找函数声明并创建这些函数。
//而函数表达式在执行到达时才被创建出来，然后才可用
//当函数声明在一个代码块内时，它在该块内的任何地方都是可见的，但代码块外它是不可见的
{
    if (12 < 18) {
        welcome(); // \   (runs)
        function welcome() {
            //  \
            console.log("Hello!"); // |  函数声明可以在块内任意位置声明
        } //  /
        welcome(); // /   (runs)
    } else {
        function welcome() {
            //  for age = 16, this "welcome" is never created
            console.log("Greetings!");
        }
    }
    // 在花括号外，函数声明不可见，。
    welcome(); // Error: welcome is not defined

    //这行代码之前ask, yes和no是不可见的
    let ask = function (question, yes, no) {
        if (confirm(question)) {
            yes();
        } else {
            no();
        }
    };
    let yes = function () {
        console.log("You agree.");
    };
    let no = function () {
        console.log("You canceled the execution.");
    };

    ask("Do you agree?", yes, no);
}

//函数的任意个数参数
{
    //Rest参数
    {
        function showName(firstName, lastName, ...titles) {
            console.log(firstName + " " + lastName);
            for (let title of titles) {
                //遍历titles参数
                console.log(title);
            }
            for (let arg of arguments) {
                //遍历所有参数，arguments为内置属性
                console.log(arg);
            }
        }

        showName("Julius", "Caesar", "Consul", "Imperator");
    }

    //Spread 操作符（展开操作符)
    {
        let arr1 = [1, 3, 5, 6, 7];
        let arr2 = [2, 5, 8, 9];
        let merged = [...arr1, 0, ...arr2];
        console.log(Math.max(...arr1, ...arr2)); //Spread 操作符把数组转为参数列表

        let str = "Hello World!";
        console.log([...str]);
    }
}

//解构-智能函数参数
{
    let options = {
        title: "My menu",
        items: ["Item1", "Item2"],
    };

    function showMenu({
        title = "Untitled",
        width: w = 200,
        height = 100,
        items = [],
        items: [item1, item2],
    }) {
        console.log(`${title} ${w} ${height}`);
        console.log(items);
        console.log(`${item1},${item2}`);
    }

    showMenu(options);

    //为了使showMenu1()可以使用默认值，而不导致错误,给参数一个空值
    function showMenu1({ title = "Menu", width = 100, height = 200 } = {}) {
        console.log(`${title} ${width} ${height}`);
    }

    showMenu1();
}

//递归遍历
{
    let company = {
        sales: [
            { name: "John", salary: 1000 },
            { name: "Alice", salary: 600 },
        ],
        development: {
            sites: [
                { name: "Peter", salary: 2000 },
                { name: "Alex", salary: 1800 },
            ],
            internals: [{ name: "Jack", salary: 1300 }],
        },
    };

    function sumSalaries(department) {
        if (Array.isArray(department)) {
            return department.reduce((sum, current) => sum + current.salary, 0);
        } else {
            let sum = 0;
            for (let item of Object.values(department)) {
                sum += sumSalaries(item);
            }
            return sum;
        }
    }

    console.log(sumSalaries(company));
}

//词法环境:变量和函数都是只对内可见，对代码块外不可见的.
//函数不同于变量的地方在于，它们在代码执行之初已经被创建，但直到词法环境创建完成才被执行
{
    //嵌套函数
    {
        function makeCounter() {
            let count = 0;
            return function () {
                return count++;
            };
        }

        let counter = makeCounter();
        let counter1 = makeCounter();
        console.log(counter());
        console.log(counter());
        console.log(counter1());
    }

    //A closure is a inner function that remembers its outer variables and can access them.
    {
        let result = (function () {
            let privateFunction = function () {
                console.log("hello");
            };

            return {
                publicFunction: function () {
                    privateFunction();
                },
            };
        })();
    }

    //IIFE 立即调用函数表达式的四中写法
    {
        (function () {
            console.log("Brackets around the function.");
        })();

        (function () {
            console.log("Brackets around the whole thing.");
        })();

        !(function () {
            console.log("Bitwise NOT operator starts the expression.");
        })();

        +(function () {
            console.log("Unary plus starts the expression.");
        })();
    }
}

//函数的属性
{
    function sayHi(par1, par2) {
        console.log("Hi");
        sayHi.counter = 100; //函数的静态属性counter
        sayHi.counter++;
    }

    sayHi.hello = function () {
        //function的静态方法
        console.log("hello");
    };

    console.log(sayHi.name);
    console.log(sayHi.length); //参数个数

    sayHi.counter = 0;
    sayHi();
    sayHi();
    console.log(sayHi.counter);
}

//new Function使用字符串创建函数
{
    let sum = new Function("a", "b", "return a + b");
    let a = 2,
        b = 3;
    console.log(sum(a, b));

    function getFunc() {
        let value = 2121;

        //函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。
        let func = new Function("console.log(value)"); //func不能访问value
        return func;
    }

    getFunc()();
}

//setTimeout 和 setInterval
{
    function sayHi(phrase, who) {
        console.log(`${phrase}, ${who}`);
    }

    let timeOutId = setTimeout(sayHi, 1000, "Hello", "John"); //1000ms后执行sayHi
    clearTimeout(timeOutId);

    let timerId = setInterval(() => console.log("tick"), 1000); //每1000ms执行一次
    setTimeout(() => {
        clearTimeout(timerId);
        console.log("stop");
    }, 5000); //5000ms后停止执行

    //递归版的setTimeout
    //递归版 setTimeout 能保证每次执行间的延时都是准确的，setInterval 却不能够。
    let tickId = setTimeout(function tick() {
        console.log("tick");
        tickId = setTimeout(tick, 2000);
    }, 2000);

    //setTimeout(...,0)异步应用,可以提升程序性能
    setTimeout(() => {
        console.log("world");
    }, 0); //等待任务完成再被调用
    console.log("Hello"); //当前任务

    //setTimeout(...,0)递归分割 CPU 高占用的任务
    let i = 0;
    let startTime = Date.now();

    function count() {
        if (i < 1e9 - 1e6) {
            setTimeout(count, 0); //调度函数，放在这里提前准备下一次调用，提升整体运行效率
        }

        do {
            i++;
        } while (i % 1e6 !== 0);

        if (i === 1e9) {
            console.log(`Done in ${Date.now() - startTime} ms`);
        }
    }

    count();

    //setTimeout()分割任务，给浏览器渲染的机会
    //代码在Function.html中
}

//装饰器函数
{
    //利用缓存装饰器把函数包装一下再返回函数
    {
        function slow(x) {
            //重负载的CPU密集型工作
            console.log(`Called with ${x}`);
            return x;
        }

        function cachingDecorator(func) {
            //利用缓存装饰器把函数包装一下再返回函数
            let cache = new Map();
            return function (x) {
                if (cache.has(x)) {
                    return cache.get(x);
                }

                let result = func(x); //需要包装的函数slow(x)

                cache.set(x, result);
                return result;
            };
        }

        slow = cachingDecorator(slow); //装饰器是独立的，可以重用
    }
}

//偏函数
{
    function mul(a, b) {
        return a * b;
    }

    let triple = mul.bind(null, 3); //创造了一个新函数，同时将部分参数替换成特定值
    console.log(triple(4));

    //无上下文使用偏函数
    function partial(func, ...argsBound) {
        return function (...args) {
            return func.call(this, ...argsBound, ...args); //保留this
        };
    }

    let user = {
        firstName: "John",
        say(time, phrase) {
            console.log(`[${time}] ${this.firstName}: ${phrase}!`);
        },
    };
    //偏函数
    user.sayNow = partial(
        user.say,
        new Date().getHours() + ":" + new Date().getMinutes()
    );
    user.sayNow("hello");
}

//函数柯里化
{
    //Using lodash from Chrome's dev tools console
    let el = document.createElement("script");
    el.src =
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.js";
    document.getElementsByTagName("head")[0].appendChild(el);
    _.VERSION(); //verify the version

    function log(date, importance, message) {
        console.log(
            `[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`
        );
    }

    log = _.curry(log);
    log(new Date())("DEBUG", "some debug");
    let todayLog = log(new Date());
    todayLog("INFO", "message");
    let todayDebug = todayLog("DEBUG");
    todayDebug("message");

    //自定义curry函数
    function curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            }
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        };
    }

    function sum(a, b, c) {
        return a + b + c;
    }

    let curriedSum = curry(sum);
    console.log(curriedSum(1, 2, 3));
    console.log(curriedSum(1)(2, 3));
    console.log(curriedSum(1)(2)(3));
}

//箭头函数
{
    //箭头函数是function，但没有自己的this,它使用上一层的this
    let group = {
        title: "Our Group",
        students: ["John", "Pete", "Alice"],

        showList() {
            this.students.forEach((student) =>
                console.log(this.title + ": " + student)
            );
        },
    };

    group.showList();

    //箭头函数没有 “arguments”（参数）
}

//Generator function
{
    // 可以可做一个下蛋的机器，call一次下一个蛋
    // When generateSequence() is called, it does not execute the code.
    // Instead, it returns a special object, called “generator”.
    // run -> return => run -> return => run -> return => ......done
    function* generateSequence1() {
        yield 1;
        yield 2;
        return 3; //for..of 循环不会显示
    }

    function* generateSequence2() {
        yield 1;
        yield 2;
        yield 3; //for..of 循环会显示
    }

    let generator1 = generateSequence1();
    let generator2 = generateSequence1();

    let one = generator1.next(); //one always a object {"value":1,"done":false }
    console.log(JSON.stringify(one));

    for (let value of generator1) {
        console.log(value); //1,2, no 3
    }
    console.log([0, ...generator2]);

    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    let sequence = [...generateSequence(1, 5)];
    console.log(sequence);

    //Generator composition
    function* generatePasswordCodes() {
        yield* generateSequence(48, 57);
        yield* generateSequence(65, 90);
        yield* generateSequence(97, 122);
    }

    let str = "";
    for (let code of generatePasswordCodes()) {
        str += String.fromCharCode(code);
    }
    console.log(str);

    //"yield" is a two-way road
    //yield 发出一个结果，然后从下一个next中接收一个参数作为它的返回值
    function* gen() {
        let ask1 = yield "2 + 2?";
        console.log(ask1);
        let ask2 = yield "3 * 3?";
        console.log(ask2);
    }

    let generator = gen();

    //The first .next() starts the execution… It reaches the first yield.
    //The result is returned to the outer code.
    let question1 = generator.next().value;

    //The second .next(4) passes 4 back to the generator as the result of the first yield, and resumes the execution.
    //It reaches the second yield, that becomes the result of the generator call.
    let question2 = generator.next(4).value; //

    //The third next(9) passes 9 into the generator as the result of the second yield and resumes the execution that reaches the end of the function, so done: true.
    generator.next(9).done; //It’s like a “ping-pong” game.

    //generator.throw
    //把一个exception作为结果扔回给yield
    {
        function* gen() {
            try {
                let result = yield "2+2?";
                console.log(
                    "the execution does not reach here, because the exception is thrown above."
                );
            } catch (e) {
                console.log(e);
            }
        }

        let generator = gen();
        let question = generator.next().value;
        generator.throw(new Error("the answer is not found in my database!"));
    }

    //catch the exception
    {
        function* generate() {
            let result = yield "2 + 2?"; // Error in this line
        }

        let generator = generate();

        let question = generator.next().value;

        try {
            generator.throw(
                new Error("The answer is not found in my database")
            );
        } catch (e) {
            console.log(e); // shows the error
        }
    }

    //async generator
    {
        async function* generateSequence(start, end) {
            for (let i = start; i <= end; i++) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                yield i;
            }
        }

        (async () => {
            let generator = generateSequence(1, 5);

            for await (let value of generator) {
                console.log(value);
            }

            let result = await generator.next();
        })();
    }

    //Real-life example
    {
        async function* fetchCommits(repo) {
            let url = `https://api.github.com/repos/${repo}/commits`;

            while (url) {
                const response = await fetch(url, {
                    headers: { "User-Agent": "Our script" }, // github requires user-agent header
                });

                const body = await response.json();

                let nextPage = response.headers
                    .get("Link")
                    .match(/<(.*?)>; rel="next"/);
                nextPage = nextPage && nextPage[1];

                url = nextPage;
                for (let commit of body) {
                    yield commit;
                }
            }
        }

        (async () => {
            let count = 0;
            for await (const commit of fetchCommits(
                "iliakan/javascript-tutorial-en"
            )) {
                console.log(commit.author.login);
                if (++count == 100) {
                    break;
                }
            }
        })();
    }
}

//函数overloading
{
    //建立function链
    function addMethod(object, name, fn) {
        var old = object[name]; //把前一次添加的方法存在一个临时变量old里面
        object[name] = function () {
            // 重写了object[name]的方法
            // 如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
            if (fn.length === arguments.length) {
                return fn.apply(this, arguments);
                // 否则，判断old是否是函数，如果是，就调用old
            } else if (typeof old === "function") {
                return old.apply(this, arguments); //old方法会被新的方法引用，从而形成function链
            }
        };
    }

    var people = {
        values: ["Dean Edwards", "Alex Russell", "Dean Tom"],
    };

    /* 下面开始通过addMethod来实现对people.find方法的重载 */

    // 不传参数时，返回peopld.values里面的所有元素
    addMethod(people, "find", function () {
        return this.values;
    });

    // 传一个参数时，按first-name的匹配进行返回
    addMethod(people, "find", function (firstName) {
        var ret = [];
        for (var i = 0; i < this.values.length; i++) {
            if (this.values[i].indexOf(firstName) === 0) {
                ret.push(this.values[i]);
            }
        }
        return ret;
    });

    // 传两个参数时，返回first-name和last-name都匹配的元素
    addMethod(people, "find", function (firstName, lastName) {
        var ret = [];
        for (var i = 0; i < this.values.length; i++) {
            if (this.values[i] === firstName + " " + lastName) {
                ret.push(this.values[i]);
            }
        }
        return ret;
    });

    // 测试：
    console.log(people.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
    console.log(people.find("Dean")); //["Dean Edwards", "Dean Tom"]
    console.log(people.find("Dean Edwards")); //["Dean Edwards"]

    //另一个更普适的方法：给Object绑定如下方法
    /**
     * add/reload function for instance
     * @param name target  function name
     * @param fn function
     * @description inspired by https://www.cnblogs.com/yugege/p/5539020.html
     */
    Object.prototype.addMethod = function (name, fn) {
        var old = this[name];
        this[name] = function () {
            var fncLen = fn.length,
                argLen = arguments.length;
            if (fncLen === argLen) {
                return fn.apply(this, arguments);
            } else if (typeof old === "function") {
                return old.apply(this, arguments);
            } else {
                throw new Error(
                    "no method with " + argLen + " param(s) defined!"
                );
            }
        };
    };
}

//Object的toString方法
{
    let objectToString = Object.prototype.toString;
    let arr = [];
    console.log(objectToString.call(arr));
}

//JSON
{
    //JSON.stringify
    let student = {
        name: "John",
        age: 30,
        isAdmin: true,
        courses: ["html", "css", "js"],

        sayHi() {
            // ignored
            console.log("Hello");
        },
        [Symbol("id")]: 123, // ignored
        something: undefined, // ignored
    };

    let json = JSON.stringify(student);

    console.log(json);

    //toJSON方法会被stringify调用
    let level = {
        number: 10,
        toJSON() {
            return this.number;
        },
    };

    let location = {
        title: "Company",
        level: level,
    };
    console.log(JSON.stringify(level));
    console.log(JSON.stringify(location));

    //replacer
    let room = {
        number: 23,
    };

    let meetup = {
        title: "Conference",
        participants: [{ name: "John" }, { name: "Alice" }],
        place: room, // meetup references room
    };

    room.occupiedBy = meetup; // room references meetup

    console.log(
        JSON.stringify(meetup, function replacer(key, value) {
            console.log(`${key}: ${value}`); // to see what replacer gets
            return key == "occupiedBy" ? undefined : value;
        })
    );

    //spacer
    let user = {
        name: "John",
        age: 25,
        roles: {
            isAdmin: false,
            isEditor: true,
        },
    };

    console.log(JSON.stringify(user, null, 2));

    //JSON.parse
    let str = `{
      "name": "John",
      "isAdmin": false,
      "birthday": "2017-11-30T12:00:00.000Z",
      "friends": [0,1,2,3]
     }`;

    console.log(JSON.parse(str));
}

{
    // 高级函数：函数为参数或函数为返回值或两者皆有
    function greet(fn) {
        console.log(fn());
    }

    function sayHello() {
        return function () {
            return "Hello World!";
        };
    }

    // function composition
    wrap = (type) => (str) => `<${type}>${str}</${type}>`;

    // pure funciton: always produce same result with same parameters

    // immutability: Predictability, Faster Change Detection, concurrency
    const person = {
        name: "John",
        address: { country: "USA", city: "San Francisco" },
    };
    const updated = Object.assign({}, person, { name: "Bob", age: 30 });
    // shallow copy
    const secUpdated = { ...person, name: "Bob", age: 32 };
    secUpdated.address.city = "Boston";

    // deep copy
    secUpdated = {
        ...person,
        address: { ...person.address, city: "Boston" },
        name: "Bob",
        age: 22,
    };

    // array
    const numbers = [1, 2, 3];
    const index = numbers.indexOf(2);
    //add
    const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)];
}
