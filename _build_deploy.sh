#!/bin/sh
TARGET="../moodlenet-web-build" # indicate path where this repository is checked out: https://gitlab.com/moodlenet/clients/web-build

echo "Deploy path: ' + ${TARGET}"

git pull

npm install 

npm run-script build

npm run styleguide:build

cp -r build/* $TARGET

mv styleguide $TARGET/docs

cd $TARGET
git pull
git add .

msg="front-end build - `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi

# Commit changes
git commit -m "$msg"

# Push to git server
git push origin master -v