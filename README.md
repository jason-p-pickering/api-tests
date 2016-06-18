DHIS2 API System Test
==============

Simple API Testing using Chakram, initial spike only.

Chakram allows you to write clear and comprehensive tests, ensuring JSON REST endpoints work correctly as you develop and in the future.
http://dareid.github.io/chakram/

Prerequisites
-------------
* [Install Docker Engine](https://docs.docker.com/engine/installation/ "Documentation") 
* [Install Docker Compose](https://docs.docker.com/compose/install/ "Documentation") 
* [Install npm](https://docs.npmjs.com/getting-started/what-is-npm/ "Documentation") 
* [Chakram Getting started](https://github.com/dareid/chakram#getting-started/ "Documentation") 

Docker Compose file uses version 2 syntax, it require Compose 1.6.0+ and a Docker Engine of version 1.10.0+.

Execute
-------------
First run docker-compose, to start DHIS2 and a PostgreSQL in two docker containers.  

This will fetch pgracio/dhis2-web:latest and postgres:9.5.3 docker images from Docker Hub before start the containers.

```
$ docker-compose up -d
```

Wait for the container to start. To see the logs just run.

```
$ docker-compose logs -f
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