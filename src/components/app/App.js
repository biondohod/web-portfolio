import {lazy, Suspense, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const MyWorks = lazy(() => import('../pages/myWorks/MyWorks'));
const MyProfile = lazy(() => import('../pages/myProfile/myProfile'));
const Following = lazy(() => import('../pages/following/Following'));
const Followers = lazy(() => import('../pages/following/Followers'));
const WorkDetails = lazy(() => import('../pages/WorkDetailsPage/WorkDetailsPage'));
const EditProfile = lazy(() => import('../pages/editProfile/EditProfile'));
const UploadProject = lazy(() => import('../pages/uploadProject/UploadProject'));
const EditProject = lazy(() => import('../pages/editProject/EditProject'));
const SignUp = lazy(() => import('../pages/signUp/SignUp'));



const App = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [userData, setUserData] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <Router>
            <div className="app">
                <AppHeader userId={currentUser.id} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/works' element={<MyWorks id={userData.id}/>}/>
                            <Route path='/user/:id/works' element={<MyWorks id={userData.id}/>}/>
                            <Route path={`/user`} element={<MyProfile/>}/>
                            <Route path={`/user/:id`} element={<MyProfile/>}/>
                            <Route path='/following' element={<Following/>}/>
                            <Route path={`/followers`} element={<Followers/>}/>
                            <Route path={`/followers/:id`} element={<Followers/>}/>
                            <Route path='/work' element={<WorkDetails/>}/>
                            <Route path={`/:id/work/:projectid`} element={<WorkDetails isAuthorized={isAuthorized}/>}/>
                            <Route path='/editProfile' element={<EditProfile userData={userData} setUserData={setUserData}/>}/>
                            <Route path='/uploadProject' element={<UploadProject/>}/>
                            <Route path='/editProject' element={<EditProject/>}/>
                            <Route path='/editProject/:id' element={<EditProject/>}/>
                            <Route path='/signUp' element={<SignUp setCurrentUser={setCurrentUser} setIsAuthorized={setIsAuthorized}/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;
