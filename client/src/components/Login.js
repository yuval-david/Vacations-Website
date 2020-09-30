import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../actions/SignIn';
import { admin } from '../actions/Admin';
import Swal from 'sweetalert2';


export default function Login() {

    const useStyles = makeStyles(theme => ({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },

    }));


    const classes = useStyles();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();

    function loginFunc() {
        fetch("http://localhost:1000/users/login",
            {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            .then(detalis => detalis.json())
            .then(data => {
                console.log(data);
                const token = data.token;
                const user_id = data.user_id;
                const is_admin = data.is_admin;
                const first_name = data.first_name;

                if (token) {
                    // לשמור טוקן בלוקל סטוראג או רידקס
                    localStorage.setItem('token', token);
                    localStorage.setItem('user_id', user_id);
                    localStorage.setItem('is_admin', is_admin);
                    localStorage.setItem('first_name', first_name);
                    dispatch(signIn());
                    if (is_admin) {
                        dispatch(admin())
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Missing some info..',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
            });


    };




    return (

        <div className="login-page">
            <h1 className="main-header"> Welcome to - Vacations For U !</h1>
            <div className="login-div">
                <h2 className="login-header"> Log In : </h2>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField label="Username" onChange={e => setUsername(e.target.value)} />
                    <br />
                    <TextField type="password" label="Password" onChange={e => setPassword(e.target.value)} />

                    <br />
                    <Button onClick={loginFunc} variant="contained" size="large" color="primary" className={classes.margin}>
                        Log in
                    </Button>
                    <br />

                    <NavLink to="/register"> Don't have a user ? Register now! </NavLink>

                </form>
            </div>
            <br />



            {
                isLogged ? <Redirect to="/home" /> : null
            }


        </div>
    )
}

// <h2> Your plane is ready ... </h2>
//             <img className="plane-gif" src="https://media0.giphy.com/media/uCszz49N0iaCk/source.gif" alt="plane-gif" />