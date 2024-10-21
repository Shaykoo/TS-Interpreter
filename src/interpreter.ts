import { Parser, ASTNode } from './parser';

export class Interpreter {
  private parser: Parser;

  constructor(parser: Parser) {
    this.parser = parser;
  }

  public visit(node: ASTNode): number {
    if (node.type === 'Number') {
      return parseInt(node.value);
    }

    if (node.type === 'Addition') {
        //Recursion
      return this.visit(node.left!) + this.visit(node.right!);
    }

    if (node.type === 'Subtraction') {
      return this.visit(node.left!) - this.visit(node.right!);
    }

    throw new Error(`Unknown node type: ${node.type}`);
  }

  public interpret(): number {
    const tree = this.parser.expr();
    return this.visit(tree);
  }
}
