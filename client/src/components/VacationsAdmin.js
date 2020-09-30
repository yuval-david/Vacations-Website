import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notAdmin } from '../actions/notAdmin';
import { signOut } from '../actions/SignOut';
import { Redirect } from 'react-router-dom';
import SingleVacationAdmin from './SingleVacationAdmin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { VictoryBar, VictoryChart } from 'victory';
import FormAddVacations from './FormAddVacations';

export default function VacationsAdmin() {

    const [allVacations, setAllVacations] = useState([]);
    const isAdmin = useSelector(state => state.isAdmin);
    const dispatch = useDispatch();
    const followRed = useSelector(state => state.followRed)
    const [charts, setCharts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    function getAllVacations() {
        fetch("http://localhost:1000/vacations")
            .then(data => data.json())
            .then(res => setAllVacations(res));
    };

    function logout() {
        dispatch(signOut());
        dispatch(notAdmin());
        localStorage.removeItem('user_id');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('token');
    }

    function getChart() {
        fetch("http://localhost:1000/vacations/followers")
            .then(data => data.json())
            .then(res => setCharts(res))
    }

    function openModal() {
        setIsOpen(true);
    };

    useEffect(() => {
        getAllVacations();
        getChart();
    }, [followRed]);

    return (
        <div>
            <div className="logout-btn" onClick={logout}> Logout </div>
            <h1 className="main-header"> Welcome Admin ! </h1>
            <h2 id="vacations-header"> Vacations list : </h2>
            <div className="allVacations-list">
                {allVacations.map(
                    v => (<SingleVacationAdmin vacation={v} key={v.vacationID} />)
                )}

            </div>
            <AddCircleIcon onClick={openModal} fontSize="large" className="addVacation-btn" />

            {
                isAdmin ? null : <Redirect to="/" />
            }

            <hr className="hr-vacations" />

            <h2 id="vacations-header"> Followers of Vacations : </h2>

            <div className="chart-div">
                <VictoryChart domainPadding={30}>
                    <VictoryBar data={charts} x="location" y="followersNum" />
                </VictoryChart>
            </div>

            {isOpen ? (<FormAddVacations setIsOpen={setIsOpen} setAllVacations={setAllVacations} allVacations={allVacations} />) : null}
        </div>
    )
}

