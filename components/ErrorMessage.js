class ErrorMessage {
  render(message) {
    return `<blockquote role="alert"><div class="alert alert-warning">${message}</div>
      </blockquote>`;
  }
}
const errorMessage = new ErrorMessage();
export default errorMessage;
