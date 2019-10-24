import React, {Component} from 'react';
import './header.css'
class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      modal:false,
    }

    this.openModal = () => {
      this.setState( {
        modal:true
      });
    }
  }
  render(){
    const {parentLogin, parentSignIn} = this.props;
    return(
      <div className='app-header'>
        <div className='sign-in' onClick={parentLogin}>sign In</div>
        <div className='log-in' onClick={parentSignIn}>Log In</div>
      </div>
    )
  }

}
export default Header;