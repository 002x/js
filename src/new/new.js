/**
 * 模拟new运算符.
 *
 * 创建一个自定义的对象类型的实例或具有构造函数的内置对象的实例.
 *
 * 步骤：
 * 1.如果传入的构造器不是函数类型，抛出类型错误;
 * 2.创建一个空对象;
 * 3.将第二步中新创建的对象的原型指向传入的构造函数的原型;
 * 4.将新创建的对象作为构造函数的上下文对象this调用构造函数;
 * 5.如果构造函数没有返回对象，则返回新创建的对象.
 *
 * @param {Function} Constructor 构造函数.
 * @param {*} args 需要传入构造函数的参数列表. 例：new Constructor(arg1, arg2, ...).
 * @return {Object} 构造函数的实例对象.
 *
 * @author PathfinderX
 * @date 2020-04-30
 */
const __new__ = function (Constructor, ...args) {
    // ------ 1 ------ //
    if (typeof Constructor !== 'function') {
        throw new TypeError(`'${Constructor}' is not a constructor.`);
    }

    // ------ 2 ------ //
    // let obj = {};

    // ------ 3 ------ //
    // obj.__proto__ = constructor.prototype;
    // __proto__是隐式原型对象(非标准对象)，ES规范中用[[prototype]]表示.

    // ---- 2 & 3 ---- //
    let obj = Object.create(Constructor.prototype);

    // ------ 4 ------ //
    let result = Constructor.apply(obj, args);

    // ------ 5 ------ //
    // 问题：看到很多用(typeof result === 'object')来判断构造函数的返回值是不是对象，其中(typeof null === 'object' --> true);
    // 可用方法一：typeof result === 'object' && result !== null;
    // 可用方法二：Object.prototype.toString.call(result) === '[object Object]';
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj;
};
