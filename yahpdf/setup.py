from setuptools import setup, find_packages
from pathlib import Path

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setup(
    name="yahpdf",
    version="0.2.0",
    author="Yahya Abulhaj",
    author_email="dev@yahya-abulhaj.dev",
    description="A CLI tool for analyzing PDF files",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yaya2devops/yahpdf",
    packages=find_packages(),
    install_requires=[
        "PyPDF2",
        "matplotlib",
        "wordcloud",
        "requests",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    entry_points={
        "console_scripts": [
            "yahpdf=yahpdf.pdf_tool:main",
        ],
    },
    python_requires=">=3.6",
)