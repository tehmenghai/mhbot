import React, { Component } from 'react'
import { Icon, Segment, Comment, Divider, Image, Dimmer, Loader, List } from 'semantic-ui-react'
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

        botAvatar = (<Comment.Avatar as={Image} src={this.props.backendUrl + '/viewfile/avatarpic.png'} size='large'/>)

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
                                    <div>Today at {msg.msgtime}</div>
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

                    let parsedmsg = JSON.parse(msg.msg)
                    let msgrender = ''

                    if (Array.isArray(parsedmsg)) {

                        msgrender = parsedmsg.map((eachmsg, index)=>{

                            switch (eachmsg.type) {
                                case 'TEXT':
                                    return (<div key={index}>{eachmsg.text}</div>)

                                case 'IMG':
                                    let imageUrl = eachmsg.image
                                    if (imageUrl.indexOf("http://") === 0 || imageUrl.indexOf("https://") === 0) {
                                    }
                                    else {
                                        imageUrl = this.props.backendUrl + '/viewfile/' + imageUrl
                                    }

                                    return (
                                        <Image key={index} src={imageUrl} size='small' style={{ marginTop: '10px', width: 'auto' }} />
                                    )

                                case 'QR':
                                    return (
                                        <List key={index} bulleted>
                                            {eachmsg.buttons.map((button, bi) => {
                                                return (
                                                    <List.Item as='a' key={bi} onClick={() => { this.props.handleButtonClick(button.payload) }} style={{ marginTop: '10px' }}>
                                                        {button.text}
                                                    </List.Item>
                                                )
                                            })}
                                        </List>
                                    )

                                default:
                                    return (<div key={index}>adsf</div>)

                            }
                        })

                    }
                    else {
                        switch (parsedmsg.type) {
                            case 'TEXT':
                                msgrender = parsedmsg.text
                                break

                            default:
                                break
                        }
                    }

                    return (
                        <Comment key={index}>

                            {botAvatar}

                            <Comment.Content>

                                <Comment.Author as={'a'}>Chatbot</Comment.Author>

                                <Comment.Metadata>
                                    <div>Today at {msg.msgtime}</div>
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


/**
 * let msgrender = msg.msg.map((eachmsg, index) => {

let msgsplit =''
let msgheader = ''
if (eachmsg==='')
{
msgheader ='EmptyRow'
}
else
{
msgsplit = eachmsg.split(":")
msgheader = msgsplit[0]
}

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
<Image key={index} src={imageUrl} size='small' style={{ marginTop: '10px', width: 'auto' }}/>
)
}
else  if(msgheader === 'EmptyRow') {
return (<div key={index}>&nbsp;</div>)
}
else {

switch(msg.msgtype) {
case 'list':

if (msgsplit.length>1)
{

    let ulmsg = ''
    let ulname = ''
    let ulpayload = ''

    if( (msgheader === 'Url') || (msgheader === 'mailto')) {
            ulmsg = msgsplit[1].split('(')
            ulname = ulmsg[0]
            ulpayload = ulmsg[1].split(')')[0]
    }
    else  {
        ulmsg = msgsplit[1]
        ulname = msgsplit[1]
        ulpayload = msgsplit[1]

    }
    

    if(msgheader === 'mailto') {
        ulpayload = "mailto:" + ulpayload
    }
    else
    {
        switch(ulpayload) {
            case 'https':
                ulpayload = ulmsg[1].split(')')[0] + ":" + msgsplit[2].split(')')[0]
                    
            case 'http' :   
                ulpayload = ulmsg[1].split(')')[0] + ":" + msgsplit[2].split(')')[0]
                        
        }
    }

    
            
if(msgheader === 'Input') {

    return ( 
        <div>
            <ul key={index}>
            <li><a href='#' onClick={() => { this.props.handleButtonClick(ulpayload) }} style={{marginTop: '10px'}}>
            {ulname}</a></li>
            
            </ul>
        </div>);

}
else  if(msgheader === 'mailto') {
    return ( 
        <div>
            <ul key={index}>
    <li><a href={ulpayload} style={{ marginTop: '10px' }}>
    {ulname}</a></li>
                </ul >
            </div >);
}
{

return (
<div>
<ul key={index}>
<li><a href={ulpayload} target="_blank" style={{ marginTop: '10px' }}>
{ulname}</a></li>
</ul>
</div>);

}


}
                                            
default:
return (<div key={index}>{msgheader}</div>)

}

// return (<div key={index}>{msgheader}</div>)
}
}
})
 */
