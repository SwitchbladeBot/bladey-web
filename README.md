<div align="center">
  <img src="https://i.imgur.com/4NH8ufA.png"><br>
  <b><a href="https://github.com/SwitchbladeBot/switchblade">Switchblade</a>'s official website, made with <a href="https://bulma.io/">Bulma</a> and <a href="https://vuejs.org/">Vue.js</a>.</b><br>
  <br>
  <p>
    <a href="https://bulma.io"><img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24"></a>
    <a href="https://netlify.com/"><img src="https://i.imgur.com/oJjg6fA.png" alt="Deploys by Netlify" width="128" height="24"></a>
    <br>
    <a href="https://support.switchblade.xyz/"><img src="https://img.shields.io/badge/dynamic/json.svg?label=chat%20on%20Discord&colorB=7289DA&url=https%3A%2F%2Fdiscordapp.com%2Fapi%2Fservers%2F445203868624748555%2Fembed.json&query=%24.members.length&suffix=%20online" alt="Discord Server"/></a>
    <a href="https://travis-ci.org/SwitchbladeBot/bladey-web"><img src="https://api.travis-ci.org/SwitchbladeBot/bladey-web.svg"/></a>
    <a href="https://david-dm.org/SwitchbladeBot/bladey-web"><img src="https://david-dm.org/SwitchbladeBot/bladey-web/status.svg"/></a>
    <a href="https://david-dm.org/SwitchbladeBot/bladey-web?type=dev"><img src="https://david-dm.org/SwitchbladeBot/bladey-web/dev-status.svg"/></a>
  </p>
</div>

## Setting up a development environment
**0. Fork the repository** (You don't have to do this if you're part of our organization)

**1. Clone your fork**
```bash
git clone https://github.com/<your github username>/bladey-web
cd bladey-web
```

**2. Install all the dependencies with NPM**
```bash
npm install
```

**3. Build and serve!**
```
npm run start
```

*But...* You need to run API Too, it's easy just:

**4. Clone your fork of bladey-api**
```bash
git clone https://github.com/<your github username>/bladey-api
```
**5. Install Dependencies**
```bash
npm install
``` 

**6. Run**
```
npm run start-dev
```
Then, turn on the API at the same time as the site.
