import { Tokenizer } from './tokenizer.js';
import { Parser } from './parser.js';
import { Interpreter } from './interpreter.js';

const input = '9 + 2 - 17';
const tokenizer = new Tokenizer(input);
const parser = new Parser(tokenizer);
const interpreter = new Interpreter(parser);

const result = interpreter.interpret();
console.log(result);
