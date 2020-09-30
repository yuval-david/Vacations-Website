import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signOut } from '../actions/SignOut';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { notAdmin } from '../actions/notAdmin';
import SearchResults from './SearchResults';
import { search } from '../actions/SearchAction';
import { clear } from '../actions/ClearAction';
import Vacations from './Vacations';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 30,
        marginRight: 30,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        textDecorationLine: 'underline'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
}));


export default function Home() {

    const classes = useStyles();

    const isLogged = useSelector(state => state.isLogged);
    const isAdmin = useSelector(state => state.isAdmin);
    const isSearch = useSelector(state => state.isSearch);
    const [searchValue, setSearchValue] = useState("");
    const [searchValueDateGo, setSearchValueDateGo] = useState("");
    const [searchValueDateBack, setSearchValueDateBack] = useState("");

    const dispatch = useDispatch();


    function logout() {
        dispatch(signOut());
        dispatch(notAdmin());
        dispatch(clear());
        localStorage.removeItem('user_id');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('token');
    }

    function searchFunc() {
        console.log(searchValue);
        dispatch(search());

    }

    function clearFunc() {
        dispatch(clear());
        // document.getElementById('description-home').value = "";
    }




    return (
        <div>
            <div className="logout-btn" onClick={logout}> Logout </div>
            <span className="welcome"> Welcome {localStorage.getItem('first_name')} ! </span>
            <h1 className="main-header"> Vacations </h1>

            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h4" noWrap>
                        Vacatoins 4U
                  </Typography>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Description:
                  </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase id="description-home" onChange={e => setSearchValue(e.target.value)} id="description-inp"
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Depart:
                  </Typography>
                    <input onChange={e => setSearchValueDateGo(e.target.value)} className="datePicker" type="date" id="dateGo" />
                    <Typography className={classes.title} variant="h6" noWrap>
                        Return:
                  </Typography>
                    <input onChange={e => setSearchValueDateBack(e.target.value)} className="datePicker" type="date" id="dateBack" />

                    <Button onClick={searchFunc} variant="contained" size="medium" color="primary" className={classes.margin}>
                        Search
                    </Button>
                    <Button onClick={clearFunc} variant="contained" size="medium" color="primary" className={classes.margin}>
                        Clear
                    </Button>
                </Toolbar>
            </AppBar>

            {
                isLogged ? null : <Redirect to="/" />
            }

            {
                isAdmin ? <Redirect to="/vacations/admin" /> : null
            }

            {
                isSearch && (searchValue !== undefined || searchValueDateGo !== undefined || searchValueDateBack !== undefined) ? <SearchResults search={searchValue} dateGo={searchValueDateGo} dateBack={searchValueDateBack} /> : <Vacations />
            }

        </div>
    )
}

