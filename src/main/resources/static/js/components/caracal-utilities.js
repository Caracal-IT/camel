export function get(uri) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };

    return fetch(uri, options).then(resp => resp.json());
}

export function post(uri, request) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)
    };

    return fetch(uri, options).then(resp => resp.json());
}