/**
 * Created by UmairAhmed on 4/16/2017.
 */
var five = require("johnny-five");
var board = new five.Board();

var pubnub = require('pubnub').init({
    subscribe_key: 'your subscribe key',
    publish_key:   'your publish key'
});

board.on("ready", function() {

    // Create a standard `led` component instance
    var led = new five.Led(13);

    // "blink" the led in 500ms
    // on-off phase periods
    led.on();

    pubnub.subscribe({
        channel: 'channel-name',
        callback: function(data) {
            if(led) {
                data.status ? led.on() : led.off();
            }
        },
        error: function(err) {console.log(err);}
    });
});

