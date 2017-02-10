import React, {Component} from 'react';


import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
const uuid = require('node-uuid');
const id = uuid.v1();
console.log('id: ', id);
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      countConnection: 0
    }
  }

  addMessage(username, message) {
    const userMessage = {
      type: "postMessage",
      id: id,
      user: username,
      content: message
    }
    this.socket.send(JSON.stringify(userMessage));
  }

  updateUsername(name) {
    this.addNotification(`${this.state.currentUser.name} has changed their name to ${name}`)
    this.setState({currentUser: {name: name}})
  }

  addNotification(content) {
    const notification = {
      type: "postNotification",
      id: id,
      content: content
    }
    this.socket.send(JSON.stringify(notification));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8080");
    this.socket.onerror = (event) => {
    };
    this.socket.onopen = (event) => {
      console.log('connected to server');
    };
    this.socket.onmessage = (event) => {
      const messageBroad = JSON.parse(event.data);
      const newMessageList = this.state.messages.concat(messageBroad);

      if (messageBroad.type === 'counter') {
        this.setState({countConnection: messageBroad.countConnection})
      }
      this.setState({messages: newMessageList})
    };
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
          <p>{this.state.countConnection} {this.state.countConnection === 1 ? "user" : "users"} online</p>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar newMessage={this.addMessage.bind(this)} username={this.state.currentUser.name} updateUsername={this.updateUsername.bind(this)}/>
      </div>
    );
  }
}
export default App;
