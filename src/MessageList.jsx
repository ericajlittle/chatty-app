import React, {Component} from 'react';

import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    console.log('this.props.messages', this.props.messages);
    const renderedMessages = this.props.messages.map(function renderMessageComponent(messageObj) {
      console.log('trying to render', messageObj);
      return (
        <Message key={messageObj.id} username={messageObj.username} content={messageObj.content} />
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