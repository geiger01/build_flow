import { userService } from "../../services/user.service"

export const setUser = () => {
    return async dispatch => {
        try {
            const user = await userService.getLoggedinUser()
            dispatch({
                type: "SET_USER",
                user
            })
            return user
        } catch (err) {
            console.log(err);
        }
    }
}



