const get = async (url) => {
    const res = await fetch(url);
    return await res.json();
};

const post = async (url, data) => {
    return await request(url, data, 'POST')
};

const patch = url => {};

const put = url => {};

const delet = async (url, data) => {
    return await request(url, data, 'DELETE')
};

const request = async (url, data, method) => {
    const options = {
        method,
        body: JSON.stringify(data)
    }
    const res = await fetch(url, options)
    return await res.json()
}

export {
    get,
    post,
    patch,
    put,
    delet
};
