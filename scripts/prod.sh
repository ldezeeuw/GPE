#!/usr/bin/env bash

# COLOR_NC='\e[0m' # No Color
# COLOR_WHITE='\e[1;37m'
# COLOR_BLACK='\e[0;30m'
# COLOR_BLUE='\e[0;34m'
# COLOR_LIGHT_BLUE='\e[1;34m'
# COLOR_GREEN='\e[0;32m'
# COLOR_LIGHT_GREEN='\e[1;32m'
# COLOR_CYAN='\e[0;36m'
# COLOR_LIGHT_CYAN='\e[1;36m'
# COLOR_RED='\e[0;31m'
# COLOR_LIGHT_RED='\e[1;31m'
# COLOR_PURPLE='\e[0;35m'
# COLOR_LIGHT_PURPLE='\e[1;35m'
# COLOR_BROWN='\e[0;33m'
# COLOR_YELLOW='\e[1;33m'
# COLOR_GRAY='\e[0;30m'
# COLOR_LIGHT_GRAY='\e[0;37m'

echo -ne '\033[1;34m PRODUCTION ENVIRONEMENT\n'

echo 'Changing path to /production'
cd /var/www/production

echo 'Checking out on master'
sudo git checkout master

echo 'Pulling git'
sudo git pull origin master

echo -ne '\033[1;33m Clearing uptoo module folder\n'
sudo rm -rf /var/www/production/node_modules/uptoo-*

echo -ne '\033[1;32m Installing uptoo module folder\n'
sudo npm i

echo -ne '\033[1;32m Building\n'
sudo npm run build -- --env

echo -ne '\033[1;32m Copying source -> dist/\n'
sudo cp -a /var/www/production/dist/source/. /var/www/production/dist/build/

echo -ne '\033[1;33m Clearing prod folder\n'
sudo rm -rf /var/www/production/dist/prod

echo -ne '\033[1;33m Moving tmp to sandbox folder\n'
sudo mv /var/www/production/dist/build /var/www/production/dist/prod
