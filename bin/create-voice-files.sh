#!/usr/bin/env bash

# chmod +x bin/create-voice-files.sh

set -eo pipefail
dir=$(dirname $0)/../src/assets
if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
fi

cd $dir

if [ "$1" == "en" ]; then
    say --voice="Jamie (Premium)" "$2" -o $2.aiff
    lame -m m $2.aiff $2.mp3
elif [ "$1" == "de" ]; then
    say --voice="Anna (Premium)" "$2" -o $2.aiff
    lame -m m $2.aiff $2.mp3
else
    echo "Invalid argument. Please use 'en' for English or 'de' for German."
fi

rm -f $2.aiff
