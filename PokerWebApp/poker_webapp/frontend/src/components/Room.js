import React, { useState } from 'react';

const Room = (props) => {

    const [isHost, setIsHost] = useState(false);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [minBet, setMinBet] = useState(1);
    const [startBalance, setStartBalance] = useState(100);
    const [playersNb, setPlayersNb] = useState(2);
    const [hostName, setHostName] = useState("");
    const roomCode = props.match.params.roomCode;

    const getRoom = () => {
        fetch('/api/get-room?room_code=' + roomCode)
            .then((response) => response.json())
            .then((data) => {
                setGuestCanPause(data.guest_can_pause);
                setVotesToSkip(data.votes_to_skip);
                setMinBet(data.min_bet);
                setStartBalance(data.start_balance);
                setPlayersNb(data.players_number);
                setIsHost(data.is_host);
                setHostName((data.host_name));
            });
    }

    getRoom();
    return (
        <div>
            <h3>{hostName}</h3>
            <h3>{roomCode}</h3>
            <h3>{isHost.toString()}</h3>
            <h3>{guestCanPause.toString()}</h3>
            <h3>{minBet}</h3>
            <h3>{playersNb}</h3>
            <h3>{startBalance}</h3>
            <h3>{votesToSkip}</h3>
            <h3></h3>
        </div>

    );
}

export default Room;