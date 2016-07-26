// Main.jsx  app

var React = require("react");
var ReactDOM = require("react-dom");
var Panel = require("./panel.jsx");
                
function render(){
    ReactDOM.render(<Panel />, document.getElementById("reactnode"));    
}
render();