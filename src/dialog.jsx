import React, {Component} from 'react';
import './dialog.css'
export default class Dialog extends Component {
  constructor(props){
    super(props);
    this.state = ({
      inputId:  this.props.item ? this.props.item.artist_id : '',
      inputName: this.props.item ? this.props.item.artist_name : '',
      inputCountry:this.props.item ? this.props.item.artist_country : '',
      inputRating:this.props.item ? this.props.item.artist_rating : '',
      inputUpload:this.props.item ? this.props.item.artist_updated_time : '',
      inputTwitter:this.props.item ? this.props.item.artist_twitter_url : '',
      inputComments: [],
      editedName: '',
      editedRagting: '',
      editedComment: ''
    })

    this.onNameChange = (event ) => {
      this.setState({ editedName: event.target.value });
    }
    this.onRatingChange = (event ) => {
      this.setState({ editedRagting: event.target.value });
    }

    this.onCommentChange  = (event ) => {
      this.setState({ editedComment: event.target.value });
    }

   this.onSubmit = (event) => {
      event.preventDefault();
      let musicArtists = JSON.parse(localStorage.getItem('MusicArtists'));
      
    for ( let i = 0; i<musicArtists.length; i++){
     if(musicArtists[i].artist.artist_id === this.state.inputId){
  
      (musicArtists[i].artist.artist_name = this.state.editedName);
      (musicArtists[i].artist.artist_comment = this.state.editedComment);

     }
    }
    localStorage.setItem('MusicArtists',  JSON.stringify(musicArtists))
      }
  }
 
  render(){
    const {cancelWindow}  = this.props;
    return (
      <div className="dialog-window">
        <div className="edit-button">Edit Dialog</div>
        <form onSubmit = {this.onSubmit}> 

          <input type="text" readOnly="readonly" value={this.state.inputId} placeholder="id"></input>
          <input type="text" onChange={this.onNameChange}  placeholder="name"></input>
          <input type="text" readOnly="readonly" value={this.state.inputCountry} placeholder="country"></input>
          <input type="text" onChange={this.onRatingChange} value={this.state.inputRating} placeholder="Rating"></input>
          <input type="text" readOnly="readonly" value={this.state.inputUpload} placeholder="Uploaded at"></input>
          <input type="text" readOnly="readonly" value={this.state.inputTwitter} placeholder="Twitter url"></input>
          <input type="text"  onChange={this.onCommentChange} placeholder="Comments"></input>
        <div className="option-buttons">
          < input type = "button" onClick = {cancelWindow} value ="cancel" className = "cancel-button"/>
          < input type = "submit"  className = "save-button" value="Save"/> 
        </div>
        </form>
        


      </div>
    )};
}