'use client'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "../../../styles/globals.scss";
import styles from "../../../styles/Home.module.scss";

const Skaters = (props) =>{
    let skaters = props.skaters
    const router = useRouter()
    return (
        <Table className={styles.table}>
            <TableHead className={styles.head}>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Goals</TableCell>
                <TableCell>Assists</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {Array.isArray(skaters) && skaters.map(skater =>
                <TableRow key={`${skater.playerID}${skater.firstName.default}`} className={styles.row} hover sx={{cursor: 'pointer'}} onClick={() => {
                router.push(`../player/${skater.playerId}`);
                }}>
                    <TableCell><Image src={skater.headshot} width={60} height={60} alt={skater.firstName.default} style={{ borderRadius: "100px"}}></Image></TableCell>
                    <TableCell>{skater.firstName.default} {skater.lastName.default}</TableCell>
                    <TableCell>{skater.positionCode}</TableCell>
                    <TableCell>{skater.points}</TableCell>
                    <TableCell>{skater.goals}</TableCell>
                    <TableCell>{skater.assists}</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    )
}

export default Skaters;