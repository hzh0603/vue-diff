import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'


// const vnode = h('h1', {}, 'patch函数处理');
// const vnode = h('ul', {},
//  [
//      h('li', {}, 'A'),
//      h('li', {}, 'B'),
//      h('li', {}, 'C'),
// ]);

const vnode = h('p', {}, h('span', {}, "patch函数处理"));
const container = document.getElementById('container')
patch(container, vnode)