'use client'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styles from '../../styles/seasonStats.module.scss';
export const SeasonStats = (props) => {
    const stats = props.stats;

    return (
        <div>
            <Table>
                <TableHead classes="head">
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Goals</TableCell>
                        <TableCell>Assists</TableCell>
                        <TableCell>Games Played</TableCell>
                        <TableCell>Plus/Minus</TableCell>
                        <TableCell>Shooting Percent</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(stats) && stats.map(seasonStats =>
                        <TableRow key={`${seasonStats.teamName.default}${seasonStats.season}`}>
                            <TableCell>{`${seasonStats.season.toString().slice(0, 4)}-${seasonStats.season.toString().slice(4)}`}</TableCell>
                            <TableCell>{seasonStats.teamName.default}</TableCell>
                            <TableCell>{seasonStats.points}</TableCell>
                            <TableCell>{seasonStats.goals}</TableCell>
                            <TableCell>{seasonStats.assists}</TableCell>
                            <TableCell>{seasonStats.gamesPlayed}</TableCell>
                            <TableCell>{seasonStats.plusMinus}</TableCell>
                            <TableCell>{seasonStats.shootingPctg.toPrecision(2)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}