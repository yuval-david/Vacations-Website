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
import { follow } from '../actions/followAction';
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

export default function VacationOfAll(props) {

    const classes = useStyles();

    const followRed = useSelector(state => state.followRed)
    const dispatch = useDispatch();
    const [followersNum, setFollowersNum] = useState(0);

    function followFunc(e) {
        const userId = localStorage.user_id;
        const vacationId = props.vacationOfAll.vacationID;
        /*sendDetails(vacationId, userId)*/
        console.log(vacationId)
        fetch("http://localhost:1000/vacations/follow/" + vacationId, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, vacationId })
        }).then(console.log(vacationId))
            .then(dispatch(follow()))

    }

    function getFollowersNumber() {
        fetch("http://localhost:1000/vacations/followers/" + props.vacationOfAll.vacationID)
            .then(res => res.json())
            .then(data => setFollowersNum(data))

    }

    useEffect(() => {
        getFollowersNumber();
    }, [followRed]);


    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    title={props.vacationOfAll.location}
                    subheader="Speciacl"
                />
                <CardMedia
                    className={classes.media}
                    image={props.vacationOfAll.picture}
                    title={props.vacationOfAll.location}
                />
                <CardContent>
                    <Typography variant="h5" component="h5">
                        {props.vacationOfAll.description}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Price: </b>{props.vacationOfAll.price} ₪
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Depart :</b>  {props.vacationOfAll.dateGo.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Return :</b>  {props.vacationOfAll.dateBack.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">

                        <GradeIcon className="star" /> <b>Followers:</b>  {(followersNum.length > 0) ? followersNum[0].followersNum : 0}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <CardActions disableSpacing>
                        <IconButton onClick={followFunc} aria-label="add to favorites">
                            <FavoriteIcon id={props.vacationOfAll.vacationID} />
                        </IconButton>
                    </CardActions>
                </CardActions>
            </Card>



        </div>
    )
}
