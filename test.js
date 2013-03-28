exec = require('child_process').exec;

exec('sh ./lib/shell_scripts/heroku_start.sh', function (error, stdout, stderr){
	console.log('err: '+error)
	console.log('out: '+stdout);
	console.log('err: '+stderr)
})