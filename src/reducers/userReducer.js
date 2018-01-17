const userReducer = (
    state = { 
        username: '', 
        email: '',
        problem: '', // what is the problem that this user has
        requestChatbot: true,  // by default, chatbot is requested by user
        requestLivechat: false  // live chat will be requested if user asked for it. Or it is LIVECHAT only mode
    },
    action
) => {

    switch (action.type) {
        case "SET_REQ_LIVECHAT":
            state = {
                ...state,
                requestLivechat: true,
                requestChatbot: false
            }
            break

        case "SET_REQ_CHATBOT":
            state = {
                ...state,
                requestChatbot: true,
                requestLivechat: false
            }
            break

        case "SET_USER_INFO":
            state = {
                ...state,
                requestChatbot: true,
                requestLivechat: false
            }
            break

        case "SET_USER_INFO_FULFILLED":
            state = {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                problem: action.payload.problem
            }
            break

        default:
            break
    }

    return state

}

export default userReducer