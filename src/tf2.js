const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const TeamFortress2 = require('tf2');

const config = require('./config.js');
 
let user = new SteamUser();

//iiciar vars para saber quantos de quanto tem
var refined = 0, reclaimed = 0, scrap = 0;
var refinedIds = [], reclaimedIds = [], scrapIds = [];


if(config.sharedSecret === ''){
    console.warn('You don\'t have the shared Secret, you need to insert the steam guard code.')
}

const logOnOptions = {
	accountName : config.accountName,
	password : config.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret) 
};

user.logOn(logOnOptions);//Login

let tf2 = new TeamFortress2(user);//creating tf2 object
var bpItems = [];

//When user logged on steam
user.on('loggedOn', () => {
    user.getPersonas([user.steamID], (personas) => {
        console.log('Logged in as ' + user.accountInfo.name + " [ " + user.steamID + " ].");  

        user.setPersona(1);
            
        user.gamesPlayed([440]);
    });
});

/**
 * Craft Weapon x2 = 3
    Scrap x3 -> Reclaimed = 4
    Reclaimed x3 -> Refined = 5
    Craft Weapon x3 -> Class Token = 7
    Craft Weapon x3 -> Slot Token = 8
    Craft Weapon + Class Token -> Class Token = 13
    Craft Weapon + Slot Token -> Slot Token = 14
    Reclaimed -> Scrap x3 = 22
    Refined -> Reclaimed x3 = 23
 */

//When connected to tf2
tf2.on('connectedToGC', ()=>{
    console.log("The user is connected")
})

//When inventory is loaded
tf2.on('backpackLoaded', () =>{
    //console.log(tf2.backpack)

    for(var i = 0; i < tf2.backpack.length; i++){
        if(tf2.backpack[i].def_index === 5000 && tf2.backpack[i].level === 1){
            scrapIds.push(tf2.backpack[i].id)
            scrap++;
        }

        if(tf2.backpack[i].def_index === 5001 && tf2.backpack[i].level === 2){
            reclaimedIds.push(tf2.backpack[i].id)
            reclaimed++;
        }

        if(tf2.backpack[i].def_index === 5002 && tf2.backpack[i].level === 3){
            refinedIds.push(tf2.backpack[i].id)
            refined++;
        }
    }

    oi()
    
})

function oi(){
    console.log(scrapIds)
    console.log(reclaimedIds)
    console.log(refinedIds)

    console.log(scrap)
    console.log(reclaimed)
    console.log(refined)
    tf2.craft([reclaimedIds[0], reclaimedIds[1], reclaimedIds[2] ])
}

//When a craft is completed
tf2.on('craftingComplete', (recipe, itemsGained)=>{
    /* console.log(recipe)
    console.log(itemsGained)
    console.log(tf2.haveGCSession) */
})

function getItems(){
    bpItems = tf2.backpack;
}

tf2.on('itemChanged', (oldItem, newItem)=>{
    console.log(oldItem)
    console.log(newItem)
})