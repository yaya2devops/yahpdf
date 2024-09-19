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

# Extract email addresses
yahpdf dao.pdf --extract-emails

# Combine multiple operations
yahpdf dao.pdf --word-count --unique-words --common-words 5 --extract-text --word-cloud --extract-emails

# Get help
yahpdf --help

# Version information
yahpdf --version