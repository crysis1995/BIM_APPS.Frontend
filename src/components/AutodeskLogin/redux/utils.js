export const fetchProjectInfo = async (accessToken, account_id, user_id) => {
    return fetch(`https://developer.api.autodesk.com/hq/v1/accounts/${account_id.slice(2)}/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((r) => r.json())
        .catch(console.log);
};
