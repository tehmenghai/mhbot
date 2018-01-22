import React from 'react'
import { Header } from 'semantic-ui-react'
import logo from '../images/nec_logo.png'
import { Image } from 'semantic-ui-react'

const PageHeaderImageProp = () => (
     <Image src={logo} size='large' />
    // <Header
    //   as='h2'
    //  // image= {logo}
    //   content='NEC Chatbot'
    // />
  )
  
  export default PageHeaderImageProp
  