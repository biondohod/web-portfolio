import {Link} from "react-router-dom";

import './commentsItem.scss';
import {deleteComment, getAvatar} from "../../services/WebPortfolioService";
import avatarPlug from '../../resources/img/avatarPlug.jpg';
import {useEffect, useState} from "react";

const CommentsItem = (props) => {
    const [avatar, setAvatar] = useState();
    const [isUserComment, setIsUserComment] = useState(false);
    const {user, created_at, text, id, commentLength, setCommentLength} = props;


    useEffect(() => {
        getAvatar(user.id).then((avatar) => {
            setAvatar(avatar.url);
            if (user.id === parseInt(localStorage.getItem('id'))) {
                setIsUserComment(true);
            }
            else {
                setIsUserComment(false);
            }
        })
    }, [avatar, setAvatar, isUserComment, setIsUserComment]);

    const onDelete = () => {
        const object = {id: id}
        const json = JSON.stringify(object)
        deleteComment(json, localStorage.getItem('token')).then(result => {
            setCommentLength(commentLength - 1);
        });

    }
    return (
        <li className="work-comments__item">
            <Link to={`/user/${user.id}`}>
                <img src={avatar ? avatar : avatarPlug} alt="avatar." className="work-comments__avatar"/>
            </Link>
            <div className="work-comments__info">
                <div className="work-comments__wrapper">
                    <Link to={`/user/${user.id}`}>
                        <span className="work-comments__name">{user.fullname}</span>
                    </Link>
                    <span className="work-comments__date">{`${created_at.slice(0, 10).replace('-', '.').replace('-', '.')} at ${created_at.slice(11, 16)}`}</span>
                </div>

                <span className="work-comments__comment">{text}</span>
            </div>
            {isUserComment ? <button className="work-comments__delete btn--red" onClick={onDelete}>
                Delete
            </button> : ''}
        </li>
    )
}

export default CommentsItem;