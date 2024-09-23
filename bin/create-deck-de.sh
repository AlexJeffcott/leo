#!/usr/bin/env bash

# chmod +x bin/create-deck-de.sh

input_file="data/de"
output_file="src/assets/decks/de.json"

# Initialize JSON structure
json='{
    "id": "000002",
    "title": "deutsch",
    "lang": "de",
    "preQuestionText": "Wie schreibt man",
    "postQuestionText": "?",
    "questions": [
'

# Initialize question ID counter
counter=1

# Read the input file line by line
while IFS='|' read -r word sentence; do
    # Format the question ID
    question_id=$(printf "%06d" $counter)
    
    # Append the question to the JSON structure
    json+='        {
            "id": "'"$question_id"'",
            "text": "'"$word"'",
            "example": "'"$sentence"'",
            "answers": ["'"$word"'"]
        },'

    # Increment the counter
    counter=$((counter + 1))
done < "$input_file"

# Remove the trailing comma from the last question
json=${json%,}

# Close the JSON structure
json+='
    ]
}'

# Write the JSON to the output file
echo "$json" > "$output_file"

echo "JSON file has been created at $output_file"
