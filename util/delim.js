var https = require('https');
var delims = {};

module.exports = {
  load: () => {
    console.log("Loading data...");
    https.get({
      headers: {'User-Agent': 'wdimac'},
      host: 'api.github.com',
      path: '/repositories/32408393/contents/main'
    }, (response) => {
        var body = '';
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            var parsed = JSON.parse(body);
            parsed.forEach( (item) => {
              https.get({
                host: 'raw.githubusercontent.com',
                path: '/unicode-cldr/cldr-misc-full/master/main/' + item.name + '/delimiters.json'
              }, (response) => {
                var dBody = '';
                response.on('data', (d) =>{
                  dBody += d;
                });
                response.on('end', () => {
                  var del = JSON.parse(dBody).main[item.name].delimiters;
                  Object.keys(del).forEach( (key) => {
                    if (!delims[key]) delims[key] = {};
                    delims[key][item.name] = del[key];
                  })
                  
                });
                response.on('error', (err) => {
                  console.log("Failed to load");
                  console.log(err);
                })

              })
            });
        });
    })
  },
  getKeys: function() {
    return Object.keys(delims);
  },
  getDetails:function(key) {
    return delims[key];
  },
  removeKey: function(key) {
    delete delims[key];
  },
  addKey: function(key) {
    delims[key] = {};
  }
};
