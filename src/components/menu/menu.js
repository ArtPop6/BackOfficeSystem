/* *
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuData示例：
 * [
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  },
 *  {
 *    title: '菜单标题',
 *    icon: '菜单图标',
 *    path`: '菜单路由',
 *    invisible: 'boolean, 是否不可见',
 *    children: [子菜单配置]
 *  }
 * ]
 * */
const originMenu = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'home',
    key: '1',
    invisible: false
  },
  // {
  //   name: '工具',
  //   path: '/tool',
  //   icon: 'icon2',
  //   key: '4',
  // },
  // {
  //   name: '会员卡',
  //   path: '/card',
  //   icon: 'icon3',
  //   key: '7',
  // },
  {
    name: '门店管理',
    path: '/store',
    icon: 'shop',
    key: '12',
    invisible: false
  },
  // {
  //   name: '订单',
  //   path: '/order',
  //   icon: 'icon5',
  //   key: '20',
  // },
  {
    name: '客户管理',
    path: '/custom',
    icon: 'team',
    key: '23',
    invisible: false
  },

  {
    name: '权限管理',
    icon: 'unlock',
    key: '24',
    invisible: false,
    children: [
      {
        name: '成员管理',
        path: '/authority/member',
        icon: 'team',
        key: '25',
        invisible: false
      },
      {
        name: '角色管理',
        path: '/authority/role',
        icon: 'team',
        key: '26',
        invisible: false
      }
    ]
  },
  {
    name: '运营报表',
    icon: 'database',
    key: '54',
    invisible: false,
    children: [
      {
        name: '私教上课记录',
        path: '/report/course/log',
        icon: 'solution',
        key: '55',
        invisible: false
      }
    ]
  },
  {
    name: '团课管理',
    icon: 'book',
    key: '56',
    invisible: true,
    children: [
      {
        name: '课程列表',
        path: '/class/curriculums',
        icon: 'team',
        key: '57',
        invisible: true
      },
      {
        name: '团课课表',
        path: '/class/league',
        icon: 'team',
        key: '58',
        invisible: true
      },
      {
        name: '操房管理',
        path: '/class/operating',
        icon: 'team',
        key: '59',
        invisible: true
      },
      {
        name: '课包管理',
        path: '/class/pack',
        icon: 'team',
        key: '60',
        invisible: true
      },
      {
        name: '预约列表',
        path: '/class/make',
        icon: 'team',
        key: '61',
        invisible: true
      }
    ]
  }
]

export default originMenu
