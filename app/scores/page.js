'use client'
import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import common from "../../styles/Common.module.scss";
import GameCard from "../_components/gameCard";
import { fetchScores } from '../_utils/fetchScores';
const Scores = () => {
    let currDate = new Date().toJSON().slice(0,10);
    const [date, setDate] = useState(currDate)
    const [dayScores, setDayScores] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetchScores(date)
            .then((data) => {
                setDayScores(data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetchScores(date)
            .then((data) => {
                setDayScores(data)
            })
    }, [date, setDate])

    const handleClick = (value) => {
        console.log(value)
        setDate(value)
    }

    const formatDate = (date) => {
        let currDate = new Date(date + "T03:24:00");
        let month = currDate.toLocaleString('default', {month: 'long'});
        let day = String(currDate.getDate());
        return `${month} ${day}`
    }

    if (isLoading) return <p>Loading...</p>
    if (!dayScores) return <p>No games today</p>
    return (
        <div className={common.container}>
            <div className={`${common.buttonContainer} ${common.centered}`}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                    <Button onClick={() => handleClick(dayScores.gameWeek[0].date)}>{formatDate(dayScores.gameWeek[0].date)}</Button>
                    <Button onClick={() => handleClick(dayScores.gameWeek[1].date)}>{formatDate(dayScores.gameWeek[1].date)}</Button>
                    <Button onClick={() => handleClick(dayScores.gameWeek[2].date)}>{formatDate(dayScores.gameWeek[2].date)}</Button>
                    <Button variant="contained">{formatDate(dayScores.gameWeek[3].date)}</Button>
                    <Button onClick={() => handleClick(dayScores.gameWeek[4].date)}>{formatDate(dayScores.gameWeek[4].date)}</Button>
                    <Button onClick={() => handleClick(dayScores.gameWeek[5].date)}>{formatDate(dayScores.gameWeek[5].date)}</Button>
                    <Button onClick={() => handleClick(dayScores.gameWeek[6].date)}>{formatDate(dayScores.gameWeek[6].date)}</Button>
                </ButtonGroup>
            </div>
            {Array.isArray(dayScores.games) && dayScores.games.map(game =>
                <GameCard gameInfo={game} key={game.id}/>
            )}
        </div>
    )
}

export default Scores