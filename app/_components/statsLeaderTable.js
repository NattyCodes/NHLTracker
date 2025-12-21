'use client'
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/seasonStats.module.scss';
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
            <ButtonGroup aria-label="Medium-sized button group" variant="text">
                <Button onClick={() => updateStats("Points","points","skater")}>points</Button>
                <Button onClick={() => updateStats("Goals","goals","skater")}>goals</Button>
                <Button onClick={() => updateStats("Assists","assists","skater")}>assists</Button>
                <Button onClick={() => updateStats("Goals Against Average","goalsAgainstAverage","goalie")}>GAA</Button>
                <Button onClick={() => updateStats("Save Percentage","savePctg","goalie")}>SV %</Button>
                <Button onClick={() => updateStats("Shutouts","shutouts","goalie")}>Shutouts</Button>
            </ButtonGroup>
            <h1>{currStat} Leaders</h1>
            <Table>
                <TableBody>
                    {Array.isArray(stats) && stats.map(player =>
                        <TableRow key={`${player.id}`} hover sx={{cursor: 'pointer'}} onClick={() => {router.push(`../player/${player.id}`)}}>
                            <TableCell><div><Image src={player.headshot} width={60} height={60} alt={player.firstName.default} style={{ borderRadius: "100px"}}></Image></div> 
                            <div><Image src={player.teamLogo} width={30} height={30} alt={player.teamAbbrev} style={{ borderRadius: "100px"}}></Image> #{player.sweaterNumber}</div></TableCell>
                            <TableCell>{`${player.firstName.default} ${player.lastName.default}`}</TableCell>
                            <TableCell>{player.value % 1 == 0? player.value : player.value.toPrecision(3)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}