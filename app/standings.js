'use client'
import { TableBody, TableCell, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import "../styles/globals.scss";
import styles from '../styles/Home.module.scss';
const Standings = (props) => {
  const standings = props.standings
  const router = useRouter()

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }

  return (
    <TableBody>
          {Array.isArray(standings) && standings.map(team =>
            <TableRow key={team.teamAbbrev.default} className={styles.row} onClick={() => {
                router.push(`/teams/${team.teamAbbrev.default}?` + createQueryString("name", team.teamName.default));
          }} hover sx={{cursor: 'pointer'}}>
              <TableCell><Image src={team.teamLogo} width={40} height={40} alt={team.teamAbbrev.default}></Image></TableCell>
              <TableCell>{team.teamName.default}</TableCell>
              <TableCell>{team.points}</TableCell>
              <TableCell>{team.wins}</TableCell>
              <TableCell>{team.losses}</TableCell>
              <TableCell>{team.otLosses}</TableCell>
              <TableCell>{team.gamesPlayed}</TableCell>
            </TableRow>)}
    </TableBody>
  )
}

export default Standings