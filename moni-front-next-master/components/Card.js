import React from 'react';
// import "../Style/Card.css";

export const Card = props => {
	// console.log("props:-", props.data);

	if (props.data === undefined) {
		return <div></div>;
	}

	return (
		<div className={`card shadow round step ${props.border}`}>
			<h5 className='mt-3 card-title text-center'> {props.data.title} </h5>
			<div className='card-body'>{props.data.text}</div>
		</div>
	);
};

export default Card;
