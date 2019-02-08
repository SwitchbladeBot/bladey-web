<div align="center">
  <img src="https://i.imgur.com/4NH8ufA.png"><br>
  <b><a href="https://github.com/SwitchbladeBot/switchblade">Switchblade</a>'s official website, made with <a href="https://bulma.io/">Bulma</a> and <a href="https://vuejs.org/">Vue.js</a>.</b><br>
  <br>
  <p>
    <a href="https://bulma.io"><img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24"></a>
    <a href="https://app.netlify.com/sites/switchblade/deploys"><img src="https://api.netlify.com/api/v1/badges/86b74d43-b9d7-4688-8b38-adaf0d294ca0/deploy-status"/></a>
    <br>
    <a href="https://support.switchblade.xyz/"><img src="https://img.shields.io/badge/dynamic/json.svg?style=flat-square&label=chat%20on%20Discord&colorB=7289DA&url=https%3A%2F%2Fdiscordapp.com%2Fapi%2Fservers%2F445203868624748555%2Fembed.json&query=%24.members.length&suffix=%20online" alt="Discord Server"/></a>
    <a href="https://travis-ci.org/SwitchbladeBot/bladey-web"><img src="https://img.shields.io/travis/SwitchbladeBot/bladey-web.svg?style=flat-square"/></a>
    <a href="https://david-dm.org/SwitchbladeBot/bladey-web"><img src="https://david-dm.org/SwitchbladeBot/bladey-web/status.svg?style=flat-square"/></a>
    <a href="https://david-dm.org/SwitchbladeBot/bladey-web?type=dev"><img src="https://david-dm.org/SwitchbladeBot/bladey-web/dev-status.svg?style=flat-square"/></a>
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

*But...* You also need to run an API server. It's easy! Just do the following:

**4. Clone your fork of the bladey-api ([which you can find here](https://github.com/SwitchbladeBot/bladey-api))**
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
After this, just start the website instance and you're done!
