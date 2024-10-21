export enum TokenType {
    Number,
    Plus,
    Minus,
    EOF,
  }
  
  export interface Token {
    type: TokenType;
    value?: string;
  }
  
  export class Tokenizer {
    private text: string;
    private pos: number;
    private currentChar: string | null;
  
    constructor(text: string) {
      this.text = text;
      this.pos = 0;
      this.currentChar = text.length > 0 ? text[0] : null;
    }
  
    private advance() {
      this.pos++;
      this.currentChar = this.pos < this.text.length ? this.text[this.pos] : null;
    }
  
    private skipWhitespace() {
      while (this.currentChar && /\s/.test(this.currentChar)) {
        this.advance();
      }
    }
  
    private number(): Token {
      let result = '';
      while (this.currentChar && /\d/.test(this.currentChar)) {
        result += this.currentChar;
        this.advance();
      }
      return { type: TokenType.Number, value: result };
    }
  
    public getNextToken(): Token {
      while (this.currentChar !== null) {
        if (/\s/.test(this.currentChar)) {
          this.skipWhitespace();
          continue;
        }
  
        if (/\d/.test(this.currentChar)) {
          return this.number();
        }
  
        if (this.currentChar === '+') {
          this.advance();
          return { type: TokenType.Plus };
        }
  
        if (this.currentChar === '-') {
          this.advance();
          return { type: TokenType.Minus };
        }
  
        throw new Error(`Unexpected character: ${this.currentChar}`);
      }
  
      return { type: TokenType.EOF };
    }
  }
