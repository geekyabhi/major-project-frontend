import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Message from "../Message";
import Loader from "../loader";
// import registerImg from "../../assets/img/register.png"
import axios from "axios";
import { url } from "../../utilities";
function Dashboard() {
	const [machine, setMachine] = useState("");
	const [name, setName] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resources, setResources] = useState({});
	// const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const localData = localStorage.getItem("visualUserInfo");
	const userInfo = localData ? JSON.parse(localData) : null;
	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
		// eslint-disable-next-line
	}, []);

	if (error) {
		setTimeout(() => {
			setError(null);
		}, 3000);
	}

	const submitLogin = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(`${url}/api/plan`, {
				machine,
				name,
			});
			console.log(machine);
			console.log(name);
			setLoading(false);
			if (data) {
				console.log(data);

				setSuccess(true);
				setResources(data.data.data);
			} else {
				setError("Network error");
			}
		} catch (e) {
			setLoading(false);
			setError("Some Error Occurred");
		}
	};

	return (
		<div className="container d-flex my-5 justify-content-center align-items-center auth-page">
			{/* <div className="left-section">
				<h2 className="logoHeading">Visual</h2>
				<img
					src="https://miro.medium.com/max/1400/0*r7ymuCxhlg-foJBy.jpg"
					className="register-img"
					alt="display_img"
				/>
			</div> */}

			<div className="form-container p-4" id="formBox">
				<div style={{ width: "100%" }}>
					{error && <Message variant={"danger"}>{error}</Message>}
					{success && (
						<Message variant={"success"}>
							Machine created Successfully
						</Message>
					)}
					{success && (
						<div>
							<p>Your Port Number</p>
							<p>{resources.port}</p>
							<p>Your Machine Name</p>
							<p>{resources.name}</p>
							<p>Your Machine Id</p>
							<p>{resources.containerId}</p>
						</div>
					)}

					<p className="box-heading text-center">
						SPIN OFF ANY RESOURCE THAT YOU WANT
					</p>
					<p className="box-sub-heading text-center">
						Monitor all your apis at one place
					</p>

					<Form.Group controlId="formBasicName">
						<Form.Label>Name For Machine </Form.Label>
						<Form.Control
							type="text"
							placeholder="Optional"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicName">
						<Form.Label>Select machine </Form.Label>
						<Form.Control
							type="text"
							placeholder="Optional"
							value={machine}
							onChange={(e) => {
								setMachine(e.target.value);
							}}
						/>
						{/* <DropdownButton
							id="dropdown-item-button"
							onSelect={(e) => {
								console.log(e);
							}}
						>
							<Dropdown.ItemText>
								Select machine
							</Dropdown.ItemText>
							<Dropdown.Item as="button">Redis</Dropdown.Item>
							<Dropdown.Item as="button">Mongo DB</Dropdown.Item>
						</DropdownButton> */}
					</Form.Group>

					<Form onSubmit={submitLogin}>
						{loading ? (
							<Loader />
						) : (
							<Button
								type="submit"
								className={styles.btn}
								disabled={loading}
							>
								Extract Resource
							</Button>
						)}
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
