'use client'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styles from './seasonStats.module.scss';
export const SeasonStatsGoalie = (props) => {
    const stats = props.stats;
    return (
        <div>
            <Table className={styles.table}>
                <TableHead className={styles.head}>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Games Played</TableCell>
                        <TableCell>Wins</TableCell>
                        <TableCell>Shutouts</TableCell>
                        <TableCell>Goals Against Average</TableCell>
                        <TableCell>Save Percentage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(stats) && stats.map(seasonStats =>
                        <TableRow key={`${seasonStats.teamName.default}${seasonStats.season}`} className={styles.row}>
                            <TableCell>{`${seasonStats.season.toString().slice(0, 4)}-${seasonStats.season.toString().slice(4)}`}</TableCell>
                            <TableCell>{seasonStats.teamName.default}</TableCell>
                            <TableCell>{seasonStats.gamesPlayed}</TableCell>
                            <TableCell>{seasonStats.wins}</TableCell>
                            <TableCell>{seasonStats.shutouts}</TableCell>
                            <TableCell>{seasonStats.goalsAgainstAvg.toPrecision(3)}</TableCell>
                            <TableCell>{seasonStats.savePctg.toPrecision(3)}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}