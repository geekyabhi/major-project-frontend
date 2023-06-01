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
			console.log(machine, "Machine");
			console.log(name, "Name");
			if (!machine || machine === "") {
				setError("Select Machine");
				setLoading(false);
				return;
			}
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
			console.log(e);
			setError(`${String(e)}`);
		}
	};

	const submitLogout = () => {
		localStorage.removeItem("visualUserInfo");
		navigate("/login");
	};

	return (
		<div className="container auth-page">
			<div>
				<Button className="logout-button" onClick={submitLogout}>
					Logout
				</Button>
			</div>
			<div className="formBox">
				{error && <Message variant={"danger"}>{error}</Message>}
				{success && (
					<Message variant={"success"}>
						Machine created Successfully
					</Message>
				)}
				<p className="box-heading text-center">
					SPIN OFF ANY RESOURCE THAT YOU WANT
				</p>
				{success && (
					<div className="machine-info-box">
						<p className="machine-label">Your Port Number</p>
						<p className="machine-info">{resources.port}</p>
						<p className="machine-label">Your Machine Name</p>
						<p className="machine-info">{resources.name}</p>
						<p className="machine-label">Your Machine Id</p>
						<p className="machine-info">{resources.containerId}</p>
					</div>
				)}

				<Form onSubmit={submitLogin}>
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
							as="select"
							value={machine}
							onChange={(e) => {
								setMachine(e.target.value);
								console.log(e.target.value);
							}}
						>
							<option value="">Select Machine</option>
							<option value="redis">Redis</option>
							<option value="mongo">Mongo DB</option>
							<option value="serveride">Vs Code Server</option>
						</Form.Control>
					</Form.Group>

					<div>
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
					</div>
				</Form>
			</div>
		</div>
	);
}

export default Dashboard;
