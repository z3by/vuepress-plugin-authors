const path = require('path')
const spawn = require('cross-spawn')

module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    const authors = getGitAuthors($page._filePath)
    $page.authors = authors
  }
})


function getGitAuthors (filePath) {
  let authors
  try {
    authors = parseInt(spawn.sync(
      'git',
      ['log', '-1', '--format="%an - %ae"', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString('utf-8'))
  } catch (e) { /* do not handle for now */ }
  return authors
}
