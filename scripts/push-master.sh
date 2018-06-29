#!/usr/bin/env bash

echo 'Checking out to dev'
git checkout dev

echo 'Pulling dev'
git pull origin dev

echo 'Merging local'
git merge local -m "merge"

echo 'Pusshing to dev'
git push origin dev

echo 'Checking out to master'
git checkout master

echo 'Pulling master'
git pull origin master

echo 'Merging dev'
git merge dev -m "merge"

echo 'Pusshing to master'
git push origin master

echo 'Checking out to local'
git checkout local