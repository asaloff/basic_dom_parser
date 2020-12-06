const { default: Node } = require("./node")

function parseTag(htmlOpeningTag) {
  const data = {
    type: htmlOpeningTag.match(/\w+/)[0]
  }
  const tagRegex = /([\w-]+)[\s]?=[\s]?['"]([^'"]+)['"]/g
  let attributeToAdd = tagRegex.exec(htmlOpeningTag)
  while (attributeToAdd) {
    const [tag, value] = [attributeToAdd[1], attributeToAdd[2]]
    data[tag] = value
    attributeToAdd = tagRegex.exec(htmlOpeningTag)
  }
  return data
}

const htmlTestString = `<html>
    <head>
      <title>DOM Tutorial</title>
    </head>

    <body>
      <h1>DOM Lesson one</h1>
      <p>Hello world!</p>
      <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"/>
      <div>
        div text before
        <p>p text</p>
        <div>more div text</div>
        div text after
      </div>
    </body>
  </html>`

function parseHTML(htmlString) {
  let tree
  const regex = /(<.*?>)([^<]+)/g
  let match = regex.exec(htmlString)
  let parent
  while (match) {
    const tag = match[1]
    const content = match[2].trim()
    if (!tree) {
      tree = new Node(null, parseTag(tag), content ? [content] : [])
      parent = tree
    } else if (tag.startsWith('</')) {
      parent = parent.parent
      if (content) parent.children.push(new Node(parent, content))
    } else {
      const contentNode = content ? new Node(parent, content) : null
      const node = new Node(parent, parseTag(tag), contentNode ? [contentNode] : [])
      parent.children.push(node)
      if (!tag.endsWith('/>')) parent = node
    }
    match = regex.exec(htmlString)
  }
  return tree
}

function stringifiedTree(tree) {
  const cache = [];
  return JSON.stringify(tree, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return;
      // Store value in our collection
      cache.push(value);
    }
    return value;
  }, 2);
} 

module.exports = {
  parseTag,
  parseHTML,
  htmlTestString,
  stringifiedTree
}

