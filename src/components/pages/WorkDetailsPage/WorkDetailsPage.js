import {getWorkDetails} from "../../../services/WebPortfolioService";

import WorkDetails from "../../workDetails/WorkDetails";
import CommentsList from "../../comments/CommentsList";
import {useParams} from "react-router-dom";

const WorkDetailsPage = ({isAuthorized}) => {
    const projectId = useParams().projectid;
    return (
        <>
            <WorkDetails work={getWorkDetails()}/>
            <CommentsList comments={getWorkDetails()} projectId={projectId} isAuthorized={isAuthorized}/>
        </>
    )
}

export default WorkDetailsPage;

// const { name, date } = props;
// const { id, name, description, website, likes, comments } = props.work;
// const [isLiked, setIsLiked] = useState(false);
// const [isCommented, setIsCommented] = useState(false);
//
// const handleLike = () => {
//     setIsLiked(!isLiked);
// }
//
// const handleComment = () => {
//     setIsCommented(!isCommented);
// }
//
// const handleEdit = () => {
//     props.history.push(`/edit/${id}`);
// }
//
// const handleDelete = () => {
//     props.deleteWork(id);
// }