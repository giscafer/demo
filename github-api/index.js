const GitHub = require('github-api');
const fs = require('fs-extra');
const dayjs = require('dayjs');
const gh = new GitHub();

// test fetch issue
const issueInstance = gh.getIssues('LeekHub', 'leek-fund');

issueInstance.listIssues({ creator: 'giscafer' }).then(({ data }) => {
  console.log('issues count=', data.length);
  const content = generateMdx(data[0]);
  for (const item of data) {
    try {
      const fileName = item.title.replace(/\//g, '&');
      // fs.writeFileSync(`./md/${fileName}.mdx`, content);
      console.log('====================================');
      console.log(item.title, 'success');
      console.log('====================================');
    } catch (error) {
      console.log(error);
    }
  }
});

function generateMdx(issue) {
  const { title, labels, created_at, body } = issue;
  return `---
  title: ${title}
  publishedAt: ${dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}
  summary: ${title}
  tags: ${labels.map((item) => item.name).join(',')}
---

${body}
`;
}
