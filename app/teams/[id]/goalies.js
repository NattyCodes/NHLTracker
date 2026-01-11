'use client'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "../../../styles/globals.scss";
import styles from "./teams.module.scss";

const Goalies = (props) =>{
    let goalies = props.goalies
    const router = useRouter()
    return (
        <Table className={styles.table} size='small'>
            <TableHead className={styles.head}>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Games Played</TableCell>
                <TableCell>Save Percentage</TableCell>
                <TableCell>Goals Against Average</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {Array.isArray(goalies) && goalies.map(goalie =>
                <TableRow key={`${goalie.playerID}${goalie.firstName.default}`} className={styles.row} sx={{cursor: 'pointer'}} onClick={() => {
                router.push(`../player/${goalie.playerId}`);
                }}>
                    <TableCell><Image src={goalie.headshot} width={60} height={60} alt={goalie.firstName.default} style={{ borderRadius: "100px"}}></Image></TableCell>
                    <TableCell>{goalie.firstName.default} {goalie.lastName.default}</TableCell>
                    <TableCell>G</TableCell>
                    <TableCell>{goalie.gamesPlayed}</TableCell>
                    <TableCell>{goalie.savePercentage.toPrecision(3)}</TableCell>
                    <TableCell>{goalie.goalsAgainstAverage.toPrecision(3)}</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    )
}

export default Goalies;