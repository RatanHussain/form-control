/** @format */

import { useState } from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	let [formData, setFromData] = useState({
		inputName: '',
		inputEmail: '',
		inputPhone: '',
		inputPassowrd: '',
		inputIndex: '',
	});

	let formHandle = (event) => {
		let oldData = { ...formData };
		let inputedName = event.target.name;
		let inputedValue = event.target.value;
		oldData[inputedName] = inputedValue;

		setFromData(oldData);
	};

	let [userData, setUserData] = useState([]);

	let submitHandle = (event) => {
		event.preventDefault();

		if (formData.inputIndex === '') {
			let uservalidation = userData.filter(
				(v, i) =>
					v.inputEmail == formData.inputEmail ||
					v.inputPhone == formData.inputPhone
			);
			if (uservalidation.length > 0) {
				toast.error('Email or Phone already exist...!');
			} else {
				let formDatas = formData;
				let usersData = [...userData, formDatas];

				setUserData(usersData);

				setFromData({
					inputName: '',
					inputEmail: '',
					inputPhone: '',
					inputPassowrd: '',
					inputIndex: '',
				});
				toast.success('Data saved');
			}
		} else {
			let uservalidation = userData.filter(
				(v, i) =>
					(v.inputEmail == formData.inputEmail ||
						v.inputPhone == formData.inputPhone) &&
					i !== formData.inputIndex
			);
			if (uservalidation.length > 0) {
				toast.error('Email or Phone already exist...!');
			} else {
				let indexNumber = formData.inputIndex;
				let oldData = userData;
				oldData[indexNumber]['inputName'] = formData.inputName;
				oldData[indexNumber]['inputEmail'] = formData.inputEmail;
				oldData[indexNumber]['inputPhone'] = formData.inputPhone;
				oldData[indexNumber]['inputPassword'] = formData.inputPassowrd;
				setUserData(oldData);

				setFromData({
					inputName: '',
					inputEmail: '',
					inputPhone: '',
					inputPassowrd: '',
					inputIndex: '',
				});
				toast.success('Update complete');
			}
		}
	};

	let deleteBtn = (indexNumber) => {
		let afterDeleted = userData.filter((v, i) => i !== indexNumber);
		setUserData(afterDeleted);
		toast.success('Delete complete');
	};

	let updateBtn = (indexNumber) => {
		let editingData = userData.filter((v, i) => i === indexNumber)[0];
		editingData['inputIndex'] = indexNumber;

		setFromData(editingData);
	};

	return (
		<div className='App'>
			<ToastContainer />
			<Container>
				<Row className='display-flex'>
					<h1 className='fw-bold mt-5 text-center'>From controls</h1>
					<Col className='col-lg-6 col-sm-12'>
						<h1 className='text-center mt-4'>User Form</h1>
						<form onSubmit={submitHandle}>
							<div className='form-group'>
								<label className='form-label text-left'>User Name</label>
								<input
									value={formData.inputName}
									name='inputName'
									onChange={(event) => formHandle(event)}
									type='text'
									className='form-control'
								/>
							</div>
							<div className='form-group'>
								<label className='form-label text-left'>Email</label>
								<input
									value={formData.inputEmail}
									name='inputEmail'
									onChange={(event) => formHandle(event)}
									type='text'
									className='form-control'
									required
								/>
							</div>
							<div className='form-group'>
								<label className='form-label text-left'>Phone Number</label>
								<input
									value={formData.inputPhone}
									name='inputPhone'
									onChange={(event) => formHandle(event)}
									type='text'
									className='form-control'
								/>
							</div>
							<div className='form-group'>
								<label className='form-label text-left'>Password</label>
								<input
									value={formData.inputPassowrd}
									name='inputPassowrd'
									onChange={(event) => formHandle(event)}
									type='text'
									className='form-control'
								/>
							</div>
							<button
								type='submit'
								className='btn btn-outline-success mt-3 form-control'>
								{formData.inputIndex !== '' ? 'Update' : 'Save'}
							</button>
						</form>
					</Col>

					<Col className='col-lg-6 col-sm-12'>
						<h1 className='mt-5 text-center'>User Data</h1>
						<Table striped bordered hover>
							<thead>
								<tr className='text-center'>
									<th>S.L</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Password</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{userData.length !== 0 ? (
									userData.map((v, i) => {
										return (
											<tr key={i}>
												<td>{i + 1}</td>
												<td>{v.inputName}</td>
												<td>{v.inputEmail}</td>
												<td>{v.inputPhone}</td>
												<td>{v.inputPassowrd}</td>
												<td>
													<button onClick={() => deleteBtn(i)}>Delete</button>
													<button onClick={() => updateBtn(i)}>Edit</button>
												</td>
											</tr>
										);
									})
								) : (
									<tr className='fw-bold'>
										<td colspan={6}>Data not found.</td>
									</tr>
								)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;
