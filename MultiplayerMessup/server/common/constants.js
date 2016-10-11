module.exports = {
    eventNames: {
        connect: "connection",
        disconnect: "disconnect",
        fromClient: {
            OnUpKeyPressed: "c_OnUpKeyPressed",
            OnDownKeyPressed: "c_OnDownKeyPressed",
            OnLeftKeyPressed: "c_OnLeftKeyPressed",
            OnRightKeyPressed: "c_OnRightKeyPressed",
            OnShiftKeyPressed: "c_OnShiftKeyPressed",
            OnEKeyPressed: "c_OnEKeyPressed"
        }
    },
    commandNames: {
        createLocalPlayer : "s_CreateLocalPlayer",
        createNewRemotePlayer : "s_CreateNewRemotePlayer"
    },
    game: {
        player: {
            radius: 15,
            mass: 1,
            speed: 1.5,
            runningSpeedMultiplier: 2,
            type: "alive",
            attackRate : 0.5
        }
    }
}