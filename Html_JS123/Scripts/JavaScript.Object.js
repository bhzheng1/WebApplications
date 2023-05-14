//javascript是函数式语言，函数是基础，构造函数和new用于构建对象

//可以用下面两种语法的任一种来创建一个空的对象
{
    let objA = {}; // “字面量” 的语法
    let objB = new Object(); // “构造函数” 的语法
}

// “字面量” 的语法
{
    function saySomething() {
        alert("something!");
    }

    let userASamp = {
        name: "name", // 与 name:name 相同
        age: 30, //属性
        isAdmin: true,
        saySomething: saySomething, //函数

        sayHi: function () {
            //函数
            alert("Hi World!");
        },

        sayHello() {
            //函数
            alert("Hello world");
        },
    };
}

//构造函数有两个约定：他们首先用大写字母命名；它们只能用 "new" 操作符来执行。
{
    //构造函数模式
    //函数的对象构造器中会有方法
    {
        function User(name, birthday) {
            let Greeting = "Hello"; //内部变量，不会被传递到实例中
            function calcAge() {
                //内部函数，不会传递到实例中
                return new Date().getFullYear() - birthday.getFullYear();
            }

            this.name = name; //外部变量
            this.isAdmin = false;
            this.sayHi = function () {
                //外部函数
                alert(`${name}, ange:${calcAge()}`);
            };
        }

        let user = new User("Jack", new Date(1981, 8, 10)); //new执行function，返回一个对象，没有new执行function，返回undefined
    }

    //工厂类模式
    {
        function User(name, birthday) {
            function calcAge() {
                return new Date().getFullYear() - birthday.getFullYear();
            }

            return {
                name: name,
                isAdmin: false,
                sayHi() {
                    alert(`${name}, ange:${calcAge()}`);
                },
            };
        }

        let user = User("Jack", new Date(1981, 8, 10));
    }

    //基于原型的类,声明规范，实践最常使用
    //众所周知的协定就是内部方法和属性的命名以下划线 "_" 开头
    {
        //构造器 User 只是初始化当前对象的状态，也就是定义了一个constructor函数
        function User(name, birthday) {
            this.name = name;
            this.isAdmin = false;
            this._birthday = birthday;
        }

        User.prototype._calcAge = function () {
            return new Date().getFullYear() - this._birthday.getFullYear();
        };
        User.prototype.sayHi = function () {
            alert(`${this.name}, ange:${this._calcAge()}`);
        };

        let user = new User("John", new Date(2000, 2, 1));
        console.log(user.name);
        user.sayHi();

        //原型类的继承
        function Animal(name) {
            this.name = name;
            this.live = true;
        }

        Animal.prototype.eat = function () {
            alert(`${this.name} eats.`);
        };

        function Rabbit(name) {
            this.name = name;
        }

        Rabbit.prototype.jump = function () {
            alert(`${this.name} jumps!`);
        };

        //设置继承，Animal.prototype里的函数被Rabbit继承，从而被rabbit继承
        //Rabbit.prototype里的已经有constructor
        //Rabbit.prototype.__proto__.constructor被改写为Animal
        Rabbit.prototype.__proto__ = Animal.prototype;

        let rabbit = new Rabbit("white Rabbit");
    }

    //基于class的语法
    {
        class User {
            constructor(name) {
                this.name = name;
            }

            static staticMethod() {
                console.log(this === User);
            }

            sayHi() {
                alert(this.name);
            }

            get name() {
                return this._name;
            }

            set name(value) {
                if (value < 4) {
                    alert("Name is too short.");
                    return;
                }
                this._name = value;
            }
        }

        console.log(User.prototype);
        User.staticMethod();

        class Animal {
            constructor(name) {
                this.speed = 0;
                this.name = name;
            }

            static sayHi() {
                //静态方法
                console.log("Hello World!");
            }

            run(speed) {
                this.speed += speed;
                alert(`${this.name} runs with speed ${this.speed}.`);
            }

            stop() {
                this.speed = 0;
                alert(`${this.name} stopped.`);
            }
        }

        class Rabbit extends Animal {
            constructor(name, earLength) {
                super(name); //必须调用父类的constructor
                this.speed = 10; //覆盖父类属性
                this.earLength = earLength;
            }

            hide() {
                alert(`${this.name} hides!`);
            }

            stop() {
                //覆盖父类方法
                super.stop();
                this.hide();
            }
        }

        Rabbit.sayHi(); //静态方法也被继承
        let rabbit = new Rabbit("White Rabbit");
        rabbit.run(5);
        rabbit.hide();
    }
}

