import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import LogContent from '../LogContent';

export default class Container extends Component {
  static propTypes = {
    level: PropTypes.string,
    messages: PropTypes.array.isRequired,
  }

  static defaultProps = {
    level: 'info',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLevel(level) {
    const color = {
      'log': '#AAA',
      'info': '#0074D9',
      'warn': '#FF851B',
      'error': '#FF4136',
    }[level];

    return <Text style={[styles.dot, { color }]}>•</Text>;
  }

  render() {
    const { level } = this.props;
    let { messages } = this.props;

    // TODO: ignore the user's custom style for this version.
    const existCustomStyle = messages
    && messages[0]
    && typeof messages[0] === 'string'
    && messages[0].indexOf('%c') === 0;
    if (existCustomStyle) {
      messages = [
        messages[0].indexOf('%c ') === 0
        ? messages[0].substring(3)
        : messages[0].substring(2),
        ...messages.slice(2),
      ];
    }

    return (
      <View style={styles.container}>
        {this.renderLevel(level)}
        <View style={styles.messages}>
          {messages.map((message, i) => <LogContent key={i} message={message} />)}
        </View>
      </View>
    );
  }
}
