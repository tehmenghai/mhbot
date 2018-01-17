const adminReducer = (
    state = {
        adminName: ''
    },
    action
) => {

    switch (action.type) {

        case "SET_ADMIN_INFO":
            state = {
                ...state,
                adminName: action.payload
            }
            break

        default:
            break
    }

    return state

}

export default adminReducer