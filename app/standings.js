'use client'
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import "../styles/globals.scss";
import styles from '../styles/Home.module.scss';
const Standings = (props) => {
  const [selectedConference, setSelectedConference] = useState("League");
  const standings = props.standings
  const [renderedStandings, setRenderedStandings] = useState("")
  const router = useRouter()

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }

  useEffect(() => {
    setRenderedStandings(standings)
  }, [])

  const updateStandingsTopLevel = (value) => {
    setSelectedConference(value)
    if(value === "League") {
      setRenderedStandings(standings)
    } else {
      setRenderedStandings(standings.filter(team => team.conferenceName === value))
    }
    
    console.log(renderedStandings)
  }

  const updateStandingsViaDivision = (value) => {
    setRenderedStandings(standings.filter(team => team.divisionName === value))
  }

  const DivisionSelection = () => {
    if(selectedConference == "Eastern") {
      return(
         <ButtonGroup aria-label="Medium-sized button group" variant="text">
          <Button onClick={() => updateStandingsTopLevel("Eastern")}>Conference</Button>
          <Button onClick={() => updateStandingsViaDivision("Atlantic")}>Atlantic</Button>
          <Button onClick={() => updateStandingsViaDivision("Metropolitan")}>MetroPolitan</Button>
        </ButtonGroup>
      )
    }
    if(selectedConference == "Western") {
       return(
         <ButtonGroup aria-label="Medium-sized button group" variant="text">
          <Button onClick={() => updateStandingsTopLevel("Western")}>Conference</Button>
          <Button onClick={() => updateStandingsViaDivision("Central")}>Central</Button>
          <Button onClick={() => updateStandingsViaDivision("Pacific")}>Pacific</Button>
        </ButtonGroup>
       )
    }
  }

  return (
    <>
      <ButtonGroup aria-label="Medium-sized button group" variant="text">
          <Button onClick={() => updateStandingsTopLevel("League")}>League</Button>
          <Button onClick={() => updateStandingsTopLevel("Eastern")}>East</Button>
          <Button onClick={() => updateStandingsTopLevel("Western")}>West</Button>
          <Button onClick={() => updateStandingsTopLevel("Playoff Race")}>Playoff Race</Button>
      </ButtonGroup>
      <br></br>
      <DivisionSelection />
      <h1>{selectedConference}</h1>
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
      <TableBody>
            {Array.isArray(renderedStandings) && renderedStandings.map(team =>
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
      </Table>
    </>
  )
}

export default Standings