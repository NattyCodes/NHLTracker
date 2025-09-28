import Image from 'next/image';
import React from 'react';
import "../../../styles/globals.scss";
import styles from "../../../styles/Home.module.scss";
import Goalies from "./goalies.js";
import Skaters from "./skaters.js";

const Teams = async ({params, searchParams}) => {
    const res = await fetch('https://api-web.nhle.com/v1/club-stats/'+ params.id +'/now', { cache: 'no-store' });
    const teamInfo = await res.json();
    const skaters = teamInfo.skaters
    console.log(teamInfo)
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
        <h2>Skaters</h2>
        <Skaters skaters={skaters}></Skaters>
        <h2>Goalies</h2>
        <Goalies goalies={goalies}></Goalies>
        
    </div>
  )
}

export default Teams