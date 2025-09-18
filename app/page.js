import { Table, TableCell, TableHead, TableRow } from "@mui/material";
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
      <Table>
        <TableHead classes="head">
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>P</TableCell>
            <TableCell>W</TableCell>
            <TableCell>L</TableCell>
            <TableCell>OT</TableCell>
            <TableCell>GP</TableCell>
          </TableRow>
        </TableHead>
        <Standings standings={standings} />
      </Table>
    </main>
  );
}
