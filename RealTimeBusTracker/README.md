<img src="blue.png" width='100'>

# Name

Real Time Bus Tracker

# Description

This is a JavaScript program to display real-time bus information for buses of the MBTA (Massachusetts Bay Transportation Authority) on Route 1.
The original requirements were for displaying only one bus on the route.  I added all the buses, and updated the markers so that buses that were outbound (having a direction of 1) are black, and I rotated the markers so that the blue ones (with a direction of 0) point upwards to indicate their general path of travel on the route.

# Installation

Requires the index.html, mapanimation.js, and styles.css files to be in the same directory.

# Usage

Load the HTML file in a browser to see the markers on the map.  An update of the data is requested every 15 seconds, though processing time may cause the updates to take longer.
Note that the operational hours for this route are not 24/7, so it is possible that there may be no bus data to display if there are no buses running at the time.

# Support

No support is provided for this application.  Use at your own discretion.

# Roadmap

Plans to update the markers with better images, possibly adding additional information.

# License information

MIT License in the LICENSE file in this directory.
