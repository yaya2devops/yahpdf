

[yahpdf](https://github.com/yaya2devops/yahpdf) is a command-line tool for analyzing PDF files. It provides functionality for word counting, text extraction, word cloud generation, and more.

## Installation

You can install yahpdf using pip:

```
pip install yahpdf
```

## Usage

After installation, you can use yahpdf from the command line:

```
yahpdf path/to/your/dao.pdf [OPTIONS]
```

Available options:

- `--word-count`: Get the total word count
- `--unique-words`: Get the count of unique words
- `--common-words N`: Get the N most common words
- `--extract-text`: Extract text to a dao
- `--word-cloud`: Generate a word cloud image
- `--extract-emails`: Extract email addresses from the PDF

Example:

```
yahpdf document.pdf --word-count --common-words 10
```

## Development

To set up the development environment:

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
4. Install development dependencies: `pip install -r requirements.txt`

## License

This project is licensed under the MIT License - see the LICENSE file for details.