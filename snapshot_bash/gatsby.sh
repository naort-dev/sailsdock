export PATH=$PATH:/usr/local/bin
export NODE_PATH=/usr/local/share/node
export USER=root
export HOME=/root
source $HOME/.nvm/nvm.sh
nvm use 10
cd /root/angular-project
npm install pm2 -g --unsafe-perm
npm install -g serve
pm2 kill
pm2 serve public