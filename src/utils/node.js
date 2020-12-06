export default class Node {
  constructor(parent, data, children = []) {
    if (typeof data === 'string') {
      this.text = data
    } else {
      for (const [key, value] of Object.entries(data)) {
        this[key] = value
      }
      this.children = children
    }
    this.parent = parent
  }
}
