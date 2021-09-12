async function request(path, method, body) {
    let host = "http://localhost:4500"
    let response = await fetch(host + path, {
        method,
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IlN1eHJvYiIsImNvbnRhY3QiOiIrOTk4OTExMzY0NDQzIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTYzMTQ0MDQyOH0.9xhtkZ0QzksaArWAw6BzhbitdjNGZcGL6cSOHT4V_6o",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await response.json()
}