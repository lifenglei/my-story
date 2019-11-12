<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form ref="form" label-position="top" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="正文" prop="content">
            <quill-editor
              v-model="form.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            ></quill-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userstage: '',
      form: {
        title: '',
        content: '',
        time: ''
      },
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "link"], // toggled buttons
            [{ header: 1 }, { header: 2 }],
            [{ color: [] }]
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

    this.userstage = localStorage.getItem('username') // 读取本地是否存有用户信息
    if (
      this.userstage === '' ||
      this.userstage === null ||
      this.userstage === undefined
    ) {
      this.$router.push({ path: 'login' })
    } else {
      console.log(this.userstage)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.time = this.Day()
          this.$ajax({
            method: 'get',
            url: this.$url+'/publish',
            params: {
              title: this.form.title,
              author: this.userstage,
              content: this.form.content,
              time: this.form.time
            }
          })
            .then(response => {
              let res = JSON.parse(response.request.response)
              if (res.state) {
                this.$message.success('发表成功咯！')
                this.resetForm(formName)
                // console.log(this.form.content)
              } else {
                this.$message.warning('出了点问题哦！')
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    Day () {
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() + 1 // 记得当前月是要+1的
      var dt = d.getDate()
      var today = year + '-' + month + '-' + dt
      return today
    },
    onEditorChange ({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    }
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 8px 0;
  /* text-align: left */
}
.ql-container .ql-editor {
  min-height: 20em;
  padding-bottom: 1em;
  max-height: 25em;
}
</style>
