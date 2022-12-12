import useGetTopicFromUsers from "./useGetTopicFromUsers";
import useGetCurrentUser from "./useGetCurrentUser";

export default function useBuildTopicId() {
    const getTopicFromUsers = useGetTopicFromUsers();
    const currentUser = useGetCurrentUser();

    return function (otherUserId) {
        return getTopicFromUsers(currentUser.userid, otherUserId);
    }
}
