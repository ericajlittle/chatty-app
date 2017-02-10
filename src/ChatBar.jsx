import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      messageContent: ''
    };

    console.log("this.state: ", this.state);
    console.log("this.props: ", this.props);
    console.log('this example: ', this.props.example);
  }


  handleUserBlur(event) {
    this.props.updateUsername(event.target.value);
  }

  handleUserNameChange(event) {
    this.setState({username: event.target.value});
  }

  handleMessageContentChange(event) {
    this.setState({messageContent: event.target.value});

  }

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.username, this.state.messageContent);
      this.setState({messageContent: ""});
    }
  }

  render() {
    return (
    <footer className="chatbar">

      <input className="chatbar-username"
        value={this.state.username}
        onChange={this.handleUserNameChange.bind(this)}
        onBlur={this.handleUserBlur.bind(this)}/>

      <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        value={this.state.messageContent}
        onChange={this.handleMessageContentChange.bind(this)}
        onKeyDown={this.handleEnterKey.bind(this)}/>

    </footer>
    );
  }
}
export default ChatBar;