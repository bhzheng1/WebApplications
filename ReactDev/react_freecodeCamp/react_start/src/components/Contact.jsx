import React from "react";

export default function Contact(props) {
    return (
        <div className="contact-card">
            <img src={props.img} className="contact-img" alt="text" />
            <h3>{props.name}</h3>
            <div className="info-group">
                <img src="../images/phone-icon.png" className="contact-icon" alt="text" />
                <p>{props.phone}</p>
            </div>
            <div className="info-group">
                <img src="../images/mail-icon.png" className="contact-icon" alt="text" />
                <p>{props.email}</p>
            </div>
        </div>
    )
}