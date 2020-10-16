var base = {
  url: 'http://127.0.0.1:8088/ssrm'
};

var http = {};

http.get = function(url, data) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: base.url + url,
      data: data,
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            wx.hideLoading();
            resolve(res.data.data);
          } else {
            wx.hideLoading();
            Promise.reject(res);
          }
        } else {
          wx.hideLoading();
          Promise.reject(res);
        }

      },
      fail: function(e) {
        wx.hideLoading();
        Promise.reject(e);
      }
    })
  }).catch((e) => {
    wx.hideLoading();
    Promise.reject(e);
  })
}

http.post = function(url, data) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: base.url + url,
      data: data,
      method: 'POST',
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            wx.hideLoading();
            resolve(res.data.data);
          } else {
            wx.hideLoading();
            Promise.reject(res);
          }
        } else {
          wx.hideLoading();
          Promise.reject(res);
        }

      },
      fail(e) {
        wx.hideLoading();
        Promise.reject(e);
      }
    })
  }).catch((e) => {
    wx.hideLoading();
    Promise.reject(e);
  })
}


http.imgUpload = function(data) {
  wx.showLoading({
    title: '图片上传中',
  })
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: base.url + '/api/weapp/upload',
      filePath: data,
      name: 'file',
      success: (res)=> {
        wx.hideLoading();
        resolve(JSON.parse(res.data).data);
      }
    })
  })
}


http.all = function(attachs = []) {
  var temp = [];
  attachs.forEach(item => {
    temp.push(this[item.method](item.path, item.params))
  })
  return Promise.all(temp).catch((e) => {
    Promise.reject(e);
  });
}

class Attach {
  constructor(path, params, method = 'get') {
    this.path = path;
    this.params = params;
    this.method = method;
  }
}

export default http;
exports.Attach = Attach;