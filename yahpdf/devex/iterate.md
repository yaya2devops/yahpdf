# Steps for Incremental Changes to PyPI Package

1. Update version number:
   - Edit `yahpdf/__init__.py`:
     ```python
     __version__ = "X.Y.Z"
     ```
   - Edit `setup.py`:
     ```python
     setup(
         name="yahpdf",
         version="X.Y.Z",
         # ... rest of the configuration ...
     )
     ```

2. Make desired changes to package files (e.g., README.md, source code).

3. Clean old distribution files:
   ```bash
   rm -rf dist build yahpdf.egg-info
   ```

4. Rebuild distribution files:
   ```bash
   python setup.py sdist bdist_wheel
   ```

5. Upload new version to PyPI:
   ```bash
   twine upload dist/*
   ```
   - Use "__token__" as username
   - Use PyPI API token as password

6. Verify update on PyPI:
   - Check project page: https://pypi.org/project/yahpdf/
   - Install new version: `pip install yahpdf==X.Y.Z`

7. If upload issues occur, use verbose flag:
   ```bash
   twine upload --verbose dist/*
   ```

Note: Replace X.Y.Z with the appropriate version number for each update.