import argparse
import PyPDF2
import re
from collections import Counter
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import tempfile
import requests
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from tqdm import tqdm
import json
from textblob import TextBlob
from colorama import init, Fore, Style

# Initialize colorama for cross-platform colored output
init()

# Download necessary NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

def print_welcome_message():
    welcome_text = f"""
{Fore.CYAN}╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   {Fore.YELLOW}Welcome to YahPDF Command Line Tool{Fore.CYAN}                                   ║
║   Designed to give you more attention to handling your PDFs.              ║
║                                                                           ║
║   {Fore.GREEN}Credited to Yahya Abulhaj{Fore.CYAN}                                              ║
║   A DevOps Engineer in the Qatari FinTech industry as of this code.       ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝{Style.RESET_ALL}
"""
    print(welcome_text)

def print_available_flags():
    flags = [
        ("--word-count", "Get word count"),
        ("--unique-words", "Get unique word count"),
        ("--common-words N", "Get N most common words"),
        ("--include-stopwords", "Include stopwords in analysis"),
        ("--extract-text", "Extract text to file"),
        ("--word-cloud", "Generate word cloud"),
        ("--extract-emails", "Extract email addresses"),
        ("--sentiment", "Analyze sentiment"),
        ("--json", "Output results in JSON format"),
        ("--pages RANGE", "Specify pages to analyze (e.g., '1-5,7,9-12')")
    ]

    print(f"{Fore.YELLOW}Available flags:{Style.RESET_ALL}")
    for flag, description in flags:
        print(f"{Fore.GREEN}{flag:<20}{Fore.CYAN}{description}{Style.RESET_ALL}")

def download_pdf(url):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        response = requests.get(url)
        temp_file.write(response.content)
        return temp_file.name

def parse_page_range(page_range, total_pages):
    pages = set()
    for part in page_range.split(','):
        if '-' in part:
            start, end = map(int, part.split('-'))
            pages.update(range(start, min(end + 1, total_pages + 1)))
        else:
            page = int(part)
            if 1 <= page <= total_pages:
                pages.add(page)
    return sorted(pages)

def extract_text(pdf_path, page_range=None):
    if pdf_path.startswith('http://') or pdf_path.startswith('https://'):
        temp_file_path = download_pdf(pdf_path)
        file_path = temp_file_path
    else:
        file_path = pdf_path

    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        total_pages = len(reader.pages)
        
        if page_range:
            pages_to_extract = parse_page_range(page_range, total_pages)
        else:
            pages_to_extract = range(1, total_pages + 1)

        text = ""
        for page_num in tqdm(pages_to_extract, desc="Extracting text", colour="blue"):
            page = reader.pages[page_num - 1]  # PyPDF2 uses 0-based indexing
            text += page.extract_text()

    if pdf_path.startswith('http://') or pdf_path.startswith('https://'):
        os.unlink(temp_file_path)

    return text

def simple_tokenize(text):
    return re.findall(r'\b\w+\b', text.lower())

def get_word_count(text):
    words = simple_tokenize(text)
    return len(words)

def get_unique_word_count(text):
    words = simple_tokenize(text)
    return len(set(words))

def get_most_common_words(text, n=10):
    words = simple_tokenize(text)
    return Counter(words).most_common(n)

def generate_word_cloud(text):
    wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.tight_layout(pad=0)
    plt.savefig('wordcloud.png')
    print("Word cloud saved as 'wordcloud.png'")

def extract_emails(text):
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.findall(email_pattern, text)

def extract_urls(text):
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, text)
    if urls:
        return urls
    else:
        return ["No URLs found in the document."]

def analyze_sentiment(text):
    blob = TextBlob(text)
    return blob.sentiment.polarity

def main():
    print_welcome_message()
    print_available_flags()

    parser = argparse.ArgumentParser(description="Advanced PDF CLI Tool")
    parser.add_argument("pdf_path", help="Path to the PDF file or URL")
    parser.add_argument("--word-count", action="store_true", help="Get word count")
    parser.add_argument("--unique-words", action="store_true", help="Get unique word count")
    parser.add_argument("--common-words", type=int, metavar="N", help="Get N most common words")
    parser.add_argument("--include-stopwords", action="store_true", help="Include stopwords in analysis")
    parser.add_argument("--extract-text", action="store_true", help="Extract text to file")
    parser.add_argument("--word-cloud", action="store_true", help="Generate word cloud")
    parser.add_argument("--extract-emails", action="store_true", help="Extract email addresses")
    parser.add_argument("--extract-urls", action="store_true", help="Extract URLs")
    parser.add_argument("--sentiment", action="store_true", help="Analyze sentiment")
    parser.add_argument("--json", action="store_true", help="Output results in JSON format")
    parser.add_argument("--pages", type=str, help="Specify pages to analyze (e.g., '1-5,7,9-12')")
    args = parser.parse_args()

    if not any(vars(args).values()):
        parser.print_help()
        return

    try:
        text = extract_text(args.pdf_path, args.pages)
    except FileNotFoundError:
        print(f"{Fore.RED}Error: The file '{args.pdf_path}' was not found.{Style.RESET_ALL}")
        return
    except PyPDF2.errors.PdfReadError:
        print(f"{Fore.RED}Error: '{args.pdf_path}' is not a valid PDF file or is encrypted.{Style.RESET_ALL}")
        return
    except requests.exceptions.RequestException:
        print(f"{Fore.RED}Error: Unable to download the PDF from '{args.pdf_path}'.{Style.RESET_ALL}")
        return

    results = {}

    if args.word_count:
        word_count = get_word_count(text)
        results["word_count"] = word_count
        print(f"{Fore.GREEN}Word count:{Style.RESET_ALL} {word_count}")

    if args.unique_words:
        unique_word_count = get_unique_word_count(text)
        results["unique_word_count"] = unique_word_count
        print(f"{Fore.GREEN}Unique word count:{Style.RESET_ALL} {unique_word_count}")

    if args.common_words:
        common_words = get_most_common_words(text, args.common_words)
        results["common_words"] = dict(common_words)
        print(f"{Fore.GREEN}{args.common_words} most common words:{Style.RESET_ALL}")
        for word, count in common_words:
            print(f"{word}: {count}")

    if args.extract_text:
        with open("extracted_text.txt", "w", encoding="utf-8") as file:
            file.write(text)
        print(f"{Fore.GREEN}Text extracted to 'extracted_text.txt'{Style.RESET_ALL}")

    if args.word_cloud:
        generate_word_cloud(text)

    if args.extract_emails:
        emails = extract_emails(text)
        results["emails"] = emails
        print(f"{Fore.GREEN}Extracted email addresses:{Style.RESET_ALL}")
        for email in emails:
            print(email)

    if args.sentiment:
        sentiment_score = analyze_sentiment(text)
        results["sentiment"] = sentiment_score
        print(f"{Fore.GREEN}Sentiment score:{Style.RESET_ALL} {sentiment_score}")

    if args.json:
        print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()