import spinner from './loading.gif';

import './spinner.scss';

const Spinner = () => {
    return (
        <div className="spinner__wrapper">
            <img src={spinner} alt="spinner."/>
        </div>
    )
};

export default Spinner;