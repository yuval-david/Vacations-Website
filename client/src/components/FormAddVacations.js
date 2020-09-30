import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { follow } from '../actions/followAction';
import { useSelector, useDispatch } from 'react-redux';

export default function FormAddVacations(props) {


    const useStyles = makeStyles(theme => ({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },

    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const followRed = useSelector(state => state.followRed);

    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [picture, setPicture] = useState("");
    const [price, setPrice] = useState("");
    const [dateGo, setDateGo] = useState("");
    const [dateBack, setDateBack] = useState("");

    const [allVacations, setAllVacations] = useState([]);


    function closeModal() {
        props.setIsOpen(false);
        getAllVacations();
        dispatch(follow());

    }

    function getAllVacations() {
        fetch("http://localhost:1000/vacations")
            .then(data => data.json())
            .then(res => setAllVacations(res));
    };

    function addVacation() {
        fetch("http://localhost:1000/admin/add",
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
                body: JSON.stringify({ description, location, picture, dateGo, dateBack, price })
            })
            .then(res => setAllVacations(res))
            .then(closeModal())

    };

    useEffect(() => {
        getAllVacations();
    }, [followRed]);


    return (
        <div id="modal-bg">
            <span id="close" onClick={closeModal}> X </span>
            <h2 className="form-header"> Add vacation: </h2>

            <form className={classes.root} noValidate autoComplete="off">
                <div id="form-bg">
                    <TextField label="Description" onChange={e => setDescription(e.target.value)} />
                    <br />
                    <TextField label="Location" onChange={e => setLocation(e.target.value)} />
                    <br />
                    <TextField label="Picture" onChange={e => setPicture(e.target.value)} />
                    <br />
                    <TextField type="number" label="Price" onChange={e => setPrice(e.target.value)} />
                    <br />
                    <br />
                    <label> Depart: </label>
                    <input type="date" onChange={e => { setDateGo(e.target.value) }} />
                    <label> Return: </label>
                    <input type="date" onChange={e => setDateBack(e.target.value)} />

                    <br />
                    <Button onClick={addVacation} variant="contained" size="large" color="secondary" className={classes.margin}>
                        ADD
                    </Button>
                </div>


            </form>

        </div>
    )
}
