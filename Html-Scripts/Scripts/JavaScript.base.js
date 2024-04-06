{
    "use strict"; //按照ECMA5工作

    //window是JavaScript代码的全局对象this
    //window也代表浏览器窗口，并提供控制它的方法
    //window方法
    {
        window.alert("Hello World");//alert是window方法
        let age = window.prompt('How old are you?', "100"); //
        alert(`You are ${age} years old!`);
        let isBoss = window.confirm("Are you the boss?");
        alert(isBoss); // true if OK is pressed
    }


    let user = "John";//变量不能是window全局属性
    window.console.log("user" in window);//false

    function sayHi() {//自定义window函数
        window.console.log("Hi");
    }
    window.console.log("sayHi" in window);

    //document
    window.document.body.style.background = "blue";

    //location
    if (confirm("go to wikipedia?")) {
        window.location.href = "https://wikipedia.org";
    }
}
{
    let txt = "Hello World----!"; //使用let而不要使用var
    let dateTime = new Date();

    window.alert("window.alert(): " + txt);
    console.log(typeof (dateTime));
    console.log("Hello World");
    console.log(new Error("some error have occurred"));
    document.write("<p> From document.write: " + txt.fontcolor("green") + "</p>");
    document.write(dateTime.toDateString());
}

//加载一个新的脚本
function loadScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}

//break/continue 标签
outer: for (let i = 0; i < 3; i++) {

    for (let j = 0; j < 3; j++) {

        let input = prompt(`Value at coords (${i},${j})`, '');

        // 如果是空字符串或已取消，则中断这两个循环。
        if (!input) break outer; // outer为中断位置的标记

        // 做些有价值的事
    }
}
