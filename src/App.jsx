import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  addMessage(username, message) {
    const newMessage = {username: username, content: message, id: Date.now()};
    const newMessageList = this.state.messages.concat(newMessage);
    this.setState({messages: newMessageList});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <h1>CHAT ME</h1>
        <nav className="navbar">
          <a href="/" className="navbar-brand">¯\_(ツ)_/¯</a>
        </nav>

        <MessageList messages={this.state.messages}/>

        <ChatBar newMessage={this.addMessage.bind(this)} chatUser={this.state.currentUser.name}/>

      </div>
    );
  }
}
export default App;
