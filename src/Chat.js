class Chat {
  constructor() {
    this.users = new Set();
  }

  login(userName) {
    const result = {
      success: false,
      data: '',
    };

    if (this.users.has(userName)) result.data = 'This name already taken';
    else {
      this.users.add(userName);
      result.data = JSON.stringify({
        userName,
        users: [...this.users],
      });
      result.success = true;
    }
    return result;
  }
}

module.exports = {
  Chat,
};
