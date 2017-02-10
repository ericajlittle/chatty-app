import React, {Component} from 'react';

import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    let renderedMessages = this.props.messages.map(function renderMessageComponent(messageObj, i) {
      return (
        <Message key={i} username={messageObj.user} content={messageObj.content} type={messageObj.type}/>
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