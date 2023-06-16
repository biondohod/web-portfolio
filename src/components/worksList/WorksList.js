import {useState, useEffect} from "react";

import WorksItem from "../worksItem/WorksItem";

import './worksList.scss';
import {getProfileInfo} from "../../services/WebPortfolioService";

const WorksList = ({projectsList, id}) => {
    const [projects, setProjects] = useState(projectsList);;
    const [userId, setUserId] = useState(1);
    useEffect(() => {
        getProfileInfo(id).then((result) => {
            setUserId(result.id);
            setProjects(result.projects);
        });

    }, [id, userId, projectsList])
    const renderWorksList = () => {
        if (projects) {
            if (projects.length > 0) {
                return projects.map((item, i) => {
                    if (i < 3) {
                        return (<WorksItem key={i} {...item}  userId={userId}/>);
                    }
                    return null;
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
        <ul className="works__list">
            {renderWorksList()}
        </ul>
    )
};

export default WorksList;