const { delay } = require("../util");
const Discord = require("discord.js");
const building_data = require("../buildingdata.json");
const https = require("https");
const secrets = require("../secrets.json");
const axios = require("axios");
const logo =
  "https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858";

module.exports = {
  name: "walk",
  usage: [],
  description: "",

  execute: async (msg, args, bot) => {
    console.log(`walk: ${msg}`);
    parseLocations = msg.content.replace("!walk ", "");
    origin = parseLocations.split(",")[0].trim();
    destination = parseLocations.split(",")[1].trim();
    originAddress = {};
    destinationAddress = {};
    // console.log(`origin ${origin}, destination ${destination}`)
    building_data.map(function (building_data) {
      if (building_data.building == origin) {
        originAddress = building_data.address;
      }
      if (building_data.building == destination) {
        destinationAddress = building_data.address;
      }
    });
    // console.log(`destinationAddress ${destinationAddress}, originAddress ${originAddress}`)

    mapBaseUrl = "https://maps.googleapis.com/maps/api/directions/json";
    originQueryParam = encodeURIComponent(originAddress);
    destinationQueryParam = encodeURIComponent(destinationAddress);
    queryParams =
      "?origin=" +
      originQueryParam +
      "&destination=" +
      destinationQueryParam +
      "&mode=walking&key=" +
      secrets.GOOGLE_API_KEY;
    //console.log(queryParams)

    staticImageApiBaseUrl =
      "https://maps.googleapis.com/maps/api/staticmap?size=1400x1000&path=enc%3A";
    staticImageStyleQueryParams =
      "&style=element%3Ageometry%7Ccolor%3A0x242f3e&style=element%3Alabels.text.stroke%7Ccolor%3A0x242f3e&style=element%3Alabels.text.fill%7Ccolor%3A0x746855&style=feature%3Aadministrative.locality%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Apoi%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Apoi.park%7Celement%3Ageometry%7Ccolor%3A0x263c3f&style=feature%3Apoi.park%7Celement%3Alabels.text.fill%7Ccolor%3A0x6b9a76&style=feature%3Aroad%7Celement%3Ageometry%7Ccolor%3A0x38414e&style=feature%3Aroad%7Celement%3Ageometry.stroke%7Ccolor%3A0x212a37&style=feature%3Aroad%7Celement%3Alabels.text.fill%7Ccolor%3A0x9ca5b3&style=feature%3Aroad.highway%7Celement%3Ageometry%7Ccolor%3A0x746855&style=feature%3Aroad.highway%7Celement%3Ageometry.stroke%7Ccolor%3A0x1f2835&style=feature%3Aroad.highway%7Celement%3Alabels.text.fill%7Ccolor%3A0xf3d19c&style=feature%3Atransit%7Celement%3Ageometry%7Ccolor%3A0x2f3948&style=feature%3Atransit.station%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Awater%7Celement%3Ageometry%7Ccolor%3A0x17263c&style=feature%3Awater%7Celement%3Alabels.text.fill%7Ccolor%3A0x515c6d&style=feature%3Awater%7Celement%3Alabels.text.stroke%7Ccolor%3A0x17263&style=feature:landscape|element:all|color:0x888888";
    staticImageQueryParams = "";

    try {
      let res = await axios.get(mapBaseUrl + queryParams);
      let body = res.data;
      polyline = body.routes[0].overview_polyline.points;
      staticImageQueryParams =
        polyline +
        staticImageStyleQueryParams +
        "&maptype=hybrid&key=" +
        secrets.GOOGLE_API_KEY;
      commandResponse = staticImageApiBaseUrl + staticImageQueryParams;
      let reply;
      if(commandResponse.length >2000){
      reply = new Discord.MessageEmbed()
              .setColor("#008080")
              .setTitle(`Error annotating walking path, please try another set of buildings.`)
              .setThumbnail((url = logo));
            }
      else{
            reply = new Discord.MessageEmbed()
              .setColor("#008080")
              .setTitle(`Walking Route`)
              .setDescription(`[View on Web](${commandResponse})`)
              .setImage(commandResponse)
              .setThumbnail((url = logo));
      }

      return reply;
    } catch (error) {
      if (error.response) {
        // get response with a status code not in range 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  },
};
