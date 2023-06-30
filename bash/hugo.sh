git clone https://github.com/sailsdock-js-boilerplates/hugo.git hugo-project
cd /root/hugo-project
rm package-lock.json
apt-get update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm --version
nvm install 12
node --version
npm install -g serve
npm install pm2 -g --unsafe-perm
npm install
sudo apt-get install hugo
npm run build
pm2 kill
pm2 serve dist