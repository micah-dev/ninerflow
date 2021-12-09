*This file looks best in a markdown previewer such as GitHub!*  
[*Show me on GitHub!*](https://github.com/micah-dev/nf-wip-2/blob/main/README.md)  

# NinerFlow

NinerFlow is a UNCC campus intelligence tool designed for students, staff, and visitors. NinerFlow gives users the ability to find the shortest path between buildings, explore professor ratings, see local weather and more- all within Discord.

# nf-wip-2

nf-wip-2 is a dev testing repository where we rebuilt NinerFlow using the Discord.js v13 library. This repository will eventually be merged into NinerFlow.

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
* [Node.js](https://nodejs.org/en/)
* A Discord account, or sign up [here.](https://discord.com/)
* Access to a Discord server with Admin/Mod privileges, [or create your own server](https://www.howtogeek.com/318890/how-to-set-up-your-own-discord-chat-server/#:~:text=To%20create%20your%20own%20server,a%20Server%E2%80%9D%20on%20the%20left.).

***

### How to download and run the code base:

#### Use Git:
1. Using [Git](https://git-scm.com/downloads), [Git for Windows](https://gitforwindows.org/) or [GitHub Desktop](https://desktop.github.com/), download the code repository from [here](https://github.com/micah-dev/nf-wip-2) or use the HTTPS clone: `git clone https://github.com/micah-dev/nf-wip-2.git`.
2. Open the folder `nf-wip-2` in your preferred IDE.
3. From the folder titled `Source Code` in the zipped Canvas submission folder, add the file `secrets.json` to the project main hierarchy.
4. In the terminal, run the following commands:

`npm install`  
`node core.js`  


***

### How to use NinerFlow Discord bot:

*The codebase must be running to use NinerFlow*

#### Option 1:
1. Invite the Discord bot to a server you have admin/mod privileges in using this [link](https://discord.com/api/oauth2/authorize?client_id=895754091324665908&permissions=8&scope=bot%20applications.commands). In the server's *members* tab, you should see `nf-test-001` as a member.
2. Navigate to a text channel.
3. Run NinerFlow commands:

`/help` is the best command to run to get started.

#### Option 2:
1. Join our server to test the bot. Here is a [invitation](https://discord.gg/jWzBgb9Xt4).
2. Navigate to a `test-x` channel.
3. Run NinerFlow commands:

`/help` is the best command to run to get started.

***

### Available commands:

**NOTES:**  
* NinerFlow often replies with an embeded message containing an image. This image is meant to be seen on mobile devices! If using NinerFlow on a desktop, simply click the `View on Web` button at the bottom of the message.

**KNOWN BUGS:** 
* The `/walk` command currently supports all buildings on campus (see `buildingdata.json`), however, some buildings cause the Google API to reply with an endpoint message longer than 2000 characters, which is unsupported and will cause the client to crash. This is a known bug we are working to squash!
* The `/rate` command may cause the client to crash in some instances. We are looking to solve this.
* The `/todo` and `/class` commands will break if you try to `-list` but do not have any todo or class items. Futhermore, having more than 10 items will cause the client to crash. We are looking to solve this.


#### `/help`
* Shows all available commands.
* Ex: `/help`

#### `/events`
* Shows UNCC calendar events, or optionally more specific events.
* Ex: `/events`
* Ex: `/events rec`
* Ex: `/events social`
* Ex: `/events entertainment`
* Ex: `/events info`

#### `/weather`
* Shows UNCC local weather.
* Ex: `/weather`

#### `/links`
* Shows useful web resources from NinerNet.
* Ex: `/links`

#### `/food`
* Shows nearby campus dining options.
* Ex: `/food`

#### `/walk <origin> <destination>`
* Shows the fasted walking path between two buildings a and b.
* Ex: `/walk Fretwell, Burson`

#### `/bus`
* Shows UNCC bus routes.
* Ex: `/bus`

#### `/rate ProfessorName`
* Shows a professor's UNCC ratemyprofessor profile.
* Ex: `/rate Amy Good`
* Ex: `/rate James Rudd`
* Ex: `/rate Jasmine Strickland`

#### `/todo -list` `/todo -new <name> <due_date> <due_time>` `/todo -delete` `/todo -clear`
* Create a todo list and get task reminders.
* Ex: `\todo -new Take out the trash 11/23/2021 11pm`
* Ex: `\todo -list`
* Ex: `\todo -delete Take out the trash`

#### `/class -list` `/class -new <name> <days_active> <start_time> <end_time>` `/class -delete` `/class -clear`
* View your class schedule and get class reminders.
* Ex: `/class -new Machine Learning M 10:10am 1:10pm`
* Ex: `/class -list`
* Ex: `/class -new Computer Vision M W 2:30pm 3:45pm`
* Ex: `/class -clear`
