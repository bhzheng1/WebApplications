//Array：有序集合, 是一种特殊的对象，适用于存储和管理有序的数据项。
{
    //声明数组
    {
        let arrX = [];// “字面量” 的语法
        let arr = new Array();
    }

    // 迭代数组元素
    {
        //Use for…of to iterate over the values in an iterable
        let animals = ['🐔', '🐷', '🐑', '🐇'];
        let names = ['Gertrude', 'Henry', 'Melvin', 'Billy Bob'];

        for (let animal of animals) {
            // Random name for our animal
            let nameIdx = Math.floor(Math.random() * names.length);

            console.log(`${names[nameIdx]} the ${animal}`);
        }

        animals.forEach(console.log);//更短的写法,callback没有返回值
        let newAnimals = animals.map(item => " hello" + item);//对每个元素进行改写操作，返回新值

        //Use for…in to iterate over the properties of an object (the object keys)
        let oldCar = {
            make: 'Toyota',
            model: 'Tercel',
            year: '1996'
        };

        for (let key in oldCar) {
            console.log(`${key} --> ${oldCar[key]}`);
        }
    }

    //length 属性的另一个有意思的点是它是可写的。
    //所以，清空数组最好的方法就是：arr.length = 0

    //数组方法
    {
        let arr = ["item1"];
        Array.isArray(arr);//判断是否为数组

        arr.push("item"); //从结尾添加元素，
        arr.pop(); // 从结尾提取元素，

        arr.shift(); // 从开头提取元素，
        arr.unshift("item"); // 从开头添加元素，

        arr.splice(1, 1, "item1", "item2"); //删除元素，添加，或插入新元素
        arr.slice(0, 1); //切片

        let arr1 = new Array();
        let arr2 = new Array();
        arr.concat(arr1, arr2); //连接两个数组

        arr.join(";"); //数组转化为字符串

        arr.indexOf("item");
        arr.lastIndexOf("item");
        arr.includes("item");

        arr.find(item => item == "item");//查找第一个符合条件的元素
        arr.findIndex(item => item == "item");
        arr.filter(item => item.id < 3);//查找所有符合条件的元素

        arr.reverse(); //翻转字符串

        arr.sort();//数组默认按字符串排序
        arr.sort((a, b) => a - b);//按比较函数排序

        arr.reduce((sum, current) => sum + current, 0);//数组累积处理函数
        arr.reduceRight((sum, current) => sum + current, 0);//遍历从右侧开始
    }

    //thisArg参数
    {
        let user = {
            age: 18,
            younger(otherUser) {
                return otherUser.age < this.age;
            }
        };

        let users = [
            {age: 12},
            {age: 16},
            {age: 32}
        ];

        //如果我们没有提供上下文，users.filter(user.younger) 会调用user.younger 作为一个独立的函数，这时 this=undefined
        let youngerUsers = users.filter(user.younger, user);// 我们使用 user.younger 作为过滤器，并提供 user 作为它的上下文。
        alert(youngerUsers.length); // 2
    }

    //可转化为数组的对象
    {
        //所有对象都可以转化为数组
        let userA = {
            name: "John",
            age: 30
        };
        let objectArray = Object.entries(userA);//[[name,John],[age,30]]


        // Array-likes 是有索引和 length 属性的对象，所以它们很像数组
        let arrayLike = {// 有索引和长度,但不能迭代 => 类数组对象
            0: "Hello",
            1: "world",
            length: 2,
        };

        let array = Array.from(arrayLike);//转化为数组
        let chars = Array.from("abcdefghigklmnopqrstuvwxyz");

        //Array.from 能正确处理 UTF-16 扩展字符
        function slice(str, start, end) {
            return Array.from(str).slice(start, end);
        }

        let str = "𝒳😂𩷶";

        alert(str.slice(1, 3));//乱码
        alert(slice(str, 1, 3))
    }

    //数组解构
    {
        let [name1, name2, ...rest] = ["Julius", "Caesar", "James", "Consul"];
        alert(name1);
        alert(rest.length);
    }
}

//链表元素是一个被递归定义的对象
{
    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: {
                        value: 5,
                        next: null
                    }
                }
            }
        }
    };


}