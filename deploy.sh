#!/usr/bin/env sh
git pull

# kill :8080
nodepid=`netstat -anp | grep ":3000" | awk '{print $7}'|cut -d/ -f1` && kill -9 $nodepid
echo $nodepid

yarn notes:dev
