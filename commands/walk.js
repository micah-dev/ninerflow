/**
 * Libraries/Imports
 */
 const {delay} = require("../util");
const Discord = require('discord.js');
const building_data = require('../buildingdata.json')
const https = require("https");
const secrets = require('../secrets.json')


module.exports = {
    name: 'walk',
    usage: [],
    description: '',

    execute: async (msg, args, bot) => {
        console.log(`walk: ${msg}`)
        parseLocations = msg.content.replace('!walk ', '')
        origin = parseLocations.split(',')[0].trim()
        destination = parseLocations.split(',')[1].trim()
        originAddress={}
        destinationAddress={}
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

        mapBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json'
        originQueryParam = encodeURIComponent(originAddress)
        destinationQueryParam = encodeURIComponent(destinationAddress)
        queryParams="?origin="+originQueryParam+"&destination="+destinationQueryParam + "&mode=walking&key=" + secrets.GOOGLE_API_KEY
        //console.log(queryParams)


        staticImageApiBaseUrl="https://maps.googleapis.com/maps/api/staticmap?size=1400x1000&path=enc%3A"
        staticImageStyleQueryParams="&style=element%3Ageometry%7Ccolor%3A0x242f3e&style=element%3Alabels.text.stroke%7Ccolor%3A0x242f3e&style=element%3Alabels.text.fill%7Ccolor%3A0x746855&style=feature%3Aadministrative.locality%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Apoi%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Apoi.park%7Celement%3Ageometry%7Ccolor%3A0x263c3f&style=feature%3Apoi.park%7Celement%3Alabels.text.fill%7Ccolor%3A0x6b9a76&style=feature%3Aroad%7Celement%3Ageometry%7Ccolor%3A0x38414e&style=feature%3Aroad%7Celement%3Ageometry.stroke%7Ccolor%3A0x212a37&style=feature%3Aroad%7Celement%3Alabels.text.fill%7Ccolor%3A0x9ca5b3&style=feature%3Aroad.highway%7Celement%3Ageometry%7Ccolor%3A0x746855&style=feature%3Aroad.highway%7Celement%3Ageometry.stroke%7Ccolor%3A0x1f2835&style=feature%3Aroad.highway%7Celement%3Alabels.text.fill%7Ccolor%3A0xf3d19c&style=feature%3Atransit%7Celement%3Ageometry%7Ccolor%3A0x2f3948&style=feature%3Atransit.station%7Celement%3Alabels.text.fill%7Ccolor%3A0xd59563&style=feature%3Awater%7Celement%3Ageometry%7Ccolor%3A0x17263c&style=feature%3Awater%7Celement%3Alabels.text.fill%7Ccolor%3A0x515c6d&style=feature%3Awater%7Celement%3Alabels.text.stroke%7Ccolor%3A0x17263&style=feature:landscape|element:all|color:0x888888"
        staticImageQueryParams=""
        https.get(mapBaseUrl+queryParams, (res) => {
              res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                polyline=body.routes[0].overview_polyline.points
             //   console.log(polyline)
                staticImageQueryParams=polyline+staticImageStyleQueryParams+"&maptype=hybrid&key="+secrets.GOOGLE_API_KEY
             //   console.log(staticImageQueryParams)
                response=staticImageApiBaseUrl+staticImageQueryParams
                msg.author.send(response)
            });
        });
         
         
         },
 };