import Layout from 'src/pages/layout'
import RouteView from 'src/layouts/RouteView'
import DashBoard from 'src/pages/dashboard/WorkPlace'
import NotFound from 'src/pages/exception/404'
import NotPermit from 'src/pages/exception/403'
import ServerError from 'src/pages/exception/500'
import CustomerAdd from 'src/pages/customer/Add'
import CustomerList from 'src/pages/customer/List'
import Member from 'src/pages/member/List'
import Role from 'src/pages/role/List'
import CardList from 'src/pages/card/List'
import StoreList from 'src/pages/store/List'
import StoreAdd from 'src/pages/store/Add'
import StoreEdit from 'src/pages/store/Edit'
import StoreView from 'src/pages/store/View'
import OrderList from 'src/pages/order/List'
import UserAdd from 'src/pages/user/Add'
import ReportPTCourseLog from 'src/pages/report/ReportPTCourseLog'
import Curriculums from 'src/pages/curriculums/List'
import CourseAdd from 'src/pages/curriculums/Adds'
import League from 'src/pages/league/List'
import EditClass from 'src/pages/league/Edit'
import Operating from 'src/pages/operating/List'
import Pack from 'src/pages/pack/List'
import AddPack from 'src/pages/pack/Add'
import PackDetail from 'src/pages/pack/Detail'
import OperaAdd from 'src/pages/operating/Add'
import Make from 'src/pages/make/List'
import CheckList from 'src/pages/make/CheckList'

const routes = [
  {
    name: 'index',
    path: '',
    redirect: '/login'
  },
  {
    name: 'Layout',
    path: '',
    component: Layout,
    redirect: '/login',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: DashBoard
      },

      {
        name: 'customer',
        path: '/customer',
        component: CustomerAdd,
        children: [
          {
            name: 'customerAdd',
            path: '/customer/add',
            component: CustomerAdd
          }
        ]
      },

      {
        name: 'tool',
        path: '/tool',
        component: CustomerAdd
      },

      {
        name: 'card',
        path: '/card',
        component: CardList
      },

      {
        name: 'store',
        path: '/store',
        component: StoreList
      },

      {
        name: 'storeAdd',
        path: '/store/add',
        component: StoreAdd
      },

      {
        name: 'StoreEdit',
        path: '/store/edit/:id',
        component: StoreEdit
      },

      {
        name: 'StoreView',
        path: '/store/view/:id',
        component: StoreView
      },

      {
        name: 'order',
        path: '/order',
        component: OrderList
      },

      {
        name: 'custom',
        path: '/custom',
        component: CustomerList
      },

      {
        name: 'userAdd',
        path: '/user/add',
        component: UserAdd
      },

      {
        name: 'member',
        path: '/authority/member',
        component: Member
      },

      {
        name: 'role',
        path: '/authority/role',
        component: Role
      },
      {
        name: 'curriculums',
        path: '/class/curriculums',
        component: Curriculums
      },
      {
        name: 'courseAdd',
        path: '/class/adds',
        component: CourseAdd
      },
      {
        name: 'operaAdd',
        path: '/class/add',
        component: OperaAdd
      },
      {
        name: 'league',
        path: '/class/league',
        component: League
      },
      {
        name: 'editClass',
        path: '/class/league/edit',
        component: EditClass
      },
      {
        name: 'operating',
        path: '/class/operating',
        component: Operating
      },
      {
        name: 'pack',
        path: '/class/pack',
        component: Pack
      },
      {
        name: 'addPack',
        path: '/class/pack/add',
        component: AddPack
      },
      {
        name: 'packDetail',
        path: '/class/pack/detail',
        component: PackDetail
      },
      {
        name: 'make',
        path: '/class/make',
        component: Make
      },
      {
        name: 'checkList',
        path: '/class/make/list',
        component: CheckList
      },
      {
        name: 'reportCourseLog',
        path: '/report/course/log',
        component: ReportPTCourseLog
      },
      {
        path: '/exception',
        name: '异常页',
        component: RouteView,
        children: [
          {
            path: '/exception/404',
            name: '404',
            component: NotFound
          },
          {
            path: '/exception/403',
            name: '403',
            component: NotPermit
          },
          {
            path: '/exception/500',
            name: '500',
            component: ServerError
          }
        ]
      }
    ]
  }
]

export default routes
