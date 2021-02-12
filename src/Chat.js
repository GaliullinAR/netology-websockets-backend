class Chat {
  constructor() {
    this.userNames = new Set();
  }

  login(userName) {
    const result = {
      success: false,
      data: '',
    };

    if (this.userNames.has(userName)) result.data = 'This name already taken';
    else {
      this.userNames.add(userName);
      result.data = {
        userName,
        userNames: [...this.userNames],
      };
      result.success = true;
    }
    return result;
  }
}

module.exports = {
  Chat,
};
