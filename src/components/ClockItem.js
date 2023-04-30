import React, { useState, useEffect } from 'react';

const ClockItem = (props) => {
    const { kickoff, duration } = props;
    const startTime = kickoff;
    const endTime = kickoff + duration;
    const [auctionStatus, setAuctionStatus] = useState(false);
    const [auctionStatusMessage, setAuctionStatusMessage] = useState('')
    const [state, setState] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime && endTime) setNewTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const setNewTime = () => {
        const currentTimestamp = new Date().getTime()
        let countdownDate = 0;
        if (startTime * 1000 > currentTimestamp) {
            setAuctionStatusMessage('Auction has not started')
            setAuctionStatus(false)
        } else if (endTime * 1000 > currentTimestamp) {
            setAuctionStatus(true)
            countdownDate = endTime * 1000;
            setAuctionStatusMessage('Auction is started')
        } else {
            setAuctionStatusMessage('Auction has ended')
            setAuctionStatus(false)
        }
        if (countdownDate) {
            const distanceToDate = countdownDate - currentTimestamp;
            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

            const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            if (numbersToAddZeroTo.includes(days)) {
                days = `0${days}`;
            }
            if (numbersToAddZeroTo.includes(hours)) {
                hours = `0${hours}`;
            }
            if (numbersToAddZeroTo.includes(minutes)) {
                minutes = `0${minutes}`;
            }
            if (numbersToAddZeroTo.includes(seconds)) {
                seconds = `0${seconds}`;
            }
            setState({ days: days, hours: hours, minutes: minutes, seconds: seconds });
        }
    };


    return (
        <>
            {auctionStatus ?
                <>
                    {state.days} : {state.hours} : {state.minutes} : {state.seconds}</>
                : <>{auctionStatusMessage}</>
            }</>
    );
}

export default ClockItem;