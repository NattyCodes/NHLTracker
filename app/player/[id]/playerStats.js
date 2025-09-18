'use client'
import { useEffect, useState } from "react";
import "../../../styles/globals.scss";
import styles from "../../../styles/Player.module.scss";
import { SeasonStats } from '../../_components/seasonStats.js';
const PlayerStats = (props) => {
    const nhlSeasons = props.nhlSeasons;
    const regularSeasonStats = props.regularSeasonStats;
    const playoffStats = props.playoffStats;
    const [selectedSeason, setSelectedSeason] = useState(nhlSeasons[0]);
    const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
    const [currRegularSeason, setCurrRegularSeason] = useState(regularSeasonStats[0])
    const [currPlayoffSeason, setCurrPlayoffSeason] = useState(playoffStats[0])

    const formatSeason = (season) => {
        return season.toString().substring(0,4) + "-" + season.toString().substring(4)
    }

    useEffect(() => {
        console.log(`selected season is ${selectedSeason}`)
        for(let i = 0; i < nhlSeasons.length; i++) {
            if(selectedSeason == nhlSeasons[i]) {
                setSelectedSeasonIndex(i);
            }
            if(`${regularSeasonStats[i].season} ${regularSeasonStats[i].teamName.default}` == selectedSeason) {
                console.log(regularSeasonStats[i])
                setCurrRegularSeason(regularSeasonStats[i])
            }
            if(playoffStats[i] != null && `${playoffStats[i].season} ${playoffStats[i].teamName.default}` == selectedSeason) {
                console.log(playoffStats[i])
                setCurrPlayoffSeason(playoffStats[i])
            }
        }
    }, [selectedSeason, nhlSeasons, regularSeasonStats, playoffStats])


    // console.log(currRegularSeason);
    return (
        <div className={styles.container}>
            <select name='season' id='season' onChange={e => setSelectedSeason(e.target.value)}>
                {/* {nhlSeasons.map(nhlSeason => 
                    <option key={nhlSeason} value={nhlSeason}>{formatSeason(nhlSeason)}</option>
                )} */}
                {regularSeasonStats.map(nhlSeason => 
                    <option key={`${nhlSeason.season} ${nhlSeason.teamName.default}`} value={`${nhlSeason.season} ${nhlSeason.teamName.default}`}>{`${formatSeason(nhlSeason.season)} ${nhlSeason.teamName.default}`}</option>
                )}
            </select>
            {/* <h2>{formatSeason(selectedSeason)} Regular Season Stats</h2>
            <p>Goals: {currRegularSeason.goals}</p>
            <p>Assists: {currRegularSeason.assists}</p>
            <p>Points: {currRegularSeason.points}</p>
            <p>Games Played: {currRegularSeason.gamesPlayed}</p>
            <p>Plus/Minus: {currRegularSeason.plusMinus}</p>
            <p>Shooting Percent: {(currRegularSeason.shootingPctg).toPrecision(4)}%</p> */}
            <SeasonStats season={formatSeason(selectedSeason)} gameType='Regular Season' stats={currRegularSeason}></SeasonStats>
            {currPlayoffSeason && `${currPlayoffSeason.season} ${currPlayoffSeason.teamName.default}` == selectedSeason && 
            <div> 
                {/* <h2>{formatSeason(selectedSeason)} Playoff Stats</h2>
                <p>Goals: {currPlayoffSeason.goals}</p>
                <p>Assists: {currPlayoffSeason.assists}</p>
                <p>Points: {currPlayoffSeason.points}</p>
                <p>Games Played: {currPlayoffSeason.gamesPlayed}</p>
                <p>Plus/Minus: {currPlayoffSeason.plusMinus}</p>
                <p>Shooting Percent: {(currPlayoffSeason.shootingPctg).toPrecision(4)}%</p> */}
                <SeasonStats season={formatSeason(selectedSeason)} gameType='Playoffs' stats={currPlayoffSeason}></SeasonStats>
            </div>}
        </div>
    )
}

export default PlayerStats;