//Object的属性操作
{
    let id = Symbol("Id");
    let user = {
        [id]: "001",
        name: "John",
        age: 30,

        sayHi: function () {
            //函数
            alert("Hi World!");
            this.said = true;
        },

        sayHello() {
            //函数
            alert("Hello world");
        },
    };

    alert(user.name); //使用属性
    alert(user["age"]); //使用属性
    alert(user.sayHi()); //使用属性
    alert(user["saySomething"]()); //使用属性

    user.address = "USA"; //添加属性
    user["likes birds"] = true; //添加属性

    delete user.address; //删除属性
    delete user["likes birds"]; //删除属性

    alert("name" in user); //检查属性是否存在

    for (let key in user) {
        //遍历属性,忽略 Symbol 类型
        alert(key);
        alert(user[key]);
    }

    Object.keys(user); //可枚举属性,会忽略Symbol类型的属性和方法
    Object.values(user);
    Object.entries(user);

    Object.getOwnPropertyNames(user)
        .sort()
        .forEach((value) => {
            console.log(value, "\n");
        }); //所有字符串属性和方法名的数组

    Object.getOwnPropertySymbols(user); // symbol 属性

    Reflect.ownKeys(user); //包含所有属性名称的数组。

    let animal = {
        eats: true,
    };

    let rabbit = {
        jumps: true,
        __proto__: animal,
    };

    // 这里只有自身的键
    alert(Object.keys(rabbit)); // jumps
    // 这里包含了继承得来的键
    for (let prop in rabbit) alert(prop); // jumps，然后 eats

    for (let prop in rabbit) {
        let isOwn = rabbit.hasOwnProperty(prop);
        alert(`${prop}: ${isOwn}`); // jumps:true, then eats:false
    }

    //属性的标志和描述符
    let descriptor = Object.getOwnPropertyDescriptor(user, "name");
    alert(JSON.stringify(descriptor, null, 2));

    let descriptors = Object.getOwnPropertyDescriptors(user);
    alert(JSON.stringify(descriptors));

    //添加属性和属性描述
    Object.defineProperty(user, "Job", {
        value: "IT",
        writable: false,
        enumerable: false,
        configurable: false,
    });
    Object.defineProperties(user, {
        surname: { value: "smith", writable: false },
        birthday: { value: "2010-08-01", writable: false },
    });
}

//访问器属性
// get() 和 set(value)是访问器描述符
{
    let user = {
        name: "John",
        surname: "smith",
        get fullName() {
            return `${this.name} ${this.surname}`;
        },
        set fullName(value) {
            //可以添加一些检查value条件
            [this.name, this.surname] = value.split(" ");
        },
    };

    //添加访问器属性
    Object.defineProperty(user, "age", {
        get() {
            return this.age;
        },
        set(value) {
            this.age = value;
        },
    });
}

//对象是引用类型，遵守引用类型规则：
//当对象被复制的时候 – 引用被复制了一份, 对象本身并没有被复制。
//同一个对象的不同引用是相等的，但内容一样的不同对象是不相等的
//只能在对象中使用string或symbol作为键，其它类型转换为string

