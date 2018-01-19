import React, { Component } from 'react'
import ChatboxBody from './ChatboxBody'
import ChatboxForm from './ChatboxForm'
import { Accordion, Icon, Responsive } from 'semantic-ui-react'
import Draggable from 'react-draggable'

class Chatbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            headerCollapse: false,
            windowHeight: window.innerHeight - 78
        }
    }

    handleHeaderClick = (e, titleProps) => {
        let result = !this.state.headerCollapse
        this.setState({ headerCollapse: result })
    }

    handleResponsive = () => {
        this.setState({ windowHeight: window.innerHeight - 78 })
    }

    handleButtonClick = (payload) => {
        this.props.sendMsg(payload)
    }

    render() {
        let headerStyle = ''
        let headerCollapse = this.state.headerCollapse
        let defaultBoxStyle = {
            position: 'fixed',
            bottom: '0',
            right: '0',
            paddingRight: '15px'
        }
        let mobileBoxStyle = {}
        let axis = ''

        let chatboxMode = this.props.chatboxMode
        let showLiveChatForm = false
        let waitingForAdmin = false

        if (chatboxMode === 'LIVECHAT') {

            // if the chatboxMode is livechat only
            let userReducer = this.props.userReducer
            let adminReducer = this.props.adminReducer

            if (!userReducer.username && !userReducer.email && !userReducer.problem) {
                // user need to identify himself
                // show the livechat form instead of msgs
                showLiveChatForm = true
            }

            if (adminReducer.adminName) {
                // if adminName and adminId are presents
                // then user can start to type message to admin
                waitingForAdmin = false
            }
            else {
                // user are not able to type message to admin, and chatbox body is loading
                waitingForAdmin = true
            }

        }

        if (headerCollapse) {
            headerStyle = (
                <div style={{
                    marginRight: '30px',
                    marginLeft: '20px'
                }}>
                    < Icon name='comments' size='large' style={{ paddingRight: '30px', paddingBottom: '25px'}} />
                    We're Online!
                </div>
            )

            // when collapse header in mobile, turn it back to desktop verion
            mobileBoxStyle = defaultBoxStyle
            axis = 'none'
        }
        else {
            headerStyle = (
                <div style={{ 
                    textAlign: 'center',
                    marginRight: '10px'
                }}>
                    &nbsp;
                    < Icon name='minus' style={{ float: 'right' }} />
                </div>
            )

            // mobile chatbox is abit different when open
            mobileBoxStyle = {
                position: 'fixed',
                left: '0',
                bottom: '0',
                width: '100%',
                margin: 'auto'
            }

            axis = 'both'
        }

        return (
            <div style={{ margin: '0 0 1000px' }}>

                <Responsive as={'div'} minWidth={767} maxWidth={2559}>

                    <Draggable
                        handle=".handle"
                        axis = {axis}
                        cancel=".cancelpls"
                    >
                        <div style={defaultBoxStyle}>
                            
                            <Accordion fluid inverted={true}>

                                <Accordion.Title
                                    active={!headerCollapse}
                                    onClick={this.handleHeaderClick}
                                    style={{
                                        backgroundColor: 'black',
                                        paddingBottom: '5px',
                                        paddingTop: '7px',
                                        borderRadius: '7px 7px 0 0'
                                    }}
                                >
                                    {headerStyle}
                                </Accordion.Title>

                                <Accordion.Content
                                    active={!headerCollapse}
                                    style={{
                                        padding: '0px'
                                    }}
                                >
                                    <ChatboxBody 
                                        maxWidth={'360px'} 
                                        minHeight={'400px'} 
                                        maxHeight={'400px'} 
                                        allMsgs={this.props.allMsgs} 
                                        handleButtonClick={this.handleButtonClick}
                                        chatboxMode={chatboxMode}
                                        setUserInfo={this.props.setUserInfo}
                                        showLiveChatForm={showLiveChatForm}
                                        waitingForAdmin={waitingForAdmin}
                                        backendUrl={this.props.backendUrl}
                                    />
                                    <ChatboxForm sendMsg={this.props.sendMsg} waitingForAdmin={waitingForAdmin}/>
                                </Accordion.Content>

                            </Accordion>

                        </div>
                    </Draggable>

                </Responsive>

                <Responsive as={'div'} {...Responsive.onlyMobile} onUpdate={this.handleResponsive}>
                    <div style={mobileBoxStyle}>

                        <Accordion fluid inverted={true}>

                            <Accordion.Title
                                active={!headerCollapse}
                                onClick={this.handleHeaderClick}
                                style={{
                                    backgroundColor: 'black',
                                    paddingBottom: '5px',
                                    paddingTop: '7px'
                                }}
                            >
                                {headerStyle}
                            </Accordion.Title>

                            <Accordion.Content
                                active={!headerCollapse}
                                style={{
                                    padding: '0px'
                                }}
                            >
                                <ChatboxBody 
                                    maxHeight={'0px'}
                                    minHeight={this.state.windowHeight.toString() + 'px'}
                                    allMsgs={this.props.allMsgs}
                                    handleButtonClick={this.handleButtonClick}
                                    chatboxMode={chatboxMode}
                                    setUserInfo={this.props.setUserInfo}
                                    showLiveChatForm={showLiveChatForm}
                                    waitingForAdmin={waitingForAdmin}
                                    backendUrl={this.props.backendUrl}
                                />
                                <ChatboxForm sendMsg={this.props.sendMsg} waitingForAdmin={waitingForAdmin}/>
                            </Accordion.Content>

                        </Accordion>

                    </div>
                </Responsive>

            </div>
        )
    }
}

export default Chatbox
