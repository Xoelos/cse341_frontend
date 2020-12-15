import Socket from "./Socket";

export default class GameModel extends Socket {
    constructor(userId, gameId) {
        super();
        this.userId = userId;
        this.gameId = gameId;
    }

    war() {
        let { userId, gameId } = this;
        this.socket.emit('war', { gameId, userId });
    }

    draw() {
        let { userId, gameId } = this;
        this.socket.emit('draw', { gameId, userId });
    }

    // Socket
    join(redirect, watchPlayers, drawCards, displayResults, gameover) {
        let { userId, gameId } = this;

        this.socket.on('disconnect', redirect);
        this.socket.on('players', watchPlayers);
        this.socket.on('cards', drawCards);
        this.socket.on('results', displayResults);
        this.socket.on('gameover', gameover);
        this.socket.emit('joinGame', { gameId, userId });
    }

    disconnect() {
        let { userId, gameId } = this;

        this.socket.off('players');
        this.socket.off('disconnect');
        this.socket.off("cards");
        this.socket.off('results');
        this.socket.off('gameover');
        this.socket.emit('leaveGame', { gameId, userId });
    }
}
