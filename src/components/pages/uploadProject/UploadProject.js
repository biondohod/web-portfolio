// noinspection DuplicatedCode

import {createProjectFunc, updateProjectFunc, uploadProjectFunc} from "../../../services/WebPortfolioService";
import {useEffect, useState} from "react";

const UploadProject = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    let createProject = null;
    let updateProject = null;
    let uploadProject = null;
    let uploadPreview = null;
    useEffect(() => {
        hideAllForms();
    }, [])

    const createError = () => {
        setIsError(true);
        setErrorMessage(`Oops! something went wrong. Please try again.`);
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
    const hideAllForms = () => {
        createProject = document.getElementById('createProject');
        updateProject = document.getElementById('updateProject');
        uploadProject = document.getElementById('uploadProject');
        uploadPreview = document.getElementById('uploadPreview');
        updateProject.style.display = 'none';
        uploadProject.style.display = 'none';
        uploadPreview.style.display = 'none';
    }
    const showForm = (form) => {
        form.style.display = 'grid';
        form.classList.add('slideInLeft');
        setTimeout(() => {
            form.classList.remove('slideInLeft');
        }, 1000);
    }

    const hideForm = (form) => {
        form.classList.add('slideOutLeft');
        setTimeout(() => {
            form.classList.remove('slideOutLeft');
            form.style.display = 'none';
        }, 600);
    }

    async function createProjectHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        try {
            const response = await createProjectFunc(json, localStorage.getItem('token'));
            if (response.ok) {
                response.json().then((res) => {
                    localStorage.setItem('projectId', res.id);
                })
                hideForm(createProject);
                setTimeout(() => {
                    showForm(updateProject);
                }, 600)
            } else response.json().then((res) => {
                createError(res.message);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function updateProjectHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        // formData.append('id', localStorage.getItem('projectId'));
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        object.id = parseInt(localStorage.getItem('projectId'));
        const json = JSON.stringify(object);
        try {
            const response = await updateProjectFunc(json, localStorage.getItem('token'));
            if (response.ok) {
                hideForm(updateProject);
                setTimeout(() => {
                    showForm(uploadProject);
                }, 600)
            } else response.json().then((res) => {
                createError(res.message);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function uploadProjectHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('id', localStorage.getItem('projectId'));

        try {
            const response = await uploadProjectFunc(formData, localStorage.getItem('token'));
            if (response.ok) {
                hideForm(updateProject);
                createSuccess();
                setTimeout(() => {
                    window.location.href = `/user/${localStorage.getItem('id')}`;
                }, 600)
            } else response.json().then((res) => {
                createError(res.message);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const onUpload = (e) => {
        document.getElementById('filename').textContent = e.target.files[0].name;
    }

    return (
        <section className="uploadProject">
            <div className="errorMessage animated"
                 style={isError ? {display: "block"} : {display: "none"}}>{errorMessage}</div>
            <div className="successMessage animated"
                 style={{display: "none"}}>Successfully uploaded!
            </div>
            <h1 className="form__title">Upload new project</h1>
            <form id={'createProject'} onSubmit={createProjectHandler} className="form form--create-project animated">
                <label className="form__label">
                    <span className="form__name">Project name</span>
                    <input className="form__input" type="text" name="name" placeholder="Landing page" defaultValue={''}
                           required={true}/>
                </label>
                <label className="form__label form__label--textarea ">
                    <textarea
                        style={{display: 'none'}}
                        name="description"

                    />
                </label>
                <button type="submit" className="form__submit">Сontinue</button>
            </form>
            <form id={'updateProject'} onSubmit={updateProjectHandler} className="form form--create-project animated">
                <label className="form__label form__label--textarea">
                    <span className="form__name">Project short description</span>
                    <textarea
                        className="form__input form__input--textarea"
                        name="description"
                        placeholder="Online store landing page."
                        required={true}/>
                </label>
                <label className="form__label form__label--textarea">
                    <span className="form__name">Project full description</span>
                    <textarea
                        className="form__input form__input--textarea"
                        name="readme"
                        placeholder="There is online store landing page. New sliders was added in the last update. Fixed..."
                        required={true}/>
                </label>
                <input type="text" id={'update_id'} style={{display: "none"}}/>
                <button type="submit" className="form__submit">Сontinue</button>
            </form>
            <form id={'uploadProject'} onSubmit={uploadProjectHandler} className="form form--create-project animated">
                <label className="form__label form__label--center">
                    <span className="form__name">ZIP archive with your website</span>
                    <input className="form__input form__input--upload" type="file" accept=".zip"
                           name="file"
                           required={true}
                           onChange={onUpload}/>
                    <div className="form__zip"></div>
                    <span id={`filename`}></span>
                </label>
                <button type="submit" className="form__submit">Finish</button>
            </form>
            <form id={'uploadPreview'} className="form form--create-project animated">
                <label className="form__label form__label--center">
                    <span className="form__name">Project preview</span>
                    <input className="form__input form__input--upload" type="file" accept="image/png, image/jpeg"
                           name="work-preview"/>
                    <div className="form__upload"></div>
                </label>
                <button type="submit" className="form__submit">Save</button>
            </form>
        </section>
    )
}

export default UploadProject;
