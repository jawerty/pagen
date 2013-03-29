#!/usr/bin/env node
var fs = require('fs');
var sys = require('sys');
var chdir = require('chdir');
var wrench = require('wrench')
var replace = require('replace');
var util = require('util');
/*color set**/
green_start = '\u001b[32m';
yel_start = '\u001b[33m';
end = '\u001b[0m';
/************/
var exec = require('child_process').exec,
    child;

var help = '\npagen is a simple but sweet site generator for node.js. \
\n\nUsage: \n\tpagen <color> <directory> [options]\nOptions:\n\t-h, --help\tHelp screen\n\t-v, --version\tCurrent version\n\t-b, \
--blog\tGenerate a blog-based, mongodb website\n\t-k, --heroku\tGenerate a website with heroku setup\n\t-n, --nodejitsu\tGenerates a website with nodejitsu setup\n  \
\t-t, --bootstrap\tGenerates a website with twitter bootstrap capabilities\n';
var version = 'v0.0.6';

allowed_options = [ '-n', '--nodejitsu', '-k', '--heroku', '-b', '--blog', '-t', '--bootstrap'];
allowed_colors = ['red', 'green', 'blue', 'lightblue', 'yellow', 'pink', 'magenta', 'brown', 'gray'];

if(process.argv[0] == 'node'){
	argv = process.argv.slice(2)
}else{
	argv = process.argv
}

function inArray(value,array)
{
    var count=array.length;
    for(var i=0;i<count;i++)
    {
        if(array[i]===value){
        	return true;
        }
    }
    return false;
}

exit = function(message, error){
	util.puts(message);
	err = error || null;
	process.exit(err);
}

isEmpty = function(array){
	if(array.length == 0){
		return true;
	}else{
		return false;
	}
}

argCheck = function(arg){
	if(inArray(arg, argv) && inArray(arg, allowed_options)){
		return true;
	}else{
		return false;
	}
}

site_generate = function(directory, type, color){

	replace_text = function(regex, replacement, directory){
		replace({
			regex: regex,
			replacement: replacement,
			paths: [directory],
			recursive: true,
			silent: true,
		});
	}

	copy = function(small_type, type){
		if (process.platform == 'darwin') cmd = 'sh '
		else cmd = ''

		start = function(shell, message){
			fs.createReadStream('/usr/local/lib/node_modules/pagen/lib/shell_scripts'+shell).pipe(fs.createWriteStream(directory+shell));
			function puts(error, stdout, stderr) { 
				console.log(message)
			}
			chdir(directory, function () {
				child = exec(cmd+'.'+shell, puts)
			});
		}

		wrench.copyDirSyncRecursive('/usr/local/lib/node_modules/pagen/lib/sites/'+small_type, directory);

		if (color == 'red') {
			replace_text('#333333', '#FF3842', directory)
			replace_text('#666666', '#cc4747', directory)
		}else if (color == 'green') {
			replace_text('#333333', '#1cff32', directory)
			replace_text('#666666', '#70ff68', directory)
		}else if (color == 'blue') {
			replace_text('#333333', '#1c6fff', directory)
			replace_text('#666666', '#689fff', directory)
		}else if (color == 'pink') {
			replace_text('#333333', '#ff6363', directory)
			replace_text('#666666', '#ffa0a0', directory)			
		}else if (color == 'lightblue') {
			replace_text('#333333', '#5e99ff', directory)
			replace_text('#666666', '#aac9ff', directory)
		}else if (color == 'magenta') {
			replace_text('#333333', '#FF26FF', directory)
			replace_text('#666666', '#FF68FF', directory)
		}else if (color == 'yellow') {
			replace_text('#333333', '#F7F700', directory)
			replace_text('#666666', '#EDEDA6', directory)
		}else if (color == 'brown') {
			replace_text('#333333', '#845C21', directory)
			replace_text('#666666', '#826844', directory)
		}else if (color == 'gray') {
			replace_text('#333333', '#7F7F7F', directory)
			replace_text('#666666', '#B5B5B5', directory)
		}else if (Object.prototype.toString.call( color ) === '[object Array]') {
			replace_text('#333333', color[0], directory)
			replace_text('#666666', color[1], directory)
		}

		if (type.heroku == true && type.nodejitsu == true){
			exit('Sorry, your can\'t deploy with both heroku and nodejitsu');
		} else if (type.heroku == true){
			start('/heroku_start.sh', green_start+'Pagen website created. use "cd '+directory+'" and "heroku create" to finalize your heroku deployment.'+end)
		} else if (type.nodejitsu == true){
			start('/nodejitsu_start.sh', green_start+'Pagen website created. use "cd '+directory+'" and "jitsu create" to finalize your nodejitsu deployment.'+end)
		}
	}
	
	if(type.boot == true){
		small_type = 'bootstrap'
	}else if(type.blog == true){
		small_type = 'blog'
	}else{
		small_type = 'simple'
	}

	if (fs.existsSync(directory)) {
		copy(small_type, type)
	}else{
		child = exec('mkdir ' + directory,
			function (error, stdout, stderr) {
			if (error !== null) {
			  util.error('exec error: ' + error);
			}
			copy(small_type, type)
		});
	}
}

color = argv[0] || undefined;
if (typeof color !== 'undefined' && color.indexOf('_')){
	color = color.split('_')
}
directory = argv[1] || 'pagen_website';
if(inArray(directory, allowed_colors) || inArray(directory, allowed_options)) directory = 'pagen_website';

main = function(color, directory){
//options setup//
	
	var boot, blog, nodejitsu, heroku, HQ;

	if(inArray('-h', argv) || inArray('--help', argv)){
		exit(help);
	}
	if(inArray('-v', argv) || inArray('--version', argv)){
		exit(version);
	}
	if(argCheck("-t") || argCheck("--bootstrap")){
		boot = true
	}
	if(argCheck("-b") || argCheck("--blog")){
		blog = true
	}
	if(argCheck("-n") || argCheck("--nodejitsu")){
		nodejitsu = true
	}
	if(argCheck("-k") || argCheck("--heroku")){
		heroku = true
	}

	type = {'boot':boot, 'blog':blog, 'nodejitsu':nodejitsu, 'heroku':heroku, 'HQ':HQ}
	
	if(typeof color == 'undefined'){ //running with no arguments defaults to the generator below
	  site_generate(directory, type)
    }else{
      if (inArray(color, allowed_options)){
	    site_generate(directory, type)
      }
  	  site_generate(directory, type,  color)
	}
}
////////////////		

if (require.main === module) {
    main(color, directory);      
}