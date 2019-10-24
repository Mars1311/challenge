import React, {Component} from 'react';
import './dialog.css'
class SignUpDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      login:'',
      name: '',
      password: '',
      current_user: '',
    }
    this.onloginchange = (event ) => {
     this.setState({
        login:event.target.value
      });
    }
    this.onNameChange = (event) => {
      this.setState ({
        name:event.target.value
      })
    }
    this.onpasswordchange = (event) => {
      this.setState ({
        password:event.target.value
      })
    }
    this.createNewPerson = (login, name, password) => {
      let newPerson = {};
      newPerson.login = login;
      newPerson.name = name;
      newPerson.password = password;
      return(newPerson)
    }
    this.signin = () => {
      let newPerson = this.createNewPerson(this.state.login, this.state.name, this.state.password);

      if ( window.localStorage.getItem('People').length === 0 ||
           window.localStorage.getItem('People') === null )  
        { window.localStorage.setItem('People', [] )}
        
        let list_people = localStorage.getItem('People');

        if ( list_people === null || list_people.length === 0){
          list_people = [newPerson]
          localStorage.setItem('People', JSON.stringify(list_people))
        }
        else {
          let list = JSON.parse(list_people);

          if (list.some ( e => e.login === newPerson.login) 
          )   {
            console.log('bad')
          } 

          else {
            list.push(newPerson)
          }
          localStorage.setItem('People', JSON.stringify(list))


         
        }


      this.setState({
        current_user:newPerson
      })

      this.props.parent(this.state.current_user)
      }
  }
  render(){
    return (
      <div>
        <div>
          <input onChange={this.onNameChange} placeholder = " Name "></input>
        </div>
        <div>
          <input onChange={this.onloginchange} placeholder = " email "></input>
        </div>
        <div>
          <input onChange={this.onpasswordchange} placeholder= " password "></input>
        </div>
        <input type="button" onClick = {this.signin} value="Submit"></input>
      </div>
    );

      
  }
}
export default SignUpDialog;