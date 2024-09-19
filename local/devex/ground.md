# Basic usage - Get word count
python pdf_tool.py dao.pdf --word-count

# Get unique word count
python pdf_tool.py dao.pdf --unique-words

# Get 10 most common words
python pdf_tool.py dao.pdf --common-words 10

# Extract text to a file
python pdf_tool.py dao.pdf --extract-text

# Generate a word cloud
python pdf_tool.py dao.pdf --word-cloud

# Extract email addresses
python pdf_tool.py dao.pdf --extract-emails

# Combine multiple operations
python pdf_tool.py dao.pdf --word-count --unique-words --common-words 5 --extract-text --word-cloud --extract-emails

# Get help
python pdf_tool.py --help