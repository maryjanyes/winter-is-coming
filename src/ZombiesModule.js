// program algorithm steps
// 1. generate zombies Array
// 2. spawn Zombies to the Board
// 3. create pusher that announces Zombie’s coordinates every 2 seconds

/**
 * @module ZombiesModule
 */

const ZombiesFactory = function(globals) {

    if (globals) {
        console.log('using globals: ', globals);
    }

    let _zombies = null;

    function setZombies(zombies) {
        _zombies = zombies;
    }

    function getZombies() {
        return _zombies;
    }

    function updateCordsAndReturnZombies() {
        return _zombies.map((zomby) => {
            zomby.cords.x = Math.floor(Math.random() * 10);
            zomby.cords.y = Math.floor(Math.random() * 30);
            return zomby;
        });
    }

    function generateZombies(count) {
        return new Array(count).fill(undefined).map((zombie, index) => {
            return new Zombie({
                index,
                name: `zombie-${index}`
            });
        })
    }

    setZombies(generateZombies(20));

    return {
        getZombies: getZombies,
        updateZombies: updateCordsAndReturnZombies
    };

};

function Zombie({ index, name }) {
    return {
        name: name,
        cords: {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 30)
        },
        _id: ++index,
        _timestamp: Date.now()
    }
}

module.exports = new ZombiesFactory;
