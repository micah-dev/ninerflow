*This file looks best in a markdown previewer such as GitHub!*  
[*Show me on GitHub!*](https://github.com/micah-dev/ninerflow/blob/main/INSTRUCTIONS.md)  

# NinerFlow

NinerFlow is a UNCC campus intelligence tool designed for students, staff, and visitors. NinerFlow gives users the ability to find the shortest path between buildings, explore professor ratings, see local weather and more- all within Discord.

## Instructions and Usage Guide

NinerFlow is a Discord bot, and is written in Node.js using the Discord.js library version 12.5.3. NinerFlow uses other libraries as well, including:
* **discord.js** (v12.5.3) (for Discord bot integration)
* **openai** (v0.0.8) (for natural language processing)
* **openai-api-node** (v1.0.0) (for api communication)
* **puppeteer** (v9.0.0) (for headless web browsing)
* **sharp** (wip) (for image manipulation)

Prerequisites for running the codebase are:
* [Node.js](https://nodejs.org/en/)
* A Discord account, or sign up [here.](https://discord.com/)
* Access to a Discord server with Admin/Mod privileges, [or create your own server](https://www.howtogeek.com/318890/how-to-set-up-your-own-discord-chat-server/#:~:text=To%20create%20your%20own%20server,a%20Server%E2%80%9D%20on%20the%20left.).

*The recommendation is to choose Option 1 for both sections*
***

### How to download and run the code base:

#### Option 1:
1. Using [Git](https://git-scm.com/downloads), [Git for Windows](https://gitforwindows.org/) or [GitHub Desktop](https://desktop.github.com/), download the code repository from [here](https://github.com/micah-dev/ninerflow) or use the HTTPS clone: `git clone https://github.com/micah-dev/ninerflow.git`.
2. Open the folder `ninerflow` in your preferred IDE.
3. From the folder titled `option1` in the zipped Canvas Submission folder, add the file `secrets.json` to the project main hierarchy.
4. Create a new directory called `temp` under the directory `commands`.
5. In the terminal, run the following commands:

`npm install`  
`npm install discord.js@12.5.3`  
`node core.js`

#### Option 2:
1. Unzip the folder titled `NinerFlow_Submission` provided in the Canvas submission.
2. Open the folder `option2`. In this folder, you will find the project folder titled `ninerflow`. Open this folder in your preferred IDE.
3. In the terminal, run the following commands:

`npm install`  
`npm install discord.js@12.5.3`  
`node core.js`  

***

### How to use NinerFlow Discord bot:

*The codebase must be running to use NinerFlow*

#### Option 1:
1. Invite the NinerFlow Discord bot to a server you have admin/mod privileges in using this [link](https://discord.com/api/oauth2/authorize?client_id=793934516627439656&permissions=534723950672&scope=bot). In the server's *members* tab, you should see NinerFlow as a member.
2. Navigate to a text channel.
3. Run NinerFlow commands:

`!help` is the best command to run to get started.

#### Option 2:
1. Join our server to test the bot. Here is a [invitation](https://discord.gg/jWzBgb9Xt4).
2. Navigate to a `bot-testing-x` channel.
3. Run NinerFlow commands:

`!help` is the best command to run to get started.

***

After running a command in a server, the bot will delete your message from the server to prevent spam. The bot will then create a new private message with your command response. After this private message thread has been created, you can continue to interact with the bot from this private message thread.

### Available commands:

**NOTES:**  
* NinerFlow often replies with an embeded message containing an image. This image is meant to be seen on mobile devices! If using NinerFlow on a desktop, simply click the `View on Web` link at the top of the message.
* There are known issues with our current command handling protocol. If a warning appears in the terminal `Cannot execute action on a DM channel`, this is a known bug we are working to squash!
* The `!walk` command can currently only be invoked from a server channel, *not* from a private message thread. This is a known bug we are working to squash!

#### `!help`
* Shows all available commands.
* Ex: `!help`

#### `!events`
* Shows UNCC calendar events, or optionally more specific events.
* Ex: `!events`
* Ex: `!events rec`
* Ex: `!events social`
* Ex: `!events entertainment`
* Ex: `!events info`

#### `!weather`
* Shows UNCC local weather.
* Ex: `!weather`

#### `!links`
* Shows useful web resources from NinerNet.
* Ex: `!links`

#### `!food`
* Shows nearby campus dining options.
* Ex: `!food`

#### `!walk a, b`
* Shows the fasted walking path between two buildings a and b.
* Ex: `!walk Epic, Burson`
* Ex: `!walk Woodward Hall, Burson`
