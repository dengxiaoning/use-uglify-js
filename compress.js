var fs  = require('fs');
var UglifyJS = require("uglify-js");
 
 var flieIn = process.argv[2]; // Will be set to 'Sean'
 var fileOut = process.argv[3]; // Will be set to 'Worthington'
 
// 读取一个文件，压缩之
function buildOne(flieIn, fileOut) {
	var options = {
		mangle: {
			toplevel: true,
		},
		nameCache: {}
	};
	 var origCode = fs.readFileSync(flieIn, 'utf8');
	 var result = UglifyJS.minify(origCode,options);
	 console.log(result.error); // runtime error, or `undefined` if no error
     
    fs.writeFileSync(fileOut, result.code, 'utf8');
}

if(!flieIn){
	console.error('Please enter the file path or file name to be compressed')
}else{
	if(!fileOut){
		var fileoutPathFront = flieIn.substr(0,flieIn.lastIndexOf('.'));
		var fileoutPathSuffix = flieIn.substr(flieIn.lastIndexOf('.'));
		var joinFileoutPath = fileoutPathFront+'.min'+fileoutPathSuffix;
		console.log(joinFileoutPath);
		buildOne(flieIn, joinFileoutPath);
	}else{
		buildOne(flieIn, fileOut);
	}
	
}
