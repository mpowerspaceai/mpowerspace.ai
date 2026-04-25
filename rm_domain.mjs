import fs from 'fs';
import https from 'https';
import os from 'os';

const authFile = `${os.homedir()}/Library/Application Support/com.vercel.cli/auth.json`;
const token = JSON.parse(fs.readFileSync(authFile, 'utf8')).token;
const teamId = "team_T73brrjoDRinu4n3mBTJJZrP";
const projectId = "prj_YSeUZy7mXgqdgYbPBfgSZBDEErGa";
const domain = "mpowerspace.ai";

const req = https.request(`https://api.vercel.com/v9/projects/${projectId}/domains/${domain}?teamId=${teamId}`, {
  method: 'DELETE',
  headers: {
    "Authorization": `Bearer ${token}`
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Response:", res.statusCode, data);
  });
});
req.end();