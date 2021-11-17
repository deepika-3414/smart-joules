import logo from './logo.svg';
import './App.css';
import React ,{Link} from 'react'
// import 'semantic.min.css'

import 'semantic-ui-css/semantic.min.css'
import {Card, Grid, Icon, Image,Container,Search ,Dropdown} from 'semantic-ui-react'
import DetailView from './detailview';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
          data : [],
          onsearchvalue : '',
          searchResultArray : [],
          isSearching : false,
          listOfRegions : [],
    }

    this.countryOptions = [
      { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
      { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
      { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
      { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
      { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
      { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
      { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
      { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
      { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
      { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
      { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
      { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
      { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
      { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
      { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
      { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
      { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
      { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
      { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
      { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
    ]
 
   let  media = 'kumar'
  }

   async componentDidMount(){
     let Regions = []
     let listOfRegions = []
    let url = 'https://restcountries.com/v2/all'
     await  fetch(url).
      then(response=> response.json()).
      then( data => { 
        data.map(ele=>{
          if(!Regions.includes(ele.region))
          {
            console.log(ele.region)
            Regions.push(ele.region)
            listOfRegions.push({ key : ele.name , value : ele.region ,text : ele.region })
          }
         // listOfRegions.push({ key : ele.name , value : ele.region   })
        })
        this.setState({
          data : data,
          listOfRegions : listOfRegions
        })
        
         } )
         console.log(listOfRegions)

         
      
  }
  setResult =(value,ByRegion)=>{
    console.log(value)
    let re = new RegExp(value.trim());
    let resultArray = []
    resultArray= this.state.data.filter((element)=>{
      if(ByRegion)
      return element.region.toLowerCase() == value.toLowerCase()
        
      else
      return re.exec(element.name.toLowerCase())
    })
    console.log(resultArray)
    this.setState({
      searchResultArray : resultArray,
      isSearching : false
    })
  }


  render(){
    let dataArraytobeShown = []
    if(this.state.onsearchvalue.trim() === '' ){
       dataArraytobeShown = this.state.data
    }
    else{
      dataArraytobeShown = this.state.searchResultArray
    }
    return (
      <Container>

      <Search
          loading={this.state.isSearching}
          onResultSelect={(e, data) =>{
            console.log(data); }
          }
          onSearchChange={(e,{value})=>{  
            console.log(value)
             this.setState({ onsearchvalue : value , isSearching : true });this.setResult(value,false)  }}
         // results={results}
          value={this.state.onsearchvalue}
        />
      <Dropdown
         placeholder='Select Region'
         onChange={(e,{value})=>{   this.setState({ onsearchvalue : value , isSearching : true });this.setResult(value,true)  }}
          search
       selection
        options={this.state.listOfRegions}
     />
      <Grid relaxed  style={{ margin  : 10  }}>
      <Grid.Row columns={4} fluids>
      { dataArraytobeShown.map(ele=>(
       <Grid.Column key={ele.name}>
         
      <Card key={ele}  >
      <Image src={ele.flags.png} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{ele.name}</Card.Header>
        <Card.Description>
          Population:{ele.population}<br/>
          Region :{ele.region} <br/>
          Capital : {ele.capital}
        </Card.Description>
      </Card.Content>
    </Card>
  
    </Grid.Column>
   
    
    
    
    
      )) }
      
      </Grid.Row>
      </Grid>
      </Container>
    )



  }



}


export default App;
