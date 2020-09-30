import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { follow } from '../actions/followAction';
import { useSelector, useDispatch } from 'react-redux';

export default function FormEditVacation(props) {

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

    function editVacation() {
        fetch("http://localhost:1000/admin/edit/" + props.vac.vacationID,
            {
                method: 'put',
                headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
                body: JSON.stringify({ description, location, picture, dateGo, dateBack, price })
            })
            .then(closeModal())


    };

    function getAllVacations() {
        fetch("http://localhost:1000/vacations")
            .then(data => data.json())
            .then(res => setAllVacations(res));
    };

    function closeModal() {
        props.setIsOpen(false);
        getAllVacations();
        dispatch(follow());

    }

    useEffect(() => {

    }, [followRed]);


    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <div id="edit-form">
                    <span className="close-edit" onClick={closeModal}> X </span>
                    <h3> Edit vacation </h3>
                    <TextField id="vac-desc" placeholder={props.vac.description} label="Description" onChange={e => setDescription(e.target.value)} />
                    <br />
                    <TextField id="vac-location" placeholder={props.vac.location} label="Location" onChange={e => setLocation(e.target.value)} />
                    <br />
                    <TextField id="vac-pic" placeholder={props.vac.picture} label="Picture" onChange={e => setPicture(e.target.value)} />
                    <br />
                    <TextField id="vac-price" placeholder={props.vac.price} type="number" label="Price" onChange={e => setPrice(e.target.value)} />
                    <br />
                    <br />
                    <label> Depart: </label>
                    <input type="date" onChange={e => setDateGo(e.target.value)} />
                    <br />
                    <label> Return: </label>
                    <input type="date" onChange={e => setDateBack(e.target.value)} />

                    <br />
                    <Button onClick={editVacation} variant="contained" size="large" color="primary" className={classes.margin}>
                        SAVE
                    </Button>
                </div>


            </form>

        </div>
    )
}
