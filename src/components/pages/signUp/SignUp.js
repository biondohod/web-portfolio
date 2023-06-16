import {useState} from "react";
import {createUser, getUserId} from "../../../services/WebPortfolioService";

import './signUp.scss';

const SignUp = ({setIsAuthorized}) => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const createError = (message) => {
        setIsError(true);
        setErrorMessage(`Oops! ${message}`);
        const errorMessage = document.querySelector('.errorMessage');
        errorMessage.classList.remove('slideOutUp');
        errorMessage.classList.add('slideInDown');
        setTimeout(() => {
            errorMessage.classList.remove('slideInDown');
            errorMessage.classList.add('slideOutUp');
        }, 5000);
        setTimeout(() => {
            setIsError(false);
        }, 6000);
    }
    const signUp = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        try {
            const response = await createUser(json);
            if (response.ok) {
                document.getElementById('username').value = formData.get('username');
                document.getElementById('password').value = formData.get('password');
                document.getElementById('log-in').querySelector('.sign-up__btn').click();
            } else {
                response.json().then((res) => {
                    createError(res.message);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logIn = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        try {
            const response = await getUserId(json);
            if (response.ok) {
                response.json().then((res) => {
                    const id = res.id;
                    const token = res.token;
                    localStorage.setItem('id', id);
                    localStorage.setItem('token', token);
                    localStorage.setItem('password', formData.get('password'));
                    window.location.href = `/user/${id}`;
                    setIsAuthorized(true);
                })
            } else {
                response.json().then((res) => {
                    createError(res.message);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="sign-up">
            <div className="errorMessage animated"
                 style={isError ? {display: "block"} : {display: "none"}}>{errorMessage}</div>
            <h1 className="sign-up__title">Personal cabinet</h1>
            <div className="sign-up__wrapper">
                <div className="sign-up__left-col">
                    <h2 className="sign-up__name">If you already a member</h2>
                    <form onSubmit={logIn} className="sign-up__form" id={"log-in"}>
                        <label className="form__label">
                            <span className="form__name">Username</span>
                            <input id={"username"} className="form__input" type="text" name="username"
                                   placeholder="john_smith69" required={true}/>
                        </label>
                        <label className="form__label">
                            <span className="form__name">Password</span>
                            <input id={"password"} className="form__input" type="password" name="password"
                                   placeholder="••••••••" required={true}/>
                        </label>
                        <div className="sign-up__decorative"></div>
                        <button className="sign-up__btn btn--red">Log in</button>
                    </form>
                </div>
                <div className="sign-up__right-col">
                    <h2 className="sign-up__name">If you a new here</h2>
                    <form onSubmit={signUp} className="sign-up__form">
                        <label className="form__label">
                            <span className="form__name">Your email</span>
                            <input className="form__input" type="email" name="email" placeholder="john_smith@gmail.com"
                                   required={true}/>
                        </label>
                        <label className="form__label">
                            <span className="form__name">Your name</span>
                            <input className="form__input" type="text" name="fullname" placeholder="John Smith"
                                   required={true}/>
                        </label>
                        <label className="form__label form__label--username">
                            <span className="form__name">Create a username</span>
                            <input className="form__input" type="text" name="username" placeholder="jonh_smith69"
                                   required={true}/>
                        </label>
                        <label className="form__label">
                            <span className="form__name">Create a password</span>
                            <input className="form__input" type="password" name="password" placeholder="••••••••"
                                   required={true}/>
                        </label>
                        <input style={{display: "none"}} name='bio' defaultValue='Hey! This is my profile!'/>
                        <button className="sign-up__btn btn--blue">Sign Up</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp;