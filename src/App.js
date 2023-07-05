import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
const propTypes = {};

const defaultProps = {};

class App extends React.Component {
  name = "sai";
  constructor(props) {
    super(props);

    this.state = {
      progress:10
    };
  }
  setProgress =(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <NavBar /> 
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => (0)}
      />
        <News setProgress={this.setProgress}/>
      </>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
