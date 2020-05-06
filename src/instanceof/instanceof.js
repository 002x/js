/**
 * 模拟instanceof运算符.
 *
 * 用于检测左操作数是否是右操作数的实例：
 * 左操作数(实例对象)的原型链中是否存在右操作数(构造函数or可调用对象)的原型.
 *
 * 步骤：
 * 1.检测左操作数的类型，非实例对象返回false;
 * 2.检测右操作数的类型，非构造函数或可调用对象抛出类型错误;
 * 3.获取右操作数的显示原型(rightPrototype)和左操作数的隐式原型(leftProto);
 * 4.若leftProto为空或未定义，返回false
 *   若leftProto全等于(对象比较'引用')rightPrototype，返回true
 *   否则，将leftProto赋值为leftProto的隐式原型(相当于在原型链中向上追溯)，并进入下轮判断
 *   直至找出相同的原型或者到达原型链的尽头(null).
 *
 * @param {Object | Function} leftOperand 实例对象(函数是一个附带可被调用功能的常规对象).
 * @param {Function} rightOperand 构造函数or可调用对象(普通函数).
 * @return {boolean}
 *
 * @author PathfinderX
 * @date 2020-05-05
 */
const __instanceof__ = function (leftOperand, rightOperand) {
    // ------ 1 ------ //
    const typeofLOperand = typeof leftOperand;
    if (!(typeofLOperand === 'object' || typeofLOperand === 'function')) {
        return false;
    }

    // ------ 2 ------ //
    if (typeof rightOperand !== 'function') {
        throw new TypeError(`rightOperand of '__instanceof__' is not callable`);
    }

    // ------ 3 ------ //
    const rightPrototype = rightOperand['prototype'];
    let leftProto = leftOperand['__proto__'];

    // ------ 4 ------ //
    while (true) {
        if (leftProto === undefined || leftProto === null) {
            return false;
        }

        if (leftProto === rightPrototype) {
            return true;
        }

        leftProto = leftProto['__proto__'];
    }
};