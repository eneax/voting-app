class ProducList extends React.Component {
  render() {
    return (
      <div className="ui unstackable items">
        Hello, friend! I'm a basic React Component
      </div>
    );
  }
}

ReactDOM.render(
  <ProducList />,
  document.getElementById('content')
);
