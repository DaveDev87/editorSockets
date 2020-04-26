import React, { Component } from "react";
import io from "socket.io-client";
import EditorJS from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";

const datos = {
  blocks: [
    {
      type: "header",
      data: {
        text: "Type here",
        level: 2,
      },
    },
  ],
  version: "2.8.1",
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:9090",
      datos: datos,
      prueba: "initial"
     
    };
    
  }

  componentDidMount(){
    this.socket = io(this.state.endpoint);
    this.socket.on("chat", data => {
      this.setState({prueba: data})
      // console.log(this.state.datos)
    })
  }

  handleClick(e){
    const {prueba} = this.state;
    this.socket.emit("chat", "salio" )
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.prueba}</p>
        <EditorJS data={this.state.datos} onChange={this.handleClick.bind(this)} tools={EDITOR_JS_TOOLS} />
      </div>
    );
  }
}

export default App;
