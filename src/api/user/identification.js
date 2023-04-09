import request from "../request";

export default {
    login: (data) => {
        return request.post({
            url: '/userFunc/login/',
            data: data,
        })
    },
    register: (data) => {
        return request.post({
            url: '/user/register',
            data: data,
        })
    },
    getinfo:(data) => {
        return request.get({
            url:'/userFunc/userView/',
            data:data,
        })
    }
}