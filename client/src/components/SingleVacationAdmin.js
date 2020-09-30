import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { unfollow } from '../actions/unfollowAction';
import FormEditVacation from './FormEditVacation';
import moment from 'moment'

const bluelight = blue[50];

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        height: 500,
        margin: 20,
        backgroundColor: bluelight
    },
    media: {
        height: 60,
        paddingTop: '56.25%', // 16:9
    },


}));

export default function SingleVacationAdmin(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    function deleteVac(e) {
        const vacationId = props.vacation.vacationID;
        fetch("http://localhost:1000/admin/delete/" + vacationId, {
            method: "delete",
            headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
        }).then(console.log(vacationId))
            .then(dispatch(unfollow()))
    };

    function openModal() {
        setIsOpen(true);
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    title={props.vacation.location}
                // subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image={props.vacation.picture}
                    title={props.vacation.location}
                />
                <CardContent>
                    <Typography variant="h5" component="h5">
                        {props.vacation.description}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Price: </b>{props.vacation.price} ₪
                    </Typography>
                    <Typography variant="p" component="p">
                        <b>Depart :</b>  {props.vacation.dateGo.split("T")[0]}
                    </Typography>
                    <Typography variant="p" component="p">
                        <b>Return :</b>  {props.vacation.dateBack.split("T")[0]}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <DeleteIcon id={props.vacation.vacationID} onClick={deleteVac} className="delete-btn" />
                    <EditIcon onClick={openModal} className="edit-btn" />
                </CardActions>
            </Card>

            {isOpen ? (<FormEditVacation vac={props.vacation} setIsOpen={setIsOpen} />) : null}

        </div>
    )
}
