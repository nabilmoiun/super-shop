function getDataFromServer(url, method, headers) {
    const response = null;
    const error = null;
    fetch(url, {
        method: `${method}`,
        headers: headers,
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        response = data;
    })
    .catch(e => {
        error = e;
    })
    if(error) {
        return {'error': true, "response": error}
    }
    else {
        return {"error": false, "response": response};
    }
}
