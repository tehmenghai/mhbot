import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

class LivechatFormBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            problem: '',
            submittedusername: '',
            submittedemail: '',
            submittedproblem: '',
        }
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { username, email, problem } = this.state
        this.setState({
            submittedusername: username,
            submittedemail: email,
            submittedproblem: problem
        })
        this.props.setUserInfo(username, email, problem)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Input name='username' label='Username' placeholder='Username' required onChange={this.handleChange}/>
                <Form.Input name='email' label='Email' placeholder='Email' type='email' required onChange={this.handleChange}/>
                <Form.TextArea name='problem' label='Message' placeholder='Tell us more about you...' required onChange={this.handleChange}/>

                <Button type='submit'>Submit</Button>

            </Form>
        )
    }
}

export default LivechatFormBody
