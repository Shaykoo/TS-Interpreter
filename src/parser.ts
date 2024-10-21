import { Tokenizer, TokenType, Token } from './tokenizer';

export interface ASTNode {
  type: string;
  value?: any;
  left?: ASTNode;
  right?: ASTNode;
}

export class Parser {
  private tokenizer: Tokenizer;
  private currentToken: Token;

  constructor(tokenizer: Tokenizer) {
    this.tokenizer = tokenizer;
    this.currentToken = this.tokenizer.getNextToken();
  }

  private eat(type: TokenType) {
    if (this.currentToken.type === type) {
      this.currentToken = this.tokenizer.getNextToken();
    } else {
      throw new Error(`Unexpected token: ${this.currentToken.type}`);
    }
  }

  // Grammar rule: expr -> term ((PLUS | MINUS) term)*
  public expr(): ASTNode {
    let node = this.term();

    while (this.currentToken.type === TokenType.Plus || this.currentToken.type === TokenType.Minus) {
      const token = this.currentToken;
      if (token.type === TokenType.Plus) {
        this.eat(TokenType.Plus);
      } else if (token.type === TokenType.Minus) {
        this.eat(TokenType.Minus);
      }

      node = {
        type: token.type === TokenType.Plus ? 'Addition' : 'Subtraction',
        left: node,
        right: this.term(),
      };
    }

    return node;
  }

  // Grammar rule: term -> NUMBER
  public term(): ASTNode {
    const token = this.currentToken;
    this.eat(TokenType.Number);
    return { type: 'Number', value: token.value };
  }
}
