import {getPopularList} from "../../services/WebPortfolioService";

import './mainPopular.scss';

import PopularItem from "../popularItem/PopularItem";
import {useEffect, useState} from "react";


const MainPopular = () => {
    const [popularList, setPopularList] = useState([]);
    useEffect(() => {
        getPopularList().then(res => {
            setPopularList(res);
        })
    }, []);

    const renderList = () => {
        return popularList.map(item => {
            const {id} = item;
            return (<PopularItem key={id} {...item}/>)
        });
    }

    return (
        <section className="main__popular">
            <h2 className="popular__title">
                Most popular works:
            </h2>
            <div className="popular__content">
                <ul className="popular__list">
                    {renderList()}
                </ul>
            </div>
        </section>
    )
}

export default MainPopular;