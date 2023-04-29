import React from "react";
export default function Form() {
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        comments: "",
        isFriendly: true,
        employment: "",
        favColor: "",
    })

    const employments = ["Unemployment", "Employment", "Full-time"].map(e => {
        return (<React.Fragment key={e}><input key={e} type="radio" name="employment" id={e} value={e} onChange={handleChange} checked={formData.employment === e} /><label htmlFor={e} key={`label_${e}`}>{e}</label><br /></React.Fragment>)
    })
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"].map(
        c => {
            return <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
        }
    )

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(formData)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" onChange={handleChange} name="firstName" value={formData.firstName} />
            <input type="text" placeholder="Last Name" onChange={handleChange} name="lastName" value={formData.lastName} />
            <input type="email" placeholder="abc@gmail.com" onChange={handleChange} name="email" value={formData.email} />
            <textarea value={formData.comments} placeholder="Comments" onChange={handleChange} name="comments" />
            <input type="checkbox" id="isFriendly" checked={formData.isFriendly} name="isFriendly" onChange={handleChange} /><label htmlFor="isFriendly">is isFriendly?</label>
            <fieldset>
                <legend>Current employment status</legend>
                {employments}
            </fieldset>
            <label htmlFor="favColor">What is your favorite color?</label>
            <br />
            <select name="favColor" id="favColor" value={formData.favColor} onChange={handleChange}>
                <option value="">--chose your choice--</option>
                {colors}
            </select>
            <br />
            <br />
            <button>Submit</button>
        </form>
    )
}