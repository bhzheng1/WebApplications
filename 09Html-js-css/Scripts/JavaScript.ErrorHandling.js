//try...catch can not catch asynchronous error

{
    //only works for runtime errors
    {

    }
    //works synchronously
    {
        try {
            setTimeout(function () {
                noSuchVariable;
            }, 1000);
        } catch (e) {
            alert("won't work");
        }

        setTimeout(function () {
            try {
                noSuchVariable;
            } catch (e) {
                alert("error is caught here!")
            }
        }, 1000)
    }

    //标准异常的内置的构造器
    {
        let error = new Error("An error");
        let syntaxError = new SyntaxError("A syntaxError");
        let referenceError = new ReferenceError("A referenceError");

        function readData() {
            let json = '{"age":30}';

            try {
                let user = JSON.parse(json);
                if (!user.name) {
                    throw new SyntaxError("Incomplete data: no name");
                }
            } catch (e) { //捕获全部异常, catch可以省略
                if (e.name == "SyntaxError") { //分析异常对象
                    console.log("JSON ERROR: " + e.message);
                } else {
                    throw e;//重新抛出异常到外层
                }
            }

        }

        //finally总会执行，即使有return时，先执行finally再return
        try {
            readData();
        } catch (e) {//捕捉内层抛出的异常
            console.log("External catch got: " + e);
        } finally {//最后总会执行的代码
            console.log("Job done!")
        }
    }

    //全局异常处?面试题
    {
        //浏览器环境，我们可以assign a function to specific window.onerror property，当遇到未知异常的时候，它就会执行。
        window.onerror = function (message, url, line, col, error) {
            console.log(`${message}\n At ${line}:${col} of ${url}`);
        };

        //在浏览器中，promises未处理的 rejections可以使用 unhandledrejection 事件捕获它
        window.addEventListener("unhandledrejection",function (event) {
            // the event object has two special properties:
            console.log(event.promise);
            console.log(event.reason);
        })
    }
}

//自定义错误及扩展错误
{
    //customError class
    class CustomError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
        }
    }

    class PropertyRequiredError extends CustomError {
        constructor(property) {
            super("No property: " + property);
            this.property = property;
        }
    }

    //Usage
    function validateUser(user) {
        if (!user.name) {
            throw new PropertyRequiredError("name");
        }
        if (!user.age) {
            throw new PropertyRequiredError("age");
        }
    }

    //try...catch
    try {
        let user = JSON.parse('{ "age": 25 }');
        validateUser(user);
    } catch (e) {
        if (e instanceof ValidationError) {
            console.log("Invalid data: " + e.message);
            console.log(e.name);
            console.log(e.property);
        } else if (e instanceof SyntaxError) {
            console.log("JSON Syntax Error: " + e.message);
        } else {
            throw e;
        }
    }
}

//包装异常
{
    class CustomError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
        }
    }

    class ReadError extends CustomError {
        constructor(message, cause) {
            super(message);
            this.cause = cause;
        }
    }

    class PropertyRequiredError extends CustomError {
        constructor(property) {
            super("No property: " + property);
            this.property = property;
        }
    }

    function validateUser(user) {
        if (!user.name) {
            throw new PropertyRequiredError("name");
        }
        if (!user.age) {
            throw new PropertyRequiredError("age");
        }
    }

    function readUser(json) {
        let user;

        try {
            user = JSON.parse(json);
            validateUser(user);
        } catch (e) {
            if (e instanceof SyntaxError || e instanceof PropertyRequiredError) {
                throw new ReadError(e.name, e);
            } else {
                throw e;
            }
        }
        return user;
    }

    try {
        readUser('{bad json}');
    } catch (e) {
        if (e instanceof ReadError) {
            console.log("Original error: " + e.cause)
        } else {
            throw e;
        }
    }

}