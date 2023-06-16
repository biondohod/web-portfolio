import {Link, useParams} from 'react-router-dom';
import {getAvatar, getProfileInfo} from '../../../services/WebPortfolioService';

import './myWorks.scss';
import WorksItem from "../../worksItem/WorksItem";
import {useEffect, useState} from "react";
import WorksList from "../../worksList/WorksList";
import avatarPlug from "../../../resources/img/avatarPlug.jpg";

const MyWorks = () => {
    const currentId = parseInt(useParams().id);
    const [projects, setProjects] = useState([]);
    const [isUserProfile, setIsUserProfile] = useState(false);
    const [userId, setUserId] = useState(currentId);
    const [userName, setUserName] = useState('User');
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
    }, []);

    useEffect(() => {
        checkIsUser();
        setUserId(currentId);
        getUserData(userId);
    }, [getAvatar, getProfileInfo, currentId, userId]);



    const renderBtns = () => {
        if (isUserProfile) {
            return (
                <Link className="my-works__btn btn--blue" to="/uploadProject">
                    <span className="">Upload new work</span>
                </Link>
            )
        }
        return (
            <></>
        )
    }

    const getUserData = () => {
        getProfileInfo(userId).then((res) => {
            setUserName(res.username)
            setProjects(res.projects)
        });
    }



    const renderWorksList = () => {
        if (projects) {
            if (projects.length > 0) {
                return projects.map((item, i) => {
                    return (<WorksItem key={i} {...item} userName={userName}/>);
                });
            }
            return (
                <div className="empty-list">There are no works yet :(</div>
            )
        }
        return (
            <div className="empty-list">There are no works yet :(</div>
        )
    }
    return (
        <section className="my-works">
            <div className="my-works__header">
                <h1 className="my-works__title">
                    {`${userName}'s`} works
                </h1>
                {renderBtns()}

            </div>
            <ul className="works__list">
                {renderWorksList()}
            </ul>
        </section>
    )
}

export default MyWorks;