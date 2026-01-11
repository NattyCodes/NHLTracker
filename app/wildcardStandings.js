import React, { useEffect, useState } from 'react';
import "../styles/globals.scss";
import styles from '../styles/Home.module.scss';
import { StandingsTable } from './_components/StandingsTable/standingsTable';

export const WildcardStandings = (props) => {
    const leagueStandings = props.leagueStandings;
    let [easternWildcard, setEasternWildcard] = useState(null)
    let [westernWildcard, setWesternWildcard] = useState(null)
    const atlanticStandings = leagueStandings.filter(team => team.divisionName === 'Atlantic').slice(0, 3)
    const metropolitanStandings = leagueStandings.filter(team => team.divisionName === 'Metropolitan').slice(0, 3)
    const centralStandings = leagueStandings.filter(team => team.divisionName === 'Central').slice(0, 3)
    const pacificStandings = leagueStandings.filter(team => team.divisionName === 'Pacific').slice(0, 3)

    const sortStandings = (standings) => {
        standings.sort((a,b) => {
            if(a.points == b.points) {
                return b.wins - a.wins
            }
            return b.points - a.points
        })
    }
    useEffect(() => {
        let metro = leagueStandings.filter(team => team.divisionName === 'Metropolitan').slice(3)
        let atlantic = leagueStandings.filter(team => team.divisionName === 'Atlantic').slice(3)
        let east = metro.concat(atlantic)
        sortStandings(east)
        setEasternWildcard(east)

        let central = leagueStandings.filter(team => team.divisionName === 'Central').slice(3)
        let pacific = leagueStandings.filter(team => team.divisionName === 'Pacific').slice(3)
        let west = central.concat(pacific)
        sortStandings(west)
        setWesternWildcard(west)
      }, [leagueStandings])
    return (
        <>
            <h1>Playoffs Race</h1>
            <p>
                For the NHL playoffs the top 3 teams from each division (Atlantic, Pacific, Metropolitan, Central) are selected to make up the top 12 spots.
                after that the next 2 teams in the standings of each conference (East and West) are taken in wildcard spots making up the  remaining 4 teams 
                in the 16 team playoff format.
            </p>
            <div>
                <h1 className={styles.centered}>Eastern</h1>
                <StandingsTable standings={atlanticStandings} standingsHeader={"Atlantic"} />
                <StandingsTable standings={metropolitanStandings} standingsHeader={"Metropolitan"} />
                <StandingsTable standings={easternWildcard} standingsHeader={"Wildcard"} />
            </div>
            <div>
                <h1 className={styles.centered}>Western</h1>
                <StandingsTable standings={pacificStandings} standingsHeader={"Pacific"} />
                <StandingsTable standings={centralStandings} standingsHeader={"Central"} />
                <StandingsTable standings={westernWildcard} standingsHeader={"Wildcard"} />
            </div>
        </>
    )
}