import styled from "styled-components";


const SpinnerViewContainer = styled.svg`
	// background-color:red;
	height: ${(props) => props.height};
	width: ${(props) => props.width};

	animation: rotate 2s linear infinite;
	& .progress {
		animation: dash 1.5s ease-in-out infinite;
	}
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;
const Circle = styled.circle`
	cx: ${(props) => props.cx};
	cy: ${(props) => props.cy};
	r: ${(props) => props.r};
	fill: ${(props) => props.fill};
	stroke: ${(props) => props.stroke};
	stroke-width: ${(props) => props.strokeWidth};
`;


export default {
	Circle,
	SpinnerViewContainer,
};