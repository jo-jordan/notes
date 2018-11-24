module.exports = {
  title: 'Notes',
  description: 'Stay foolish stay hungry',
  head: [
    ['link', { rel: 'icon', href: '/avatar.jpeg' }]
  ],
  // evergreen: true,
  themeConfig: {
    repo: 'https://github.com/lzjlxebr/notes',
    lastUpdated: '上次更新',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { text: 'OP1', link: '/es5/' },
      { text: 'OP2', link: '/es6/' },
    ],
    sidebarDepth: 1,
    sidebar: [
      {
        title: 'webapi',
        children: [
          '/webapi/canvas'
        ]
      }, {
        title: 'Other',
        children: [
          '/other/koa2',
          '/other/vuex',
          '/other/gitignore',
          '/other/interview',
        ]
      },
    ],
  }
}
