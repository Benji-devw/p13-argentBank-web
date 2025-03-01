// call api from http://localhost:3001``

export const callApi = async (url, method, payload, token) => {
    try {
        const response = await fetch(`http://localhost:3001/api/v1${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        return {
            status: 'error',
            message: 'Le serveur est inaccessible. Veuillez réessayer plus tard.',
        };
    }
};
