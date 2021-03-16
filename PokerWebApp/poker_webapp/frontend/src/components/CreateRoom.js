import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    makeStyles,
    Button,
    Grid, Radio,
    TextField,
    Typography,
    FormControl,
    FormHelperText,
    FormControlLabel,
    RadioGroup
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttons: {
        margin: theme.spacing(0.5)
    }
}));

const CreateRoom = (props) => {

    const [guestCanPause, setGuestCanPause] = useState(false);
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [minBet, setMinBet] = useState(1);
    const [startBalance, setStartBalance] = useState(100);
    const [playersNb, setPlayersNb] = useState(2);
    const [hostName, setHostName] = useState("");

    const classes = useStyles();

    const buttonCreateRoom = () => {
        const req = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                min_bet: minBet,
                start_balance: startBalance,
                host_name: hostName,
                players_number: playersNb,
            })
        };
        fetch("api/create", req)
            .then((res) => res.json())
            .then((data) => props.history.push('/room/' + data.room_code));
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <Typography component={"h4"} variant={"h4"}>
                    Create a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component={"fieldset"}>
                    <FormHelperText>
                        <div align={"center"}>Guest Control of Music</div>
                        <RadioGroup
                            row
                            defaultValue={"false"}
                            onChange={
                                (e) =>
                                    setGuestCanPause(e.target.value !== "false")
                            }
                        >
                            <FormControlLabel
                                value={"true"}
                                control={<Radio color={"primary"}/>}
                                label={"Play/Pause"}>
                                labelPlacement={"bottom"}
                            </FormControlLabel>
                            <FormControlLabel
                                value={"false"}
                                control={<Radio color={"secondary"}/>}
                                label={"No control"}>
                                labelPlacement={"bottom"}
                            </FormControlLabel>
                        </RadioGroup>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component={"fieldset"}>
                    <TextField
                        required={true}
                        defaultValue={hostName}
                        variant={"outlined"}
                        label={"Username"}
                        inputProps={
                            {
                                style: {textAlign: "center"}
                            }}
                        onChange={
                            (e) =>
                                setHostName(e.target.value)
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component={"fieldset"}>
                    <TextField
                        required={true}
                        type={"number"}
                        variant={"outlined"}
                        label={"Votes to Skip Song"}
                        defaultValue={2}
                        inputProps={
                            {
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                        onChange={
                            (e) =>
                                setVotesToSkip(e.target.valueAsNumber)
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component={"fieldset"}>
                    <TextField
                        required={true}
                        type={"number"}
                        label={"Min Bet"}
                        variant={"outlined"}
                        defaultValue={1}
                        inputProps={
                            {
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                        onChange={
                            (e) =>
                                setMinBet(e.target.valueAsNumber)
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component={"fieldset"}>
                    <TextField
                        required={true}
                        type={"number"}
                        variant={"outlined"}
                        label={"Start Balance"}
                        defaultValue={100}
                        inputProps={
                            {
                                min: 1,
                                style: {textAlign: "center"}
                            }}
                        onChange={
                            (e) =>
                                setStartBalance(e.target.valueAsNumber)
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component={"fieldset"}>
                    <TextField
                        required={true}
                        type={"number"}
                        label={"Table Size"}
                        variant={"outlined"}
                        defaultValue={2}
                        inputProps={
                            {
                                min: 2,
                                style: {textAlign: "center"}
                            }
                        }
                        onChange={
                            (e) =>
                                setPlayersNb(e.target.valueAsNumber)
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <div className={classes.buttons} align={"center"}>
                    <Button
                        className={classes.buttons}
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => buttonCreateRoom()}
                    >
                        Create a Room
                    </Button>
                    <Button
                        className={classes.buttons}
                        color={"secondary"}
                        variant={"contained"}
                        to={"/"}
                        component={Link}
                    >
                        Back
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}

export default CreateRoom;