import fs from 'fs';
import https from 'https';
import os from 'os';

const authFile = `${os.homedir()}/Library/Application Support/com.vercel.cli/auth.json`;
const token = JSON.parse(fs.readFileSync(authFile, 'utf8')).token;
const teamId = "team_T73brrjoDRinu4n3mBTJJZrP";

const req = https.request(`https://api.vercel.com/v9/projects?teamId=${teamId}`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    let foundProject = null;
    
    // Now we will check each project's domains endpoint!
    // But since there are many projects, we can also check the project's targets
    // Wait, let's just make a script to fetch /v9/projects/:id/domains for each project
    // Actually, v9/projects gives full list.
    
    let pending = json.projects.length;
    json.projects.forEach(p => {
      https.request(`https://api.vercel.com/v9/projects/${p.id}/domains?teamId=${teamId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }, (res2) => {
        let d2 = '';
        res2.on('data', c => d2 += c);
        res2.on('end', () => {
          const domJson = JSON.parse(d2);
          if (domJson.domains && domJson.domains.some(d => d.name === 'mpowerspace.ai')) {
            console.log(`Domain is in project: ${p.name} (ID: ${p.id})`);
          }
          if (--pending === 0) console.log("Done");
        });
      }).end();
    });
  });
});
req.end();