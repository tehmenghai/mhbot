export function usrReqLivechat_act() {
    return {
        type: 'SET_REQ_LIVECHAT',
        payload: 'ok'
    }
}

export function usrReqChatbot_act() {
    return {
        type: 'SET_REQ_CHATBOT',
        payload: 'ok'
    }
}

export function usrUpdateInfo_act(username, email, problem) {
    return {
        type: 'SET_USER_INFO',
        payload: new Promise((resolve, reject) => {
            resolve({username: username, email: email, problem: problem})
        })
    }
}
