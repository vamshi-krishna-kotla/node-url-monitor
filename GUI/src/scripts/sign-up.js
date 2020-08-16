import '../styles/sign-up.scss';

import { Alert } from '../support';

// get data from the form
window.onload = function () {
	document.querySelector('#user-data').addEventListener('submit', function(event) {
		// stop the form from default submission
		event.preventDefault();
		let payload = {};
		let elements = [...this.elements];
		['firstName', 'lastName', 'email'].forEach(sel => {
			payload[sel] = elements.find(function (e) {
				return e.className == sel;
			}).value;
		});

		payload['tosAgreement'] = true;

		// validate phone number
		let phoneNumber = elements.find(function (e) {
			return e.className == 'phone';
		}).value;

		if(validatePhone(phoneNumber)) {
			payload['phone'] = phoneNumber;

			// validate whether password and re-entered password are same
			let enteredPassword = elements.find(function (e) {
				return e.className == 'password';
			}).value;
			let checkPassword = elements.find(function (e) {
				return e.className == 'reenter-password';
			}).value;
	
			let finalPassword = (enteredPassword === checkPassword) ? enteredPassword : false;
			if(finalPassword) {
				payload['password'] = finalPassword;
				
				createUser(payload);
			}
			else {
				alert('Passwords do not match!');
			}
		}
		else {
			alert('Please enter a valid phone number [10 digits]');
		}

	});

};

function validatePhone(phone) {
	// return true if phone is number and of 10 digits; else return false
	return /^[0-9]{10}$/.test(phone);
}

async function createUser(payload) {
	var message = '';
	try {
		// POST to API with payload
		var response = await fetch('http://localhost:3000/users', {
			method: 'POST',
			body: JSON.stringify(payload)
		});

		var data = await response.json();

		// handle the response
		if(response.status == 200) {
			// if the POST request returns 200 - display a success message to the user
			// give a link to login for the newly created user - take to sign-in page
			message = 'New user created successfully';
		}
		else if(response.status == 400 || response.status == 500) {
			// if the response is 400 - display an error message to the user with msg regarding invalid request
			message = data.Error;
		}
		else {
			// if the response is anything else - display an error message to the user
			throw 'Error while creating new User! Please try again later!';
		}
	}
	catch(e) {
		message = (typeof e === 'string') ? e : 'Error: Couldn\'t make a successful HTTP fetch call!';
	}
	finally {
		const a = new Alert(message);
		a.appendToDOM('.page-content');
	}
}