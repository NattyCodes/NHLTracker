'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import "../styles/globals.css";
import styles from '../styles/Home.module.css';
const Standings = (props) => {
  const standings = props.standings
  const router = useRouter()

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }

  return (
    <tbody>
          {Array.isArray(standings) && standings.map(team =>
            <tr key={team.teamAbbrev.default} className={styles.row} onClick={() => {
                router.push(`/teams/${team.teamAbbrev.default}?` + createQueryString("name", team.teamName.default));
          }}>
              <td><Image src={team.teamLogo} width={40} height={40} alt={team.teamAbbrev.default}></Image></td>
              <td>{team.teamName.default}</td>
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