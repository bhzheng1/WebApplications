import React from "react";

export default function Login() {
    const [formData, setFormData] = React.useState(
        {
            email: "",
            password:"",
            passwordConfirm:"",
            okayToEmail: false
        }
    )
    function handleSubmit(event){
        event.preventDefault();
        if(formData.password===formData.passwordConfirm){
            console.log("Successfully signed up")
        }else{
            console.log("passwords do not match")
            return
        }
        if(formData.okayToEmail){
            console.log("thanks for singing up for our newsletter!");
        }
    }
    function handleChange(event){
        const {name,value,type,checked} = event.target;
        setFormData(preFormData=>({
                ...preFormData,
                [name]: type==="checkbox"? checked:value
            }
        ));
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email address" onChange={handleChange} className="form--input" value={formData.email}/>
                <input type="password" placeholder="password" name="password" onChange={handleChange} className="form--input" value={formData.password}/>
                <input type="password" placeholder="Confirm password" name="passwordConfirm" onChange={handleChange} className="form--input" value={formData.passwordConfirm}/>
                <div className="form--marketing">
                    <input type="checkbox" name="okayToEmail" id="okayToEmail" onChange={handleChange} checked={formData.okeyToEmail}/>
                    <label htmlFor="okayToEmail">I want to join the newsletter</label>
                </div>
                <button className="form--submit">Sign up</button>
            </form>
        </div>
    )
}