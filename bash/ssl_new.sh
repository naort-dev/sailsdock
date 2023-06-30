sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx --redirect --non-interactive --agree-tos -m blueshark0811@gmail.com -d next3.sailsdock.com