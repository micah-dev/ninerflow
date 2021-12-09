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


***

### Available commands:

**TIPS:**
* NinerFlow uses Discord's Slash Commands, a powerful way to interact with Discord bots and applications.
* Slash Commands provide auto-complete, syntax-suggestions, and information about the command as you are typing it.
* To take full advantage of Slash Commands, use `enter` to jump to the next parameter and `tab` to accept a suggestion.

**NOTES:**  
* NinerFlow often replies with an embeded message containing an image. This image is meant to be seen on mobile devices, but still works on a desktop. If using NinerFlow on a desktop, simply click the `View on Web` button at the bottom of the message.

**KNOWN BUGS:** 
* The `/walk` command currently supports all buildings on campus (see `buildingdata.json`), however, some buildings cause the Google API to reply with an endpoint message longer than 2000 characters. Unfortunately, Discord does allow any messages to be over 2000 characters. To combat this, we have work arounds in place to headlessly launch a browser and take a screenshot of the reply and send the image instead. Occasionally, this fails and NinerFlow will respond with an error message, but it should not crash the client.
* The `/rate` command may cause the client to crash in some instances due to the ratemyprofessors.com website frequently changing div containers. Ninerflow may occasionally respond with an error message, but it should not crash the client.

---
#### `/help`
* Shows all available commands and basic usage.
* Ex: `/help`

---
#### `/events`
* Shows UNCC calendar events, or optionally more specific events.
* Ex: `/events`  Sends all events.
* Ex: `/events recreation`  Sends recreation events.
* Ex: `/events social`  Sends social events.
* Ex: `/events entertainment`  Sends entertainment events.
* Ex: `/events info`  Sends information session events.

---
#### `/weather`
* Shows UNCC local weather.
* Ex: `/weather`

---
#### `/links`
* Shows useful web resources from NinerNet.
* Ex: `/links`

---
#### `/food`
* Shows nearby campus dining options.
* Ex: `/food`

---
#### `/walk`
* Shows the fasted walking path between two buildings a and b.
* Usage: `/walk <origin> <building>`
* Ex: `/walk Fretwell Burson`

---
#### `/bus`
* Shows UNCC bus routes.
* Ex: `/bus`

---
#### `/rate`
* Shows a professor's UNCC ratemyprofessor profile.
* Usage: `/rate <professor_name>`
* Ex: `/rate James Rudd`
* Ex: `/rate Jasmine Strickland`
* Ex: `/rate Amy Good`

---
#### `/todo list` `/todo new` `/todo delete` `/todo clear`
* Create and maintain a todo list to keep track of important tasks.

**Create a todo task:**
* Usage: `/todo new <name> <due_date> <due_time>`
* Ex: `/todo new Take out the trash 11/23/2021 11pm`

**View your todo list:**
* Usage: `/todo list`

**Delete a todo item:**
* Usage: `/todo delete <item_id>`
* Ex: `/todo delete 4`

**Delete all items in your todo list:**
* Usage: `/todo clear`

---
#### `/class list` `/class new` `/class delete` `/class clear`
* Create and maintain a class schedule to stay on top of class times.

**Create a class:**
* Usage: `/class new <name> <days_active> <start_time> <end_time>`
* Ex: `/class new Machine Learning MWF 10:10 AM 1:10 PM`

**View your classes:**
* Usage: `/class list`

**Delete a class:**
* Usage: `/class delete <item_id>`
* Ex: `/class delete 2`

**Delete all classes:**
* Usage: `/class clear`


---
#### `/brief`
* Sends the output of frequently used commands for ease-of-use.

**See your brief:**
* Usage: `/brief`

**Configure your brief preferances:**
* Usage: `/brief <enable_class_list> <enable_todo_list> <enable_weather> <enable_news>`
* Ex: `/brief True True True False`

---
#### `/privacy`
* Shows NinerFlow's privacy policy.
* Usage: `/privacy`
