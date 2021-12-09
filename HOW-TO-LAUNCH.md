*This file looks best in a markdown previewer such as GitHub!*  
[*Show me on GitHub!*](https://github.com/micah-dev/ninerflow/blob/main/README.md)  

# NinerFlow

NinerFlow is a UNCC campus intelligence tool designed for students, staff, and visitors. NinerFlow gives users the ability to find the shortest path between buildings, explore professor ratings, see local weather and more- all within Discord.

## Instructions and Usage Guide

NinerFlow is a Discord bot, and is written in Node.js using the Discord.js library version 13.3.1. NinerFlow uses other libraries as well, including:
* **discord.js** (v13.3.1) (for Discord bot integration)
* **wokcommands** (v1.5.3) (for advanced command handling)
* **mongoose** (v6.0.13) (for database connection)
* **axios** (v0.24.0) (for api requests)
* **openai** (v0.0.8) (for natural language processing)
* **openai-api-node** (v1.0.0) (for api communication)
* **puppeteer** (v9.0.0) (for headless web browsing)
* **sharp** (wip) (for image manipulation)

Prerequisites for running the codebase are:
* Download [Node.js](https://nodejs.org/en/)
* Own a Discord account, or sign up [here.](https://discord.com/)
* Access to a Discord server with Admin/Mod privileges, [or create your own server](https://www.howtogeek.com/318890/how-to-set-up-your-own-discord-chat-server/#:~:text=To%20create%20your%20own%20server,a%20Server%E2%80%9D%20on%20the%20left.).

***

### How to download and run the code base:

#### Use Git:
1. Using [Git](https://git-scm.com/downloads), [Git for Windows](https://gitforwindows.org/) or [GitHub Desktop](https://desktop.github.com/), download the code repository from [here](https://github.com/micah-dev/ninerflow) or use the HTTPS clone: `git clone https://github.com/micah-dev/ninerflow.git`.
2. Open the folder `ninerflow` in your preferred IDE.
3. From the folder titled `Source Code` in the zipped Canvas submission folder, add the file `secrets.json` to the project main hierarchy. This file includes the API access keys and is required for NinerFlow to run.
4. In the terminal, run the following commands:

`npm install`  Installs all packages.  
`node core.js`  Runs the bot.


***

### How to use NinerFlow Discord bot:

*The codebase must be running to use NinerFlow*

#### Option 1:
1. Join our test server to use the bot. Here is an [invitation](https://discord.gg/5pBcFdnCbu).
2. Navigate to a server channel.
3. Run NinerFlow commands:

`/help` is the best command to run to get started.

#### Option 2:
1. Invite the Discord bot to a server you have admin/mod privileges in using this [link](https://discord.com/api/oauth2/authorize?client_id=895754091324665908&permissions=8&scope=bot%20applications.commands). In the server's *members* tab, you should now see `NinerFlow` as a member.
2. Navigate to a text channel.
3. Run NinerFlow commands:

`/help` is the best command to run to get started.

