import React, { useState, useContext } from 'react';
import Axios from 'axios';
import country_list from '../../Data/Country_List';
import UserContext from '../../context/UserContext';
import Cookies from 'js-cookie';

const ProfileData = props => {
	// console.log(props.data);

	const [firstName, setFirstName] = useState(props.data.firstName || '');
	const [lastName, setLastName] = useState(props.data.lastName || '');
	const [motherName, setMotherName] = useState(props.data.motherLastName || '');
	const [birthDate, setBirthDate] = useState(props.data.birthDate || '');
	const [email, setEmail] = useState(props.data.email || '');
	const [phone, setPhone] = useState(props.data.phone || '');
	const [secondName, setSecondName] = useState(props.data.secondName || '');
	const [accountType, setAccountType] = useState(props.data.accountType || '');
	const [nationality, setNationality] = useState(
		props.data.nationality || country_list[0]
	);
	const [dni, setDni] = useState(props.data.dni || '');
	const [doctype, setDoctype] = useState(props.data.doctype || 'DNI');
	const [docsList, setDocsList] = useState(['DNI', 'CE', 'Passport']);

	const { state, addToken, addName } = useContext(UserContext);

	// console.log(country_list);

	const handleSubmit = async e => {
		e.preventDefault();

		const body = {
			firstName,
			secondName,
			lastName,
			birthDate,
			email,
			phone,
			nationality,
			doctype,
			dni,
			accountType,
			motherLastName: motherName,
		};

		const header = {
			headers: {
				'x-auth-token': Cookies.get('token'),
			},
		};

		// console.log(body);
		const res = await Axios.post(
			'https://api.moni.pe/api/profiles',
			body,
			header
		);
		// console.log('res:-', res);
		props.handleShowEdit(props.state);
	};

	return (
		<section
			className='page-section pt-90 parallax-2'
			data-background='images/bkg-neutro.jpg'
		>
			<form className='form-normal'>
				<div className='container align-left'>
					<div className='col-md-5 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>
							<span className='orange'>*</span> Tipo de documento
						</h5>
						<select
							onChange={e => {
								setDoctype(e.target.value);
							}}
							class='input-sm'
							disabled=''
						>
							<option selected>{doctype}</option>
							{docsList.map((type, index) => {
								return (
									<option key={index} value={type}>
										{type}
									</option>
								);
							})}
						</select>

						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Nacionalidad
						</h5>
						<select
							onChange={e => {
								setNationality(e.target.value);
							}}
							class='input-sm'
							disabled=''
						>
							<option selected>{nationality}</option>
							{country_list.map((country, index) => {
								return (
									<option key={index} value={country}>
										{country}
									</option>
								);
							})}{' '}
						</select>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Primer nombre
						</h5>
						<input
							type='text'
							onChange={e => {
								setFirstName(e.target.value);
							}}
							class='input-sm'
							placeholder='Nombre'
							pattern='.{3,100}'
							value={firstName}
						/>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Apellido paterno
						</h5>
						<input
							type='text'
							onChange={e => {
								setLastName(e.target.value);
							}}
							class='input-sm'
							placeholder='Apellido Paterno'
							pattern='.{3,100}'
							value={lastName}
						/>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Fecha de nacimiento
						</h5>
						<input
							type='date'
							onChange={e => {
								setBirthDate(e.target.value);
							}}
							class='input-sm'
							placeholder='DD/MM/AAAA'
							pattern='.{3,100}'
							disabled=''
							value={birthDate}
						/>

						<h5 className='black bold mb-10  mt-20'>Email</h5>
						<input
							type='text'
							class='input-sm'
							onChange={e => {
								setEmail(e.target.value);
							}}
							placeholder='correo@usuario.com'
							pattern='.{3,100}'
							disabled=''
							value={email}
						/>

						<h5 className='black bold mb-10  mt-20'>
							<input type='checkbox' id='inlineCheckbox1' value='option1' /> ¿Es
							usted una Persona Expuesta Políticamente (P.E.P.)?
						</h5>
					</div>
					<div className='col-md-2 col-xs-12 padding0'></div>
					<div className='col-md-5 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>
							<span className='orange'>*</span> Nº de documento
						</h5>
						<input
							type='text'
							onChange={e => {
								setDni(e.target.value);
							}}
							class='input-sm'
							placeholder='N° de documento'
							pattern='.{3,100}'
							disabled=''
							value={dni}
						/>
						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Número telefónico
						</h5>
						<input
							type='text'
							onChange={e => {
								setPhone(e.target.value);
							}}
							class='input-sm'
							placeholder='Telefono'
							pattern='.{3,100}'
							value={phone}
						/>

						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Tipo de Perfil{' '}
						</h5>
						<input
							type='text'
							class='input-sm'
							placeholder='Tipo de Perfil'
							pattern='.{3,100}'
							value={accountType}
							disabled
						/>
						<h5 className='black bold mb-10 mt-20'>Segundo nombre</h5>
						<input
							type='text'
							onChange={e => {
								setSecondName(e.target.value);
							}}
							class='input-sm'
							placeholder=''
							pattern='.{3,100}'
							value={secondName}
						/>
						<h5 className='black bold mb-10 mt-20'>Apellido materno</h5>
						<input
							type='text'
							onChange={e => {
								setMotherName(e.target.value);
							}}
							class='input-sm'
							placeholder='Apellido Materno'
							pattern='.{3,100}'
							value={motherName}
						/>
					</div>
					<div className='col-md-12 col-xs-12 padding0'>
						<hr className='gray' />
						<div className='col-md-5 col-xs-12 padding0'>
							<button
								className='btn btn-mod btn-border-w btn-circle btn-alerta'
								onClick={() => {
									props.handleShowEdit(props.state);
								}}
							>
								<i className='fa fa-angle-left'></i>
								Regresar
							</button>
						</div>
						<div className='col-md-2 col-xs-12 padding0'></div>
						<div className='col-md-5 col-xs-12 padding0'>
							<a
								className='btn btn-mod btn-color btn-large btn-circle'
								onClick={handleSubmit}
							>
								Guardar
							</a>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default ProfileData;

{
	/* <div className="form-container w-100 pb-5">
      <form>
        <h2>Detalles personales</h2>
        <div className="row mt-4 mt-5 pt-5 profile-edit-margin">
          <div className="col-md-3">
            <div className="form-group">
              <label>Nombre de pila</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                id="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="second">Segundo nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Second"
                id="second"
                value={secondName}
                name="secondName"
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="last">Apellido</label>
              <input
                type="text"
                className="form-control"
                placeholder="last"
                id="last"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="phone">Número de teléfono</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row profile-edit-margin">
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="Nationality">Nacionalidad</label>
              <select
                className="form-control"
                id="Nationality"
                name="Nationality"
                value={nationality}
                onChange={(e) => {
                  setNationality(e.target.value);
                }}
              >
                {country_list.map((country, index) => {
                  return (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  );
                })}{" "}
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="birthDate">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                name="birthDate"
                placeholder="birthDate"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row profile-edit-margin">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="motherLastName">Apellido de la madre</label>
              <input
                type="text"
                className="form-control"
                id="motherName"
                name="motherName"
                placeholder="motherLastName"
                value={motherName}
                onChange={(e) => {
                  setMotherName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label>Tipo de Documento</label>
              <select
                className="form-control"
                name="currencyType"
                id="currency Type"
                value={doctype}
                onChange={(e) => {
                  setDoctype(e.target.value);
                }}
              >
                {docsList.map((type, index) => {
                  console.log(type);
                  return (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="dni">Número del Documento</label>
              <input
                type="text"
                className="form-control"
                id="dni"
                name="dni"
                placeholder="
                Número del Documento"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 pt-3">
          <button
            className="btn text-white mr-4"
            onClick={() => {
              props.handleShowEdit(props.state);
            }}
          >
            Cancelar
          </button>

          <button className="btn outline-btn ml-4" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </form>
      <style jsx>{`
        .profile-edit-margin {
          margin-left: 35vh;
        }

        @media (max-width: 650px) {
          .profile-edit-margin {
            margin-left: ;
          }
        }
      `}</style>
    </div> */
}
