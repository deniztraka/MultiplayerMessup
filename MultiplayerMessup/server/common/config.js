module.exports = {
    server: {
        port: 5000,
        serverProcessFrequency: 1/60,
        maxSubSteps: 30,
        positionUpdateFrequencyFromSeconds: 1 / 10 ,
        quePositionDataFrequencyFromSeconds: 1 / 20
    },
    game: {
        bounds: {
            width: 1920,
            height: 1920
        }        
    }
}