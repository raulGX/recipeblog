import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => state;

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
