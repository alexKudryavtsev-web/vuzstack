function parseErrorMessageToText(message) {
  return Array.isArray(message) ? message.join(', ') : message;
}

export default parseErrorMessageToText;
