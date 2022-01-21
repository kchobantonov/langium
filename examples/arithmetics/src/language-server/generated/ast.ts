/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, Reference, isAstNode } from 'langium';

export interface AbstractDefinition extends AstNode {
    readonly $container: Definition | Module;
    name: string
}

export const AbstractDefinition = 'AbstractDefinition';

export function isAbstractDefinition(item: unknown): item is AbstractDefinition {
    return reflection.isInstance(item, AbstractDefinition);
}

export interface Expression extends AstNode {
    readonly $container: BinaryExpression | Definition | Evaluation | FunctionCall;
}

export const Expression = 'Expression';

export function isExpression(item: unknown): item is Expression {
    return reflection.isInstance(item, Expression);
}

export interface Module extends AstNode {
    name: string
    statements: Array<Statement>
}

export const Module = 'Module';

export function isModule(item: unknown): item is Module {
    return reflection.isInstance(item, Module);
}

export interface Statement extends AstNode {
    readonly $container: Definition | Module;
}

export const Statement = 'Statement';

export function isStatement(item: unknown): item is Statement {
    return reflection.isInstance(item, Statement);
}

export interface XType extends AstNode {
    name: string
}

export const XType = 'XType';

export function isXType(item: unknown): item is XType {
    return reflection.isInstance(item, XType);
}

export interface DeclaredParameter extends AbstractDefinition {
}

export const DeclaredParameter = 'DeclaredParameter';

export function isDeclaredParameter(item: unknown): item is DeclaredParameter {
    return reflection.isInstance(item, DeclaredParameter);
}

export interface Definition extends Statement, AbstractDefinition {
    args: Array<DeclaredParameter>
    expr: Expression
}

export const Definition = 'Definition';

export function isDefinition(item: unknown): item is Definition {
    return reflection.isInstance(item, Definition);
}

export interface BinaryExpression extends Expression {
    left: Expression
    operator: '*' | '+' | '-' | '/'
    right: Expression
}

export const BinaryExpression = 'BinaryExpression';

export function isBinaryExpression(item: unknown): item is BinaryExpression {
    return reflection.isInstance(item, BinaryExpression);
}

export interface FunctionCall extends Expression {
    args: Array<Expression>
    func: Reference<AbstractDefinition>
}

export const FunctionCall = 'FunctionCall';

export function isFunctionCall(item: unknown): item is FunctionCall {
    return reflection.isInstance(item, FunctionCall);
}

export interface NumberLiteral extends Expression {
    value: number
}

export const NumberLiteral = 'NumberLiteral';

export function isNumberLiteral(item: unknown): item is NumberLiteral {
    return reflection.isInstance(item, NumberLiteral);
}

export interface Evaluation extends Statement {
    expression: Expression
}

export const Evaluation = 'Evaluation';

export function isEvaluation(item: unknown): item is Evaluation {
    return reflection.isInstance(item, Evaluation);
}

export type ArithmeticsAstType = 'AbstractDefinition' | 'Expression' | 'Module' | 'Statement' | 'XType' | 'DeclaredParameter' | 'Definition' | 'BinaryExpression' | 'FunctionCall' | 'NumberLiteral' | 'Evaluation';

export type ArithmeticsAstReference = 'FunctionCall:func';

export class ArithmeticsAstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['AbstractDefinition', 'Expression', 'Module', 'Statement', 'XType', 'DeclaredParameter', 'Definition', 'BinaryExpression', 'FunctionCall', 'NumberLiteral', 'Evaluation'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case DeclaredParameter: {
                return this.isSubtype(AbstractDefinition, supertype);
            }
            case Definition: {
                return this.isSubtype(Statement, supertype) || this.isSubtype(AbstractDefinition, supertype);
            }
            case BinaryExpression:
            case FunctionCall:
            case NumberLiteral: {
                return this.isSubtype(Expression, supertype);
            }
            case Evaluation: {
                return this.isSubtype(Statement, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(referenceId: ArithmeticsAstReference): string {
        switch (referenceId) {
            case 'FunctionCall:func': {
                return AbstractDefinition;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
}

export const reflection = new ArithmeticsAstReflection();
