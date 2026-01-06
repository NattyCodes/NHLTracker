'use client'
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import playerStyle from "../../styles/Player.module.scss";
import styles from '../../styles/seasonStats.module.scss';
import statsStyles from '../../styles/Stats.module.scss';
export const StatsLeaderTable = (props) => {
    const playerStats = props.playerStats;
    const goalieStats = props.goalieStats
    const router = useRouter()
    const [currStat, setCurrStat] = useState('Points')
    const [stats, setStats] = useState(playerStats['points'])
    const updateStats = async (stat, statParam, skaterGoalie) => {
        setCurrStat(stat)
        if (skaterGoalie === 'skater') {
            setStats(playerStats[statParam])
        } else {
            setStats(goalieStats[statParam])
        }
        
    }
    return (
        <div>
            <div className={statsStyles.statSelectorContainer}>
                <div className={statsStyles.statSelectorChild}>
                    <h3>Player Stats</h3>
                    <ButtonGroup aria-label="Medium-sized button group" variant="text">
                        <Button onClick={() => updateStats("Points","points","skater")}>points</Button>
                        <Button onClick={() => updateStats("Goals","goals","skater")}>goals</Button>
                        <Button onClick={() => updateStats("Assists","assists","skater")}>assists</Button>
                    </ButtonGroup>
                </div>
                <div className={statsStyles.statSelectorChild}>
                    <h3>Goalie Stats</h3>
                    <ButtonGroup aria-label="Medium-sized button group" variant="text">
                        <Button onClick={() => updateStats("Goals Against Average","goalsAgainstAverage","goalie")}>GAA</Button>
                        <Button onClick={() => updateStats("Save Percentage","savePctg","goalie")}>SV %</Button>
                        <Button onClick={() => updateStats("Shutouts","shutouts","goalie")}>Shutouts</Button>
                    </ButtonGroup>
                </div>
            </div>
            <h1>{currStat} Leaders</h1>
            <Table>
                <TableBody>
                    {Array.isArray(stats) && stats.map(player =>
                        <TableRow key={`${player.id}`} hover sx={{cursor: 'pointer'}} onClick={() => {router.push(`../player/${player.id}`)}}>
                            <TableCell>
                                <div className={statsStyles.gridContainer}> {/* Make this a grid */}
                                    <div><Image src={player.headshot} width={75} height={75} alt={player.firstName.default} style={{ borderRadius: "100px"}} className={statsStyles.headshot}></Image></div> 
                                    <div><Image src={player.teamLogo} width={45} height={45} alt={player.teamAbbrev} style={{ borderRadius: "100px"}} className={statsStyles.logo}></Image> </div>
                                    <div className={statsStyles.number}>#{player.sweaterNumber}</div>
                                </div>
                            </TableCell>
                            <TableCell>{`${player.firstName.default} ${player.lastName.default}`}</TableCell>
                            <TableCell sx={{ fontWeight: 700}}>{player.value % 1 == 0? player.value : player.value.toPrecision(3)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}