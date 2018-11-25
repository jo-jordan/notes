#!/usr/bin/env sh
git pull

# kill :8080
nodepid=`netstat -anp | grep ":8080" | awk '{print $7}'|cut -d/ -f1` && kill -9 $nodepid
echo $nodepid

#kill :8081
socketpid=`netstat -anp | grep ":8081" | awk '{print $7}'|cut -d/ -f1` && kill -9 $socketpid
echo $socketpid

yarn notes:dev
