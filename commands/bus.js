const { delay } = require("../util");
const Discord = require("discord.js");
const route_data = require("../bus_routes.json");
const https = require("https");
const secrets = require("../secrets.json");
const axios = require("axios");
const logo =
  "https://media.discordapp.net/attachments/886347148386529291/894761080348368966/bot_logo-white_on_transparent-06.png?width=850&height=858";

module.exports = {
  name: "bus",
  usage: [],
  description: "",

  execute: async (msg, args, bot) => {
    markers = "";
    try {
      let res = await axios.get(
        "https://uncc.ridesystems.net/Services/JSONPRelay.svc/GetMapVehiclePoints?apiKey=8882812681"
      );
      let busPositionInfo = res.data;
      busPositionInfo.map(function (busPositionInfo) {
        markers +=
          "&markers=icon:https://maps.gstatic.com/mapfiles/transit/iw2/6/bus.png%7C" +
          busPositionInfo.Latitude +
          encodeURI(",") +
          busPositionInfo.Longitude +
          "%7Clabel%3a" +
          encodeURI(busPositionInfo.Name);
      });
    } catch (error) {
      if (error.response) {
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

    staticImageApiBaseUrl =
      "https://maps.googleapis.com/maps/api/staticmap?size=1200x800" +
      "&center=35.306967,-80.733459" +
      "&zoom=15" +
      "&style=feature:road.local.trail%7Cvisibility:off" +
      markers;
    polylineQueryParams = "";
    route_data.map(function (route_data) {
      polylineQueryParams =
        polylineQueryParams +
        "&path=" +
        route_data.lineColor +
        "%7Cenc%3A" +
        encodeURI(route_data.polyline);
    });
    staticImageQueryParams =
      polylineQueryParams + "&key=" + secrets.GOOGLE_API_KEY;
    response = staticImageApiBaseUrl + staticImageQueryParams;
    const reply = new Discord.MessageEmbed()
      .setColor("#008080")
      .setTitle(`UNCC Bus Routes`)
      .setDescription(`[View on Web](${response})`)
      .setImage(response)
      .setThumbnail((url = logo));
    return reply;
  },
};
