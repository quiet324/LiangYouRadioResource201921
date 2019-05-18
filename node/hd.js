const Xray = require('x-ray');
const x = Xray();
const fs = require('fs');
const download = require('download');

x('http://txly2.net/hd', 'tbody tr', [{
        "time": '.ss-title a',
        "title": '.ss-title p',
        "downUrl": '.ss-dl a@href'
    }])
    .paginate('.pagenav@href')
    .limit(2)
    // .write('results.json')
    (function(err, results) {
        results = results.reverse();
        results.forEach(function(audio, arrayIndex) {

            var index = audio.downUrl.indexOf('?');
            var sub = audio.downUrl.substring(0, index);
            var lastIndex = audio.downUrl.lastIndexOf('/');
            var fileName = sub.substring(lastIndex + 1);
            audio.downUrl = sub;
            audio.time = audio.time.substring(audio.time.lastIndexOf('-') + 1);
            // download(audio.downUrl).then(data => {
            //     fs.writeFileSync('../hd/' + fileName, data);
            // });
            audio.duration = 1760;
            audio.size = "14.1M";
            audio.artistId = 54;
            audio.artistName = "蓝天绿洲";
            audio.id = 54000001 + arrayIndex;

        });

        fs.writeFile("./hd.json", JSON.stringify(results, null, '\t'));
    });