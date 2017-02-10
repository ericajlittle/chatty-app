import React, {Component} from 'react';

import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    let renderedMessages = this.props.messages.map(function renderMessageComponent(messageObj) {
      return (
        <Message key={messageObj.id} username={messageObj.user} content={messageObj.content} type={messageObj.type}/>
      );
    });
    return (
      <main className="messages">
        {renderedMessages}
      </main>
    );
  }
}
export default MessageList;