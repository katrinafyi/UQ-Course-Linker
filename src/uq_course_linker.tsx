// ==UserScript==
// @name        UQ Course Linker
// @author      Kenton Lam
// @description Makes course codes links.
// @match       https://my.uq.edu.au/programs-courses/learn.uq.edu.au/*
// @version     0.1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

import * as React from 'react';

const courseCodeRegex = /[A-Z]{4}[0-9]{4}[A-Z]?/g;
function replaceCourseCodes(element: HTMLElement): JSX.Element  {
    return <div>a</div>;
}

function main(): void {
    let elementIds = [
        'course-prerequisite',
        'course-companion',
        'course-incompatible'
    ];

    let elementsContainingCodes: HTMLElement[] = [];
    for (const id of elementIds) {
        let elem = document.getElementById(id);
        if (elem != null) {
            elementsContainingCodes.push(elem);
        }
    }

    for (const e of elementsContainingCodes) {
        replaceCourseCodes(e);
    }
}

main();