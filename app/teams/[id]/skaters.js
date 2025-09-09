'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "../../../styles/globals.scss";
import styles from "../../../styles/Home.module.scss";

const Skaters = (props) =>{
    let skaters = props.skaters
    const router = useRouter()
    return (
        <table className={styles.table}>
            <thead className={styles.head}>
            <tr>
                <th></th>
                <th>Player</th>
                <th>Position</th>
                <th>Points</th>
                <th>Goals</th>
                <th>Assists</th>
            </tr>
            </thead>
            <tbody>
                {Array.isArray(skaters) && skaters.map(skater =>
                <tr key={skater.playerID} className={styles.row} onClick={() => {
                router.push(`../player/${skater.playerId}`);
                }}>
                <td><Image src={skater.headshot} width={60} height={60} alt={skater.firstName.default}></Image></td>
                <td>{skater.firstName.default} {skater.lastName.default}</td>
                <td>{skater.positionCode}</td>
                <td>{skater.points}</td>
                <td>{skater.goals}</td>
                <td>{skater.assists}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

export default Skaters;