import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import styles from './Home.module.css';
import Standings from "./standings";
export default async function Home() {
  const data = await fetch('https://api-web.nhle.com/v1/standings/2024-04-18'); 
  const jsonData = await data.json();
  const standings = jsonData.standings;
  return (
    <main className={styles.main}>
      <table className={styles.table}>
        <thead className={styles.head}>
        <tr>
          <th>Logo</th>
          <th>Team</th>
          <th>P</th>
          <th>W</th>
          <th>L</th>
          <th>OT</th>
          <th>GP</th>
        </tr>
        </thead>
        <Standings standings={standings} />
        {/* <tbody>
          {Array.isArray(standings) && standings.map(team =>
            <tr key={team.teamAbbrev.default} className={styles.row}>
              <td><Image src={team.teamLogo} width={40} height={40} alt={team.teamAbbrev.default}></Image></td>
              <td>{team.teamCommonName.default}</td>
              <td>{team.points}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.otLosses}</td>
              <td>{team.gamesPlayed}</td>
            </tr>)}
        </tbody> */}
      </table>
    </main>
  );
}
