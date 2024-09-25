const StatusLight = ({buttonDown}) => {

	return (
		<>
			<div className={buttonDown ? "statusLight statusOn" : "statusLight statusOff"}>
			</div>
		</>
	)
}

export default StatusLight;