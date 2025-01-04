import Image from 'next/image';
import React from 'react';
import "../../../styles/globals.css";
import styles from "../../../styles/Home.module.css";

const Teams = async ({params, searchParams}) => {
    const res = await fetch('https://api-web.nhle.com/v1/club-stats/'+ params.id +'/now');
    const teamInfo = await res.json();
    const skaters = teamInfo.skaters
    for (let i = 0; i < skaters.length; i++) {
      for (let j = 0; j < skaters.length - 1; j++) {
        if (skaters[j].points < skaters[j+1].points) {
          let temp = skaters[j];
          skaters[j] = skaters[j+1];
          skaters[j+1] = temp;
        }
      }
    }
    const goalies = teamInfo.goalies
    const logo = 'https://assets.nhle.com/logos/nhl/svg/' + params.id +'_light.svg'
    let name = searchParams.name
    console.log(searchParams.name)
  return (
    <div>
        <Image src={logo} width={40} height={40} alt={ params.id }></Image>
        <h1>{name}</h1>
        <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th></th>
            <th>Player</th>
            <th>Position</th>
            <th>Points</th>
            <th>Goals</th>
            <th>Assists</th>
          </tr>
        </thead>
        {Array.isArray(skaters) && skaters.map(skater =>
        <tr key={skater.playerID} className={styles.row}>
          <td><Image src={skater.headshot} width={60} height={60} alt={skater.firstName.default}></Image></td>
          <td>{skater.firstName.default} {skater.lastName.default}</td>
          <td>{skater.positionCode}</td>
          <td>{skater.points}</td>
          <td>{skater.goals}</td>
          <td>{skater.assists}</td>
        </tr>)}
        </table>
        {Array.isArray(goalies) && goalies.map(goalie =>
        <div key={goalie.playerID}>
          <Image src={goalie.headshot} width={60} height={60} alt={goalie.firstName.default}></Image>
          <p>{goalie.firstName.default} {goalie.lastName.default}</p>
        </div>)}
    </div>
  )
}

export default Teams