//对象克隆
{
    let id = Symbol("Id");
    let user = {
        [id]: "001",
        name: "John",
        age: 30,

        sayHi: function () {
            //函数
            alert("Hi World!");
            this.said = true;
        },

        sayHello() {
            //函数
            alert("Hello world");
        },
    };

    let clone1 = Object.assign({}, user); //clone一个对象
    let clone2 = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(user)
    ); //克隆对象的“标志感知”方式
    let clone3 = Object.create(
        Object.getPrototypeOf(user),
        Object.getOwnPropertyDescriptors(user)
    );
}

//Object.assign 把一个对象的属性拷贝给另一个对象
{
    let user = { name: "user" };
    let permission1 = { canView: true };
    let permission2 = { canEdit: true };
    let superUser = Object.assign(user, permission1, permission2); //加入属性

    //Mixin模式,是一个通用的面向对象编程术语：一个包含其他类的方法的类。
    class User {
        constructor(name) {
            this.name = name;
        }
    }

    let sayMixin = {
        say(phrase) {
            alert(phrase);
        },
    };
    let sayHiMixin = {
        __proto__: sayMixin,
        sayHi() {
            super.say(`Hello ${this.name}`);
        },
        sayBye() {
            alert(`Bye ${this.name}`);
        },
    };

    Object.assign(User.prototype, sayHiMixin);

    let eventMixin = {
        /**
         * 订阅事件，用法
         * menu.on('select', function(item) { ... }
         * @param eventName
         * @param handler
         */
        on(eventName, handler) {
            if (!this._eventHandlers) this._eventHandlers = {};
            if (!this._eventHandlers[eventName]) {
                this._eventHandlers[eventName] = [];
            }
            this._eventHandlers[eventName].push(handler);
        },

        /**
         * 取消订阅
         * menu.off('select',handler)
         */
        off(eventName, handler) {
            let handlers =
                this._eventHandlers && this._eventHandlers[eventName];
            if (!handler) return;
            for (let i = 0; i < handler.length; i++) {
                if (handler[i] === handler) {
                    handler.splice(i--, 1);
                }
            }
        },

        /**
         * 触发事件并传递参数
         *  this.trigger('select', data1, data2);
         */
        trigger(eventName, ...args) {
            if (!this._eventHandlers || !this._eventHandlers[eventName]) {
                return; // 对应事件名没有事件处理函数。
            }

            // 调用事件处理函数
            this._eventHandlers[eventName].forEach((handler) =>
                handler.apply(this, args)
            );
        },
    };

    class Menu {
        choose(value) {
            this.trigger("select", value);
        }
    }

    //添加mixin
    Object.assign(Menu.prototype, eventMixin);

    let menu = new Menu();

    //被选中时调用事件处理函数
    menu.on("select", (value) => alert(`value selected: ${value}`));

    //触发事件
    menu.choose("123");
}

//深拷贝
//Object.assign只克隆对象里的所以属性，但属性如果是对象属性，则clone只是复制了该对象属性的地址，user和clone里的对象属性是同一个对象
//为了解决上面的的问题，我们在复制的时候应该检查 user[key] 的每一个值，如果是一个对象，我们再复制一遍这个对象，这叫做深拷贝
{
    //JSON.parse(JSON.stringify(obj))
    let copy = JSON.parse(JSON.stringify(user));

    //对对象/数组中的Function，正则表达式等特殊类型的拷贝
    function deepCopy(obj) {
        if (typeof obj !== "object") return obj;

        let newObj = obj.constructor === Array ? [] : {};
        for (let key of obj) {
            newObj[key] =
                typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
        }
        return newObj;
    }
}

//对象解构
{
    let options = {
        title: "Menu",
        width: 100,
        color: "red",
    };

    let { width: w, height = 200, title } = options;
    let { title1, ...rest } = options;
}

