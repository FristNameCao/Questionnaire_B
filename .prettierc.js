module.exports = {
    //  箭头函数只有一个参数的时候可以省略括号
    arrowParens: 'avoid',
    // 括号内部不要出现空格
    backetSpacing: true,
    // 行结束符使用Unix格式
    endOfLine: 'lf',
    //true: Put > on the last line instead of at a new line
    jsxBracketSameLine: false,
    // 行宽
    printWidth: 100,
    //换行方式
    proseWrap: 'preserve',
    //  使用分号
    semi: false,
    //  单引号
    singleQuote: true,
    //  jsx强制使用单引号
    jsxSingleQuote: true,
    //  缩进
    tabWidth: 2,
    //  使用tab缩进
    useTabs: false,
    //  对象属性的引号
    quoteProps: 'as-needed',
    // 后置逗号,多行对象、数组在最后一行增加逗号
    trailingComma: 'es5',
    parser: 'typescript',
};