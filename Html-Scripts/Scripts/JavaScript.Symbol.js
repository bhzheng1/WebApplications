//Symbol类型: Symbols don’t auto-convert to a string
// Build-in Symbol
//Symbol.hasInstance
//Symbol.isConcatSpreadable
//Symbol.iterator
//Symbol.toPrimitive


{
//symbol类型的用途？？
    let id1 = Symbol("id");
    let id2 = Symbol("id");
    alert(id1 === id2); //false

    //declare symbol id
    let id = Symbol("id");
    let user = {
        name: "John",
        age: 34,
        [id]: 123, // 不仅仅是 "id：123",因为我们需要"变量" id 的值Symbol "id"作为键，而不是 String “id”
        greet: function () {
            alert("Good Morning!" + this.name);
        },
        sayHi() {
            alert("Hello")
        },
    };
    for (let key in user) alert(key); //name,age,(no symbols),Symbol属性被隐藏了
    alert(user["name"]);//访问string属性
    alert(user[id]);//但可以被直接访问，可以被Object.assign()复制
}

//全局symbol
{
    let id = Symbol.for("id");// 如果该 Symbol 不存在，则创建它
    let idAgain = Symbol.for("id");// 如果该 Symbol 存在，则读取它
    alert(id === idAgain); //true
    alert(Symbol.keyFor(id));//通过symbol查找Key
}

//Symbol.toPrimitive
{
    let user = {
        name: "John",
        money: 1000,

        [Symbol.toPrimitive](hint) {
            return hint === "string" ? `name: "${this.name}"` : this.money;
        }
    };
    alert(user);//name: John
    alert(+user);//1000
    alert(user + 500);//1500
}

//Symbol.iterator
{
    //可迭代的对象 和 迭代器对象
    //可迭代的对象必须有一个名为Symbol.iterator的方法，这个方法返回一个迭代器
    //迭代器是包含next() {return{done:Boolean,value:any}}方法的对象

    let range = {
        from: 1,
        to: 5,
    };

    range[Symbol.iterator] = function () { //range的Symbol function，for .. of ..将首先调用它
        return { //返回一个迭代器对象
            current: this.from,//声明初始位置
            last: this.to,

            next() {//next将在循环迭代中被调用
                return this.current <= this.last ? {done: false, value: this.current++} : {done: true};
            },
        };
    };

    for (let num of range) {
        alert(num);
    }
    //上面的range只是一个可迭代的对象，range[Symbol.iterator]()创建了另外一个迭代器对象

    //为迭代的对象添加next()方法可以把迭代的对象变为迭代器
    let rangeA = {
        from: 1,
        to: 5,
        [Symbol.iterator]() {
            this.current = this.from;//声明初始位置
            return this;
        },
        next() {
            return this.current <= this.to ? {done: false, value: this.current++} : {done: true};
        },
    };

    //迭代器原理
    let str = "IWillBeIterated";
    let iterator = str[Symbol.iterator]();//得到迭代器对象
    while (true) {
        let result = iterator.next();//迭代器的next方法将返回一个对象{done:Boolean,value:any}
        if (result.done) break;
        alert(result.value);
    }

    //convert Symbol.iterator to generator
    let rangeB = {
        from: 1,
        to: 5,
        * [Symbol.iterator]() {//a shorthand for [Symbol.iterator]: *function()
            for (let value = this.from; value <= this.to; value++) {
                yield value;
            }
        }
    }
}


//Symbol.asyncIterator --Async iterators
{
    let range = {
        from: 1,
        to: 5,
        [Symbol.asyncIterator]() {
            return {
                current: this.from,
                last: this.to,

                //next() must return a promise,it does n’t have to be async, it may be a regular method returning a promise
                async next() {

                    await new Promise(resolve => setTimeout(resolve, 1000));

                    if (this.current <= this.last) {
                        return {done: false, value: this.current++};
                    } else {
                        return {done: true};
                    }
                }
            };
        }
    };

    (async () => {
        for await (let value of range) {
            console.log(value);
        }
    })();

    //convert Symbol.asyncIterator to generator
    {
        let range = {
            from: 1,
            to: 5,

            async * [Symbol.asyncIterator]() {
                for (let value = this.from; value <= this.to; value++) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    yield value;
                }
            }
        };

        (async () => {
            for await (let value of range) {
                console.log(value);
            }
        })();
    }
}

//Symbol.species
{
    //原生方法是可扩展的
    {
        //给 Array 增加一个新方法（可以做更多功能）
        class PowerArray extends Array {
            isEmpty() {
                return this.length === 0;
            }
        }

        let arr = new PowerArray(1, 2, 5, 10, 50);
        alert(arr.isEmpty()); // false

        let filteredArr = arr.filter(item => item >= 10);
        alert(filteredArr.isEmpty()); // false filterArr仍然是一个PowerArray


    }

    //specifies a function-valued property that the constructor function uses to create derived objects
    {
        class PowerArray extends Array {
            isEmpty() {
                return this.length === 0;
            }
        }

        let arr = new PowerArray(1, 2, 5, 10, 50);
        alert(arr.isEmpty());//false
        let filteredArr = arr.filter(item => item >= 10);
        alert(filteredArr.isEmpty());//error, filteredArr不是PowerArray了
    }
}

//Symbol.hasInstance
{
    class Animal {
        static [Symbol.hasInstance](obj) {
            if (obj.canEat) return true;
        }
    }

    let obj = {canEat: true};
    alert(obj instanceof Animal);//true
}

//Symbol.toStringTag
{
    let user = {
        [Symbol.toStringTag]: "User"
    };

    alert({}.toString.call(user));

    // 环境相关对象和类的 toStringTag：
    alert(window[Symbol.toStringTag]); // window
    alert(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHttpRequest

    alert({}.toString.call(window)); // [object Window]
    alert({}.toString.call(new XMLHttpRequest())); // [object XMLHttpRequest]
}