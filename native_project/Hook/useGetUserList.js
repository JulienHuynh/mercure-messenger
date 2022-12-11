export default function useGetUserList() {
    return function () {
        return fetch('http://localhost:8245/user-list', {
            method: 'GET',
            mode: "cors"
        })
            .then(data => data.json())
    }
}