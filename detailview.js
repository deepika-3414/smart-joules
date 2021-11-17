import React from 'react'
// import 'semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import {Card, Grid, Icon, Image,Container,Search ,Dropdown} from 'semantic-ui-react'

class DetailView extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container>
                <Image
                src = {this.props.data.flag}
                />
s
            </Container>
            
        )

        
    }




}
export default DetailView