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

// https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function scrapeCourseName(courseCode: string, callback: Function): void {
    let iframe = document.createElement('iframe');
    iframe.addEventListener('load', function() {
        let iframeDoc = iframe.contentDocument;
        callback(iframeDoc.getElementById('course-title').textContent.replace(' ('+courseCode+')', ''));
    });
    iframe.src = 'https://my.uq.edu.au/programs-courses/course.html?course_code='+courseCode;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
}

function setCourseName(courseCode: string, callback: Function): void {
    let name = localStorage[courseCode];
    if (name !== undefined)
        callback(name);
    else {
        scrapeCourseName(courseCode, function(name_) {
            localStorage[courseCode] = name_;
            callback(name_);
        });
    }
}

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
        let link = createCourseLink(match[0]);
        newElements.push(link);
        setCourseName(match[0], function(name) {
            link.title = name;
        });
        prevIndex = match.index + match[0].length;
        match = courseCodeRegex.exec(text);
    }

    if (prevIndex < text.length) {
        newElements.push(document.createTextNode(
            text.substr(prevIndex, text.length-prevIndex)
        ));
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
    if (inIframe())
        return;

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