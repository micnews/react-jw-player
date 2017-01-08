class MockComponent {
  constructor(props) {
    this.props = props;
    this.setStateCalled = false;
    this.state = props.initialState;
  }
  setState(newState) {
    this.setStateCalled = true;
    this.state = newState;
  }
}

export default MockComponent;
