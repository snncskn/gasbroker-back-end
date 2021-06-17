
const loginRequest = {
    url: pm.collectionVariables.get("baseUrl") + '/auth/signin',
    method: 'POST',
    header: 'Content-Type: application/json',
    body: {
        mode: 'application/json',
        raw: JSON.stringify({
            username: pm.collectionVariables.get("username"),
            password: pm.collectionVariables.get("password")
        })
    }
};

pm.sendRequest(loginRequest, function (err, response) {
    pm.collectionVariables.set("accessToken", response.json().accessToken);
});