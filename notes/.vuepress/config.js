module.exports = {
  title: 'Notes',
  description: 'Stay foolish stay hungry',
  head: [
    ['link', { rel: 'icon', href: '/avatar.jpeg' }]
  ],
  host:'140.82.16.16',
  // evergreen: true,
  themeConfig: {
    repo: 'https://github.com/lzjlxebr/notes',
    lastUpdated: '上次更新',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      { text: 'OP1', link: '/Other/activity' },
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
          '/other/activity',
        ]
      },
    ],
  }
}
