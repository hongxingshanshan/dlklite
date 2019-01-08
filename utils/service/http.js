var rootDocment = 'http://pk.duolak.com/';//你的域名
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function reqs(url, method, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: method,
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}


module.exports = {
  req: req,
  reqs:reqs
}