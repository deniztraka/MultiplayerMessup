module.exports = {
    server: {
        port: 5000,
        serverProcessFrequency: 1/60,
        maxSubSteps: 30,
        positionAndRotationUpdateFrequencyFromSeconds: 1 / 10 ,
        quePositionAndRotationDataFrequencyFromSeconds: 1 / 30
    },
    game: {
        bounds: {
            width: 1920,
            height: 1920
        }
    }
}