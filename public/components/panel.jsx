var React = require('react');
var Display = require('./display.jsx');

module.exports = React.createClass ({
  getInitialState(){
      return {keys: [], currentKey:'', results:[]};
  },
  componentDidMount(){
    fetch('/delimiters').then((response) => {
        return response.json();
    }).then((data) => {
        this.setState({keys: data});
    }).catch((err) => {
        throw new Error(err);
    });
  },
  getOptions(keys) {
    if (keys.length > 0) {
      var options =  keys.map((key) =>{
        return (
          <option key={key} value={key}>{key}</option>
          );
      });
      options.unshift(<option key='default'>Select...</option>);
      return options;
    } else {
      return (
        <option>Loading...</option>
        );
    }
  },
  switch() {
    var key = this.refs.key.value;
    this.setState({currentKey:key});
    fetch('/delimiters/' + key).then((response) => {
        return response.json();
    }).then((data) => {
      this.setState({results:data});
    }).catch((err) => {
        throw new Error(err);
    });
  },
  removeCurrent() {
    fetch('/delimiters/' + this.state.currentKey, {method:'DELETE'}).then((response) => {
        return response.json();
    }).then((data) => {
      this.setState({keys:data, currentKey:''});
    }).catch((err) => {
        throw new Error(err);
    });
  },
  addNew() {
    var newKey = this.refs.newKey.value;
    if (newKey && newKey > '') {
      fetch('/delimiters/' + newKey, {method:'POST'}).then((response) => {
        return response.json();
      }).then((data) => {
        this.setState({keys:data, currentKey:newKey, results:[]});
      }).catch((err) => {
          throw new Error(err);
      });
    }
  },
  render(){
    var button = this.state.currentKey !== '' ? <button onClick={this.removeCurrent}>Remove {this.state.currentKey}</button> : <span />;
    return (
      <div>
        <div>
          <select ref="key" value={this.state.currentKey} onChange={this.switch}>
            {this.getOptions(this.state.keys)}
          </select>
          {button}
          <input ref='newKey'></input>
          <button onClick={this.addNew}>Add Delimiter Type</button>
        </div>
        <Display results={this.state.results}/>
      </div>
    )
  }
})