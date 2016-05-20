DHIS2 API System Test
==============

Simple API Testing using Chakram, initial spike only.

Chakram allows you to write clear and comprehensive tests, ensuring JSON REST endpoints work correctly as you develop and in the future.
http://dareid.github.io/chakram/

Prerequisites
-------------
* [Install Docker](http://docs.docker.com/engine/installation/ "Documentation") 
* [Install npm](http://https://docs.npmjs.com/getting-started/what-is-npm/ "Documentation") 
* [Chakram Getting started](http://https://github.com/dareid/chakram#getting-started/ "Documentation") 

Execute
-------------
First run docker-compose, to start DHIS2 and a clean PostgreSQL in two docker containers.  

This will fetch pgracio/dhis2-web:latest and postgres:9.5.3 docker images from Docker Hub before start the containers.

```
$ docker-compose up -d
```

Wait for the container to start. To see the logs just run.

```
$ docker logs -f dhis2-web
```

Once it started application should be listening on por 8085

```
http://localhost:8085/
```

Executing system test

```
$ ./run.sh
```

Once you are done delete the containers.

```
$ docker-compose down
```