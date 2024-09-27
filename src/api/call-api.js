// call api from http://localhost:3001``

export const callApi = async (url, method, payload, token) => {
    // console.log('callApi', payload);
    const response = await fetch(`http://localhost:3001/api/v1${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
    });
    // console.log('callApi', response);
    return await response.json();
}