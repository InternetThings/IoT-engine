var bubbles = {};
var bubblesDep = new Tracker.Dependency;

Template.DataVisualization.onCreated(function() {
    Meteor.subscribe('sensors', {
        onReady:function() {
            var sensors = [];
            AccessTokens.find().forEach(function(sensor) {
                sensors.push(sensor._id);
            })
            Meteor.subscribe('sensorData', sensors);
        }
    });
});

var radius;
var x;
var y;
var context;

Template.DataVisualization.onRendered(function() {
    var canvas = document.getElementById('dataCanvas');
    context = canvas.getContext('2d');
    radius = (canvas.width*0.9)/6
    canvas.width = $('#canvas-container').width();
    canvas.height = (radius*2)+canvas.width*0.1;
    x = radius+canvas.width*0.05;
    y = 0;
    context.font = '14px arial';
    SensorData.find().observeChanges({
        added:function(id, fields) {
            if(bubbles[fields.sensorId] !== undefined) {
                bubbles[fields.sensorId].changeValue(fields.data);
            }
        }
    });

    this.autorun(function() {
        AccessTokens.find({}, {fields:{location:1, type:1}}).forEach(function(sensor) {
            if(bubbles[sensor._id] === undefined) {
                if(y === 0) {
                    y += radius+canvas.width*0.05;
                }
                if(x+radius+5 > canvas.width) {
                    x = radius+canvas.width*0.05;
                    y += (radius*2)+canvas.width*0.05;
                    canvas.height += (radius*2)+canvas.width*0.1;
                }
                bubbles[sensor._id] = new SensorBubble(x, y, radius, sensor.location, undefined, EJSON.parse(DataTypes)['types'][sensor.type], context);
                x += (radius*2)+canvas.width*0.05;
            }
        });
        for(id in bubbles) {
            if(bubbles[id].y+radius+5 > canvas.height) {
                canvas.height = bubbles[id].y+radius+5;
            }
        }
        drawData();
    });
});

var drawData = function() {
    for(id in bubbles) {
        bubbles[id].context = context;
        bubbles[id].draw();
    }
}

var circleCoordsFromDecimal = function(decimal, x, y, radius) {
    var radians = (2*decimal)-0.5;
    if(radians < 0) {
        radians += 2;
    }
    var coords = {};
    coords.x = x + (radius*Math.cos(radians*Math.PI));
    coords.y = y + (radius*Math.sin(radians*Math.PI));
    return coords;
}

function SensorBubble(x, y, radius, sensorName, value, type, context) {
    this.x = x;
    this.y = y;
    this.sensorName = sensorName;
    this.value = value;
    this.context = context;
    this.radius = radius;
    this.type = type;
}

SensorBubble.prototype = {
    draw:function() {
        this.context.clearRect(this.x-(radius+5), this.y-(radius+5), radius*2+10, radius*2+10);

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        this.context.closePath();
        this.context.strokeStyle = '#337ab7';
        this.context.stroke();

        this.context.font = '14px arial';
        this.context.fillStyle = '#337ab7';
        var nameWidth = this.context.measureText(this.sensorName).width;
        this.context.fillText(this.sensorName, this.x-(nameWidth/2), this.y-(this.radius*0.4), radius);
        if(this.value !== undefined) {
            this.context.font = '18px arial';
            var valueWidth = this.context.measureText(this.value).width;
            if(this.type) {
                this.context.fillText('' + this.value + unescape(this.type.symbol), this.x-(valueWidth/2), this.y+(this.radius*0.4), radius);
                var decimal = (this.value-this.type.minVal)/(this.type.maxVal-this.type.minVal);
                var coords = circleCoordsFromDecimal(decimal, this.x, this.y, this.radius);
                this.context.beginPath();
                this.context.arc(coords.x, coords.y, 5, 0, 2*Math.PI);
                this.context.closePath();
                this.context.fill();
            }
            else {
                this.context.fillText(this.value, this.x-(valueWidth/2), this.y+(this.radius*0.4), radius);
            }
        }
    },

    changeValue:function(newValue) {
        this.value = newValue;
        this.draw();
    }
}
