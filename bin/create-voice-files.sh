#!/usr/bin/env bash

# chmod +x bin/create-voice-files.sh

set -eo pipefail

cd src/assets/audio

while IFS='|' read -r word sentence; do
    if [ -f "$word.mp3" ]; then
        # Skip if file exists
        continue
    fi
    say --voice="Jamie (Premium)" "$word. $sentence. $word" -o "$word.aiff"
    lame -m m "$word.aiff" "$word.mp3"
    rm -f "$word.aiff"
done < ../../../data/en

while IFS='|' read -r word sentence; do
    if [ -f "$word.mp3" ]; then
        # Skip if file exists
        continue
    fi
    say --voice="Anna (Premium)" "$word. $sentence. $word" -o "$word.aiff"
    lame -m m "$word.aiff" "$word.mp3"
    rm -f "$word.aiff"
done < ../../../data/de
