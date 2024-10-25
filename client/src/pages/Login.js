import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, ContextProvider } from "../context/Auth.context";

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const authContext = useContext(AuthContext);
	console.log("🚀 ~ LoginPage ~ authContext:", authContext);

	const { login = () => {} } = authContext || {};

	useEffect(() => {
		document.title = "เข้าสู่ระบบ";
	}, []);

	const handleEmailChange = (e) => {
		setEmail(e);
	};

	const handlePasswordChange = (e) => {
		setPassword(e);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);
		login(email, password);
	};

	if (authContext?.state.isLoggedIn) {
		navigate("/home");
	}

	return (
		<ContextProvider>
			<div className="landing-background-image flex justify-center items-center h-screen">
				<div className="w-1/2 h-screen hidden lg:block">
					<img
						src="https://images.alphacoders.com/113/1138740.png"
						alt="Placeholder Image"
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-white shadow-2xl h-screen flex flex-col justify-center">
					<h1 className="text-2xl font-semibold mb-4">
						ยินดีต้อนรับสู่ Pidterm Project
					</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="username" className="block text-gray-600">
								อีเมลล์
							</label>
							<input
								required
								type="text"
								id="username"
								name="username"
								value={email}
								onChange={(e) => handleEmailChange(e.target.value)}
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
								autoComplete="off"
							/>
						</div>
						{/* Password Input */}
						<div className="mb-4">
							<label htmlFor="password" className="block text-gray-600">
								รหัสผ่าน
							</label>
							<input
								required
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => handlePasswordChange(e.target.value)}
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
								autoComplete="off"
							/>
						</div>
						<div className="mb-6 text-gray-500 flex space-x-1">
							<svg
								className="w-6 h-6 text-gray-500 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fillRule="evenodd"
									d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
									clipRule="evenodd"
								/>
							</svg>
							<p>
								กรณีไม่มีบัญชีหรือลืมรหัสผ่าน กรุณาถามใครก็ได้ลองดู
							</p>
						</div>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
						>
							เข้าสู่ระบบ
						</button>
						{authContext?.state.loginError !== null ? (
							<p className="text-red-500 pt-5">
								รหัสผ่านไม่ถูกต้องหรือไม่พบบัชญีนี้ในระบบ
							</p>
						) : (
							<></>
						)}
					</form>
				</div>
			</div>
		</ContextProvider>
	);
}
