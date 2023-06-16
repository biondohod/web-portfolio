// noinspection DuplicatedCode
// noinspection DuplicatedCode

import axios from "axios";
import {deleteUser, getProfileInfo, updateUser, uploadAvatar} from "../../../services/WebPortfolioService";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EditProfile = ({userData, setUserData}) => {
    const [fullname, setFullname] = useState('');
    const [bio, setBio] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect((() => {
        getProfileInfo(localStorage.getItem('id')).then((profile) => {
            setFullname(profile.fullname);
            setBio(profile.bio);
        })
    }), [])



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

    const createSuccess = () => {
        const successMessage = document.querySelector('.successMessage');
        successMessage.style.display = 'block';
        successMessage.classList.remove('slideOutUp');
        successMessage.classList.add('slideInDown');
        setTimeout(() => {
            successMessage.classList.remove('slideInDown');
            successMessage.classList.add('slideOutUp');
        }, 5000);
        setTimeout(() => {
            successMessage.style.display = 'none'
        }, 6000);
    }

    const onUpdateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        try {
            const response = await updateUser(json, localStorage.getItem('token'));
            if (response.ok) {
                createSuccess()
            } else response.json().then((res) => {
                createError(res.message);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const onUploadAvatar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.avatar.files[0]);
        try {
            const response = await uploadAvatar(formData, localStorage.getItem('token'));
            if (response.ok) {
                createSuccess();
            } else response.json().then((res) => {
                createError(res.message);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const onPreview = (e) => {
        if(e.target.files.length > 0){
            const src = URL.createObjectURL(e.target.files[0]);
            const preview = document.querySelector('.previewImg')
            preview.style.width = '245px';
            preview.style.height = '245px';
            preview.src = src;
            preview.style.display = 'block';
            preview.style.borderRadius = '50%';
        }
    }

    const onDelete = () => {
        deleteUser(localStorage.getItem('token')).then(() => {
            localStorage.setItem('id', '');
            localStorage.setItem('token', '');
            window.location.href = './signUp';
        })
    }
    return (
        <section className="editProfile">
            <div className="errorMessage animated"
                 style={isError ? {display: "block"} : {display: "none"}}>{errorMessage}</div>
            <div className="successMessage animated"
                 style={{display: "none"}}>Successfully uploaded!</div>
            <h1 className="form__title">Profile settings</h1>
            <form onSubmit={onUpdateUser} className="form form--edit-profile">
                <label className="form__label form__label--username">
                    <span className="form__name">Your name</span>
                    <input className="form__input" type="text" id={"fullname"} name="fullname" placeholder="John Smith" defaultValue={`${fullname}`}/>
                </label>
                <label className="form__label form__label--textarea">
                    <span className="form__name">Your bio</span>
                    <textarea
                        className="form__input form__input--textarea"
                        id={"bio"}
                        name="bio"
                        placeholder="Hi! My name is John smith and I’m a frontend developer. My life purpose is...."
                        defaultValue={`${bio ? bio : ''}`}/>
                </label>
                <button type="submit" className="form__submit" style={{marginTop: 8}}>Save</button>
            </form >
            <form onSubmit={onUploadAvatar} className="form form--edit-profile" style={{marginTop: 16}}>
                <label className="form__label form__label--center">
                    <span className="form__name">Avatar uploader</span>
                    <input onChange={onPreview} className="form__input form__input--upload" type="file" accept="image/png, image/jpeg"
                           name="avatar" id={"avatar"} multiple={false}/>
                    <div className="form__upload"></div>
                </label>
                <div className="form__label form__label--center">
                    <span className="form__name">Preview</span>
                    <div className="form__preview"><img src="" className={'previewImg'} alt="Oops! Something went wrong." style={{display: "none"}}/> </div>
                </div>
                <button type="submit" className="form__submit">Save</button>
            </form>
            <div className="delete">
                <h2 className="delete__title">DANGER ZONE</h2>
                <button className="delete__btn" onClick={onDelete}>Delete user</button>
            </div>
        </section>
    )
};

export default EditProfile;