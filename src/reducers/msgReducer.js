const userReducer = (
    state = [{
        from: '',
        msgtime:'',
        msgtype:'',
        msgheader:'',
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
                msgtype: action.payload.msgtype,
                msgheader: action.payload.msgheader,
                msgtime: new Date().toLocaleTimeString(),
                msg: action.payload.msg
            })
            break

        default:
            break
    }

    return state

}

export default userReducer