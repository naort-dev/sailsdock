git clone https://github.com/sailsdock-js-boilerplates/angular.git angular-project
cd /root/angular-project
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
npm config set user 0
npm config set unsafe-perm true
echo n | npm install -g --silent @angular/cli@7.3.10
ng build
npm install pm2 -g --unsafe-perm
pm2 kill
npm install -g serve
pm2 serve dist