#!/bin/bash
command_exists () {
   [ -x "$(command -v $1)" ] && echo "$1 exists" || $2
}

if [ "$1" == "clean" ]; then
    rm ./js/data.json
    rm ./js/data.ts
    rm ./js/scripts.js
    rm ./js/suggestions.js
fi

command_exists "python3" "apt install python3"
python3 ./assets/parse.py > ./js/data.ts

command_exists "npm" "apt install npm"
command_exists "tsc" "npm install typescript -g"
tsc js/data.ts
tsc js/scripts.ts
tsc js/suggestions.ts
curl -X POST -s --data-urlencode 'input@./js/data.js' https://javascript-minifier.com/raw > ./js/data.min.js
curl -X POST -s --data-urlencode 'input@./js/scripts.js' https://javascript-minifier.com/raw > ./js/scripts.min.js
curl -X POST -s --data-urlencode 'input@./js/suggestions.js' https://javascript-minifier.com/raw > ./js/suggestions.min.js
