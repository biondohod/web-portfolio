import {Link, useParams} from "react-router-dom";

import {
    getAvatar, getFollowers, getProfileInfo, createFollow, deleteFollow
} from '../../../services/WebPortfolioService';

import WorksList from '../../worksList/WorksList';

import './myProfile.scss';
import {useState, useEffect} from "react";

import avatarPlug from '../../../resources/img/avatarPlug.jpg';


const Profile = () => {
    const currentId = parseInt(useParams().id);
    const [avatar, setAvatar] = useState(avatarPlug);
    const [isFindAvatar, setIsFindAvatar] = useState(true);
    const [userData, setUserData] = useState({});
    const [isUserProfile, setIsUserProfile] = useState(false);
    const [userId, setUserId] = useState(currentId);
    const [followersCount, setFollowersCount] = useState(0);
    const [isFollow, setIsFollow] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const checkIsUser = () => {
        if (parseInt(localStorage.getItem('id')) === userId) {
            setIsUserProfile(true);
        } else {
            setIsUserProfile(false);
        }
    }

    useEffect(() => {
        checkIsUser();
        getUserData(userId);
        getProfileAvatar(userId);
    }, []);

    useEffect(() => {
        checkIsUser();
        setUserId(currentId);
        getUserData(userId);
        getProfileAvatar(userId);
        setIsFindAvatar(true);
    }, [getAvatar, getProfileInfo, currentId, userId, avatar]);


    const getUserData = (id) => {
        getProfileInfo(id, localStorage.getItem('token')).then((result) => {
            setUserData(result);
            setFollowersCount(result.followers_count);
            setIsFollow(result.is_followed);
            console.log(result);
            // setIsFollow(result.is_followed)
        });
    }
    const {id, username, email, fullname, bio, projects, is_followed} = userData;

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

    const onFollow = () => {
        const obj = {'id': currentId};
        const json = JSON.stringify(obj);
        createFollow(json, localStorage.getItem('token')).then((result) => {
            if (result.ok) {
                setIsFollow(true);
                setFollowersCount(followersCount + 1);
            }
            else {
                createError('You are not logged in')
            }
        });
    }

    const onUnfollow = () => {
        const obj = {'id': currentId};
        const json = JSON.stringify(obj);
        deleteFollow(json, localStorage.getItem('token')).then((result) => {
            if (result.ok) {
                setIsFollow(false);
                setFollowersCount(followersCount - 1);
            }
        });
    }

    const renderBtns = () => {
        if (isUserProfile) {
            return (<Link to={'/editProfile'}>
                <button className="profile__btn btn--red">Edit profile</button>
            </Link>)
        }
        let btn = <button className="profile__btn btn--blue" onClick={onFollow}>Follow</button>;
        if (isFollow) {
            btn = <button className="profile__btn btn--red" onClick={onUnfollow}>unFollow</button>
        }
        return (<div style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <button className="profile__btn btn--red work__btn" disabled={true}>{email}</button>
            {btn}
        </div>)
    }

    const getProfileAvatar = (id) => {
        if (isFindAvatar) {
            getAvatar(id).then((result) => {
                if (result.ok) {
                    setAvatar(result.url);
                } else {
                    setIsFindAvatar(false);
                }
            });
        }

    }

    const createBtn = () => {
        if (projects) {
            if (projects.length > 3) {
                return (<Link to={'/works'} className={'profile__btn btn--blue'} style={{marginTop: 24}}>
                    View all
                </Link>)
            } else if (isUserProfile) {
                return (<Link to={'/uploadProject'} className={'profile__btn btn--blue'} style={{marginTop: 24}}>
                    Upload project
                </Link>)
            }
        }
        return (<></>)
    }

    return (
        <section className="profile">
            <div className="errorMessage animated"
                 style={isError ? {display: "block"} : {display: "none"}}>{errorMessage}</div>
        <div className="profile__wrapper">
            <div className="profile__col--left">
                <span className="profile__username">@{username}</span>
                <h1 className="profile__name">Hi, I am {fullname}</h1>
                <span className="profile__bio">
                        {bio}
                    </span>
                {renderBtns()}
            </div>
            <div className="profile__col--right">
                <img className="profile__img" src={avatar} alt='Profile avatar.'/>
                <Link to={`/followers/${currentId}`} className={'profile__followers'}>
                        {followersCount ? followersCount : '0'}
                        {followersCount === 1 ? ' follower' : ' followers'}
                </Link>

            </div>
        </div>
        <div className="profile__works">
            <h2 className="profile__title">Last updated works</h2>
            <WorksList projectsList={projects} id={userId}/>
            {createBtn()}
        </div>
    </section>)
}

export default Profile;