
import Image from 'next/image';
import { CgPlayButtonR } from "react-icons/cg";
import { addSuffix } from '../../_utils/addSuffix';
import gameInfoStyles from './GameInfo.module.scss';
const GameCard = (props) => {
    const gameInfo = props.gameInfo
    const homeTeam = gameInfo.homeTeam
    const awayTeam = gameInfo.awayTeam
    console.log(gameInfo)

    const TeamScore = ({logoLink, teamName, primaryInfo, secondaryInfo}) =>{
        return(
            <div className={gameInfoStyles.teamScoreContainer}>
                <div className={gameInfoStyles.primaryImage}>
                    <Image src={logoLink} width={60} height={60} alt={teamName} style={{ borderRadius: "100px"}}></Image>
                </div>
                <div className={gameInfoStyles.generalInfoContainer}>
                    <div className={gameInfoStyles.nameContainer}>
                        {teamName}
                    </div>
                    <div className={gameInfoStyles.secondaryInfoContainer}>
                        <p>{secondaryInfo}</p>
                    </div>
                    <div className={gameInfoStyles.primaryInfoContainer}>
                        {primaryInfo}
                    </div>
                </div>
            </div>
        )
    }

    const LeaderPlayerCard = ({headshot, name, value, category, secondaryInfo}) => {
        return (
            <div className={gameInfoStyles.playerCardContainer}>
                <div className={gameInfoStyles.primaryImage}><Image src={headshot} width={60} height={60} alt={name} style={{ borderRadius: "100px"}}></Image></div>
                <div className={gameInfoStyles.generalInfoContainer}>
                    <div className={gameInfoStyles.nameContainer}>{name}</div>
                    <div className={gameInfoStyles.primaryInfoContainer}>
                        {value}
                        <div>{category}</div>
                    </div>
                    <div className={gameInfoStyles.secondaryInfoContainer}>{secondaryInfo}</div>
                </div>
            </div>
        )
    }

    const GoalPlayerCard = ({goalInfo, homeTeam, awayTeam}) => {
        return(
            <div className={gameInfoStyles.playerCardContainer}>
                    <div className={gameInfoStyles.primaryImage}><Image src={goalInfo.mugshot} width={60} height={60} alt={goalInfo.name.default} style={{ borderRadius: "100px"}}></Image></div>
                    <div className={gameInfoStyles.generalInfoContainer}>
                        <div className={gameInfoStyles.nameContainer}>{`${goalInfo.firstName.default} ${goalInfo.lastName.default} (${goalInfo.goalsToDate})`}</div>
                        <div className={gameInfoStyles.primaryInfoContainer}>
                            <a href={goalInfo.highlightClipSharingUrl} target='_blank'>
                                <CgPlayButtonR/>
                            </a>
                        </div>
                        <div className={gameInfoStyles.secondaryInfoContainer}>
                            <div className={gameInfoStyles.tertiaryContainer}>
                                {Array.isArray(goalInfo.assists) && goalInfo.assists.map((assist, index, array) =>
                                <p key={assist.playerId}>{`${assist.name.default} (${assist.assistsToDate}) `}
                                {index + 1 === array.length? "" : " • "}
                                </p>
                                )}
                            </div>
                            <div className={gameInfoStyles.tertiaryContainer}>
                                {homeTeam === goalInfo.teamAbbrev ? <p><b>{homeTeam} {goalInfo.homeScore}</b> - {awayTeam} {goalInfo.awayScore}</p> : 
                                <p>{homeTeam} {goalInfo.homeScore} - <b>{awayTeam} {goalInfo.awayScore}</b></p>}
                                <p>({goalInfo.timeInPeriod} - {goalInfo.period < 4 ? addSuffix(goalInfo.period) : goalInfo.period === 4 ? "OT" : "SO"}) </p>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }

    const PlayedGameCard = ({gameInfo}) => {
        let period = 1;
        if (gameInfo.period < 4) {
            period = addSuffix(gameInfo.period)
        } else if (gameInfo.period === 4) {
            period = "OT";
        } else {
            period = "SO";
        }
        return (
            <div className={gameInfoStyles.gameCardContainer}>
                <div className={gameInfoStyles.cardHeader}>
                    {gameInfo.gameState === 'Final' || gameInfo.gameState == 'OFF' ? "Final" : `${period} • ${gameInfo.clock.timeRemaining}`}
                </div>  
                <div className={gameInfoStyles.gameScoreContainer}>
                    <TeamScore logoLink={homeTeam.logo} teamName={homeTeam.name.default} primaryInfo={homeTeam.score} secondaryInfo={`SOG: ${homeTeam.sog}`}/>
                    VS
                    <TeamScore logoLink={awayTeam.logo} teamName={awayTeam.name.default} primaryInfo={awayTeam.score} secondaryInfo={`SOG: ${awayTeam.sog}`}/>
                </div>
                <div className={gameInfoStyles.teamLeaderContainer}>
                    <h1>Goals</h1>
                    <div className={`${gameInfoStyles.flex} ${gameInfoStyles.overflowScroll}`}>
                        {Array.isArray(gameInfo.goals) && gameInfo.goals.map(goal =>
                            <GoalPlayerCard 
                                key={`${goal.playerId}${goal.period}${goal.timeInPeriod}`}
                                goalInfo={goal}
                                homeTeam={homeTeam.abbrev}
                                awayTeam={awayTeam.abbrev}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    const FutureGameCard = ({gameInfo}) => {
        const date = new Date(gameInfo.startTimeUTC)
        const morningAfternoon = date.getHours() > 12 ? "PM" : "AM"
        const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const minutes = date.getMinutes() < 10 ? date.getMinutes() + "0" : date.getMinutes()
        let homeOdds = "";
        let awayOdds = "";

        for(let i = 0; i < homeTeam?.odds?.length; i++) {
            if(homeTeam.odds[i].providerId == 7) {
                homeOdds = homeTeam.odds[i].value;
                awayOdds = awayTeam.odds[i].value;
            }
        }
        return (
            <div className={gameInfoStyles.gameCardContainer}>
                <div className={gameInfoStyles.cardHeader}>
                    {`Starts at ${hours}:${minutes} ${morningAfternoon}`}
                </div>
                <div className={gameInfoStyles.gameScoreContainer}>
                    <TeamScore logoLink={homeTeam.logo} teamName={homeTeam.name.default} primaryInfo={homeOdds} secondaryInfo={homeTeam.record}/>
                    VS
                    <TeamScore logoLink={awayTeam.logo} teamName={awayTeam.name.default} primaryInfo={awayOdds} secondaryInfo={awayTeam.record}/>
                </div>
                <div className={gameInfoStyles.teamLeaderContainer}>
                    <h1>Team Leaders</h1>
                    <div className={`${gameInfoStyles.flex} ${gameInfoStyles.overflowScroll}`}>
                        {Array.isArray(gameInfo.teamLeaders) && gameInfo.teamLeaders.map(teamLeader =>
                            <LeaderPlayerCard 
                                key={`${teamLeader.id}${teamLeader.category}`}
                                headshot={teamLeader.headshot}
                                name={`${teamLeader.firstName.default} ${teamLeader.lastName.default}`}
                                value={teamLeader.value}
                                category={teamLeader.category}
                                secondaryInfo={`${teamLeader.teamAbbrev} ~ #${teamLeader.sweaterNumber} ~ ${teamLeader.position}`}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {gameInfo.gameState !== 'FUT' && gameInfo.gameState !== 'PRE' ?
            <PlayedGameCard gameInfo={gameInfo}/> : <FutureGameCard gameInfo={gameInfo}/>}
        </div>
    )
}

export default GameCard