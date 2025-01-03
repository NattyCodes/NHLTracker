import Image from 'next/image';
import React from 'react';

const Teams = async ({params}) => {
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
    let name = params.name
    console.log(name)
  return (
    <div>
        <Image src={logo} width={40} height={40} alt={ params.id }></Image>
        {Array.isArray(skaters) && skaters.map(skater =>
        <div key={skater.playerID}>
            <p>{skater.firstName.default} {skater.lastName.default}</p>
        </div>)}
        {Array.isArray(goalies) && goalies.map(goalie =>
        <div key={goalie.playerID}>
          <p>{goalie.firstName.default} {goalie.lastName.default}</p>
        </div>)}
    </div>
  )
}

export default Teams