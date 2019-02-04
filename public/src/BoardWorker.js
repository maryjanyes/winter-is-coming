/**
 * @worker BoardWorker
 * @description Client functional
 * @param event
 */

onmessage = event => {

    const BoardWorker = () => {

        const ZOMBIE_NAMES = [
            'Iron Zombie',
            'Rae Zombie',
            'Bad Zombie'
        ];
        var cellMaxIndex = 0;
        return {
            generateBoardCells: (board_selector, size) => {

                new Array(size.x).fill('x').forEach((x_cell, x_cell_index) => {
                    const xCell = document.createElement('div');
                    xCell.className = 'cell-' + x_cell;
                    new Array(size.y).fill('y').forEach((y_cell, y_cell_index) => {
                        const yCell = document.createElement('div');
                        yCell.className = `cell-x-y${(x_cell_index % 2) === 0 ? ' coraled' : ''}`;
                        yCell.id = `cell-x-${x_cell_index}-y-${y_cell_index}`;
                        xCell.appendChild(yCell);
                        cellMaxIndex++;
                    });
                    board_selector.appendChild(xCell);
                });
                return cellMaxIndex;
            },
            generateWall: (last_x_cell_selector, wall_cell_size) => {

                new Array(wall_cell_size).fill('wall_cell').forEach((cell, cell_index) => {
                    const wallCell = document.createElement('div');
                    wallCell.className = 'wall-cell wall-cell-' + cell_index;
                    last_x_cell_selector.appendChild(wallCell);
                });
            },
            appendZombie(cell, zombie) {

                const ZombieToAppend = document.createElement('div');
                ZombieToAppend.className = 'zombie-player';
                ZombieToAppend.title = ZOMBIE_NAMES[Math.floor(Math.random() * ZOMBIE_NAMES.length)];
                ZombieToAppend.innerText = ZombieToAppend.title;
                cell.appendChild(ZombieToAppend);
            },
            clearCells(prev_line) {

                prev_line.forEach((cords) => {
                    document.querySelector(`#cell-x-${cords.x}-y-${cords.y}`).innerHTML = '';
                });
            }
        }
    };

    postMessage(`${BoardWorker}`);
};
