apt-get update
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm --version
nvm install 10
node --version
npm config set user 0
npm config set unsafe-perm true
npm i -g @vue/cli
vue create --preset my-preset.json real-world-vue
cd real-world-vue
npm install
npm run build
npm install pm2 -g --unsafe-perm
npm install -g serve
pm2 serve dist