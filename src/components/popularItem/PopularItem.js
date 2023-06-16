import { NavLink, Link } from 'react-router-dom';

import comments from '../../resources/img/comments.svg';
import imgPlug from '../../resources/img/image_plug.png';

const PopularItem = ({comments_count, likes_count, name, img, user_id, id}) => {
    return (
        <li className="popular__item">
            <Link to={`/${user_id}/work/${id}`}>
                <h3 className="popular__name">{name}</h3>
            </Link>
            <Link to={`/${user_id}/work/${id}`}>
                <img src={img ? img : imgPlug} alt="preview." className="popular__preview" width={246} height={180} style={{borderRadius: 10}}/>
            </Link>
            <div className="work__info">
                <div className="work__wrapper work__wrapper--likes">
                    <button className="work__btn" disabled={true}>
                        <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill='white'>
                            <path d="M22.9807 2.32096C21.6716 0.831927 19.9385 0.0180854 18.0888 0.0180854C16.2391 0.0180854 14.5007 0.837955 13.1916 2.32698L12.508 3.10465L11.8137 2.31493C10.5046 0.825898 8.76087 0 6.91119 0C5.0668 0 3.32841 0.81987 2.02462 2.30287C0.715524 3.7919 -0.00527095 5.76923 2.90211e-05 7.87316C2.90211e-05 9.97709 0.726124 11.9484 2.03522 13.4374L11.9886 24.7589C12.1264 24.9156 12.3119 25 12.4921 25C12.6722 25 12.8577 24.9216 12.9955 24.7649L22.9701 13.4615C24.2792 11.9725 25 9.99518 25 7.89125C25.0053 5.78732 24.2898 3.80998 22.9807 2.32096ZM21.9631 12.3101L12.4921 23.0408L3.04221 12.292C2.00342 11.1104 1.43102 9.54304 1.43102 7.87316C1.43102 6.20328 1.99812 4.63588 3.03691 3.46033C4.0704 2.28478 5.44839 1.63371 6.91119 1.63371C8.37928 1.63371 9.76257 2.28478 10.8014 3.46636L11.9992 4.82879C12.2801 5.1483 12.7305 5.1483 13.0114 4.82879L14.1986 3.47842C15.2374 2.29684 16.6207 1.64577 18.0835 1.64577C19.5463 1.64577 20.9243 2.29684 21.9631 3.47239C23.0019 4.65397 23.569 6.22136 23.569 7.89125C23.5743 9.56113 23.0019 11.1285 21.9631 12.3101Z" />
                        </svg>
                    </button>
                    <span className="work__count--likes">{likes_count}</span>
                </div>
                <div className="work__wrapper">
                    <span className="work__btn">
                        <img src={comments} alt="comments button" />
                    </span>
                    <span className="work__count--comments">{comments_count}</span>
                </div>
            </div>
        </li>
    )
};

export default PopularItem;