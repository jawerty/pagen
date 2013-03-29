# pagen
Pagen is a simple but colorful site generator for node.js. You can generate nice-looking websites, from static to a MongoDB-run blog, in an instant.

Current version: 0.0.6

# Features
* Easy to use
* Simple to setup (NPM)
* Server is run with the web-framework **Express.js**
* Generate your website in a variety of colors
* Utilizes the Twitter bootstrap
* Will 'blogify' your website in an instant
* Simple heroku deployment
* Simple nodejitsu deployment
* Blogs are run on MongoDB and based off of the [Node2Blog](https://github.com/jawerty/Node2Blog) project
* Much more...

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

list of colors
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

Creating a basic barbones node.js website (default black color)
```
$ pagen    #generates website
$ cd pagen_website  
$ node app	   #runs server
```

Generate a website with some color (as seen above)
```
$ pagen green
```

Choosing your directory
```
$ pagen blue my_website
```

Choose your own color scheme
*note: the 1st color is the primary color while the 2nd is the secondary color.
* simple colors
```
$ pagen 'blue_black' my_site
```

* color hex example
```
$ pagen '#545454_#ff892' my_website     
```

## Types of page generation
*note: as of now, you cannot generate a bootstrap site and a blog at the same time.

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
## Heroku and Nodejitsu setup
With either the heroku toolbelt or jitsu already setup on your computer, deployment is rather simple

#### Heroku deployment
*note: The heroku deploy script will initialize git in the directory
```
$ heroku login
$ pagen red mysite --heroku #create the website
$ cd pagen
$ heroku create
```

#### Nodejitsu deployment
```
$ npm install jitsu -g 
$ pagen green jitsu_site --nodejitsu #generate the website
$ cd jitsu_site
$ jitsu create
```

# What the static (green) website looks like
![Image cannot be loaded](http://i.imgur.com/uDueYdT.png)

# Contact
If you would like to contact me for further information on the project, see the info below.

Email: jawerty210@gmail.com

Github: jawerty

Twitter: @jawerty

Blog: <http://wrightdev.herokuapp.com>

# License
See the file LICENSE to view the MIT License
