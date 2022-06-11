import Vue from 'vue'
//导入elment使用组件
import {
  Divider,
  CheckboxGroup,
  Tag,
  Link,
  Upload,
  Checkbox,
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Select,
  Option,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tabs,
  TabPane,
  Radio,
  RadioGroup,
  RadioButton,
  Tree,
  ButtonGroup,
  Footer,
  // Page,
  PageHeader,
  Avatar,
  DatePicker,
  InputNumber,
  Image,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Progress,
  Step,
  Steps



} from 'element-ui'
//导入弹窗提示组件



// 注册为全局组件
import {
  Message
} from 'element-ui'
Vue.use(Divider)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tree)
Vue.use(ButtonGroup)
Vue.use(Footer)
Vue.use(Avatar)
Vue.use(DatePicker)
Vue.use(InputNumber)
Vue.use(Image)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Progress)
Vue.use(Upload)
Vue.use(Link)
Vue.use(Tag)
Vue.use(CheckboxGroup)
//挂载到Vue原型对象 可以再任何地方 $出来
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
