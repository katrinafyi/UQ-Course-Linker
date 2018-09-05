// ==UserScript==
// @name        UQ Course Linker
// @author      Kenton Lam
// @description Makes course codes links.
// @match       https://my.uq.edu.au/programs-courses/course.html?course_code=*
// @version     0.1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

function createCourseLink(courseCode: string): HTMLElement {
    let a = document.createElement('a');
    a.href = "/programs-courses/course.html?course_code="+courseCode;
    a.textContent = courseCode;
    return a;
}

const courseCodeRegex = /[A-Z]{4}[0-9]{4}[A-Z]?/g;
function replaceCourseCodes(element: HTMLElement): HTMLElement  {
    let newElements = [];
    let prevIndex = 0;
    let text = element.textContent;

    let match = courseCodeRegex.exec(text);
    while (match != null) {
        newElements.push(document.createTextNode(
            text.substr(prevIndex, match.index-prevIndex)
        ));
        newElements.push(createCourseLink(match[0]));
        prevIndex = match.index + match[0].length;
        match = courseCodeRegex.exec(text);
    }

    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }

    for (const newChild of newElements) {
        element.appendChild(newChild);
    }

    return element;
}

function main(): void {
    let elementIds = [
        'course-prerequisite',
        'course-companion',
        'course-incompatible'
    ];

    for (const id of elementIds) {
        let elem = document.getElementById(id);
        if (elem != null) {
            replaceCourseCodes(elem);
        }
    }
}

main();