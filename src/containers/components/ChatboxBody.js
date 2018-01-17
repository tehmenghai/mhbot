import React, { Component } from 'react'
import { Icon, Segment, Comment, Divider, Button, Image, Dimmer, Loader } from 'semantic-ui-react'
import LivechatFormBody from './LivechatFormBody'

class ChatboxBody extends Component {

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom() {
        this.el.scrollTop = this.el.scrollHeight
    }

    render() {
        const allMsgs = this.props.allMsgs
        let renderbody = ''

        let botAvatar = (
            <Comment.Avatar
                as={Icon}
                inverted
                color='black'
                size='large'
                name='spy'
            />
        )

        botAvatar = (<Comment.Avatar as={Image} src='https://udger.com/pub/img/brand/nec_big.png' size='large'/>)

        let allMsgsRender = ''
        if (allMsgs.length > 0) {
            allMsgsRender = allMsgs.map((msg, index) => {

                let dividermah = <Divider />

                if (allMsgs.length-1 === index) {
                    // if it is the last msg, then no need to add Divider
                    dividermah = ''
                }

                if (msg.from === 'user') {
                    return (
                        <Comment key={index}>

                            <Comment.Avatar
                                as={Icon}
                                size='large'
                                name='user'
                            />

                            <Comment.Content>

                                <Comment.Author as={'a'}>User</Comment.Author>

                                <Comment.Metadata>
                                    <div>Today at 5:42PM</div>
                                </Comment.Metadata>

                                <Comment.Text>{msg.msg}</Comment.Text>

                                <Comment.Actions>
                                    <Comment.Action style={{ margin: '0' }}>
                                        <Icon name='hide' size='large' />
                                    </Comment.Action>
                                </Comment.Actions>

                            </Comment.Content>

                            {dividermah}

                        </Comment>
                    )
                }
                else if (msg.from === 'bot') {

                    let msgrender = msg.msg.map((eachmsg, index) => {
                        let msgsplit = eachmsg.split(":")
                        let msgheader = msgsplit[0]

                        // button is number
                        if (!isNaN(msgheader)) {
                            let buttonmsg = msgsplit[1].split('(')
                            let buttonname = buttonmsg[0]
                            let buttonpayload = buttonmsg[1].split(')')[0]
                            return (
                                <Button key={index} onClick={() => { this.props.handleButtonClick(buttonpayload) }} style={{marginTop: '10px'}}>
                                    {buttonname}
                                </Button>
                            )
                        }
                        else {
                            if(msgheader === 'Image') {
                                // check whether is an image or not
                                let imageUrl = eachmsg.slice(7)
                                if (imageUrl.indexOf("http://") === 0 || imageUrl.indexOf("https://") === 0) {
                                }
                                else {
                                    imageUrl = this.props.backendUrl + '/viewfile/' + imageUrl
                                }

                                return (
                                    <Image key={index} src={imageUrl} size='small' style={{ marginTop: '10px' }}/>
                                )
                            }
                            else {
                                // just a normal txt
                                return (<div key={index}>{msgheader}</div>)
                            }
                        }
                    })

                    return (
                        <Comment key={index}>

                            {botAvatar}

                            <Comment.Content>

                                <Comment.Author as={'a'}>Chatbot</Comment.Author>

                                <Comment.Metadata>
                                    <div>Today at 5:42PM</div>
                                </Comment.Metadata>

                                <Comment.Text>{msgrender}</Comment.Text>

                                <Comment.Actions>
                                    <Comment.Action style={{ margin: '0' }}>
                                        <Icon name='smile' size='large' />
                                    </Comment.Action>
                                    <Comment.Action style={{ margin: '0' }}>
                                        <Icon name='meh' size='large' />
                                    </Comment.Action>
                                    <Comment.Action style={{ margin: '0' }}>
                                        <Icon name='frown' size='large' />
                                    </Comment.Action>
                                </Comment.Actions>

                            </Comment.Content>
                            {dividermah}

                        </Comment>
                    )
                }
                return ''
            })
        }

        renderbody = (
            <Comment.Group minimal>
                {allMsgsRender}
            </Comment.Group>
        )

        if(this.props.waitingForAdmin) {
            renderbody = (
                <Dimmer active inverted>
                    <Loader inverted>Searching for a live agent</Loader>
                </Dimmer>
            )
        }

        if (this.props.showLiveChatForm) {
            // if request to show livechat form
            renderbody = (
                <div className="cancelpls">
                    <LivechatFormBody setUserInfo={this.props.setUserInfo}/>
                </div>
            )
        }

        return (
            <div ref={el => { this.el = el }} className="handle" style={{
                maxHeight: this.props.maxHeight,
                minHeight: this.props.minHeight,
                minWidth: '350px',
                maxWidth: this.props.maxWidth,
                overflowY: 'auto',
                borderRadius: '0',
                margin: '0'
            }}>
                <Segment style={{
                    minHeight: this.props.minHeight,
                    minWidth: '350px',
                    maxWidth: this.props.maxWidth,
                    borderRadius: '0',
                    margin: '0'
                }}>
                    {renderbody}
                </Segment>
            </div>
        )
    }
}

export default ChatboxBody
