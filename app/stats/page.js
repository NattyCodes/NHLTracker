import { Button, ButtonGroup } from '@mui/material';
import common from "../../styles/Common.module.scss";
import { StatsLeaderTable } from "../_components/StatLeaderTable/statsLeaderTable";
const Stats = async () => {
    const skaterRes = await fetch(`https://api-web.nhle.com/v1/skater-stats-leaders/current?limit=10`, { cache: 'no-store' });
    const skaterInfo = await skaterRes.json();
    const goalieRes = await fetch(`https://api-web.nhle.com/v1/goalie-stats-leaders/current?limit=10`, { cache: 'no-store' });
    const goalieInfo = await goalieRes.json();
    
    return (
        <div className={common.container}>
            <StatsLeaderTable playerStats={skaterInfo} goalieStats={goalieInfo}></StatsLeaderTable>
        </div>
    )
}

export default Stats