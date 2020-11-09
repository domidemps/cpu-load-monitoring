# CPU load monitoring

This is a web application to easily:

- Monitor your system average CPU load in real time
- Be alerted in case of heavy CPU load / recovery from a heavy CPU load

## Tested environments

- System: Ubuntu 16.04
- Web browsers:
  - Mozilla Firefox XXX or higher
  - Google Chrome XXX or higher

## To be started

- Install Python 3.7

```
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.7
sudo apt-get install python-dev
```

- Install Python dependencies

```
pip install -r backend/requirements.txt
```

- Install Node.JS, yarn and JavaScript dependencies

```
sudo apt-get install curl
curl https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
sudo apt-get install --no-install-recommends yarn
yarn
```

- Run the code

```
yarn back & yarn front
```

- Open the app

Click on this link to locally open the app: [CPU load monitoring](http://localhost:8080/)
