# lab_2_backend

## Instruction

### Docker-compose

To run the application, you need to open the terminal in the directory with the application. Then, in order to build the project, you need to enter:
```
$ docker-compose build
```
in the terminal.

After the project is built then to start you need to enter:
```
$ docker-compose up
```

To check the application, click on the link:
 
[http://localhost:3000/](http://localhost:3000/)


### Docker

If you want to run the project without using "docker-compose" then you can do this:

Create an image first. To do this, you need to enter: 
```
$ docker build -t lab-2 . 
```
in the terminal.

Then run the container: 
```
$ docker run -d -p 3000:3000 --name app --rm lab-2
```

To check the application, click on the link:
 
[http://localhost:3000/](http://localhost:3000/)

To stop the container, type: 
```
$ docker stop app
```
