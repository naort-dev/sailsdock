
git clone https://github.com/sailsdock-js-boilerplates/next.git project
cd /root/project
rm package-lock.json
export PATH=$PATH:/usr/local/bin
export NODE_PATH=/usr/local/share/node
export USER=root
export HOME=/root
source $HOME/.nvm/nvm.sh
nvm --version
nvm install 10
node --version

npm install pm2 -g --unsafe-perm
npm install

npm run build
pm2 kill
pm2 start npm -- start
sudo apt-get update
sudo apt-get -y install nginx
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /root/default /etc/nginx/sites-available/default
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
nginx -t
sudo systemctl restart nginx

sudo nginx -t
echo "sudo nginx -t"
sudo systemctl restart nginx
echo "sudo systemctl restart nginx"
sudo systemctl reload nginx
echo "sudo ufw --force enable"
sudo ufw --force enable
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
echo "sudo add-apt-repository -y ppa:certbot/certbot"
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get -f install -y python-certbot-nginx
sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock*
sudo dpkg --configure -a
sudo apt-get -f install -y
sudo apt-get update
sudo apt-get -f install -y python-certbot-nginx