// https://blog.logrocket.com/complete-guide-react-refs/
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const InputModal = ({ initialValue, onClose, onSubmit }) => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const onComplete = () => {
        //Ref - focus control
        inputRef.current.focus();
    };
    const timeline = gsap.timeline({ paused: true, onComplete });
    useEffect(() => {
        timeline
            .from(overlayRef.current, {
                duration: 0.25,
                autoAlpha: 0,
            })
            .from(modalRef.current, {
                duration: 0.25,
                autoAlpha: 0,
                y: 25,
            });
        timeline.play();
        document.body.addEventListener("click", onClickOutside);
        return () => {
            timeline.kill();
            document.removeEventListener("click", onClickOutside);
        };
    }, []);
    const onClickOutside = (e) => {
        const element = e.target;
        //Ref - detect if an element is contained
        if (modalRef.current && !modalRef.current.contains(element)) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    };
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const onSub = (e) => {
        e.preventDefault();
        onSubmit(value);
        onClose();
    };
    return (
        <div className="modal--overlay" ref={overlayRef}>
            <div className="modal" ref={modalRef}>
                <h1>Insert a new value</h1>
                <form action="?" onSubmit={onSub}>
                    <input ref={inputRef} type="text" onChange={onChange} value={value} />
                    <button>Save new value</button>
                </form>
            </div>
        </div>
    );
};