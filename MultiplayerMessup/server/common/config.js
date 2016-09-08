module.exports = {
    server: {
        port: 5000,       
        serverProcessFrequency : 1 / 60, 
        maxSubSteps: 30,
        events: {
            connect: "c_Connect"
        }       
    },
    game: {
        bounds: {
            width: 800,
            height:600
        },
        player: {
            radius: 15,
            mass: 1,
            speed: 1,
            type: "alive"
        }
    }
}