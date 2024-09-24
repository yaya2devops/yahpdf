# Basic usage
yahpdf dao.pdf --word-count

# Get unique word count
yahpdf dao.pdf --unique-words

# Get 10 most common words
yahpdf dao.pdf --common-words 10

# Extract text to a file
yahpdf dao.pdf --extract-text

# Generate a word cloud
yahpdf dao.pdf --word-cloud

# Turn to JSON

yahpdf dao.pdf --word-count --unique-words --common-words 5 --json

# Get Sentiment

yahpdf dao.pdf --sentiment

# Extract email addresses
yahpdf dao.pdf --extract-emails

# Get word count page specific

yahpdf dao.pdf --word-count --pages "1-3,5"

# Combine multiple operations
yahpdf dao.pdf --word-count --unique-words --common-words 5 --extract-text --word-cloud --extract-emails

# Get help
yahpdf --help

# Version information
yahpdf --version