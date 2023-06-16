// noinspection DuplicatedCode

import {useEffect, useState} from "react";
import {
    deleteProject,
    getProfileInfo,
    getWorkDetails,
    updateProjectFunc,
    uploadProjectFunc
} from "../../../services/WebPortfolioService";
import {useParams} from "react-router-dom";

const EditProject = () => {
    const projectId = useParams().id;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [description, setDescription] = useState('');
    const [readme, setReadme] = useState('');

    useEffect((() => {
        getWorkDetails(projectId).then((project) => {
            setDescription(project.description);
            setReadme(project.readme);
        })
    }), [])

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

    async function updateProjectHandler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        // formData.append('id', localStorage.getItem('projectId'));
        const object = {};
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        object.id = parseInt(localStorage.getItem('projectId'));
        console.log(object);
        const json = JSON.stringify(object);
        console.log(json);
        try {
            const response = await updateProjectFunc(json, localStorage.getItem('token'));
            if (response.ok) {
                createSuccess();
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

    const onDelete = () => {
        const object = {id: parseInt(projectId)}
        const json = JSON.stringify(object)
        deleteProject(json, localStorage.getItem('token')).then(() => {
            window.location.href = `/user/${localStorage.getItem('id')}`;
        });
    }

    return (
        <section className="editProject">
            <div className="errorMessage animated"
                 style={isError ? {display: "block"} : {display: "none"}}>{errorMessage}</div>
            <div className="successMessage animated"
                 style={{display: "none"}}>Successfully uploaded!
            </div>
            <h1 className="form__title">Edit project</h1>
            <form id={'updateProject'} onSubmit={updateProjectHandler} className="form form--create-project animated"
                  style={{marginBottom: 32}}>
                <label className="form__label form__label--textarea">
                    <span className="form__name">Project short description</span>
                    <textarea
                        className="form__input form__input--textarea"
                        name="description"
                        placeholder="Online store landing page."
                        required={true}
                        defaultValue={description}/>
                </label>
                <label className="form__label form__label--textarea">
                    <span className="form__name">Project full description</span>
                    <textarea
                        className="form__input form__input--textarea"
                        name="readme"
                        placeholder="There is online store landing page. New sliders was added in the last update. Fixed..."
                        required={true}
                        defaultValue={readme}/>
                </label>
                <input type="text" id={'update_id'} style={{display: "none"}} />
                <button type="submit" className="form__submit">Save</button>
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
                <button type="submit" className="form__submit">Save</button>
            </form>
            <form id={'uploadPreview'} className="form form--create-project animated" style={{display: "none"}}>
                <label className="form__label form__label--center">
                    <span className="form__name">Project preview</span>
                    <input className="form__input form__input--upload" type="file" accept="image/png, image/jpeg"
                           name="work-preview"/>
                    <div className="form__upload"></div>
                </label>
                <button type="submit" className="form__submit">Save</button>
            </form>
            <div className="delete">
                <h2 className="delete__title">DANGER ZONE</h2>
                <button className="delete__btn" onClick={onDelete}>Delete project</button>
            </div>
        </section>
    )
}

export default EditProject;