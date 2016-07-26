var React = require('react');

module.exports = React.createClass({
  getInitialState() {
    return {high:''};
  },
  highlight(key){
    this.setState({high:key});
  },
  getItems(results, high) {
    var keys = Object.keys(results);
    var __this = this;
    if (keys.length > 0) {
      return keys.map(function(key) {
      var spanClass = results[key] === high ? 'high' : 'low'
      return (
        <div className='result' key={key}>
          <strong>{key}:</strong>
          <span onClick={__this.highlight.bind(__this, results[key])}
            title="Click to highlight similar"
            className={spanClass}>{results[key]}</span>
        </div>);
      })
    } else {
      return (
        <div className='result'>No entries</div>
        );
    }
    
  },
  render() {
    return (
      <div>
        {this.getItems(this.props.results, this.state.high)}
      </div>
      );
  }
})