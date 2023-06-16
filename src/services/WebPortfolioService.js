import preview1 from '../resources/img/previews/preview1.png';
import preview2 from '../resources/img/previews/preview2.png';
import preview3 from '../resources/img/previews/preview3.png';
import avatar from '../resources/img/avatar.jpg';
import img from '../resources/img/work.png';
const apiBase = 'http://web-portfolio.tech/api/';

async function createUser(data) {
    return  await fetch(`${apiBase}user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
}

async function getUserId(data) {
    return  await fetch(`${apiBase}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
}

async function getProfileInfo(id, token) {
    const response = await fetch(`${apiBase}user?id=${id}&projects=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return await response.json();
}

async function updateUser(data, token) {
    return  await fetch(`${apiBase}user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function uploadAvatar(data, token) {
    return  await fetch(`${apiBase}avatar`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function getAvatar(id) {
    return await fetch(`${apiBase}avatar?id=${id}`, {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/html',
        },
    });
}

async function createProjectFunc(data, token) {
    return  await fetch(`${apiBase}project`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function updateProjectFunc(data, token) {
    return  await fetch(`${apiBase}project`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function uploadProjectFunc(data, token) {
    return  await fetch(`${apiBase}upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function getWorkDetails(id, userId, token) {
// &userID=${userId}
    const data= await fetch(`${apiBase}project?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/html',
        },
    });

    return await data.json();
}

async function createLike(data, token) {
    return  await fetch(`${apiBase}like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function deleteLike(data, token) {
    return  await fetch(`${apiBase}like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function getComments(id) {
    const response = await fetch(`${apiBase}comment?id=${id}`, {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/html',
        },
    });

    return await response.json();
}

async function createComment(id, token, data) {
    return  await fetch(`${apiBase}comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function deleteUser(token) {
    return await fetch(`${apiBase}user`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
}

async function deleteProject(data, token) {
    return await fetch(`${apiBase}project`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    })
}

async function deleteComment (data, token) {
    return await fetch(`${apiBase}comment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    })
}


async function createFollow(data, token) {
    return await fetch(`${apiBase}follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function deleteFollow(data, token) {
    return await fetch(`${apiBase}follow`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: data
    });
}

async function getFollowing(id, token) {
    const response = await fetch(`${apiBase}following?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/html',
        },
    });

    return await response.json();
}

async function getFollowers(id, token) {
    const response = await fetch(`${apiBase}followers?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/html',
        },
    });

    return await response.json();
}

async function getPopularList() {
    const response = await fetch(`${apiBase}trending`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
        },
    });

    return await response.json();
}

async function getFollowList(token) {
    const response = await fetch(`${apiBase}feed`, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Authorization': `Bearer ${token}`,
        },
    });

    return await response.json();
}




export {getPopularList, getFollowList, getFollowers, createFollow, deleteFollow, deleteComment, deleteProject, getProfileInfo, getFollowing, getWorkDetails, createUser, getUserId, updateUser, uploadAvatar, getAvatar, createProjectFunc, updateProjectFunc, uploadProjectFunc, createLike, deleteLike, getComments, createComment, deleteUser};