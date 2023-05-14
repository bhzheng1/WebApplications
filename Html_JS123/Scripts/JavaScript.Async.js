//asynchronous programming

//“callback-based” style
//Callback in callback, Pyramid of Doom, callback hell
{
    //callback函数一般有两个参数，第一个是error，第二个是result
    function callback(error, result) {
        if (error) {
            //error handle
        } else {
            console.log(`Cool, the ${result} is loaded`);
            console.log(_);
        }
    }

    //
    function loadScript(src, callback) {
        let script = document.createElement("script");
        script.src = src;
        script.onerror = () => callback(error);//failed
        script.onload = () => callback(null, script); //succeed
        document.head.append(script);
    }


    loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js", callback);
}

// promise-based style
{
    // executor 是个约定，只会调用 resolve 或 reject
    /**
     * The resulting promise object has internal properties:
     * state — initially “pending”, then changes to either “fulfilled” or “rejected”,
     * result — an arbitrary value of your choosing, initially undefined.
     *
     * resolve(value) — to indicate that the job finished successfully:
     * sets state to "fulfilled",
     * sets result to value.
     *
     * reject(error) — to indicate that an error occurred:
     * sets state to "rejected",
     * sets result to error.
     */
    {
        function executor(resolve, reject) {
            resolve("done");//resolve或rejects被调用后，promise的状态将改变，后面的代码会被忽略
            reject(new Error("…")); // 被忽略
            setTimeout(() => resolve("…")); // 被忽略
        }

        let promise = new Promise(executor);

        //检查并处理结果
        promise.then(
            (result) => console.log(result),
            (error) => console.log(error)
        );

        //只处理错误
        promise.catch((error) => console.log(error));

        //只要promise状态改变，无论结果如何finally总要被执行
        promise.finally(() => {
        });//do some cleanup job

        //Promise handlers .then/.catch/.finally are always asynchronous.
        {
            let promise = Promise.resolve();
            promise.then(() => alert("promise done"));
            alert("code finished"); // this alert shows first
        }

        //usage
        function loadScript(src) {
            return new Promise(function (resolve, reject) {
                let script = document.createElement('script');
                script.src = src;

                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error("Script load error: " + src));

                document.head.append(script);
            })
        }

        promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
        promise.then(
            result => console.log(`${result.src} is loaded!`),
            error => console.log(`Error: ${error.message}`)
        );
    }

    //promise chain
    {
        new Promise(function (resolve, reject) {
            setTimeout(() => resolve(1), 1000);
        }).then(function (result) { //promise.then 返回了一个promise
            console.log(result);
            return result * 2;//操作函数有返回值时，当前的promise变为resolved，value = 返回值
        }).then(function (result) {//上一个promise的then
            console.log(result);
            return result * 2;
        }).then(function (result) {//
            console.log(result);
            return new Promise((resolve, reject) => { //操作函数返回promise时程序会等待promise完成
                setTimeout(() => resolve(result * 2), 1000);//promise的结果会传递给then
            });
        });

        function loadScript(src) {
            return new Promise(function (resolve, reject) {
                let script = document.createElement('script');
                script.src = src;

                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error("Script load error: " + src));

                document.head.append(script);
            })
        }

        loadScript("/article/promise-chaining/one.js")
            .then(function (result) {
                return loadScript("/article/promise-chaining/two.js");
            })
            .then(function (result) {
                return loadScript("/article/promise-chaining/three.js");
            }).then(function (result) {
                one();//验证被加载的函数
                two();//验证被加载的函数
                three();//验证被加载的函数
            })
    }

    //As a rule, an asynchronous action should always return a promise.
    {
        class HttpError extends Error {
            constructor(response) {
                super(`${response.status} for ${response.url}`);
                this.name = "HttpError";
                this.response = response;
            }
        }

        function loadJson(url) {
            return fetch(url).then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new HttpError(response);
                }
            });
        }

        function loadGithubUser(name) {
            return fetch(`https://api.github.com/users/${name}`)
                .then(response => {
                    if (response.status == 200) {
                        response.json();
                    } else {
                        throw new HttpError(response);
                    }
                })
        }

        function showAvatar(githubUser) {
            return new Promise(function (resolve, reject) {
                let img = document.createElement('img');
                img.src = githubUser.avatar_url;
                img.className = "promise-avatar-example";
                document.body.append(img);

                setTimeout(() => {
                    img.remove();
                    resolve(githubUser);
                }, 3000);
            });
        }

        loadJson('/article/promise-chaining/user.json')
            .then(user => loadGithubUser(user.name))
            .then(showAvatar)
            .then(githubUser => console.log(`Finished showing ${githubUser.name}`))
            .catch(error => {
                if (error instanceof HttpError && error.response.status == 404) {
                    console.log("No such user");
                } else {
                    throw error;
                }
            });

        function demoGithubUser() {
            let name = prompt("Enter a name?", "iliakan");

            document.body.style.opacity = 0.3;//start an indication

            return loadGithubUser(name)
                .finally(() => {//stop the indication
                    document.body.style.opacity = "";
                    return new promise(resolve => setTimeout(resolve, 0));
                })
                .then(showAvatar)
                .catch(error => {
                    if (error instanceof HttpError && error.response.status == 404) {
                        console.log("No such user, please reEnter.");
                        return demoGithubUser();
                    } else {
                        throw error;
                    }
                }
                );
        }
    }

    //Promise API
    {
        //Promise.resolve(value)
        function loadCached(url) {
            let cache = loadCached.cache || (loadCached.cache = new Map());

            if (cache.has(url)) {
                return Promise.resolve(cache.get(url));
            }

            return fetch(url)
                .then(response => response.text())
                .then(text => {
                    cache.set(url, text);
                    return text;
                });
        }

        //Promise.reject(error)

        //Promise.all(iterablePromise) 执行Promise的数组
        let names = ['iliakan', 'remy', 'jeresig'];

        let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

        Promise.all(requests)
            .then(responses => {
                for (let response of responses) {
                    console.log(`${response.url}: ${response.status}`);
                }
                return responses;
            })
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(users => users.forEach(user => console.log(user.name)));

        //error handling
        let urls = [
            'https://api.github.com/users/iliakan',
            '/',
            'http://no-such-url'
        ];

        Promise.all(urls.map(url => fetch(url).catch(err => err)))
            .then(responses => Promise.all(
                // if it's an error then pass on
                // otherwise response.json() and catch errors as results
                responses.map(r => r instanceof Error ? r : r.json().catch(err => err))
            ))
            .then(results => {
                alert(results[0].name); // Ilya Kantor
                alert(results[1]); // SyntaxError: Unexpected token < in JSON at position 0
                alert(results[2]); // TypeError: failed to fetch (text may vary)
            });

        //Promise.race(iterablePromise) 执行Promise，但只等待第一个完成的结果
        Promise.race([
            new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
            new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
        ]).then(alert); // 1
    }

    //promisify callback based function
    {
        function promisify(f, manyArgs = false) {
            return function (...args) { //return a wrapper-function
                return new Promise((resolve, reject) => {
                    function callback(error, ...results) { //custom callback for f
                        if (error) {
                            return reject(error);
                        } else {
                            resolve(manyArgs ? results : results[0]);
                        }
                    }

                    args.push(callback);
                    f.call(this, ...args);
                })
            }
        }

        function helloPrinter(times, callback) {
            for (let i = 0; i < times; i++) {
                document.write('Hello </BR>');
                callback();
            }
        }

        promisify(helloPrinter)
    }

    //Microtask queue and event loop Macrotask queue
    {
        //high priority, Microtask: Current Code > Promise = Async/await
        //low priority, Macrotask: setTimeout, mousemove, fetch

        //"Unhandled rejection" is when a promise error is not handled at the end of the microtask queue.
        {
            let promise = Promise.reject(new Error("Promise Failed!"));

            window.addEventListener('unhandledrejection', event => {
                alert(event.reason); // Promise Failed!
            });
        }
        {
            let promise = Promise.reject(new Error("Promise Failed!"));
            promise.catch(err => alert('caught'));

            // no error, all quiet
            window.addEventListener('unhandledrejection', event => alert(event.reason));
        }
        {
            let promise = Promise.reject(new Error("Promise Failed!"));
            setTimeout(() => promise.catch(err => alert('caught')));

            // Error: Promise Failed!
            window.addEventListener('unhandledrejection', event => alert(event.reason));
        }
    }
}

//Async/await
{
    //函数前的 “async” 意味着一件事情：函数总是会返回 promise
    //async 确保函数返回一个 promise，并在其中封装非 promise
    //await 替换.then调用
    {
        (async function f() {
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => resolve("done!"), 1000)
            });

            let result = await promise;

            console.log(result);
        }());
    }

    //usage
    {
        async function showAvatar() {
            let response = await fetch('/article/promise-chaining/user.json');
            let user = response.json();

            let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
            let githubUser = await githubResponse.json();

            let img = document.createElement('img');
            img.src = githubUser.avatar_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            await new Promise(((resolve, reject) => setTimeout(resolve, 3000)));
            img.remove();
            return githubUser;
        }

        showAvatar().catch(console.log);
    }
}


