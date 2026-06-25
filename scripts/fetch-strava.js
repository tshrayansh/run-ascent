import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cachePath = path.join(__dirname, '../src/data/strava-cache.json');

const fallbackData = {
  pulseStats: [
    { value: '28', label: 'Active Climbers' },
    { value: '163.4 KM', label: 'Moved Together' },
    { value: '2,140 M', label: 'Climbed' },
  ],
  consistencyBoard: [
    { name: 'Ananya', days: '4 DAYS' },
    { name: 'Aditya', days: '3 DAYS' },
    { name: 'Nandana', days: '3 DAYS' },
  ],
  isLive: false
};

async function fetchStravaData() {
  const clientID = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;
  const clubID = '1914011'; // ASCENT club ID

  if (!clientID || !clientSecret || !refreshToken) {
    console.log('Strava environment variables are missing. Using fallback/placeholder data.');
    fs.writeFileSync(cachePath, JSON.stringify(fallbackData, null, 2));
    return;
  }

  try {
    console.log('Refreshing Strava access token...');
    const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token refresh failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    console.log('Fetching club activities...');
    const activitiesResponse = await fetch(`https://www.strava.com/api/v3/clubs/${clubID}/activities?per_page=100`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!activitiesResponse.ok) {
      throw new Error(`Failed to fetch activities: ${activitiesResponse.statusText}`);
    }

    const activities = await activitiesResponse.json();
    console.log(`Successfully fetched ${activities.length} recent club activities.`);

    // Process runs & walks (activities of running type)
    const runs = activities.filter(act => act.type === 'Run' || act.type === 'Walk');

    // 1. Total distance in KM
    const totalMeters = runs.reduce((sum, act) => sum + (act.distance || 0), 0);
    const totalKM = (totalMeters / 1000).toFixed(1);

    // 2. Total elevation gain in Meters
    const totalElevation = Math.round(runs.reduce((sum, act) => sum + (act.total_elevation_gain || 0), 0));

    // 3. Unique athletes (Active Climbers)
    const uniqueAthletes = new Set();
    const athleteCounts = {};

    runs.forEach(act => {
      if (act.athlete) {
        const name = `${act.athlete.firstname} ${act.athlete.lastname || ''}`.trim();
        uniqueAthletes.add(name);
        athleteCounts[name] = (athleteCounts[name] || 0) + 1;
      }
    });

    // 4. Build consistency board
    const consistencyBoard = Object.entries(athleteCounts)
      .map(([name, count]) => ({
        name,
        days: `${count} RUN${count > 1 ? 'S' : ''}`
      }))
      .sort((a, b) => {
        const countA = parseInt(a.days);
        const countB = parseInt(b.days);
        return countB - countA;
      })
      .slice(0, 5); // Show top 5 members

    const liveData = {
      pulseStats: [
        { value: uniqueAthletes.size.toString(), label: 'Active Climbers' },
        { value: `${Number(totalKM).toLocaleString()} KM`, label: 'Moved Together' },
        { value: `${totalElevation.toLocaleString()} M`, label: 'Climbed' },
      ],
      consistencyBoard: consistencyBoard.length > 0 ? consistencyBoard : fallbackData.consistencyBoard,
      isLive: true
    };

    console.log('Writing live Strava data to cache file...');
    fs.writeFileSync(cachePath, JSON.stringify(liveData, null, 2));

  } catch (error) {
    console.error('Error fetching live Strava data:', error.message);
    console.log('Falling back to placeholder data.');
    fs.writeFileSync(cachePath, JSON.stringify(fallbackData, null, 2));
  }
}

fetchStravaData();
