import React, { useEffect } from "react";

const RemoteButton = ({buttonDown, setButtonDown}) => {
	const requestPush = async () => {
		const url = "https://" + import.meta.env.VITE_SERVER_IP + "/api/activate_button";
		const request = {
			method: "POST",
		}
		const res = await fetch(url, request)
		if (res.status != 200) {
			alert("Something went wrong")
		}
	};
	const requestRelease = async () => {
		const url = "https://" + import.meta.env.VITE_SERVER_IP + ":" + "/api/release_button";
		const request = {
			method: "POST",
		}
		const res = await fetch(url, request)
		if (res.status != 200) {
			alert("Something went wrong")
		}
	};

	const handleDown = () => {
		requestPush()
		setButtonDown(true);
	};

	const handleUp = () => {
		requestRelease()
		setButtonDown(false);
	};

	const handleLeave = () => {
		requestRelease()
		setButtonDown(false);
	};

	return (
		<>
			<button
				onMouseDown={handleDown}
				onMouseUp={handleUp}
				onMouseLeave={handleLeave}
				onTouchStart={handleDown}
				onTouchEnd={handleUp}
				onTouchCancel={handleLeave}
				className={buttonDown ? "buttonDown" : ""}
			>
			</button>
		</>
	)
}

export default RemoteButton;
