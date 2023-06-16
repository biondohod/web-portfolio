

import './mainPage.scss'

import MainPopular from "../../mainPopular/MainPopular";

import mainImg from '../../../resources/img/main-page-img.jpg';

const MainPage = () => {


    return (
        <main className="app_main">
            <div className="main__content">
                <section className="main__intro">
                    <h2 className="intro__title">
                        Welcome to the web-portfolio <br />
                        Website with portfolios of web developers
                    </h2>
                    <p className="intro__descr">
                        You can find <span>inspiration</span> for your future work <br />
                        Or you can find a <span>competent developer</span> for your company
                    </p>
                    <img src={mainImg} aria-hidden="true" alt="main img." />
                </section>
                <section className="main__features">
                    <h2 className="features__title">
                        Our features:
                    </h2>
                    <ul className="features__list">
                        <li className="features__item">
                            Simple intuitive design
                        </li>
                        <li className="features__item">
                            Tracking interesting developers
                        </li>
                        <li className="features__item">
                            Get feedback on your work from other developers in the comments
                        </li>
                        <li className="features__item">
                            View the developer's website without downloading files to your computer. Just click the "Browse website" button at the work page
                        </li>
                        <li className="features__item">
                            Our website is free. No ads and no paid subscriptions
                        </li>
                    </ul>
                </section>
                <MainPopular/>
            </div>
        </main>
    )
};

export default MainPage;