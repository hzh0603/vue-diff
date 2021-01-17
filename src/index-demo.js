import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h'; // helper function for creating vnodes
// 创建出patch函数
const patch = init([
    classModule, propsModule, styleModule, eventListenersModule
])
// 创建虚拟节点
const  myVnode1 = h('a', {props: {href: 'http://test.os.cjaipub.com/edu-web/index'}}, '百度');

const myVnode2 = h('div', {}, '我是一个div');

const myVnode3 = h('ul', {}, [
    h('li', '年级'),
    h('li', '班级'),
    h('li', '性别')]);
// 让虚拟节点上树
const container = document.getElementById('container');
// patch(container, myVnode1)
patch(container, myVnode3)
