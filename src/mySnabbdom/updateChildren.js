import patchVnode from './patchVnode'
import createElement from './createElement'
function checkSameNode(a, b) {
    return a.key == b.key && a.sel == b.sel
}
export default function updateChildren(parentElm, oldCh, newCh) {
    console.log('我是uploadChildren');
    // 旧前
    let oldStartIdx = 0;
    // 新前
    let newStartIdx = 0;
    // 旧后
    let oldEndIdx = oldCh.length - 1;
    // 新后
    let newEndIdx = newCh.length - 1;
    // 旧前节点
    let oldStartVnode = oldCh[0];
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx];
    // 新前节点
    let newStartVnode = newCh[0];
    // 新后节点
    let newEndVnode = newCh[newEndIdx];

    let keyMap = null;
    // 循环命中处理
    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if(!oldStartVnode) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if(!oldEndVnode) {
            oldEndVnode = [--oldEndVnode]
        }
        // 新前与旧前
        if(checkSameNode(oldStartVnode, newStartVnode)) {
            console.log('规则1命中')
            patchVnode(oldStartVnode, newStartVnode);
            newStartVnode = newCh[++newStartIdx];
            oldStartVnode = oldCh[++oldStartIdx]
        } else if(checkSameNode(oldEndVnode ,newEndVnode)) {
            // 新后与旧后
            console.log('规则2命中')
            patchVnode(oldEndVnode, newEndVnode);
            newEndVnode = newCh[--newEndIdx];
            oldEndVnode = oldCh[--oldEndIdx];
        } else if(checkSameNode(oldStartVnode ,newEndVnode)) {
            // 新后与旧前比较
            // 规则三命中 需要移动节点（新后指向的节点，移动到旧后之后） 
            console.log('规则3命中')
            patchVnode(oldStartVnode ,newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if(checkSameNode(oldEndVnode ,newStartVnode)){
            // 新前与旧后
            console.log('规则4命中')
            patchVnode(oldEndVnode ,newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            // 四种 规则都没命中
            if(!keyMap) {
                keyMap = {};
                for(let i = oldStartIdx; i < oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if(key) {
                        keyMap[oldCh[i].key] = i;
                    }
                }
                // 寻找当前这项（newStartIds） 在keyMap的位置
                const idxInOld = keyMap[newStartVnode.key]
                // 如果不存在 则是全新的一项
                if(!idxInOld) {
                    parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
                } else {
                    // 存在 则需要移动
                    const elmToMove = oldCh[idxInOld];
                    patchVnode(elmToMove, newStartVnode);
                    // 把这项打上标记
                    oldCh[idxInOld] = undefined;
                    //移动
                    parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
                }
                newStartVnode = newCh[++newStartIdx]
                
            }
        }
    } 
    // 继续看有没有多有的
    if(newStartIdx <= newEndIdx) {
        // 说明还有多的需要插入
        console.log('new 中还有剩余的节点没有处理, 要把所用剩余的节点都要插入到oldStartIdx之前')

        for(let i = newStartIdx; i<=newEndIdx; i++) {
          
            parentElm.insertBefore(createElement(newCh[i]), oldEndVnode.elm);
        }
    } else if(oldStartIdx <= oldEndIdx) {
        // 说明老的节点未处理完 需要删除
        console.log('old 存在节点未处理')
        for(let i = oldStartIdx; i<=oldEndIdx; i++) {
            oldCh[i] && parentElm.removeChild(oldCh[i].elm);
        }
    }
}   