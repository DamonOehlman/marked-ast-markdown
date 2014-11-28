# marked-ast-markdown

This is a simple module that takes a [marked-ast](https://github.com/pdubroy/marked-ast) parsed Abstract Syntax Tree and generates markdown output.

<!-- BADGES -->

## Why?

You may be wondering why you would do this.  In my case, I wanted to parse a markdown document (specifically a `README.md` file) and parse the file and then modify the document in some way.  Rather than attempt to parse markdown from source each time and make text modifications it made much more sense to work with an AST as you would if you were modifying JS code.  This package provides the ability to generate a markdown file again, once those modifications have been made.

## Example Usage

## LICENSE
