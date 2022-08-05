const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const TeamFortress2 = require('tf2');

const config = require('./config.js');
 
let user = new SteamUser();


if(config.sharedSecret === ''){
    console.warn('You don\'t have the shared Secret, you need to insert the steam guard code.')
}

const logOnOptions = {
	accountName : config.accountName,
	password : config.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret) 
};

user.logOn(logOnOptions);

let tf2 = new TeamFortress2(user);

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

tf2.on('backpackLoaded', () =>{
    console.log(tf2.backpack[85])
})

tf2.on('craftingComplete', (recipe, itemsGained)=>{
    console.log(recipe)
    consolep.log(itemsGained)
})

tf2.craft([11923481523,11923481590,11925647735], 3)

/* user.getOwnedProfileItems((err, response) =>{
    console.log("pois e")
    console.log(response)
}) */