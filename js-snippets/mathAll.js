function isRemoteLink(link) {
  return /^(https?|vscode-webview-resource|javascript):/.test(link);
}

function formatHTMLWebviewResourcesUrl(html, conversionUrlFn) {
  const LinkRegexp = /\s?(?:src|href)=('|")(.*?)\1/gi;
  let matcher = LinkRegexp.exec(html);

  while (matcher) {
    const origin = matcher[0];
    const originLen = origin.length;
    const link = matcher[2];
    if (!isRemoteLink(link)) {
      let resourceLink = link;
      try {
        resourceLink = conversionUrlFn(link);
        html =
          html.substring(0, matcher.index) +
          origin.replace(link, resourceLink) +
          html.substring(matcher.index + originLen);
      } catch (err) {
        console.error(err);
      }
    }
    matcher = LinkRegexp.exec(html);
  }
  return html;
}

function refactorFormatHTMLWebviewResourcesUrl(html, conversionUrlFn) {
  const LinkRegexp = /\s?(?:src|href)=('|")(.*?)\1/gi;
  let matcher = html.matchAll(LinkRegexp);
  for (let mat of matcher) {
    const link = mat[2];
    if (!isRemoteLink(link)) {
      let resourceLink = link;
      try {
        resourceLink = conversionUrlFn(link);

        html = html.replace(link, resourceLink);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return html;
}

const res = formatHTMLWebviewResourcesUrl(
  '<!--html1--><script src="scripts/test1.js"></script>',
  (link) => {
    return 'giscafer/' + link;
  }
);
console.log(res);

const res1 = refactorFormatHTMLWebviewResourcesUrl(
  '<!--html2--><img src="assets/logo.png"/><script src="scripts/test2.js"></script>',
  (link) => {
    return 'giscafer/' + link;
  }
);
console.log(res1);
