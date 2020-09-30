import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));


export default function Register() {

    const classes = useStyles();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const isAdmin = false;

    function registerFunc(e) {
        e.preventDefault();
        console.log({
            firstName, lastName, username, password, isAdmin
        });

        fetch("http://localhost:1000/users/register",
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, username, password, isAdmin })
            })
            .then(res => console.log(res))
            .then(() => {
                Swal.fire('Good job!',
                    'Your user created seccessfully!',
                    'success');
                document.getElementById("firstName").value = "";
                document.getElementById("lastName").value = "";
                document.getElementById("userName").value = "";
                document.getElementById("password").value = "";

            }
            ).then(<Redirect to="/" />)
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Missing some info..',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
            })

    }


    return (
        <div>
            <h1 className="register-header"> Register: </h1>
            <form onSubmit={registerFunc} className={classes.root} noValidate autoComplete="off">
                <TextField id="firstName" label="First name" onChange={e => setFirstName(e.target.value)} />
                <br />
                <TextField id="lastName" label="Last name" onChange={e => setLastName(e.target.value)} />
                <br />
                <TextField id="userName" label="Username" onChange={e => setUsername(e.target.value)} />
                <br />
                <TextField id="password" label="Password" onChange={e => setPassword(e.target.value)} />
                <br />
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.margin}>
                    SUBMIT
                    </Button>
            </form>
            <br />
            <NavLink to="/"> To the Login page </NavLink>

        </div>
    )
}
