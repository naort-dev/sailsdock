git clone https://github.com/sailsdock-js-boilerplates/gatsby.git gatsby-project
cd /root/gatsby-project
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
npm install -g serve
npm install pm2 -g --unsafe-perm
pm2 kill
pm2 serve public

