#!/usr/bin/env node
var fs = require('fs');
var sys = require('sys');
var terminal = require('child_process').spawn('bash');
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
\t-boot, --bootstrap\tAdds twitter bootstrap capabilities\n\t-HQ, --heroku-mongoHQ\tGenerates a website with a heroku setuo along with free-mongoHQ sandbox';
var version = 'v0.0.1';

allowed_options = [ '-n', '--nodejitsu', '-k', '--heroku', '-b', '--blog', '-boot', '--bootstrap', '-HQ', '--heroku-mongoHQ']
allowed_colors = ['red', 'green', 'blue']

if(inArray('node', process.argv)){
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
		
		wrench.copyDirSyncRecursive('./lib/sites/'+small_type, directory);

		if (color == 'red') {
			replace_text('#333333', '#FF3842', directory)
			replace_text('#666666', '#cc4747', directory)
		}else if (color == 'green') {
			replace_text('#333333', '#1cff32', directory)
			replace_text('#666666', '#70ff68', directory)
		}else if (color == 'blue') {
			replace_text('#333333', '#1c6fff', directory)
			replace_text('#666666', '#689fff', directory)
		} 	

		if (type.heroku == true){
			file = './lib/shell_scripts/cd.sh';
			if (process.platform == 'darwin') cmd = 'sh '
			else cmd = ''
			fs.createReadStream('./lib/shell_scripts/heroku_start.sh').pipe(fs.createWriteStream(directory+'/heroku_start.sh'));
			replace_text('<directory>', directory, './lib/shell_scripts')
			replace_text('<run>', cmd+'./heroku_start.sh', './lib/shell_scripts')
			
			function puts(error, stdout, stderr) { 
				sys.puts(stdout) 
				replace_text(directory, '<directory>', './lib/shell_scripts')
				replace_text(cmd+'./heroku_start.sh', '<run>', './lib/shell_scripts')
			}
			exec('cd ./lib/shell_scripts', puts)

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
directory = argv[1] || undefined;
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
	if(argCheck("-boot") || argCheck("--bootstrap")){
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
	if(argCheck("-HQ") || argCheck("--heroku-mongoHQ")){
		HQ = true
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