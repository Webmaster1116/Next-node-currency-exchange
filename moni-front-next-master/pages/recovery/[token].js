import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';

export default props => {
	const router = useRouter();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const token = router.query.token;
	const [loading, setLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	useEffect(() => {
		const check = async token => {
			const res = await axios.get(
				// "http://localhost:5000/api/forget/reset"
				'https://api.moni.pe/api/forget/reset',
				{
					params: { resetPasswordToken: token },
				}
			);
			// console.log(res);
		};

		check(token);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		if (password === confirmPassword) {
			const body = {
				resetPasswordToken: token,
				password,
			};
			const res = await axios.post(
				// "http://localhost:5000/api/forget/updatePassword",
				'https://api.moni.pe/api/forget/updatePassword',
				body
			);
			// console.log('res:-', res);
		} else {
			console.log('password did not match');
		}
		setLoading(false);
		setIsUpdate(true);
	};

	if (loading === true) {
		return (
			<Layout>
				<div className='loading w-100 h-100'>
					<div className='loader'>
						<Loader />
					</div>
					<style>{`
          .loading {
            overflow: hidden
            margin: 20px;
            padding: 300px;
            height: 100vh;
            background: #071127;
            text-align: center;
          }
        `}</style>
				</div>
			</Layout>
		);
	}

	if (isUpdate === true) {
		return (
			<Layout>
				<div className='loading w-100 h-100'>
					<div className='loader'>Continue login with updated password.</div>
					<style>{`
      .loading {
        overflow: hidden
        margin: 20px;
        padding: 300px;
        height: 100vh;
        background: #071127;
        color: white;
        text-align: center;
      }
    `}</style>
				</div>
			</Layout>
		);
	}

	return (
		<>
			<Layout>
				<div className='main'>
					<form className='form'>
						Reset Password
						<div className='form-group mt-4'>
							<input
								className='input-control'
								placeholder='enter password'
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<div className='form-group'>
							<input
								className='input-control'
								placeholder='confirm password'
								value={confirmPassword}
								onChange={e => {
									setConfirmPassword(e.target.value);
								}}
							/>
						</div>
						<button className='btn' onClick={handleSubmit}>
							Submit
						</button>
					</form>
				</div>
				<style jsx>{`
					.main {
						margin-top: 200px;
						text-align: center;
					}
				`}</style>
			</Layout>
		</>
	);
};
