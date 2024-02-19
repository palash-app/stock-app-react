#!/bin/bash

cd ~/app

# Start webserver at 3000
npm start &
P1=$!

# Start ngrok -> 3000, this will tunnel the domain to localhost
ngrok http 3000 --domain united-iguana-superb.ngrok-free.app &
P2=$!
wait $P1 $P2
