const getDaysPassed = (dateString) => {
	const currentDate = new Date();
	const oldDate = new Date(dateString);

	const timeDifference = currentDate - oldDate;

	const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const hoursPassed = Math.floor(
		(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutesPassed = Math.floor(
		(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
	);
	if (daysPassed < 0) daysPassed = 0;
	if (hoursPassed < 0) hoursPassed = 0;
	return `${daysPassed} days, ${hoursPassed} hours and ${minutesPassed} minutes ago`;
};

export default getDaysPassed;
