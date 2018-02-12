import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, Input, Label } from 'reactstrap';

export default function run_index(root) {
  ReactDOM.render(<Index />, root);
}

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = { gamename: null }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(i) {
    this.setState({
      gamename: i.target.value,
    });
  }

  render() {
    let url = '/';
    if (this.state.gamename) {
      url = '/game/' + this.state.gamename;
    }

    return (
      <Form>
        <Input onChange={this.handleInput} placeholder={'Type a name'} />
        <Button id="button" color='primary' href={url}>Join the Game</Button>
      </Form>
    );
  }
}
