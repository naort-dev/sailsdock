git clone https://github.com/sailsdock-js-boilerplates/sapper.git sapper-project
cd /root/sapper-project
rm package-lock.json
apt-get update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm --version
nvm install 10
node --version
npm install
npm run build
npm install pm2 -g --unsafe-perm
pm2 kill
pm2 start node __sapper__/build
sudo apt-get update
sudo apt-get -y install nginx
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /root/default /etc/nginx/sites-available/default
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
nginx -t
sudo systemctl restart nginx
