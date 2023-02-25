import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Register from "./register";
import Login from "./login";
const Visual = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
};

export default Visual;
