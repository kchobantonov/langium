/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import * as langium from 'langium';
import { CompositeGeneratorNode, GeneratorNode, NL, stream } from 'langium';
import fs from 'fs-extra';
import path from 'path';

let start = process.hrtime();

export function elapsedTime(): string {
    const elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    start = process.hrtime(); // reset the timer
    return elapsed.toFixed();
}

function getLangiumCliVersion(): string {
    const ownPackagePath = path.join(__dirname, '..', '..', 'package.json');
    const pack = fs.readJsonSync(ownPackagePath, { encoding: 'utf-8' });
    return pack.version;
}

function getGeneratedHeader(): GeneratorNode {
    const node = new CompositeGeneratorNode();
    node.contents.push(
        '/******************************************************************************', NL,
        ` * This file was generated by langium-cli ${cliVersion}.`, NL,
        ' * DO NOT EDIT MANUALLY!', NL,
        ' ******************************************************************************/', NL, NL
    );
    return node;
}

export function collectKeywords(grammar: langium.Grammar): string[] {
    const keywords = new Set<string>();

    for (const rule of stream(grammar.rules).filterType(langium.isParserRule)) {
        collectElementKeywords(rule.alternatives, keywords);
    }

    return Array.from(keywords).sort((a, b) => a.localeCompare(b));
}

function collectElementKeywords(element: langium.AbstractElement, keywords: Set<string>) {
    if (langium.isAlternatives(element) || langium.isGroup(element) || langium.isUnorderedGroup(element)) {
        for (const item of element.elements) {
            collectElementKeywords(item, keywords);
        }
    } else if (langium.isAssignment(element)) {
        collectElementKeywords(element.terminal, keywords);
    } else if (langium.isKeyword(element)) {
        keywords.add(element.value);
    }
}

export const cliVersion = getLangiumCliVersion();
export const generatedHeader = getGeneratedHeader();
export const schema = fs.readJsonSync(path.join(__dirname, '../../schema.json'), { encoding: 'utf-8' });
