'use server'

export async function fetchScores(date) {
    const dayScoresRes = await fetch(`https://api-web.nhle.com/v1/score/${date}`, { cache: 'no-store' });
    const dayScores = await dayScoresRes.json();

    return dayScores;
}