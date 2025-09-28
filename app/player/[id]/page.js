import Image from 'next/image';
import React from 'react';
import "../../../styles/globals.scss";
import styles from "../../../styles/Player.module.scss";
import "../../convertAbrvToFull.js";
import PlayerStats from './playerStats';

const player = async ({params}) => {
    const res = await fetch(`https://api-web.nhle.com/v1/player/${params.id}/landing`, { cache: 'no-store' });
    const playerInfo = await res.json();
    const position = playerInfo.position;
    const height_feet = (playerInfo.heightInInches / 12).toFixed(0);
    const height_inches = playerInfo.heightInInches % 12
    const dom_hand = playerInfo.shootsCatches
    let nhlSeasons = []
    let statsByRegularSeason = []
    let statsByPlayoffSeason = []
    const getAge = () => {
        const birthDate = new Date(playerInfo.birthDate)
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear() - 1
        if(birthDate.getMonth() < today.getMonth()) {
            age++;
        } else if((birthDate.getMonth() == today.getMonth()) && birthDate.getDay() <= today.getDay()) {
            age++;
        }
        return age
    }

    const filterStats = () => {
        console.log("Number of seasons played: " + playerInfo.seasonTotals.length)
        for(let i = playerInfo.seasonTotals.length - 1; i >= 0; i--) {
            let currSeason = playerInfo.seasonTotals[i]
            let formattedSeason = currSeason.season.toString().substring(0,4) + "-" + currSeason.season.toString().substring(4)
            // console.log(formattedSeason)
            if(currSeason.leagueAbbrev === "NHL") {
                if(currSeason.gameTypeId === 2) {
                    statsByRegularSeason.push(currSeason);
                    nhlSeasons.push(`${currSeason.season} ${currSeason.teamName.default}`);
                    // statsByPlayoffSeason.push("")
                } else if (currSeason.gameTypeId === 3){
                    statsByPlayoffSeason.push(currSeason);
                }
            }
        }
    }
    filterStats()
    console.log(playerInfo)

    const getPosition = () => {
        let position_name = ""
        switch (playerInfo.position) {
            case("L"): {
                position_name = "Left Wing";
                break;
            }
            case("C"): {
                position_name = "Center";
                break;
            }
            case("R"): {
                position_name = "Right Wing";
                break;
            }
            case("D"): {
                position_name = "Defense";
                break;
            }
        }
        return position_name;
    }
    return (
        <div className={styles.container}>
            <div className={styles.header_img_container}>
                <Image src={playerInfo.heroImage} width={0} height={0} alt={`${playerInfo.firstName.default} ${playerInfo.lastName.default}`} sizes="50vw" style={{ width: '60%', height: '50vh', opacity:0.9}} priority></Image>
                <h1 className={styles.centered}>{playerInfo.firstName.default} {playerInfo.lastName.default}</h1>
            </div>
            <div>
                <Image src={playerInfo.headshot} width={100} height={100} alt={`${playerInfo.firstName.default} ${playerInfo.lastName.default}`} style={{ borderRadius: "100px"}} priority></Image>
            </div>
            <div>
                <Image src={playerInfo.teamLogo} width={100} height={100} alt={`${playerInfo.firstName.default} ${playerInfo.lastName.default}`} priority></Image>
            </div>
            <h1>Player Info</h1>
            <h2>General Information</h2>
            <p>Team: {playerInfo.fullTeamName.default}</p>
            <p>Number: {playerInfo.sweaterNumber}</p>
            <p>Position: {getPosition()}</p>
            <p>{(position === "G") && "Catches: "}
               {(position !== "G") && "Shoots: "}
               {(dom_hand === "R") && "Right"}
               {(dom_hand === "L") && "Left"}</p>
            <p>Height: {height_feet + "' " + height_inches + '"'}</p>
            <p>Weight: {playerInfo.weightInPounds + " lbs"}</p>
            <p>Age: {getAge()}</p>
            <h2>Draft Information</h2>
            {playerInfo.draftDetails != null &&
            <div>
            <p>Draft Year: {playerInfo.draftDetails.year}</p>
            <p>Draft Round: {playerInfo.draftDetails.round}</p>
            <p>Draft Position: {playerInfo.draftDetails.overallPick}</p>
            <p>Drafted by: {playerInfo.draftDetails.teamAbbrev}</p>
            </div>}
            {playerInfo.draftDetails == null && <p>Undrafted</p>}
            <h2>Season Stats</h2>
            {(position !== "G") &&<PlayerStats regularSeasonStats={statsByRegularSeason} nhlSeasons={nhlSeasons} playoffStats={statsByPlayoffSeason} />}
        </div>
    )
}

export default player;