var baseUrl = "http://47.112.166.50:10002"

function request(params) {
    let url = baseUrl + params.url;
    let config = {
        mode: 'cors',
        method: params.method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    if (params.method == 'POST' || params.method == 'PUT') {
        config.body = JSON.stringify(params.data);
    }
    return fetch(url, config).then(res => {
        return res.json();
    });
}


export default {
    get(params) {
        return request({
            url: params.url,
            method: 'GET'
        });
    },
    post(params) {
        return request({
            url: params.url,
            method: 'POST',
            data: params.data
        });
    }
}