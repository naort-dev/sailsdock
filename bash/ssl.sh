sudo nginx -t
sudo systemctl restart nginx
sudo systemctl reload nginx
sudo ufw --force enable
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
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

sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx --redirect --non-interactive --agree-tos -m blueshark0811@gmail.com -d www.sailsdock.com