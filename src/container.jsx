import React, {Component} from 'react';
import './container.css'
export default class Container extends Component{
  constructor(props){
    super(props);
    this.state = ({
      item:this.props.data,
      page: false
    })
  }
  sortByName = () => {
   let allItems =   JSON.parse(localStorage.getItem('MusicArtists'));
   let sortedList = allItems.sort( (a, b) => (a.artist.artist_name > b.artist.artist_name) ? 1: -1 )
   this.setState( {
    item:sortedList,
    search: ''
   })
  }
  sortByDate = () => {
    let allItems =   JSON.parse(localStorage.getItem('MusicArtists'));
    let sortedList = allItems.sort( (a, b) => (a.artist.updated_time > b.artist.updated_time) ? 1: -1 )
    this.setState( {item:sortedList
    })
  }
  sortByRate = () => {
    let allItems =   JSON.parse(localStorage.getItem('MusicArtists'));
    let sortedList = allItems.sort( (a, b) => (a.artist.artist_rating > b.artist.artist_rating) ? -1: 1 )
    this.setState( {item:sortedList
    })
  }
  searchByName = (event) => {
    this.setState({
      search:event.target.value
    })
    let allItems =   JSON.parse(localStorage.getItem('MusicArtists'));
    let filtered_list = allItems.filter ( (item) => (
    ( (item.artist.artist_name).includes(this.state.search) )
    ))
    if ( this.state.page ===''){
      filtered_list = allItems;
    }
    this.setState({
      item:filtered_list
    })

  }

  changePage = () => {
    this.setState(function(state) {
      return {
        page: !state.page
      };
    });
    
  }

  render(){
    let i = 0;
    const {openModal} = this.props;

    this.handler = (itemArtist) => {
      openModal(itemArtist)

    }
    const artist_elem = this.state.item.map( (item) => {
      i++
      return (
        <div className = "item-elem">
          <div className="i">{i}</div>
          <div key={item.artist.artist_id} onClick = {()=>this.handler(item.artist)} className='item_id'>{item.artist.artist_id}</div>
          <div className='item_country'>{item.artist.artist_country}</div>
          <div className='item_name'>{item.artist.artist_name}</div>
          <div className='item_rating'>{item.artist.artist_rating}</div>
          <div className ='item_twitter'>{item.artist.artist_twitter_url ? item.artist.artist_twitter_url : `none`}</div>
          <div className='item_time'>{item.artist.updated_time}</div>
          <div className='item_comment'>{item.artist.artist_comment ? item.artist.artist_comment : `none`}</div>
        </div>
        
      )
    })
    let firstPage=[];
    for ( let i = 0; i<10 ; i++){
      firstPage.push(artist_elem[i])
    }
    let secondPage = [];
    for ( let i = 10; i<20 ; i++){
      secondPage.push(artist_elem[i])
    }
    

    return(
      <div className = 'container'>
        <div className = 'search-field'>
          <input onChange= {this.searchByName}type="text" placeholder="Search"></input>
        </div>
        <div className ="item-container">
          <div className = 'item-header'>
            <h3>Id</h3>
            <h3>Country</h3>
            <h3 onClick = {this.sortByName}>Name</h3>
            <h3 onClick = {this.sortByRate}>Rating</h3>
            <h3>Twitter URL</h3>
            <h3 onClick = {this.sortByDate}>Updated</h3>
            <h3>Comments</h3>
          </div>
          {this.state.page ? firstPage: secondPage}
          <div className="Buttons">
            
            <div className='first-page'>
            <input onClick = {this.changePage} type="button" value={ this.state.page ? 'Go to second page' : 'Go to first page'}/>
          </div>
          
          </div>
         
        </div>
        
      </div>
    )
  }
}