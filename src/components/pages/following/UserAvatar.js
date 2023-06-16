import {getAvatar} from "../../../services/WebPortfolioService";
import {useEffect, useState} from "react";

const UserAvatar = ({id}) => {
    const [avatar, setAvatar] = useState()
    useEffect(() => {
        getAvatar(id).then(res => {
            console.log(res)
            setAvatar(res.url);
        });
    }, []);

    return (
        <img src={avatar} className="following__img" alt="Profile avatar."/>
    )
}

export default UserAvatar;