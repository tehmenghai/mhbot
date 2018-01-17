const userReducer = (
    state = [{
        from: '',
        msg: []
    }],
    action
) => {

    switch (action.type) {
        case "PUSH_MSG":
            state = [
                ...state
            ]
            state.push({
                from: action.payload.from,
                msg: action.payload.msg
            })
            break

        default:
            break
    }

    return state

}

export default userReducer