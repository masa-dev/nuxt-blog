const title = 'My blog'

const config = {
  title: title,
  meta: {
    titleTemplate: '%s | ' + title,
  },
  top: {
    postLimit: 6,
    noteLimit: 6,
  },
  post: {
    limit: 10,
  },
  note: {
    limit: 20,
  },
  tag: {},
}

export default config
