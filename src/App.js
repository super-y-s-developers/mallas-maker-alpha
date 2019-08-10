import React, { Component } from 'react';
import actions from 'services/actions';
import { connect } from "react-redux";
import { auth } from 'services/firebase';

import Welcome from 'scenes/Welcome';
import Plan from 'scenes/Plan';


class App extends Component {
	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if(user) {
				this.props.setCurrUser(user);
			} else {
				this.props.setCurrUser(null);
			}
		});
	}

	render() {
		if(this.props.currUser === {}) return "Cargando ..."
		else if(!this.props.currUser) return <Welcome action={"login"} />;
		return (
      <Plan />
  	);
	}
}

const mapStateToProps = ({ currUser }) => { return { currUser } };
export default connect(mapStateToProps, actions)(App);
