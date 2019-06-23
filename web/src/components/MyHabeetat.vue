<template>
  <div>
    <!-- INFO -->
    <div class="info">
      <h1>MyHabeetat Explorer</h1>
      <p>
        Extract key values, ids and tokens from MyHabeetat's API.
        <br>Login using your
        <a href="https://myhabeetat.solidmation.com/login.html">MyHabeetat</a> account, click the button and get all the data you need.
      </p>
    </div>

    <!-- SECURITY -->
    <div class="security">
      <p>
        No personal information is stored by this website.
        <br>You can review the code on
        <a
          href="https://github.com/tomasmigone/myhabeetat-explorer"
        >GitHub</a> or directly on this public deployment URL at
        <a href="https://myhabeetat.now.sh/_src">now.sh</a>.
      </p>
    </div>

    <!-- LOGIN -->
    <div class="login">
      <label for="email">email</label>
      <input type="email" v-model="email" size="30%">
      <label for="password">password</label>
      <input type="password" v-model="password" size="30%">
      <button @click="getData" :disabled="disableGetData">Get data</button>
      <p>
        MyHabeetat's API is not super fast. This process could take one or two minutes if you have many houses or devices.
        <br>Please be patient while we retrieve your data!
      </p>
    </div>

    <!-- DATA -->
    <div class="data" v-if="data.authToken.length > 0">
      <h3>Auth token:</h3>
      <span>{{ data.authToken }}</span>
      <h3>Home IDs:</h3>
      <span>{{ data.homes.join(', ') }}</span>
      <h3>Device list:</h3>
      <ul>
        <li v-for="device in data.devices" :key="device.id">{{ device }}</li>
      </ul>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => {
    return {
      disableGetData: false,
      email: '',
      password: '',
      data: {
        authToken: '',
        homes: [],
        devices: []
      }
    }
  },
  methods: {
    getData: async function () {
      try {
        this.disableGetData = true
        let response = await this.axios.post(process.env.VUE_APP_API_URL, { email: this.email, password: this.password })
        this.data.authToken = response.data.token
        this.data.homes = response.data.homes
        this.data.devices = response.data.devices
      } catch (error) {
        console.log(error)
      } finally {
        this.disableGetData = false
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.login > input {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.data {
  padding-top: 40px;
}
ul {
  list-style: none;
}
</style>