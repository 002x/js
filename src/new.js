/**
 * 模拟new运算符.
 *
 * 步骤：
 * 1.创建一个空对象;
 * 2.将第一步中新创建的对象的原型指向传入的构造函数的原型;
 * 3.将第一步中新创建的对象作为构造函数的上下文对象this调用构造函数;
 * 4.如果构造函数没有返回对象，则返回第一步中新创建的对象.
 *
 * @param Constructor 构造函数.
 * @param args 需要传入构造函数的参数列表. 例：new Constructor(arg1, arg2, ...).
 * @return {Object} 构造函数的实例对象.
 *
 * @author PathfinderX
 * @date 2020-04-30
 */
const __new__ = function (Constructor, ...args) {
    // 如果传入的构造器不是函数类型，抛出类型错误.
    if (typeof Constructor !== 'function') {
        throw new TypeError(`'${Constructor}' is not a constructor.`);
    }

    // ------ 1 ------ //
    // let obj = {};

    // ------ 2 ------ //
    // obj.__proto__ = constructor.prototype;

    // ------ 1 & 2 ------ //
    // __proto__是隐式原型对象(目测只有Chrome和Firefox支持)，ES规范中用[[prototype]]表示.
    // 用Object.create()实现1、2两个步骤：
    let obj = Object.create(Constructor.prototype);

    // ------ 3 ------ //
    let result = Constructor.apply(obj, args);

    // ------ 4 ------ //
    // 看到很多用(typeof result === 'object')来判断构造函数的返回值是不是对象，这里有个问题是：typeof null === 'object' --> true;
    // 可用方法一：typeof result === 'object' && result !== null;
    // 可用方法二：Object.prototype.toString.call(result) === '[object Object]';
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj;
};
