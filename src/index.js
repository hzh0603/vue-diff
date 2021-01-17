import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

// 第三个参数为string
const vnode = h('h1', {}, 'old没有children，新的有');
// 第三个参数为数组
const vnode2 = h('ul', {},
 [
     h('li', {key: 'A'}, 'A'),
     h('li', {key: 'B'}, 'B'),
     h('li', {key: 'C'}, 'C'),
]);
// 第三个参数为对象
// const vnode = h('p', {}, h('span', {}, "patch函数处理"));
const container = document.getElementById('container');

const vnode3 = h('ul', {},
 [
     h('li', {key: 'A'}, 'A'),
     h('li', {key: 'B'}, 'B'),
     h('li', {key: 'D'}, 'D'),
     h('li', {key: 'E'}, 'E'),
     h('li', {key: 'C'}, 'C'),
]);

const vnode4 = h('ul', {},
 [
     h('li', {key: 'A'}, 'A'),
     h('li', {key: 'B'}, 'B'),
     h('li', {key: 'C'}, 'C'),
     h('li', {key: 'D'}, 'D'),
]);

const vnode5 = h('ul', {},
 [
     h('li', {key: 'A'}, 'A'),
     h('li', {key: 'C'}, 'C'),
]);


const vnode6 = h('ul', {},
 [
     h('li', {key: 'W'}, 'W'),
]);

// 移动情况
const vnode7 = h('ul', {},
 [
     h('li', {key: 'B'}, 'B'),
]);
// 添加
const vnode8 = h('ul', {},
 [
     h('li', {key: 'A'}, 'A'),
     h('li', {key: 'B'}, 'B'),
     h('li', {key: 'D'}, 'D'),
     h('li', {key: 'C'}, 'C'),
]);

// 按钮添加点击事件
const btn = document.getElementById('btn');
btn.onclick = () => {
    patch(vnode2, vnode8)
}
// 第一次挂载
patch(container, vnode2)