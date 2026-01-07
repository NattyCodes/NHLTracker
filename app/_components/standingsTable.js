'use client'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import "../../styles/globals.scss";
import styles from '../../styles/Home.module.scss';
export const StandingsTable = (props) => {
  const standingsHeader = props.standingsHeader
  const renderedStandings = props.standings
  const router = useRouter()

    const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }

  return(
    <>
        <h2>{standingsHeader}</h2>
        <Table stickyHeader aria-label="sticky table" size='small'>
            <TableHead classes="head">
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Overtime Losses</TableCell>
                <TableCell>Games Played</TableCell>
            </TableRow>
            </TableHead>
        <TableBody>
                {Array.isArray(renderedStandings) && renderedStandings.map((team, index, array) =>
                <TableRow key={team.teamAbbrev.default} className={standingsHeader === 'Wildcard' && index === 1 ? styles.cutoff : ""} onClick={() => {
                    router.push(`/teams/${team.teamAbbrev.default}?` + createQueryString("name", team.teamName.default));
                }} hover sx={{cursor: 'pointer' }}>
                    <TableCell><Image src={team.teamLogo} width={40} height={40} alt={team.teamAbbrev.default}></Image></TableCell>
                    <TableCell>{team.teamName.default}</TableCell>
                    <TableCell>{team.points}</TableCell>
                    <TableCell>{team.wins}</TableCell>
                    <TableCell>{team.losses}</TableCell>
                    <TableCell>{team.otLosses}</TableCell>
                    <TableCell>{team.gamesPlayed}</TableCell>
                </TableRow>)}
        </TableBody>
        </Table>
    </>
  )
}