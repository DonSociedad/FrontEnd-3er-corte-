const API_URL = process.env.NEXT_PUBLIC_API_URL

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const apiFetch = async (endpoint: string, method: methods, body?: any) => {
    const headerOptions: any = {
    method,
    headers: {
        "Content-type": "application/json"
    }
}
    if (method === 'POST' || method === 'PUT') headerOptions.body = JSON.stringify(body)
    return fetch(`${API_URL}${endpoint}`, headerOptions)
        .then(data => data.json())
}