from setuptools import setup, find_packages

setup(
    name="pdf-cli-tool",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "PyPDF2",
        "nltk",
        "matplotlib",
        "wordcloud",
    ],
    entry_points={
        "console_scripts": [
            "pdf-tool=pdf_tool:main",
        ],
    },
)