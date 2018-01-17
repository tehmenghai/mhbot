let backendUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port

if (process.env.NODE_ENV === 'development') {
    // if is in development mode
    backendUrl = 'https://localhost'
    console.log('in development', backendUrl)
}

let defaultEnvStore = {
    backendUrl: backendUrl, // server url to connect to
    apploading: false, // app loading state
    livechatId: '', // livechat uuid
    chatbotId: '', // chatbot uuid
    chatboxMode: '', // CHATBOT, LIVECHAT, CHATBOT_LIVECHAT
}

export default (defaultEnvStore)