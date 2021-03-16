import React, { useState} from 'react';
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

const JoinRoom = (props) => {

    const [userName, setUserName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const classes = useStyles();

    const buttonJoinRoom = () => {
        const req = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                room_code: roomCode,
                user_name: userName
            })
        };
        fetch("api/join", req)
            .then((res) => {
                if (res.ok) {
                    props.history.push('/room/' + roomCode);
                } else {
                    setErrorMessage("Invalid Room Code");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center">
                <Typography component={"h4"} variant={"h4"}>
                    Join a Room
                </Typography>
                <FormControl component={"fieldset"}>
                    <TextField
                        error={errorMessage}
                        helperText={errorMessage}
                        required={true}
                        defaultValue={roomCode}
                        variant={"outlined"}
                        label={"Room Code"}
                        inputProps={
                            {
                                style: {textAlign: "center"}
                            }
                        }
                        onChange={
                            (e) =>
                                setRoomCode(e.target.value)
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align={"center"}>
                <FormControl component={"fieldset"}>
                    <TextField
                        required={true}
                        variant={"outlined"}
                        label={"Username"}
                        defaultValue={userName}
                        inputProps={
                            {
                                style: {textAlign: "center"}
                            }
                        }
                        onChange={
                            (e) =>
                                setUserName(e.target.value)
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
                        onClick={() => buttonJoinRoom()}
                    >
                        Join a Room
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

export default JoinRoom;