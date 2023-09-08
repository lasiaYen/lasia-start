<!-- eslint-disable vuejs-accessibility/no-autofocus -->
<template>
  <div class="container">
    <div class="welcome-wrapper">
      <div class="welcome">Microsoft Windows [版本 10.0.22621.2134]</div>
      <div class="welcome">(c) Microsoft Corporation。保留所有权利。</div>
    </div>
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <div v-for="item in resultArr" class="command-container">
      <div class="result-container" v-html="item" />
      <div class="command-line-wrapper">
        <div class="status-header" v-html="header" />
        <i class="command-tag">$</i>
        <input
          ref="input"
          class="command-input"
          @input="handleCommandInput"
          @keyup.enter="submitCommand"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<script>
import Engine from '@/engine';
import Checker from '../checker/index';
import Error from '../error/index';
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      command: '',
      header: '&ltLasia:\\User\\Unknown&gt',
      resultArr: [''],
      resultTem: '',
    };
  },
  methods: {
    syntaxTreeCreator() {
      const arr = this.command.split(' ');
      const cmdArr = [];
      arr.forEach((item) => {
        if (item !== '') {
          cmdArr.push(item);
        }
      });
      if (cmdArr.length === 0) {
        this.resultDisplay();
        return;
      }
      if (cmdArr[0] !== 'sia') {
        this.resultTem += Error.headerErr(cmdArr[0]);
        this.resultDisplay();
        return;
      }
      const syntaxTree = {
        header: cmdArr.shift(),
        command: '',
        commandValue: '',
        paramsArr: [],
        params: {},
      };
      syntaxTree.command = cmdArr?.shift();
      if (!this.checkIsParams(cmdArr[0])) {
        syntaxTree.commandValue = cmdArr.shift();
      }
      let isFindParams = true;
      cmdArr.forEach((item, index) => {
        if (isFindParams) {
          if (!this.checkIsParams(item)) {
            this.resultTem += `${item} 参数不符合语法规范,已被忽略 `;
          } else {
            syntaxTree.paramsArr.push(item);
            syntaxTree.params[item] = true;
            if (!this.checkIsParams(cmdArr[index + 1])) {
              isFindParams = false;
              if (cmdArr[index + 1]) {
                syntaxTree.params[item] = cmdArr[index + 1];
              }
            }
          }
        } else {
          isFindParams = true;
        }
      });
      console.log(syntaxTree);
      this.errorChecker(syntaxTree);
    },

    errorChecker(tree) {
      const checker = Checker.commandCheck(tree);
      if (checker.isCorrect) {
        this.resultTem = Engine.syntaxTreeResolver(tree);
        this.resultDisplay();
        console.log('working');
      } else {
        this.resultTem += checker.result;
        this.resultDisplay();
      }
    },

    checkIsParams(target) {
      if (!target || target.length < 2) {
        return false;
      }
      if (target[0] + target[1] === '--') {
        return true;
      }
      return false;
    },

    // 先构建语法树，建立过程中判断参数和赋值的格式是否有错误（并不检查参数是否合法），
    // 检查命令头，没有错误后交由 Checker 类检查指令和参数是否出错
    // 检查完毕后，交由 Engine 类进行执行
    commandSyntaxResolver(cmdArr) {
      if (cmdArr[0] !== 'sia') {
        this.resultDisplay(Error.headerErr(cmdArr[0]));
        return;
      }
      if (Checker.commandCheck(cmdArr[1])) {
        this.resultDisplay('have');
      } else {
        this.resultDisplay(Error.commandErr(cmdArr[1]));
      }
    },
    resultDisplay() {
      this.resultArr.push(this.resultTem);
      this.$nextTick(() => {
        this.$refs.input[this.resultArr.length - 1].focus();
      });
    },
    handleCommandInput(e) {
      this.command = e.target.value;
    },
    submitCommand(e) {
      this.resultTem = '';
      e.target.disabled = true;
      this.syntaxTreeCreator();
      this.command = '';
    },
  },
};
</script>

<style lang="less">
.container {
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 15px;

  .welcome-wrapper {
    margin-bottom: 20px;
    cursor: default;
  }

  .command-container {
    .result-container {
      margin-bottom: 10px;
    }

    .command-line-wrapper {
      display: flex;
      align-items: center;

      .status-header {
        font-weight: bold;
        letter-spacing: 1px;
      }

      .command-tag {
        margin-right: 5px;
        margin-bottom: -3px;
        font-weight: bold;
        color: #34bf49;
      }

      .command-input {
        width: 100%;
        margin-bottom: -3px;
        font-size: 16px;
        font-weight: bold;
        color: #bdbdbd;
        letter-spacing: 1px;
        background-color: #181818;
        border: 0;
        outline: none;
      }
    }
  }
}
</style>
