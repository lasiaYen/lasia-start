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
        <div class="status-header">
          <span>{{ header }}</span>
          <span>{{ this.$store.state.userName }}</span>
          <span>{{ headerRight }}</span>
        </div>
        <i class="command-tag">$</i>
        <input
          ref="input"
          class="command-input"
          @input="handleCommandInput"
          @keyup.enter="submitCommand"
          @keyup.up="lastCommand"
          @keyup.down="nextCommand"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<script>
import Engine from '../engine/index';
import Checker from '../checker/index';
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      command: '',
      header: '<Lasia:\\User\\',
      headerRight: '>',
      resultArr: [''],
      resultTem: '',
      commandArr: [],
      commandIndex: 0,
    };
  },
  methods: {
    // 先构建语法树，建立过程中判断参数和赋值的格式是否有错误（并不检查参数是否合法），
    // 检查命令头，没有错误后交由 Checker 类检查指令和参数是否出错
    // 检查完毕后，交由 Engine 类进行执行
    syntaxTreeCreator() {
      const arr = this.command.split(' ');
      let cmdArr = [];
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
        const syntaxTree = {
          header: 'sia',
          command: 'search',
          commandValue: cmdArr.join(' '),
          paramsArr: [],
          params: {},
        };
        this.errorChecker(syntaxTree);
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
      let commandValue = '';
      for (let i = 0; i < cmdArr.length; i += 1) {
        if (!this.checkIsParams(cmdArr[i])) {
          commandValue += ` ${cmdArr[i]}`;
        } else {
          cmdArr = cmdArr.slice(i);
          break;
        }
      }
      syntaxTree.commandValue = commandValue.trim();
      let paramValue = '';
      for (let i = 0; i < cmdArr.length; i += 1) {
        if (this.checkIsParams(cmdArr[i])) {
          syntaxTree.paramsArr.push(cmdArr[i]);
          paramValue = '';
          let x = i + 1;
          for (x; x < cmdArr.length; x += 1) {
            if (!this.checkIsParams(cmdArr[x])) {
              paramValue += ` ${cmdArr[x]}`;
            } else {
              break;
            }
          }
          syntaxTree.params[cmdArr[i]] = paramValue.trim();
          i = x - 1;
        }
      }
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
      this.commandArr.push(this.command);
      this.commandIndex = this.commandArr.length;
      this.command = '';
    },
    lastCommand(e) {
      if (this.commandIndex > 0) {
        this.commandIndex -= 1;
        console.log(this.commandIndex, 'up');
        this.command = this.commandArr[this.commandIndex];
        e.target.value = this.command;
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
      }
    },
    nextCommand(e) {
      const len = this.commandArr.length;
      let index = this.commandIndex;
      let command = '';
      if (index < len) {
        if (index === len - 1) {
          command = '';
          index += 1;
        } else {
          index += 1;
          command = this.commandArr[index];
        }
        this.commandIndex = index;
        console.log(this.commandIndex, 'down');
        e.target.value = command;
        this.command = command;
        e.target.setSelectionRange(command.length, command.length);
      }
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

      .error {
        color: #f56c6c;
      }

      .warning {
        color: #e6a23c;
      }

      .success {
        color: #67c23a;
      }
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
