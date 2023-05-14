//Global variables：任何函数之外声明的变量，全局变量在任意函数中都是可见的(除非被局部变量遮蔽)。
//Local variables：在函数中声明的变量只在该函数内部可见。

//基本类型是：String, Number, Boolean 和 Symbol – 是被整个赋值的。
{
    const Pi = 3.1415926;
    let carName = new String;
    let carPrice = new Number;
    let IsSportCar = new Boolean;
    let id = new Symbol;

    let carOwner = new Object();
    let carBrand = null;
    let carColor;  //undefined

    typeof (undefined); // "undefined"
    typeof (0); // "number"
    typeof (true); // "boolean"
    typeof ("foo"); // "string"
    typeof (Symbol("id"));// "symbol"
    typeof (Math);// "object"  js的bug
    typeof (null); // "object"  js的bug
    typeof (alert); // "function"  应该是object但返回function更方便应用

//值的比较
    let a = 0;
    let b = "0";

    alert(Boolean(a)); // false
    alert(Boolean(b)); // true

    alert(a == b); // true!，b was converted to number

    alert(0 == false); // true
    alert('' == false); // true


    alert(0 === false); // false，比较不同类型的值
    alert(null == undefined); // true
    alert(null === undefined); // false

    alert(null === null); //true
    alert(undefined == undefined) //true

//当使用数学式或其他比较方法 < > <= >= 时： null/undefined 的值会被转换为数字：null 转为 0，undefined 转为 NaN。
    alert(null > 0);  // (1) false
    alert(null == 0); // (2) false
    alert(null >= 0); // (3) true

    alert(undefined > 0); // false (1)
    alert(undefined < 0); // false (2)
    alert(undefined == 0); // false (3)

//作为对象的基本类型:基本类型可以调用一些"内置"的方法，这些方法是在临时对象的帮助下完成的。
// 实际运行时，基本数据类型先被包装成临时对象然后调用方法，程序员是不允许为基本类型添加属性的
}

//number类型
{
    //Round using Math.floor, Math.ceil, Math.trunc, Math.round or num.toFixed(precision)
    //number检查需要特别注意
    isNaN(""); //false
    isNaN(null);//false
    isFinite(""); //true
    isFinite(null);//true

    function random(min, max) { //A random integer from min to max including both min and max
        let r = min + (max - min) * Math.random();
        return Math.floor(r);
    }
}

//string类型
{
    // 字母的代码为ASCII
    alert("z".codePointAt(0)); // 122
    alert("Z".codePointAt(0)); // 90
    alert(String.fromCodePoint(90)); // Z

//查找子字符串时，使用 indexOf 或 includes/startsWith/endsWith 进行简单检查
//获取子字符串，使用 slice 或 substring
// 字符串的大/小写转换，使用：toLowerCase/toUpperCase

    let names = "Bilbo, Gandalf, Nazgul";
    let arrName = names.split(", ");
    arrName.join("; ");
}

//Map 和 WeakMap
{
    //声明Map
    {
        let map = new Map();

        let mapFromArray = new Map([
            ['1', 'str1'],
            [1, 'num1'],
            [true, 'bool1']
        ]);

        let mapFromObject = new Map(Object.entries({name: "John", age: 30}));

    }
    //new Map() – 创建 map。
    // map.set(key, value) – 根据键（key）存储值（value）。
    // map.get(key) – 根据键返回值，如果 map 中该键不存在，返回 undefined。
    // map.has(key) – 如果键存在，返回 true，否则返回 false。
    // map.delete(key) – 移除该键的值。
    // map.clear() – 清空 map
    // map.size – 返回当前元素个数。

    //map.keys() – 返回键的迭代器，
    // map.values() – 返回值的迭代器，
    // map.entries() – 返回 [key, value] 迭代器入口，for..of 循环会默认使用它。

    //WeakMap
    {
        let john = {name: "John"};
        let visitsCountMap = new Map();// map: user => visits count
        visitsCountMap.set(john, 123);// john 是 map 的键
        john = null;// 现在 john 离开了，我们不需要他了
        alert(visitsCountMap.size); // 1, 记录依旧在 map 中，因为 Map 将它作为键,我们需要清理它！

        let visitsCountWeakMap = new WeakMap();
        john = {name: "John"};
        visitsCountWeakMap.set(john, 123);
        john = null;//这个对象会自动的从内存和 visitsCountWeakMap 中删除
    }
}

//Set  和 WeakSet 是一个值的集合，这个集合中所有的值仅出现一次
{
    //new Set(iterable) – 创建 set，利用数组来创建是可选的（任何可迭代对象都可以）。
    // set.add(value) – 添加值，返回 set 自身。
    // set.delete(value) – 删除值，如果该 value 在调用方法的时候存在则返回 true ，否则返回 false。
    // set.has(value) – 如果 set 中存在该值则返回 true ，否则返回 false。
    // set.clear() – 清空 set。
    // set.size – 元素个数。
}

