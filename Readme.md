In Node.js, process.env.PORT || 3000 is a common pattern used to set the port number for a web server. It translates to: "Use the port number defined in the environment, or use 3000 as a backup".
So basically it checks for an env called PORT and it is also important to know that the 3000 is a hardcoded default, you can use any valid number

it is important to store your port number as an env because, Most cloud providers (like Heroku, AWS, or Azure) dynamically assign a port to your app at runtime. They inject this number into process.env.PORT. If your app is hard-coded to only listen on 3000, it will crash because it isn't listening where the platform expects it to. 
It is also important to note that your app runs in different stages eg, Development: You might use port 3000 on your laptop.
Testing: You might use port 5000 to avoid interfering with your dev server.
Production: The server might require port 80 or 8080.
Using .env lets you change these values without modifying your source code every time you move between environment

why do we need path modules?
File paths looks different on different os, eg
Windows:  data\entries.json
Mac/Linux: data/entries.json 
so if you hardcode / or \, your code would break on another machine

in recent node versions (v20.11.0+ and v21.2.0+), to get the directory without the boilerplate, we use 

const __dirname = import.meta.dirname;
const __filename = import.meta.filename;

But for older versions we use 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

OPTIONS handling (preflight) in routes
When a browser makes a POST/PUT/DELETE request, it first sends an OPTIONS preflight request. Your router doesn't handle it, so those requests will fail from a real frontend. You need something like:

if (req.method === "OPTIONS") {
  res.writeHead(204);
  return res.end();
}

Extraction of Path part of a request url, deals with a modern way to "clean" an incoming request URL so you can easily figure out what page or route a user is trying to visit

const requestUrl = new URL(req.url, http://${req.headers.host}); 
const pathname = requestUrl.pathname;

req.url is the path the user requested eg, /about?name=favour
req.headers.host is the domain + port eg, localhost:3000

so the new URL constructor combines them into 
http://localhost:3000/about?name=favour
so therefore, requestUrl becomes a proper url object you can work with

.pathname extracts just the path part of the url with no query params

eg,
Full URL	                      pathname
http://localhost:3000/	             /
http://localhost:3000/about  	   /about
http://localhost:3000/user?id=5 	/user

in simple terms This code is doing:

“Take the incoming request, build a full URL from it, then get only the route path.”

In the routes.js ,api routes must come first before static files routes


