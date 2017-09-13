import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './createContact';

class App extends Component {
	state = {
		contacts: [],
		screen: 'create' // list, create
	}

	componentDidMount() {
		ContactsAPI.getAll().then((contacts) => {
			this.setState({ contacts })
		})
	}

	removeContact = (contact) => {
		this.setState((state) => ({
			contacts: state.contacts.filter((c) => c.id !== contact.id)
		}))

		ContactsAPI.remove(contact)
	}

	render() {
		return (<div className="app">
				{this.state.screen === 'list' &&
				(
					<ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact}/>
				)
				}
				{this.state.screen === 'create' && (<CreateContact/>)}
				</div>
			)
	}
}

export default App;
