Name: Shutdown System
Description: This allows you to "turn off" your bot and allows you to "turn it on" with commands. This allows you to "turn off" your bot and allows you to "turn it on" with commands. To install, please install Lengo's database plugin here: https://github.com/yogurtsyum/qbot-plugins/tree/master/qbot_database_plugin/. Next you wanna edit the index.js file where it has this in it. Make sure this code is in the message event and under the variable "commandName" https://gyazo.com/9e8cf7a7cb9a4ba437e614af11f7d737. After that, put this code in the ready event: "if(await db.get("shutdown") == true) client.user.setStatus('invisible');". After that, place the files in your command folder, put your Discord ID on where it says "DISCORD ID HERE" and you're done!
Author's username: zachariapopcorn#8105
Author's ID: 465362236693807115