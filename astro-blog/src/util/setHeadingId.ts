const setHeadingId = (body: string) => {
    let headingCount = 1;
    return body.replace(/<h([1-3]{1})>/g, (_, headingNum: string) => {
        return `<h${headingNum} id="content-h-${headingCount++}">`;
    });
}

export default setHeadingId;