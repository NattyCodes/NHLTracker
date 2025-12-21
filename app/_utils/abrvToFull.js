let dict = []

async function populateList() {
    let data = await fetch('https://api-web.nhle.com/v1/standings/now', { cache: 'no-store' }); 
    let jsonData = await data.json();
    let standings = jsonData.standings;
    standings.map(team =>{
        addToDict(team.teamAbbrev.default, team.teamName.default)
    })
    addToDict("ARI", "Arizona Coyotes")
}

export function addToDict(abbreviation, teamName) {
    dict[abbreviation] = teamName
}

export async function getFullName (abbreviation) {
    if(dict.length === 0) {
        await populateList()
    }
    return dict[abbreviation] ? dict[abbreviation] : abbreviation
}
