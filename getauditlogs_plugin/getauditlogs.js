const roblox = require('noblox.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("Please provide an action type!");
    }
    let groupId = Number(process.env.groupId);
    let validActions = ['DeletePost', 'RemoveMember', 'AcceptJoinRequest', 'DeclineJoinRequest', 'PostStatus', 'ChangeRank', 'BuyAd', 'SendAllyRequest', 'CreateEnemy', 'AcceptAllyRequest', 'DeclineAllyRequest', 'DeleteAlly', 'DeleteEnemy', 'AddGroupPlace', 'RemoveGroupPlace', 'CreateItems', 'ConfigureItems', 'SpendGroupFunds', 'ChangeOwner', 'Delete', 'AdjustCurrenceyAmounts', 'Abandon', 'Claim', 'Rename', 'ChangeDescription', 'InviteToClan', 'KickFromClan', 'CancelClanInvite', 'BuyClan', 'CreateGroupAsset', 'UpdateGroupAsset', 'ConfigureGroupAsset', 'RevertGroupAsset', 'CreateGroupDevelperProduct', 'ConfigureGroupGame', 'Lock', 'Unlock', 'CreateGamePass', 'CreateBadge', 'ConfigureBadge', 'SavePlace', 'PublishPlace'];
    let actionType = args.join(" ");
    let isValid = false;
    for(var i = 0; i < validActions.length; i++) {
        if(validActions[i] === actionType) {
            isValid = true;
        }
    }
    if(isValid == false) {
        return message.channel.send("This action type isn't valid! The valid action types are: " + validActions);
    }
    let logs
    try {
        logs = await (await roblox.getAuditLog(groupId, actionType)).data;
    } catch (err) {
        return message.channel.send("There was an error while fetching audit logs: " + err);
    }
    try {
        await message.author.send("Getting logs...");
    } catch {
        return message.channel.send("Please have your DMS on for this command!");
    }
    let returnLogs = [];
    for(var i = 0; i < logs.length; i++) {
        returnLogs.push(logs[i].actor.user.username + " with the user id of " + logs[i].actor.user.userId + " did this action to " + logs[i].description.TargetName + " with the user id of " + logs[i].description.TargetId + ". This log was created at " + logs[i].created);
        if(returnLogs.length == 10) {
            message.author.send(returnLogs);
            returnLogs = [];
        }
    }
    if(returnLogs.length > 0) {
        message.author.send(returnLogs);
    }
    return message.author.send("Got logs!");
}
