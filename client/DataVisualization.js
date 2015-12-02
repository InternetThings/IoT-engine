var bubbles = {};
var bubblesDep = new Tracker.Dependency;

Template.DataVisualization.onCreated(function() {
    Meteor.subscribe('sensors');
});

Template.DataVisualization.onRendered(function() {
    var canvas = document.getElementById('dataCanvas');
    var canvasContainer = document.getElementById('canvasContainer');
    canvas.width = canvasContainer.width;
    canvas.height = canvasContainer.height;

});

function SensorBubble(x, y, sensorName, value, context) {
    this.x = x;
    this.y = y;
    this.sensorName = sensorName;
    this.value = value;
    this.context = context
}

SensorBubble.prototype = {
    draw:function() {
        this.context.font = '14px arial';
        var radius = context.measureText(this.sensorName).width;

        this.context.beginPath();
        this.context.arc(this.x, this.y, radius, 0, 2*Math.PI);
        this.context.closePath();
        this.context.fillStyle = '#337ab7';
        this.context.fill();

        this.context.fillStyle = '#FFF';
        this.context.fillText(this.sensorName, this.x-(radius/2), this.y-(radius/2));
        this.context.font = '18px arial';
        var valueWidth = this.context.measureText(this.value).width;
        this.context.fillText(this.value, this.x-(valueWidth/2), this.y+(radius/2));
    },

    changeValue:function(newValue, context) {
        this.value = newValue;
        this.draw();
    }
}
