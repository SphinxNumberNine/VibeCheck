const axios = require('axios');

class APIClient {
  constructor(base) {
    this.base = base;
    this.authToken = '';
  }

  sendRequest(path, type, data = undefined, needsAuth = false) {
    let options = {
      url: this.base + path,
      method: type,
      headers: {},
    };

    if (data) {
      options.data = JSON.stringify(data);
      console.log(options.data);
      options.headers['Content-Type'] = 'application/json';
    }

    if (needsAuth) {
      options.headers['Authorization'] = 'Bearer ' + this.authToken;
    }

    return new Promise(async function(resolve, reject) {
      axios(options)
        .then(function(resp) {
          resolve({
            err: null,
            res: resp,
            body: resp.data,
          });
        })
        .catch(function(err) {
          console.log(JSON.stringify(err, null, 4));

          resolve({
            err: err.message,
            res: null,
            body: null,
          });
        });
    });
  }

  createAccount(username, password) {
    return this.sendRequest('/authentication/create', 'POST', {
      username: username,
      password: password,
    });
  }

  async login(username, password) {
    let data = await this.sendRequest('/authentication/authorize', 'POST', {
      username: username,
      password: password,
    });

    if (!data.err && data.body.token) {
      this.authToken = data.body.token;
      return {
        success: true,
        response: data,
      };
    }

    return {
      success: false,
      response: data,
    };
  }

  getAllForums() {
    return this.sendRequest('/forums/getAll', 'GET');
  }

  getForumEntries(forum) {
    if (forum === 'misc') {
      forum = 'miscellaneous';
    }
    return this.sendRequest(
      '/forums/getEntries',
      'POST',
      {
        forum: forum,
      },
      true,
    );
  }

  addComment(forum, entryId, content) {
    if (forum === 'misc') {
      forum = 'miscellaneous';
    }
    return this.sendRequest(
      '/forums/addComment',
      'POST',
      {
        forum: forum,
        id: entryId,
        content: content,
      },
      true,
    );
  }

  getEntries() {
    return this.sendRequest('/profile/getEntries', 'GET', undefined, true);
  }

  addEntry(title, content, date, color, image) {
    return this.sendRequest(
      '/profile/addEntry',
      'POST',
      {
        title: title,
        content: content,
        date: date,
        color: color,
        image: image,
      },
      true,
    );
  }

  addEntryToForum(forum, entryId) {
    if (forum === 'misc') {
      forum = 'miscellaneous';
    }
    return this.sendRequest(
      '/profile/addToForum',
      'POST',
      {
        id: entryId,
        forum: forum,
      },
      true,
    );
  }

  deleteEntry(entryId) {
    return this.sendRequest(
      '/profile/deleteEntry',
      'POST',
      {
        entryId: entryId,
      },
      true,
    );
  }
}

module.exports = APIClient;
