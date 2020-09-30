import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { unfollow } from '../actions/unfollowAction';
import GradeIcon from '@material-ui/icons/Grade';

const bluelight = blue[50];

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        height: 620,
        margin: 20,
        backgroundColor: bluelight
    },
    media: {
        height: 60,
        paddingTop: '56.25%', // 16:9
    },


}));

export default function Vacation(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [followersNum, setFollowersNum] = useState(0);
    const followRed = useSelector(state => state.followRed)


    function unfollowFunc(e) {
        const userId = localStorage.user_id;
        const vacationId = props.vacation.vacationID;
        // sendDetails(vacationId, userId);
        console.log(vacationId)
        fetch(`http://localhost:1000/vacations/unfollow/${userId}/${vacationId}`, {
            method: "delete"
        }).then(console.log(vacationId))
            .then(dispatch(unfollow()))

    }
    function getFollowersNumber() {
        fetch("http://localhost:1000/vacations/followers/" + props.vacation.vacationID)
            .then(res => res.json())
            .then(data => setFollowersNum(data))

    }

    useEffect(() => {
        getFollowersNumber();
    }, [followRed]);

    return (
        <div>
            <Card className={classes.root} key={props.vacation.price}>
                <CardHeader
                    title={props.vacation.location}
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
                    <Typography variant="h6" component="h6">
                        <b>Depart :</b>  {props.vacation.dateGo.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Return :</b>  {props.vacation.dateBack.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">

                        <GradeIcon className="star" /> <b>Followers:</b>  {(followersNum.length > 0) ? followersNum[0].followersNum : 0}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={unfollowFunc} aria-label="add to favorites">
                        <FavoriteIcon color="primary" id={props.vacation.vacationID} />
                    </IconButton>
                </CardActions>

            </Card>

        </div>
    )
}

