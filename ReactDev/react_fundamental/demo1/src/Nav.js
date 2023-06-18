function Nav(props) {
    console.log("Nav updated");
    return (
        <div style={{ color: "white", backgroundColor: "black" }}>
            {props.title}
            {props.children}
        </div>
    );
}

export default Nav;
