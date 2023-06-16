import {Link, useParams} from 'react-router-dom';

import './workDetails.scss';

import comments from "../../resources/img/comments-black.svg";
import {useEffect, useState} from "react";
import {createLike, deleteLike, getProfileInfo, getWorkDetails} from "../../services/WebPortfolioService";

const WorkDetails = () => {
    const [project, setProject] = useState({
        "user_id": 1,
        "name": "Opps! Something went wrong. Please reload the page or try again later.",
        "description": "There is no description",
        "readme": "There is no readme",
        "likes_count": 0,
        "comments_count": 0,
        "created_at": "2000-01-01T17:10:42.773881Z",
        "updated_at": "2000-01-01T17:10:42.773881Z"
    });
    const [userName, setUserName] = useState('user_name');
    const [likesCount,setLikesCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isUserProfile, setIsUserProfile] = useState(false);

    const projectId = useParams().projectid;
    const userId = useParams().id;
    useEffect(() => {
        getWorkDetails(projectId, userId, localStorage.getItem('token')).then((result) => {
            setProject(result);
            setLikesCount(result.likes_count);
            setIsLiked(result.is_liked);

        });
        getProfileInfo(userId).then((result) => {
            setUserName(result.username);
        });
        localStorage.setItem('projectId', projectId);
        checkIsUserProfile();

    }, [projectId, userId]);

    const onOpenNewTab = (e) => {
        e.preventDefault();
        window.open(e.target.href, '_blank');
    }

    const {user_id, name, description, readme, likes_count, comments_count, created_at, updated_at, is_liked, folder} = project;

    const onCreateLike = () => {
        const object = {"id": parseInt(projectId)};
        const json = JSON.stringify(object);
        createLike(json, localStorage.getItem('token')).then((result) => {
            setIsLiked(true)
        });
        setLikesCount(likesCount + 1)
    }

    const checkIsUserProfile = ()  => {
        if (localStorage.getItem('id') === userId) {
            setIsUserProfile(true)
        } else {
            setIsUserProfile(false)
        }
    }

    const onDeleteLike = () => {
        const object = {"id": parseInt(projectId)};
        const json = JSON.stringify(object);
        deleteLike(json, localStorage.getItem('token')).then((result) => {
            setIsLiked(false)
        });
        setLikesCount(likesCount - 1)
    }
    const renderLikeButton = () => {
        if (!isLiked) {
            return (
                <button className="work__btn" onClick={onCreateLike}>
                    <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill={'black'}>
                        <path
                            d="M22.9807 2.32096C21.6716 0.831927 19.9385 0.0180854 18.0888 0.0180854C16.2391 0.0180854 14.5007 0.837955 13.1916 2.32698L12.508 3.10465L11.8137 2.31493C10.5046 0.825898 8.76087 0 6.91119 0C5.0668 0 3.32841 0.81987 2.02462 2.30287C0.715524 3.7919 -0.00527095 5.76923 2.90211e-05 7.87316C2.90211e-05 9.97709 0.726124 11.9484 2.03522 13.4374L11.9886 24.7589C12.1264 24.9156 12.3119 25 12.4921 25C12.6722 25 12.8577 24.9216 12.9955 24.7649L22.9701 13.4615C24.2792 11.9725 25 9.99518 25 7.89125C25.0053 5.78732 24.2898 3.80998 22.9807 2.32096ZM21.9631 12.3101L12.4921 23.0408L3.04221 12.292C2.00342 11.1104 1.43102 9.54304 1.43102 7.87316C1.43102 6.20328 1.99812 4.63588 3.03691 3.46033C4.0704 2.28478 5.44839 1.63371 6.91119 1.63371C8.37928 1.63371 9.76257 2.28478 10.8014 3.46636L11.9992 4.82879C12.2801 5.1483 12.7305 5.1483 13.0114 4.82879L14.1986 3.47842C15.2374 2.29684 16.6207 1.64577 18.0835 1.64577C19.5463 1.64577 20.9243 2.29684 21.9631 3.47239C23.0019 4.65397 23.569 6.22136 23.569 7.89125C23.5743 9.56113 23.0019 11.1285 21.9631 12.3101Z" />
                    </svg>
                </button>
            )
        }
        return (
            <button className="work__btn" onClick={onDeleteLike}>
                <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill={'red'}>
                    <path
                        d="M22.9807 2.32096C21.6716 0.831927 19.9385 0.0180854 18.0888 0.0180854C16.2391 0.0180854 14.5007 0.837955 13.1916 2.32698L12.508 3.10465L11.8137 2.31493C10.5046 0.825898 8.76087 0 6.91119 0C5.0668 0 3.32841 0.81987 2.02462 2.30287C0.715524 3.7919 -0.00527095 5.76923 2.90211e-05 7.87316C2.90211e-05 9.97709 0.726124 11.9484 2.03522 13.4374L11.9886 24.7589C12.1264 24.9156 12.3119 25 12.4921 25C12.6722 25 12.8577 24.9216 12.9955 24.7649L22.9701 13.4615C24.2792 11.9725 25 9.99518 25 7.89125C25.0053 5.78732 24.2898 3.80998 22.9807 2.32096ZM21.9631 12.3101L12.4921 23.0408L3.04221 12.292C2.00342 11.1104 1.43102 9.54304 1.43102 7.87316C1.43102 6.20328 1.99812 4.63588 3.03691 3.46033C4.0704 2.28478 5.44839 1.63371 6.91119 1.63371C8.37928 1.63371 9.76257 2.28478 10.8014 3.46636L11.9992 4.82879C12.2801 5.1483 12.7305 5.1483 13.0114 4.82879L14.1986 3.47842C15.2374 2.29684 16.6207 1.64577 18.0835 1.64577C19.5463 1.64577 20.9243 2.29684 21.9631 3.47239C23.0019 4.65397 23.569 6.22136 23.569 7.89125C23.5743 9.56113 23.0019 11.1285 21.9631 12.3101Z" />
                </svg>
            </button>
        )
    }

    const renderBtn = () => {
        if (isUserProfile) {
            return (
                <Link className="work-details__btn work-details__btn--logo" to={`/editProject/${projectId}`}>
                    Edit
                </Link>
            )
        } else {
            return (
                <Link className="work-details__btn" to={`/user/${user_id}`}>
                    Author's profile
                </Link>
            )
        }
    }

    const createDate = (date) => {
        if (date) {
            return date.slice(0, 10).replace('-', '.').replace('-', '.') + ' at ' + date.slice(11, 16);
        }
        return '-';
    }

    return (
        <section className="work-details">
            <div className="work-details__header">
                <h1 className="work-details__name">{name}</h1>
                <div className="work-details__btns">
                    {renderBtn()}
                    <Link className="work-details__btn" to={`http://${folder}.web-portfolio.tech`} onClick={onOpenNewTab}>
                        Browse website
                    </Link>
                </div>
            </div>
            <div className="work-details__info">
                <div className="work-details__stat">
                    <div className="work-details__dates">
                        <div>
                            Last update <span
                            className="work-details__updated">{createDate(updated_at)}</span>
                        </div>
                        <div>
                            Uploaded at <span
                            className="work-details__uploaded">{createDate(created_at)}</span>
                        </div>
                    </div>
                    <div className="work-details__stat--second">
                        <div className="work__wrapper work__wrapper--likes">
                            {renderLikeButton()}
                            <span className="work__count--likes">{likesCount}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="work-details__container">
                <span className="work-details__subname">Short description:</span>
                <span className="work-details__descr">
                    {description}
                </span>
            </div>
            <div className="work-details__container">
                <span className="work-details__subname">Long description:</span>
                <span className="work-details__readme">
                    {readme}
                </span>
            </div>

            {/*<img src={img} className="work-details__img" alt="Website."/>*/}
        </section>
    )
}

export default WorkDetails;