//ReactDOM is global variale
var names = ["Alice", "Emily", "Kate"];
ReactDOM.render(
    <div>
        <h1>hello world</h1>
        {names.map(function (name) {
            return <div key={name}>Hello, {name}</div>;
        })}
    </div>,
    document.getElementById("app")
);

//declarative Navbar element
function Navbar() {
    return <h1>hello I am a Navbar!</h1>;
}

ReactDOM.render(<Navbar />, document.getElementById("navbar"));

//JSX vs html element
const jsx_p = <p className="jsx">this is JSX element</p>;
ReactDOM.render(jsx_p, document.getElementById("jsx_p"));
//jsx_p is a react object
console.log(jsx_p);

const html_p = document.createElement("p");
html_p.textContent = "this is html element";
html_p.className = "html-element";
document.getElementById("html_p").appendChild(html_p);
// p is a html element
console.log(html_p);

//document.getElementById("")
