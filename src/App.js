import React, { Component } from 'react';
import { auth } from 'services/firebase';

import Welcome from 'scenes/Welcome';
import Plan from 'scenes/Plan';


class App extends Component {
	constructor() {
		super();
		this.state = { user: undefined }
	}

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if(user) {
				this.setState({ user });
			} else {
				this.setState({ user: null })
			}
		});
	}

	render() {
		if(this.state.user === undefined) return "Cargando ..."
		else if(!this.state.user) return <Welcome action={"login"} />;
		return (
      <Plan />
  	);
	}
}

export default App;
