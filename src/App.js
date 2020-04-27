import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { HorizontalBar } from "react-chartjs-2";
import Grafica from "./service-graph";
import io from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:9090",
      inputValue: "",
      userValue: "",
      otherValue: false,
      mychart: false,
      compachart: false,
    };
  }

  componentDidMount() {
    this.setState({
      mychart: new Grafica("Yo", 0, 0),
      compachart: new Grafica("Mi compa", 0, 0),
    });
    this.socket = io(this.state.endpoint);
    this.socket.on("write", (data) => {
      this.setState({ otherValue: data });
    });
    this.socket.on("grafica", (data) => {
      this.setState({ compachart: data });
      console.log(data);
    });
  }

  wordsAndletters() {
    const texto = this.state.inputValue;
    let letras = texto.split("");
    let palabras = texto.split(" ");
    letras = letras.filter(function (str) {
      return /\S/.test(str);
    });
    palabras = palabras.filter(function (str) {
      return /\S/.test(str);
    });

    this.socket.emit(
      "grafica",
      new Grafica(this.state.userValue, letras.length, palabras.length)
    );
    this.setState({
      mychart: new Grafica(
        this.state.userValue,
        letras.length,
        palabras.length
      ),
    });
  }

  updateValue(evt) {
    this.setState({
      inputValue: evt.target.value,
    });

    this.wordsAndletters();
  }
  updateUser(evt) {
    this.setState({
      userValue: evt.target.value,
    });
  }

  sendValue() {
    this.socket.emit("write", {
      name: this.state.inputValue,
      body: this.state.userValue,
    });
  }

  render() {
    const paperStyle = {
      margin: "20px",
      marginTop: "40px",
    };
    return (
      <div className="App">
        <Grid container justify="center">
          <Grid item xs={12} sm={7}>
            <Paper style={paperStyle} elevation={7}>
              <TextField
                label="User name"
                size="small"
                type="text"
                autoComplete="current-password"
                variant="filled"
                fullWidth
                value={this.state.userValue}
                onChange={(evt) => this.updateUser(evt)}
              />
              <TextField
                placeholder="Type here"
                multiline
                rows={20}
                variant="outlined"
                fullWidth
                value={this.state.inputValue}
                onChange={(evt) => this.updateValue(evt)}
              />
              <Button
                fullWidth
                color="primary"
                onClick={this.sendValue.bind(this)}
              >
                send
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <HorizontalBar data={this.state.mychart} />

            <HorizontalBar data={this.state.compachart} />
          </Grid>
        </Grid>
        {this.state.otherValue ? (
          <Paper style={paperStyle}>
            <Card variant="outlined" raised>
              <CardContent>
                <Typography color="textSecondary">
                  <b> Mi compa: </b> {this.state.otherValue.body}
                </Typography>
                <Typography color="textPrimary">
                  {this.state.otherValue.name}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default App;
