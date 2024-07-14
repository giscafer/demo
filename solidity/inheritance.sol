// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Yeye {
    event Log(string msg);

    function hip() public virtual {
        emit Log('Yeye hip');
    }

    function pop() public virtual {
        emit Log('Yeye pop');
    }

    function yeye() public virtual {
        emit Log('Yeye');
    }
}

contract Baba is Yeye {
    function hip() public virtual override {
        emit Log('Baba hip');
    }

    function pop() public virtual override {
        emit Log('Baba pop');
    }

    function baba() public virtual {
        emit Log('Baba');
    }
}

contract Musk is Yeye, Baba {
    function hip() public virtual override(Yeye, Baba) {
        emit Log('Musk');
    }

    function pop() public virtual override(Yeye, Baba) {
        emit Log('Musk');
    }

    function callParent() public {
        Yeye.pop();
    }

    function callParentSuper() public {
        // 将调用最近的父合约函数，Baba.pop()
        super.pop();
    }
}

contract Base1 {
    modifier exactDividedBy2And3(uint _a) virtual {
        require(_a % 2 == 0 && _a % 3 == 0);
        _;
    }
}

contract Identifier is Base1 {
    //计算一个数分别被2除和被3除的值，但是传入的参数必须是2和3的倍数
    function getExactDividedBy2And3(
        uint _dividend
    ) public pure exactDividedBy2And3(_dividend) returns (uint, uint) {
        return getExactDividedBy2And3WithoutModifier(_dividend);
    }

    //计算一个数分别被2除和被3除的值
    function getExactDividedBy2And3WithoutModifier(
        uint _dividend
    ) public pure returns (uint, uint) {
        uint div2 = _dividend / 2;
        uint div3 = _dividend / 3;
        return (div2, div3);
    }
}

// 构造函数的继承
abstract contract A {
    uint public a;

    constructor(uint _a) {
        a = _a;
    }
}

contract C is A {
    constructor(uint _c) A(_c * _c) {}
}
