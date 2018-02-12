import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function game_init(root, channel) {
  ReactDOM.render(<HangmanGame channel={channel} />, root);
}

class HangmanGame extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = { skel: [], goods: [], bads: [], max: 10 };

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => { console.log("Unable to join", resp) });
  }

  gotView(view) {
    this.setState(view.game);
  }

  sendGuess(ev) {
    this.channel.push("guess", { letter: ev.key })
      .receive("ok", this.gotView.bind(this));
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <Word state={this.state} />
        </div>
        <div className="col-6">
          <Lives state={this.state} />
        </div>
        <div className="col-6">
          <Guesses state={this.state} />
        </div>
        <div className="col-6">
          <GuessInput guess={this.sendGuess.bind(this)} />
        </div>
      </div>
    );
  }
}

function Word(params) {
  let state = params.state;

  return (
    <div>
      <p><b>The Word</b></p>
      <p>{state.skel.join(" ")}</p>
    </div>
  );
}

function Lives(params) {
  let state = params.state;
  let remain = state.max - state.bads.length;
  let win = state.skel.indexOf('_');
  if (win == -1) {
    return <div>
      <p className="text-success"><b>You Win</b></p>
    </div>;
  }

  if (remain <= 0) {
    return <div>
      <p className="text-danger"><b>You Lose</b></p>
    </div>;
  } else {
    return <div>
      <p className="text-info"><b>Guesses Left:</b></p>
      <p className="text-info">{state.max - state.bads.length}</p>
    </div>;
  }
}

function Guesses(params) {
  let state = params.state;

  return <div>
    <p className="text-warning"><b>Bad Guesses</b></p>
    <p className="text-warning">{state.bads.join(" ")}</p>
  </div>;
}

function GuessInput(params) {
  return <div>
    <p className="text-primary"><b>Type Your Guesses</b></p>
    <p><input type="text" onKeyPress={params.guess} /></p>
  </div>;
}
