#!/bin/sh
# 
if [ -z "$1" ]
then
  echo "usage: deploy.sh <folder-to-deploy-to-gh-pages>"
  exit 1
fi

# https://stackoverflow.com/a/33178233/2066736
git push origin `git subtree split --prefix $1 master`:gh-pages --force
