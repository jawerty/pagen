# pagen.js
pagen.js is a simple and customizable site generator for node.js. You can generate nice-looking websites, from static to a MongoDB-run blog, in an instant.

homepage: http://jawerty.github.io/pagen/

Current version: 0.2.4


# Features
* Easy to use
* Simple to setup (NPM)
* Generated website server is run with the web-framework **Express.js**
* Generate your website in a variety of colors
* Utilizes the Twitter bootstrap
* Will 'blogify' your website in an instant
* Instant and simplistic heroku/nodejitsu deployment
* Blogs are run on MongoDB and based off of the [Node2Blog](https://github.com/jawerty/Node2Blog) project
* Generate websites with js/css libraries already built in (i.e. socket.io/angular.js/etc)
* Much more...

![Image cannot be loaded](http://i.imgur.com/g0Dod61.png)

# Installation
Install globally
```
$ npm install pagen -g
```

# Getting Started
Example for pagen's basic usage

`pagen <color> <directory> [options]`

i.e.
```
$ pagen red website_folder
```

##### List of built in colors
* default (black)
* green 
* blue
* red
* gray
* lightblue
* pink
* brown
* magenta
* yellow
* Alternatively, you can choose whatever color scheme you want (as seen below)

Creating a basic barbones node.js/express website (default black color)
```
$ pagen    #generates website
$ cd pagen_website  
$ node app	   #runs server
```

### Basic w/ color
Generate a website with a built in color scheme (as seen above)
```
$ pagen blue
```

### Generate in a custom directory
```
$ pagen green my_website
```

### Choose your own color scheme
*note: The 1st color is the primary color while the 2nd is the secondary color.
* simple colors
```
$ pagen 'blue_black' my_site
```

* color hex example
```
$ pagen '#545454_#ff892' my_website     
```

### Importing javascript and/or css libraries (from [cdnjs]<http://cdnjs.com>)

*note: Multiple library imports must be separated by '_' underscores.
```
$ pagen red --library angular.js 
```
The command above will import a website with the angular.js cdn already in the head.



Importing multiple libraries
```
$ pagen blue --library angular.js_jade_socket.io
```

## Types of page generation
*note: As of now, you cannot generate a bootstrap site and a blog at the same time.

### Default static website (as seen above)
```
$ pagen gray my_gray_site
```

### Dynamic blog running on MongoDB (Must have MongoDB installed)
```
$ pagen blue pagen_blog --blog
```
or
```
$ pagen blue pagen_blog -b
```

#### Blog Usage 
To setup the blog you need to have MongoDB installed.

Go to the endpoint '/admin' to login. You will then see a form with password and confirm password boxes. In order to change your password, see the app.js file and change the variable 'password' to whatever you'd like. File below (first fourteen lines)
```
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var store = new express.session.MemoryStore;

admin = null;
password = 'your_password' #where you want to change the password
```

### Twitter bootstap static website
```
$ pagen pink my_bootstrap --bootstrap
```
or
```
$ pagen pink my_bootstrap -t
```

### Skeleton Express app
```
$ pagen skeleton
```
*note: You cannot use the blog or bootstrap arguments with the skeleton app but the '--library' and deployment arguments are allowed.

## Heroku and Nodejitsu setup
With either the heroku toolbelt or jitsu already setup on your computer, deployment is rather simple

#### Heroku deployment
*note: The heroku deploy script will initialize git in the directory
```
$ heroku login
$ pagen red mysite --heroku
$ cd pagen
$ heroku create
```

#### Nodejitsu deployment
```
$ npm install jitsu -g 
$ pagen green jitsu_site --nodejitsu 
$ cd jitsu_site
$ jitsu create
```

# Contact
If you would like to contact me for further information on the project, see the info below.

Email: jawerty210@gmail.com

Github: jawerty

Twitter: @jawerty

Blog: <http://jawerty.github.io>

# License
See the file LICENSE to view the MIT License
