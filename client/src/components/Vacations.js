import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Vacation from './Vacation';
import VacationOfAll from './VacationOfAll';


export default function Vacations() {

    const [vacations, setVacations] = useState([]);
    const [allVacationsList, setAllVacationsList] = useState([]);
    const followRed = useSelector(state => state.followRed);


    function getFollowedVacations() {
        fetch(`http://localhost:1000/vacations/${localStorage.getItem('user_id')}`)
            .then(res => res.json())
            .then(data => {
                setVacations(data);
                console.log(data);
                if (vacations.length == 0) {
                    getAllAllVacations();
                }
                getAllVacations(data);

            })

    }

    function getAllVacations(followedVacations) {
        fetch(`http://localhost:1000/vacations/unfollowedVacations`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(followedVacations)
        })
            // fetch("http://localhost:1000/vacations")
            .then(data => data.json())
            .then(res => setAllVacationsList(res));
    };

    function getAllAllVacations() {
        fetch("http://localhost:1000/vacations")
            .then(data => data.json())
            .then(res => setAllVacationsList(res));
    };

    useEffect(() => {
        getFollowedVacations();



    }, [followRed]);




    return (
        <div>

            <h2 id="vacations-header"> Your Vacations : </h2>
            <div className="vacations-list">
                {vacations.map(
                    v => (<Vacation vacation={v} key={v.description} />)
                )}

            </div>

            <br />
            <hr className="hr-vacations" />

            <h2 id="vacations-header"> Want to see more ? </h2>
            <div className="allVacations-list">
                {


                    allVacationsList.map(

                        v => (<VacationOfAll vacationOfAll={v} key={v.vacationID} />)
                    )}

            </div>

        </div>
    )
}


