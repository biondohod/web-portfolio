import {useEffect, useState} from "react";
import {getFollowList} from "../../../services/WebPortfolioService";
import PopularItem from "../../popularItem/PopularItem";
import '../../mainPopular/mainPopular.scss';
import WorksItem from "../../worksItem/WorksItem";

const FollowingWorks = () => {
    const [popularList, setPopularList] = useState([]);
    useEffect(() => {
        getFollowList(localStorage.getItem('token')).then(res => {
            setPopularList(res);
        })
    }, []);
    const renderList = () => {
        if (popularList) {
            if (popularList.length > 0) {
                return popularList.map(item => {
                    const {id} = item;
                    return (<PopularItem key={id} {...item}/>)
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
        <section className="main__popular" style={{marginBottom: 32}}>
            <h2 className="following__title">
                Latest works from followed users:
            </h2>
            <div className="popular__content">
                <ul className="popular__list">
                    {renderList()}
                </ul>
            </div>
        </section>
    )
}

export default FollowingWorks;