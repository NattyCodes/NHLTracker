'use client'
import { useEffect, useState } from "react";
import "../../../styles/globals.scss";
import styles from "../../../styles/Player.module.scss";
import { SeasonStats } from '../../_components/seasonStats.js';
const PlayerStats = (props) => {
    const regularSeasonStats = props.regularSeasonStats;
    const playoffStats = props.playoffStats;
    const [gameType, setGameType] = useState("Regular")

    const formatSeason = (season) => {
        return season.toString().substring(0,4) + "-" + season.toString().substring(4)
    }

    return (
        <div className={styles.container}>
            <select name='gameType' id='gameType' onChange={e => setGameType(e.target.value)}>
                <option value={"Regular"}>Regular Season</option>
                <option value={"Playoffs"}>Playoffs</option>
            </select>
            <SeasonStats stats={gameType === "Regular" ? regularSeasonStats : playoffStats}></SeasonStats>
        </div>
    )
}

export default PlayerStats;