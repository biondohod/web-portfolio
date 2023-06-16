import {getAvatar, getFollowing} from "../../../services/WebPortfolioService";
import {Link} from "react-router-dom";
import './following.scss';
import {useEffect, useState} from "react";
import UserAvatar from "./UserAvatar";
import FollowingWorks from "./FollowingWorks";

const Following = () => {
    const [followersList, setFollowersList] = useState([]);
    useEffect(() => {
        getFollowing(localStorage.getItem('id'), localStorage.getItem('token')).then(res => {
            const elems = res.map((item) => {
                const {fullname, username, id} = item;
                console.log(item)
                return (
                    <li key={id} className="following__item">
                        <UserAvatar id={id}/>
                        <div className="following__info">
                            <h2>{fullname}</h2>
                            <span className="following__bio">@{username}</span>
                        </div>
                        <div className="following__btns">
                            <Link to={`/user/${id}`}>
                                <span className="following__link btn--red">View profile</span>
                            </Link>
                            {/*<button className="following__unfollow btn--blue">Unfollow</button>*/}
                        </div>
                    </li>
                )
            });
            setFollowersList(elems)
        })
    }, []);
    return (
        <section className="following">
            <FollowingWorks/>
            <h2 className={"following__title"}>Followed users ({followersList.length})</h2>
            <ul className="following__list">
                {followersList}
            </ul>
        </section>
    )
}

export default Following;