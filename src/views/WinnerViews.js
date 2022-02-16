const { getTimestamp } = require('../services/GlobalServices');

class WinnerView {
  constructor({ roomId, Room, User, createdAt, updatedAt }) {
    this.roomId = roomId;
    this.Room = Room;
    this.User = User;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  winnerDetail(user) {
    const { id, email = '', photoUrl = '', UserDetail } = user;
    const { displayName = '' } = UserDetail;

    return [{ id, email, photoUrl, displayName }];
  }

  toJSON() {
    return {
      roomId: this.roomId,
      name: this.Room.name,
      totalWinner: this.Room.maxWinner,
      winners: this.winnerDetail(this.User),
      createdAt: getTimestamp(this.createdAt),
      updatedAt: getTimestamp(this.updatedAt),
    };
  }
}

module.exports = WinnerView;
