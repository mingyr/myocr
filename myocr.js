"use strict";

const myocr_debug = false;

module.exports = function(RED) {

    const fs = require('fs');
	const tmp = require('tmp');
    const OCR = require('paddleocrjson');

	tmp.setGracefulCleanup();
    
    function PaddleOCR(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		node.paddleocr = config.paddleocr;
		
        node.on('input', function(msg) {
			console.info('extract text from the captured image');
			if (!node.ocr)
			{
				if (!fs.existsSync(config.paddleocr))
				{
					console.error('Non-existing PaddleOCR-json.exe: ', config.paddleocr);
					node.status({fill:"red", shape:"ring", text:"unconfigured"});
				}
				else
				{
					const path = require('path');
					const directory = path.dirname(config.paddleocr);
					console.info("Directory of PaddleOCR-json.exe: ", config.paddleocr);
					
					const fileName = path.basename(config.paddleocr); 
					
					node.ocr = new OCR(fileName, [], {cwd: directory}, myocr_debug);
					node.status({fill:"green", shape:"dot", text:"configured"});
					
					if (myocr_debug)
					{
						node.ocr.stdout.on('data', (chunk) =>{ console.info(chunk.toString()); });
						node.ocr.stderr.on('data', (data) =>{ console.info(data.toString()); });
						node.ocr.on('exit', (code) =>{ console.info('exit code: ', code); });
					}
				}
			}
			
			let tmpObj = tmp.fileSync({ mode: 0o644, prefix: 'myocr-', postfix: '.jpg' });
			
			fs.writeFileSync(tmpObj.name, msg.payload);
            
			node.ocr.flush({image_path: tmpObj.name}).then((res) => {
				if (res.code == 100)
				{
					let chs = [];
				    for (let i = 0; i < res.data.length; i++) {
                        chs.push(res.data[i].text);
                    }
				
	                msg.topic = "result";			
				    msg.payload = chs.join(" ");
					
				    node.send(msg);
				}
				else
				{
					msg.topic = "result";
					msg.payload = "";
					
				    node.send(msg);
				}
			});
			
			// msg.payload = ocr.flush({image_path: tmpObj.name});
			// node.send(msg);
			
        });
    }
	
    RED.nodes.registerType("myocr", PaddleOCR);
}
