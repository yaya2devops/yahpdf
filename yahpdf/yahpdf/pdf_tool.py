import argparse
import PyPDF2
import re
from collections import Counter
import matplotlib.pyplot as plt
from wordcloud import WordCloud

def extract_text(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
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

def main():
    parser = argparse.ArgumentParser(description="PDF CLI Tool")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("--word-count", action="store_true", help="Get word count")
    parser.add_argument("--unique-words", action="store_true", help="Get unique word count")
    parser.add_argument("--common-words", type=int, metavar="N", help="Get N most common words")
    parser.add_argument("--extract-text", action="store_true", help="Extract text to file")
    parser.add_argument("--word-cloud", action="store_true", help="Generate word cloud")
    parser.add_argument("--extract-emails", action="store_true", help="Extract email addresses")

    args = parser.parse_args()

    try:
        text = extract_text(args.pdf_path)
    except FileNotFoundError:
        print(f"Error: The file '{args.pdf_path}' was not found.")
        return
    except PyPDF2.errors.PdfReadError:
        print(f"Error: '{args.pdf_path}' is not a valid PDF file or is encrypted.")
        return

    if args.word_count:
        print(f"Word count: {get_word_count(text)}")

    if args.unique_words:
        print(f"Unique word count: {get_unique_word_count(text)}")

    if args.common_words:
        print(f"{args.common_words} most common words:")
        for word, count in get_most_common_words(text, args.common_words):
            print(f"{word}: {count}")

    if args.extract_text:
        with open("extracted_text.txt", "w", encoding="utf-8") as file:
            file.write(text)
        print("Text extracted to 'extracted_text.txt'")

    if args.word_cloud:
        generate_word_cloud(text)

    if args.extract_emails:
        emails = extract_emails(text)
        print("Extracted email addresses:")
        for email in emails:
            print(email)

if __name__ == "__main__":
    main()