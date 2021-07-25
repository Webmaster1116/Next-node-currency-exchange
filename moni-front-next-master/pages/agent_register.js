import React, { Component } from 'react';
import Layout from '../components/Layout';
import Reg from '../components/Register/AgentRegister';
import Navbar from '../components/Admin/topNavbar';

const emailRegex = RegExp(
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneRegex = RegExp(/^[0-9\b]+$/);

class Register extends Component {
	state = {
		name: '',
		firstName: '',
		lastName: '',
		password: '',
		email: '',
		phone: '',
		dni: '',
		address: '',
		companyName: '',
		ruc: '',
		bankName: 'BCP',
		nickname: '',
		accountNumber: '',
		type: 'savings',
		accountType: 'Personal',
		currency: 'Dollars',

		formErrors: {
			name: '',
			firstName: '',
			lastName: '',
			password: '',
			email: '',
			phone: '',
			dni: '',
			address: '',
			companyName: '',
			ruc: '',
			bankName: '',
			nickname: '',
			accountNumber: '',
			type: '',
			accountType: '',
			currency: '',
		},
	};

	//   handleChange = (input) => (event) => {
	//     const name = input;
	//     const formErrors = { ...this.state.formErrors };
	//     const { value } = event.target;
	//     console.log(name, value);
	//     switch (name) {
	//       case "firstName":
	//         formErrors.firstName =
	//           value.length < 3 ? "minimum 3 characaters required" : "";
	//         break;
	//       case "email":
	//         formErrors.email = emailRegex.test(value)
	//           ? ""
	//           : "invalid email address";
	//         break;
	//       case "password":
	//         formErrors.password =
	//           value.length < 6 ? "minimum 6 characaters required" : "";
	//         break;

	//       case "lastName":
	//         formErrors.lastName =
	//           value.length < 3 ? "minimum 3 characaters required" : "";
	//         break;

	//       case "phone":
	//         formErrors.phone =
	//           phoneRegex.test(value) || value.length > 6
	//             ? ""
	//             : "valid phone number required";
	//         break;
	//       case "dni":
	//         formErrors.dni =
	//           phoneRegex.test(value) || value.length > 6
	//             ? ""
	//             : "valid document number required";
	//         break;

	//       default:
	//         break;
	//     }

	//     this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	//   };

	handleChange = input => event => {
		const { value } = event.target;
		this.setState({ [input]: value });
		// console.log(input, value);
	};

	render() {
		const { step, formErrors } = this.state;
		const {
			name,
			firstName,
			lastName,
			password,
			email,
			phone,
			dni,
			accountType,
			address,
			companyName,
			ruc,
		} = this.state;
		const values = {
			name,
			firstName,
			lastName,
			password,
			email,
			phone,
			dni,
			accountType,
			address,
			companyName,
			ruc,
		};

		return (
			<>
				<Layout>
					{/* <div className="page-loader">
            <div className="loader">Cargando...</div>
          </div> */}

					<Reg
						handleChange={this.handleChange}
						values={values}
						formErrors={formErrors}
						setRegisterOn={this.props.setRegisterOn}
					/>
				</Layout>
			</>
		);
	}
}

export default Register;
