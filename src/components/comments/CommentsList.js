import {getComments, createComment, getProfileInfo} from "../../services/WebPortfolioService";
import './commentsList.scss';

import CommentsItem from "./CommentsItem";
import {useEffect, useState} from "react";

const CommentsList = ({projectId, isAuthorized}) => {
    const [commentsList, setCommentsList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [commentLength, setCommentLength] = useState(0)

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

    useEffect(() => {
        getComments(localStorage.getItem('projectId')).then((comments) => {
                setCommentLength(comments.length)
                setCommentsList(comments);
        })
    }, []);

    useEffect(() => {

        getComments(localStorage.getItem('projectId')).then((comments) => {
            if (comments.length !== commentsList.length) {
                setCommentLength(comments.length)
                setCommentsList(comments);
            }
        })
    }, [commentsList, commentLength]);

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            const object = {
                id: parseInt(projectId),
                text: e.target.comment.value
            }
            const json = JSON.stringify(object);
            createComment(projectId, localStorage.getItem('token'), json).then(result => {
                if (!result.ok) {
                    createError('Something went wrong. Please try again')
                } else {
                    setCommentLength(commentLength + 1)
                }
            });
            e.target.reset();
        } catch (e) {
            createError('Something went wrong. Please try again')
        }


    }

    const renderCommentsList = () => {
        return commentsList.map(item => {
            const {id} = item;
            return (<CommentsItem key={id} {...item} commentLength={commentLength} setCommentLength={setCommentLength}/>);
        });
    }

    const renderForm = () => {

        if (isAuthorized) {
            return (
                <div className="work-comments__container">
                    <h2 className="work-comments__title">
                        Write your comment here:
                    </h2>
                    <form className="work-comments__form" onSubmit={onSubmit}>
                    <textarea className="work-comments__textarea" placeholder="Wow! It's such a good stuff..."
                              id={'comment'}/>
                        <button className="work-comments__button">Send</button>
                    </form>
                </div>
            )
        }
        return (<></>)
    }

    return (
        <section className="work-comments">
            <div className="errorMessage animated"
                 style={isError ? {display: "block"} : {display: "none"}}>{errorMessage}</div>
            <div className="successMessage animated"
                 style={{display: "none"}}>Successfully uploaded!</div>
            {renderForm()}
            <div className="work-comments__container">
                <h2 className="work-comments__title work-comments__title--icon">Comments ({commentsList.length}):</h2>
                <ul className="work-comments__list">
                    {renderCommentsList()}
                </ul>
            </div>
        </section>
    )
}

export default CommentsList;