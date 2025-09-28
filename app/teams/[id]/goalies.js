'use client'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "../../../styles/globals.scss";
import styles from "../../../styles/Home.module.scss";

const Goalies = (props) =>{
    let goalies = props.goalies
    const router = useRouter()
    return (
        <Table className={styles.table}>
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
                <TableRow key={goalie.playerID} className={styles.row} hover sx={{cursor: 'pointer'}} onClick={() => {
                router.push(`../player/${goalie.playerId}`);
                }}>
                    <TableCell><Image src={goalie.headshot} width={60} height={60} alt={goalie.firstName.default} style={{ borderRadius: "100px"}}></Image></TableCell>
                    <TableCell>{goalie.firstName.default} {goalie.lastName.default}</TableCell>
                    <TableCell>G</TableCell>
                    <TableCell>{goalie.points}</TableCell>
                    <TableCell>{goalie.goals}</TableCell>
                    <TableCell>{goalie.assists}</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    )
}

export default Goalies;