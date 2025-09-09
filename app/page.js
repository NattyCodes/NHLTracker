import Image from "next/image";
import Link from "next/link";
import "../styles/globals.scss";
import styles from '../styles/Home.module.scss';
import Standings from "./standings";
export const dynamic = 'force-dynamic'
export default async function Home() {
  let data = await fetch('https://api-web.nhle.com/v1/standings/now', { cache: 'no-store' }); 
  let jsonData = await data.json();
  let standings = jsonData.standings;
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
      </table>
    </main>
  );
}
