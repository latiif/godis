#!/bin/bash
command_exists () {
   [ -x "$(command -v $1)" ] && echo "$1 exists" || $2
}

if [ "$1" == "clean" ]; then
    rm ./js/data.json
    rm ./js/data.ts
    rm ./js/scripts.js
fi

command_exists "python3" "apt install python3"
python3 ./assets/parse.py > ./js/data.ts

command_exists "npm" "apt install npm"
command_exists "tsc" "npm install typescript -g"
tsc js/data.ts
tsc js/scripts.ts
