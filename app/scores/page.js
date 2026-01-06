
import common from "../../styles/Common.module.scss";
import GameCard from "../_components/gameCard";
const Scores = async () => {
    const dayScoresRes = await fetch(`https://api-web.nhle.com/v1/score/2026-01-05`, { cache: 'no-store' });
    const dayScores = await dayScoresRes.json();
    return (
        <div className={common.container}>
            {Array.isArray(dayScores.games) && dayScores.games.map(game =>
                <GameCard gameInfo={game} key={game.id}/>
            )}
        </div>
    )
}

export default Scores