'use client'
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import common from '../styles/Common.module.scss';
import "../styles/globals.scss";
import { StandingsTable } from './_components/standingsTable';
import { WildcardStandings } from './wildcardStandings';
const Standings = (props) => {
  const [selectedConference, setSelectedConference] = useState("League");
  const [selectedDivision, setSelectedDivison] = useState(null);
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
    setSelectedDivison(null);
    if(value === "League") {
      setRenderedStandings(standings)
    } else {
      setRenderedStandings(standings.filter(team => team.conferenceName === value))
    }
  }

  const updateStandingsViaDivision = (value) => 
  {
    setSelectedConference(null)
    setSelectedDivison(value)
    setRenderedStandings(standings.filter(team => team.divisionName === value))
  }

  // const DivisionSelection = () => {
  //   if(selectedConference == "Eastern") {
  //     return(
  //        <ButtonGroup aria-label="Medium-sized button group" variant="text">
  //         <Button onClick={() => updateStandingsTopLevel("Eastern")}>Conference</Button>
  //         <Button onClick={() => updateStandingsViaDivision("Atlantic")}>Atlantic</Button>
  //         <Button onClick={() => updateStandingsViaDivision("Metropolitan")}>MetroPolitan</Button>
  //       </ButtonGroup>
  //     )
  //   }
  //   if(selectedConference == "Western") {
  //      return(
  //        <ButtonGroup aria-label="Medium-sized button group" variant="text">
  //         <Button onClick={() => updateStandingsTopLevel("Western")}>Conference</Button>
  //         <Button onClick={() => updateStandingsViaDivision("Central")}>Central</Button>
  //         <Button onClick={() => updateStandingsViaDivision("Pacific")}>Pacific</Button>
  //       </ButtonGroup>
  //      )
  //   }
  // }

  return (
    <div className={common.container}>
      <ButtonGroup aria-label="Medium-sized button group" variant="text">
          <Button onClick={() => updateStandingsTopLevel("League")}>League</Button>
          <Button onClick={() => updateStandingsTopLevel("Eastern")}>East</Button>
          <Button onClick={() => updateStandingsTopLevel("Western")}>West</Button>
          <Button onClick={() => updateStandingsViaDivision("Atlantic")}>Atlantic</Button>
          <Button onClick={() => updateStandingsViaDivision("Metropolitan")}>MetroPolitan</Button>
          <Button onClick={() => updateStandingsViaDivision("Central")}>Central</Button>
          <Button onClick={() => updateStandingsViaDivision("Pacific")}>Pacific</Button>
          <Button onClick={() => updateStandingsTopLevel("Playoffs")}>Playoffs</Button>
      </ButtonGroup>
      <br></br>
      {/* <DivisionSelection /> */}
      {selectedConference !== "Playoffs" && <StandingsTable standings={renderedStandings} standingsHeader={selectedDivision? selectedDivision: selectedConference} />}
      {selectedConference === "Playoffs" && <WildcardStandings leagueStandings={standings}></WildcardStandings>}
    </div>
  )
}

export default Standings