//对象，函数和继承。原型可以认为是父类
//无论在哪里找到方法：在对象或者原型中。调用方法时，this 始终是点之前的对象。
//在chrome开发者控制台使用console.dir(Array);可以显示继承关系
//__proto__是对象继承来的类，prototype是子对象要继承的类
//对象里只有__proto__,而函数里既有__proto__又有prototype
{
    //对象的"__proto__"可以继承原型对象,它不是属性，是通过get，set读取和设定
    let animal = {
        eats: true,
        walk() {
            alert("Animal walk");
        },
        sleep() {
            this.isSleeping = true; //使用方法添加属性,属性属于this对象
        },
    };

    console.log(animal.__proto__); //默认的__proto__是Object

    let rabbit = {
        jumps: true,
        __proto__: animal, //原型继承
    };

    // modifies rabbit.isSleeping
    rabbit.sleep();
    alert(rabbit.isSleeping); //true
    alert(animal.isSleeping); //undefined

    //获取对象原型
    console.log(rabbit.__proto__);
    Object.getPrototypeOf(rabbit);

    //对象的constructor是个函数，是个函数，是个函数
    //保存着声明这个对象的原型函数的prototype的constructor
    //{}===new Object{}
    console.log({}.__proto__ === Object.prototype); //true
    console.log({}.constructor === Object.prototype.constructor); //true
    console.log(Object.prototype.constructor === Object); //true

    //对象的constructor可以用于声明它的另一对象
    let dog = new rabbit.constructor();
    console.log(rabbit.constructor === Object.prototype.constructor);
    //dog === {};

    //函数也可以看作一个对象
    //函数也有自己的原型属性__proto__,它继承自Function.prototype
    alert(Animal.__proto__);

    //函数也有自己的constructor,同样来自它的原型Function.prototype的constructor

    //js中有许多内置构造函数，所以有很多内置原型。
    //所有原型都会向上到Object.prototype.__proto__=null

    //只有函数有"prototype"属性，这是new它的对象的原型
    //prototype是对象，都有显式定义的constructor属性，一般对象的constructor都是继承来的，也可以显式定义
    //函数默认的prototype = { constructor: Rabbit }
    //默认的函数本身就是它的对象的constructor，用于初始化对象
    function Rabbit(name) {
        this.name = name;
    }

    //原型被传递到对象
    let rabbitA = new Rabbit("black");
    console.log(rabbitA.__proto__ === Rabbit.prototype);
    console.log(rabbitA.constructor === Rabbit); // inherits from Rabbit.prototype

    Rabbit.prototype = animal; //prototype changed
    let whiteRabbit = new Rabbit("White Rabbit"); //prototype设置rabbit.__proto__ = animal

    //默认prototype可以被显式改写
    function Animal() {
        Animal.prototype = {
            constructor: Animal,
            eats: true,
        };
    }
}

//原型（prototype）的附加方法
{
    let animal = {
        eats: true,
    };

    let rabbit = Object.create(animal);
    console.log(Object.getPrototypeOf(rabbit) === animal);
    Object.setPrototypeOf(rabbit, {});

    //obj对象的浅复制
    let objClone = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );

    //「极简」对象，这个对象没有原型
    Object.create(null);
}

//constructor, prototype, __proto__
{
    function User(name, birthday) {
        this._name = name;
        this._birthday = birthday;
    }

    User.prototype._calcAge = function () {
        return new Date().getFullYear() - this._birthday.getFullYear();
    };

    User.prototype.sayHi = function () {
        alert(`${this._name}, age:${this._calcAge()}`);
    };

    let user = new User("John", new Date(2000, 0, 1));

    console.log(User);
    console.log(user);

    //prototype是用来被继承的，函数有，对象只有a special hidden property [[Prototype]]
    console.log(User.prototype);
    console.log(user.prototype);

    //prototype里的constructor是继承对象的constructor即函数本身
    console.log(User.prototype.constructor);

    //constructor是函数或对象的构造函数
    console.log(User.constructor); //function
    console.log(user.constructor); //User

    //__proto__里是函数或对象继承来的东西
    console.log(User.__proto__);
    console.log(user.__proto__);

    function Developer() {
        User.call(this, "developer", new Date());
    }
}
