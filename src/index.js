import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import store from './store'
import { Provider } from 'react-redux'
import defaultEnvStore from './reducers/defaultEnvStore'
import 'semantic-ui-css/semantic.min.css'

window.RenderApp = function (chatbotId, livechatId) {

    defaultEnvStore.chatbotId = chatbotId
    defaultEnvStore.livechatId = livechatId

    if (chatbotId) {
        defaultEnvStore.chatboxMode = 'CHATBOT'
    }
    if(livechatId) {
        defaultEnvStore.chatboxMode = 'LIVECHAT'
    }
    if(chatbotId && livechatId) {
        defaultEnvStore.chatboxMode = 'CHATBOT_LIVECHAT'
    }

    // tmp, delete in production mode pls
    //defaultEnvStore.chatboxMode = 'CHATBOT'
    //defaultEnvStore.chatbotId = 'n6Avu8RVGLffnp8ghz8PaavD5R6cYzHWRPbQxh26fpCtdqgps'

    //defaultEnvStore.chatboxMode = 'LIVECHAT'
    //defaultEnvStore.livechatId = 'QRdCHThaReh4vgQwuqN71LWBopF12ufXRAfcoSvzMGLRM7Cn6'

    // new ReactDOM.render(
    //     <Provider store={store}>
    //         <App/>
    //     </Provider>,
    //     document.getElementById('root')
    // )
}


defaultEnvStore.chatboxMode = 'CHATBOT'
defaultEnvStore.chatbotId = 'n6Avu8RVGLffnp8ghz8PaavD5R6cYzHWRPbQxh26fpCtdqgps'

new ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)