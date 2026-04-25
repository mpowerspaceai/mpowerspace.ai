import fs from 'fs';
import https from 'https';
import os from 'os';

const authFile = `${os.homedir()}/Library/Application Support/com.vercel.cli/auth.json`;
const token = JSON.parse(fs.readFileSync(authFile, 'utf8')).token;
const teamId = "team_T73brrjoDRinu4n3mBTJJZrP";
const projectId = "prj_YSeUZy7mXgqdgYbPBfgSZBDEErGa";

https.request(`https://api.vercel.com/v9/projects/${projectId}/domains?teamId=${teamId}`, {
  headers: { "Authorization": `Bearer ${token}` }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(json.domains.map(d => ({ name: d.name, redirect: d.redirect })));
    
    // Auto-delete the redirecting domains first!
    json.domains.forEach(d => {
      if (d.redirect === 'mpowerspace.ai' || d.name === 'mpowerspace.ai') {
        const req = https.request(`https://api.vercel.com/v9/projects/${projectId}/domains/${d.name}?teamId=${teamId}`, {
          method: 'DELETE',
          headers: { "Authorization": `Bearer ${token}` }
        }, (res2) => {
          let d2 = ''; res2.on('data', c => d2 += c);
          res2.on('end', () => console.log(`Deleted ${d.name}:`, res2.statusCode));
        });
        req.end();
      }
    });
  });
}).end();