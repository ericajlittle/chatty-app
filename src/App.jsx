import React, {Component} from 'react';


import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
const uuid = require('node-uuid');
const socket = new WebSocket('ws://localhost:8080');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
  }

  addMessage(username, message) {
    const userMessage = {
      id: uuid.v1(),
      user: username,
      content: message
    }
    this.socket.send(JSON.stringify(userMessage));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8080");
    this.socket.onerror = (event) => {
      console.log(event);
    };
    this.socket.onopen = (event) => {
      console.log('connected to server');
    };

    socket.onmessage = (event) => {
      const messageBroad = JSON.parse(event.data);
      console.log(messageBroad);
      const newMessageList = this.state.messages.concat(messageBroad);
      this.setState({messages: newMessageList})
    };

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, user: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
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
