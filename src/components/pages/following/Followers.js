import './following.scss';
import {useEffect, useState} from "react";
import {getFollowers} from "../../../services/WebPortfolioService";
import UserAvatar from "./UserAvatar";
import {Link, useParams} from "react-router-dom";
import FollowingWorks from "./FollowingWorks";
const Followers = () => {
    const currentId = useParams().id;
    const [followersList, setFollowersList] = useState([]);
    useEffect(() => {
        getFollowers(currentId).then(res => {
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
                        </div>
                    </li>
                )
            });
            setFollowersList(elems)
        })
    }, []);
    return (
        <section className="following">
            <h2 className={"following__title"}>Users who follow ({followersList.length})</h2>
            <ul className="following__list">
                {followersList}
            </ul>
        </section>
    )
}

export default Followers;