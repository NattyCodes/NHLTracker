'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "./globals.css";
import styles from './Home.module.css';
const Standings = (props) => {
  const standings = props.standings
  const router = useRouter()
  return (
    <tbody>
          {Array.isArray(standings) && standings.map(team =>
            <tr key={team.teamAbbrev.default} className={styles.row} onClick={() => {
                router.push('/teams/' + team.teamAbbrev.default)
            }}>
              <td><Image src={team.teamLogo} width={40} height={40} alt={team.teamAbbrev.default}></Image></td>
              <td>{team.teamCommonName.default}</td>
              <td>{team.points}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.otLosses}</td>
              <td>{team.gamesPlayed}</td>
            </tr>)}
    </tbody>
  )
}

export default Standings