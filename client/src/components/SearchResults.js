import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const bluelight = blue[50];

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        margin: 20,
        backgroundColor: bluelight
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },


}));

export default function SearchResults(props) {
    const classes = useStyles();

    const isSearch = useSelector(state => state.isSearch);
    const [searchResultsArr, setSearchResults] = useState([]);

    useEffect(() => {
        console.log({
            "Description": props.search,
            "Date Go": props.dateGo,
            "Date Back": props.dateBack
        })
        getSearchResults();
    }, [isSearch]);

    function getSearchResults() {
        fetch(`http://localhost:1000/vacations/search`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ description: props.search, dateGo: props.dateGo, dateBack: props.dateBack })
        })
            .then(data => data.json())
            .then(res => setSearchResults(res))
            .catch((err) => console.log(err))
    };


    return (
        <div >

            <h1> Search Results : </h1>
            <div className="allVacations-list">
                {
                    searchResultsArr.map(
                        result => (

                            <Card key={result.location} className={classes.root}>
                                <CardHeader
                                    title={result.location}
                                    subheader="Speciacl"
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={result.picture}
                                    title={result.location}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h5">
                                        {result.description}
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        <b>Depart :</b>  {result.dateGo.split("T")[0]}
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        <b>Return :</b>  {result.dateBack.split("T")[0]}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon id={result.vacationID} />
                                        </IconButton>
                                    </CardActions>
                                </CardActions>
                            </Card>
                        )
                    )
                }
            </div>

        </div>
    )
}
