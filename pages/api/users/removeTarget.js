import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function handler(req, res){
    const { gameId, eliminatorUsername, eliminated, newTarget } = req.body;
        //the eliminator username gets passed here
        //the eliminated WHOLE OBJECT gets passed here
        //newTarget is the username of the new target
    try {
        await dbConnect();
        
        try {
            await User.updateOne(
                {
                    userName: eliminatorUsername,
                }, 
                {
                    $push: {   
                        "gamesPlayed.$[updateGamesPlayed].targets" : newTarget
                    },
                    $inc: {
                        "gamesPlayed.$[updateGamesPlayed].eliminated" : 1
                    },
                    $inc: {
                        "statistics.$.eliminations" : 1
                    }
                },
                {
                    "arrayFilters": [
                        {"updateGamesPlayed.gameId" : gameId},
                    ]
                }
            );
            await User.updateOne(
                {
                    userName: eliminated.userName,
                }, 
                {
                    $set: {   
                        "gamesPlayed.$[updateGamesPlayed].isActive" : false
                    },
                },
                {
                    "arrayFilters": [
                        {"updateGamesPlayed.gameId" : gameId},
                    ]
                }
            );
            await Game.updateOne(
                {
                    _id: gameId,
                },
                {
                    $pull: {   
                        activePlayers : { userName: eliminated.userName }
                    },
                    $push: {
                        eliminatedPlayers : {
                            id: eliminated._id,
                            username: eliminated.userName,
                            section: eliminated.section,
                            eliminator: eliminatorUsername
                        }
                    }
                },
            )
            res.status(201).json("Successfully removed target");
        } catch(err) {
            return res.status(400).json({message: err.message});
        }
        res.status(201).json("Successfully removed target");
    } catch (err) {
        res.status(500).json({message: err});
    }
}