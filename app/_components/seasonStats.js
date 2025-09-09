'use client'
import styles from '../../styles/seasonStats.module.scss';
export const SeasonStats = (props) => {
    const season = props.season;
    const stats = props.stats;
    const gameType = props.gameType;
    return (
        <div>
            <h2 className={styles.header}>{season} {gameType} Stats</h2>
            <div className={styles.body}>
                <p>Team: {stats.teamName.default}</p>
                <p>Goals: {stats.goals}</p>
                <p>Assists: {stats.assists}</p>
                <p>Points: {stats.points}</p>
                <p>Games Played: {stats.gamesPlayed}</p>
                <p>Plus/Minus: {stats.plusMinus}</p>
                <p>Shooting Percent: {(stats.shootingPctg).toPrecision(4)}%</p>
            </div>
        </div>
    )
}
