'use client'
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import common from '../styles/Common.module.scss';
import "../styles/globals.scss";
import { StandingsTable } from './_components/StandingsTable/standingsTable';
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

  return (
    <div className={common.container}>
      <div className={`${common.buttonContainer} ${common.centered}`}>
        <ButtonGroup aria-label="Medium-sized button group">
            <Button onClick={() => updateStandingsTopLevel("League")}>League</Button>
            <Button onClick={() => updateStandingsTopLevel("Eastern")}>East</Button>
            <Button onClick={() => updateStandingsTopLevel("Western")}>West</Button>
            <Button onClick={() => updateStandingsViaDivision("Atlantic")}>Atlantic</Button>
            <Button onClick={() => updateStandingsViaDivision("Metropolitan")}>Metropolitan</Button>
            <Button onClick={() => updateStandingsViaDivision("Central")}>Central</Button>
            <Button onClick={() => updateStandingsViaDivision("Pacific")}>Pacific</Button>
            <Button onClick={() => updateStandingsTopLevel("Playoffs")}>Playoffs</Button>
        </ButtonGroup>
      </div>
      <br></br>
      {/* <DivisionSelection /> */}
      {selectedConference !== "Playoffs" && <StandingsTable standings={renderedStandings} standingsHeader={selectedDivision? selectedDivision: selectedConference} />}
      {selectedConference === "Playoffs" && <WildcardStandings leagueStandings={standings}></WildcardStandings>}
    </div>
  )
}

export default Standings