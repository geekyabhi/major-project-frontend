import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from "../Message";
import Loader from "../loader";
// import registerImg from "../../assets/img/register.png"
import axios from "axios";
import { url } from "../../utilities";
function Register() {
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const localData = localStorage.getItem("visualUserInfo");
	const userInfo = localData ? JSON.parse(localData) : null;
	useEffect(() => {
		if (userInfo) {
			navigate("/dashboard");
		}
		// eslint-disable-next-line
	}, [userInfo]);

	if (error) {
		setTimeout(() => {
			setError(null);
		}, 3000);
	}

	const submitRegister = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(`${url}/api/customer/`, {
				phone: phone,
				password,
				email,
				name,
			});

			setLoading(false);
			if (data) {
				console.log(data);
				// localStorage.setItem(
				// 	"visualUserInfo",
				// 	JSON.stringify(data.data)
				// );
				setSuccess(true);
				// setUser(data.data);
				// navigate("/dashboard");
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
			<div className="left-section">
				<h2 className="logoHeading">Visual</h2>
				<img
					src="https://miro.medium.com/max/1400/0*r7ymuCxhlg-foJBy.jpg"
					className="register-img"
					alt="display_img"
				/>
			</div>

			<div className="form-container p-4" id="formBox">
				<div style={{ width: "100%" }}>
					{error && <Message variant={"danger"}>{error}</Message>}
					{success && (
						<Message variant={"success"}>
							Registered Successfully
						</Message>
					)}
					<p className="box-heading text-center">REGISTER</p>
					<p className="box-sub-heading text-center">
						Monitor all your apis at one place
					</p>
					<Form onSubmit={submitRegister}>
						<Form.Group controlId="formBasicName">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Your Name"
								required
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicName">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter Your Email"
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicName">
							<Form.Label>Mobile Number</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Mobile Number"
								required
								value={phone}
								onChange={(e) => {
									setPhone(e.target.value);
								}}
							/>
						</Form.Group>
						<Form.Group
							className="mt-3"
							controlId="formBasicPassword"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</Form.Group>
						{loading ? (
							<Loader />
						) : (
							<Button
								type="submit"
								className={styles.btn}
								disabled={loading}
							>
								Register
							</Button>
						)}
					</Form>
					<div className="mt-3">
						<p>
							Already have an account ?{" "}
							<Link to="/login">Login</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
