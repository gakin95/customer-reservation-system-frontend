import { useHistory } from "react-router-dom";
import leftArrow from "../../assets/icons/leftArrow.svg";

const BackButton = ({ className }) => {
	const history = useHistory();
	return (
		<>
			<div className="cursor-pointer" onClick={() => history.goBack()}>
				<img src={leftArrow} alt="leftArrow" className={`w-8 ${className}`} />
			</div>
		</>
	);
};

export default BackButton;
