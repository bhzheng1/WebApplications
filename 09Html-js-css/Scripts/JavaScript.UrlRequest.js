//promise
{
    fetch("/article/promise-chaining/user.json")
        .then(response => response.text())
        .then(text => console.log(text));

    fetch("/article/promise-chaining/user.json")
        .then(response => response.json())
        .then(user => fetch(`https://api.github.com/users/${user.name}`))
        .then(response => response.json())
        .then(githubUser => new Promise(function (resolve, reject) {
            let img = document.createElement("img");
            img.src = githubUser.avatar_url;
            img.className = "promise-avatar-example";
            document.body.append(img);
            setTimeout(() => {
                img.remove();
                resolve(githubUser)
            }, 3000);
        }))
        .then(githubUser => console.log(`Finishing showing ${githubUser.name}`));
}
//ajax
{

    
}