import React, {Component} from 'react';
import Container from './container'
import data from  './items.js'
import Dialog from './dialog'
class App extends Component {
 constructor(props){
   super(props);
   this.state = ({
     dialog:false ,
     item: ' ',
     container:true
   });
   this.callBackCancel = () => {
     this.setState( {
       dialog:false,
       container:true
     })
   }
   this.callBackFromParent = (data) => {
     this.setState({
       dialog:true,
       item:data,
       container:false
     })
   }
 }

 render(){
   const {dialog, container } = this.state;
    let get_data = data.artist_list; // get array of music artists
    let item = this.state.item;

    if  ( window.localStorage.getItem('MusicArtists') === null )  {
      window.localStorage.setItem('MusicArtists', JSON.stringify(get_data) )} // initializing local storage with artists
    let MusicArtists = JSON.parse(localStorage.getItem('MusicArtists'));

      return (
        <>
      {container&& <Container openModal = {this.callBackFromParent} data = {MusicArtists} /> }
      {dialog && <Dialog  cancelWindow = {this.callBackCancel } item = {item} />}
      </>
   )
 }
}


export default App;
