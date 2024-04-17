# myocr
This is the prototypical node demonstrating how to leverage PaddleOCR-json to extract text from captured image

## Prerequisite
**1. Node-RED **
It is suggested you install the latest Node-RED in order to use this node. Although this node might be naive due to lack of reference of implementation of Node-RED custom node, it should be compatible with the latest Node-RED version.
**2. PaddleOCR-json **
You have to install (download and unpack) the latest PaddleOCR-json package (link is here: *https://github.com/hiroi-sora/PaddleOCR-json*), and configure the directory of it in the node editor.
**3. PaddleOCR-json Node.js binding **
At the same time, you have to install the accompanying Node.js binding language in order to interact with the PaddleOCR-json executable.

## Installation
Just git clone the package into some local directory and installed via the following command line:
1. cd %UserProfile%\.node-red
2. npm install local-path-to-myocr


## Note
Due to the author's extreme inexperience in Node-RED, this node is from prototyping perspective to demonstrate the overall idea, and it might be contain bugs. You are welcome to contact the author for improvement of it.
If it doesn't go as expected, delete the node from workspace and re-add it. If the problem is still pending, try to debug it yourself, :(.
