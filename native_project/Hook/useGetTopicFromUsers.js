export default function useGetTopicFromUsers() {
    return function (userId1, userId2) {
        const users = [userId1, userId2];

        const sortedUsers = users.sort(function (a, b) {
            return a - b;
        });

        return `${sortedUsers[0]}.${sortedUsers[1]}`;
    }
}
