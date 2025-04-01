const getDaysPassed = (dateString) => {
    const currentDate = new Date();
    const oldDate = new Date(dateString);
    
    const timeDifference = currentDate - oldDate;
    
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursPassed = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    return `${daysPassed} days and ${hoursPassed} hours ago`;
};

export default getDaysPassed;