'use client'
import { SeasonStatsGoalie } from "@/app/_components/SeasonStats/seasonStatsGoalie";
import { useEffect, useState } from "react";
import "../../../styles/globals.scss";
import styles from "../../../styles/Player.module.scss";
import { SeasonStatsPlayer } from '../../_components/SeasonStats/seasonStatsPlayer.js';
const PlayerStats = (props) => {
    const regularSeasonStats = props.regularSeasonStats;
    const playoffStats = props.playoffStats;
    const goalie = props.goalie;
    const [gameType, setGameType] = useState("Regular")

    const formatSeason = (season) => {
        return season.toString().substring(0,4) + "-" + season.toString().substring(4)
    }

    return (
        <div className={styles.stats}>
            <select name='gameType' id='gameType' onChange={e => setGameType(e.target.value)}>
                <option value={"Regular"}>Regular Season</option>
                <option value={"Playoffs"}>Playoffs</option>
            </select>
            {!goalie && <SeasonStatsPlayer stats={gameType === "Regular" ? regularSeasonStats : playoffStats}></SeasonStatsPlayer>}
            {goalie && <SeasonStatsGoalie stats={gameType === "Regular" ? regularSeasonStats : playoffStats}></SeasonStatsGoalie>}
        </div>
    )
}

export default PlayerStats;